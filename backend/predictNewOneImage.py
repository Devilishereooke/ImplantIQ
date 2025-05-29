import json

import cv2
import numpy as np
import torch
from dotenv import load_dotenv
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_groq import ChatGroq
from segment_anything import SamPredictor, sam_model_registry
from ultralytics import YOLO

# Load environment variables
load_dotenv()


class Config:
    GROQ_API_KEY = "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"
    TAVILY_API_KEY = "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"
    MODEL_NAME = "llama-3.3-70b-versatile"


def initialize_components():
    llm = ChatGroq(
        temperature=0.1, model_name=Config.MODEL_NAME, groq_api_key=Config.GROQ_API_KEY
    )

    # Initialize Tavily search tool
    tavily_tool = TavilySearchResults(tavily_api_key=Config.TAVILY_API_KEY)

    return llm, tavily_tool


def setup_search_chain(llm, tavily_tool):
    prompt_template = """You are an expert assistant that provides accurate, information-based answers.
    Use the following search results to answer the question at the end. Analyze all the information and provide a structured response.
    
    Search Results:
    {context}
    
    Question: {question}
    
    Think step by step and provide a detailed answer. Include relevant sources when appropriate:"""

    prompt = ChatPromptTemplate.from_template(prompt_template)

    def format_search_results(results):
        return "\n\n".join(
            [
                f"Source: {result['url']}\nContent: {result['content']}"
                for result in results
            ]
        )

    search_chain = (
        {"question": RunnablePassthrough()}
        | RunnablePassthrough.assign(
            context=lambda x: format_search_results(
                tavily_tool.invoke({"query": x["question"]})
            )
        )
        | prompt
        | llm
        | StrOutputParser()
    )

    return search_chain


def get_class_name(class_id):
    """Map class ID to class name"""
    class_mapping = {
        1: "TSIII SOI Fixture (osstem)",
        2: "TS1V SA Fixture (osstem)",
        3: "Bone Level Fixture (Bright/Dentium)",
        4: "Superline Fixture (Bright/Dentium)",
    }
    return class_mapping.get(class_id, f"Unknown Class {class_id}")


async def get_search_response(search_chain, class_name):
    user_input = f"Tell me everything about dental implant {class_name} in structured manner including its specifications, Dimentions, uses, and compatibility."
    try:
        response = search_chain.invoke(user_input)  # Now passing just the string
        return response
    except Exception as e:
        print(f"\nError getting search response: {str(e)}")
        return f"Could not retrieve information about {class_name}"


# === Load YOLO model ===
yolo_model = YOLO("dental_yolov8n.pt")

# === Load SAM model ===
sam_checkpoint = "sam_vit_b_01ec64.pth"
model_type = "vit_b"
device = "cuda" if torch.cuda.is_available() else "cpu"
sam = sam_model_registry[model_type](checkpoint=sam_checkpoint).to(device)
sam_predictor = SamPredictor(sam)


async def analyze_implant_with_search(image_path):
    """
    Takes an image path, detects implants using YOLO, segments them using SAM,
    gets search response for each detected class, and returns combined results.

    Args:
        image_path (str): Path to the input image

    Returns:
        tuple: (result_dict, output_image) where:
            result_dict: {
                'image': <image name>,
                'detections': [
                    {
                        'class_id': int,
                        'class_name': str,
                        'length_px': float,
                        'diameter_px': float,
                        'confidence': float,
                        'search_response': str
                    },
                    ...
                ]
            }
            output_image: Image with YOLO boxes and SAM segmentations
    """
    # Initialize search components
    llm, tavily_tool = initialize_components()
    search_chain = setup_search_chain(llm, tavily_tool)

    # Image processing
    image_bgr = cv2.imread(image_path)
    if image_bgr is None:
        raise FileNotFoundError(f"Could not load image from {image_path}")

    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    output_image = image_bgr.copy()
    overlay = image_bgr.copy()

    # Predict with YOLO
    yolo_results = yolo_model(image_path)[0]
    sam_predictor.set_image(image_rgb)

    detections = []

    if yolo_results.boxes is not None:
        boxes = yolo_results.boxes.xyxy.cpu().numpy()
        class_ids = yolo_results.boxes.cls.cpu().numpy().astype(int)
        confidences = yolo_results.boxes.conf.cpu().numpy()

        for box, cls_id, conf in zip(boxes, class_ids, confidences):
            # Draw YOLO bounding box
            x1, y1, x2, y2 = map(int, box)
            cv2.rectangle(output_image, (x1, y1), (x2, y2), (0, 255, 0), 2)

            # Get class name from mapping
            class_name = get_class_name(cls_id)
            label = f"{class_name} {conf:.2f}"
            cv2.putText(
                output_image,
                label,
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.5,
                (0, 255, 0),
                2,
            )

            # SAM segmentation
            input_box = np.array(box, dtype=np.float32)
            masks, _, _ = sam_predictor.predict(
                box=input_box[None, :], multimask_output=False
            )

            mask = masks[0]
            mask_uint8 = mask.astype(np.uint8) * 255
            contours, _ = cv2.findContours(
                mask_uint8, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
            )

            # Create colored mask overlay
            color = [255, 0, 0]
            overlay[mask] = color

            for contour in contours:
                if cv2.contourArea(contour) > 50:
                    rect = cv2.minAreaRect(contour)
                    (center_x, center_y), (width, height), angle = rect
                    implant_length = max(width, height)
                    implant_diameter = min(width, height)

                    # Draw dimensions
                    dimension_text = f"L:{implant_length:.1f} D:{implant_diameter:.1f}"
                    cv2.putText(
                        output_image,
                        dimension_text,
                        (int(center_x), int(center_y)),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.5,
                        (255, 255, 255),
                        2,
                    )

                    # Get search response for this class
                    search_response = await get_search_response(
                        search_chain, class_name
                    )

                    detections.append(
                        {
                            "class_id": int(cls_id),
                            "class_name": class_name,
                            "length_px": float(implant_length),
                            "diameter_px": float(implant_diameter),
                            "confidence": float(conf),
                            "search_response": search_response,
                        }
                    )

    # Combine overlay with original image
    alpha = 0.4
    cv2.addWeighted(overlay, alpha, output_image, 1 - alpha, 0, output_image)

    result_dict = {"image": image_path.split("/")[-1], "detections": detections}

    return result_dict, output_image


async def run(input_image_path):
    result, output_img = await analyze_implant_with_search(input_image_path)

    # Save output image
    cv2.imwrite("output.jpg", output_img)

    # Save JSON results
    with open("output_final.json", "w") as f:
        json.dump(result, f, indent=4)

    print("Processing complete. Results saved to output.jpg and output_final.json")


# Process image and save results
if __name__ == "__main__":
    run("input_1.jpg")
