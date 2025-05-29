import json

from dotenv import load_dotenv
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_groq import ChatGroq

load_dotenv()


class Config:
    GROQ_API_KEY = "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"
    TAVILY_API_KEY = "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"
    MODEL_NAME = "llama-3.3-70b-versatile"


def initialize_components():
    llm = ChatGroq(
        temperature=0.1, model_name=Config.MODEL_NAME, groq_api_key=Config.GROQ_API_KEY
    )
    tavily_tool = TavilySearchResults(tavily_api_key=Config.TAVILY_API_KEY)

    return llm, tavily_tool


def setup_search_chain(llm, tavily_tool):
    prompt_template = """You are an expert assistant chatbot that provides accurate, information-based answers.
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
        RunnablePassthrough.assign(
            context=lambda x: format_search_results(
                tavily_tool.invoke({"query": x["question"]})
            )
        )
        | prompt
        | llm
        | StrOutputParser()
    )

    return search_chain


async def chat_run(query):
    print("heyy\n\n\n\n")
    llm, tavily_tool = initialize_components()
    search_chain = setup_search_chain(llm, tavily_tool)
    try:
        response = search_chain.invoke({"question": query})
        # print(response)
    except Exception as e:
        print(f"\nError: {str(e)}")
    return response


if __name__ == "__main__":
    chat_run("What are the available bone level fixtures in osstem system")

