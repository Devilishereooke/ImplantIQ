import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

function TextParser({ content }) {
  const [parsedContent, setParsedContent] = useState([]);

  useEffect(() => {
    const parseContent = () => {
			// console.log(typeof content);
			// console.log(content[0]);

			// This is the result of console.log(content). See the result and code accordingly.
			// 	"To provide a detailed answer about Bone Level Fixture Specifications, I will analyze the given context.

			// 1.⁠ ⁠*Cover screw*: The cover screw is not included in the package.
			// 2.⁠ ⁠*Common Features*:
			//         * Internal Morse Taper (10°)
			//         * Abutment Interface: 3.3mm
			//         * Mountless Type
			// 3.⁠ ⁠*Unit*: The unit of measurement is millimeters (mm).
			// 4.⁠ ⁠*Specifications*:
			//         * A Platform Diameter: 3.5, 3.8, 4.3, 4.8, 6.0 mm (corresponding to colors Yellow, Green, Blue, Red, Orange)
			//         * B Body Diameter: 3.7, 4.0, 4.5, 5.0, 5.0 mm
			//         * C Bevel Height: 0.06, 0.20, 0.32, 0.66 mm
			//         * D Total Length: 7.0, 9.0, 11.0, 13.0, 15.0 mm
			//         * E Thread Depth: 0.35, 0.40, 0.45, 0.50, 0.50 mm
			//         * F Abutment Interface: 3.3 mm

			// Additional notes:
			// - *Compatible with*: NobelProcera® abutments
			// - *Material*: Grade 4 Titanium
			// - *Surface treatment*: TiUnite® (porous anodized surface)
			// "

			// I want to parse this content and display it in a readable format.
			// There are some rules to follow:
			// 1. If a word is between double asterisks, it should be bold.
			// 2. If a word is between single asterisks, it is a bullet point.
			// 3. Each line should be displayed in a new line.

			// Split the content into lines
			// Ensure content is an array and get the first item
			// Helper to render HTML tags
		const renderHtml = (text) => {
			return text.split(/(<b>.*?<\/b>)/g).map((part, i) => {
				if (part.startsWith('<b>')) {
					return (
						<Text as="span" fontWeight="bold" key={i}>
							{part.replace(/<\/?b>/g, '')}
						</Text>
					);
				}
				return part;
			});
		};
		const textContent = Array.isArray(content) ? content[0] : content;

		// Split into lines and parse each line
		const parsedLines = textContent.split('\n').map((line, lineIndex) => {
			// Skip empty lines
			if (!line.trim()) return null;

			let processedLine = line;
			
			// FIRST: Check for bold patterns ( *word* )
			const boldRegex = /\*(?![*\s])([^*]+?)(?<!\s)\*/g;
			processedLine = processedLine.replace(boldRegex, (match, word) => {
				return `<b>${word.trim()}</b>`;
			});

			// THEN: Check if line starts with *
			if (processedLine.trim().startsWith('*') || processedLine.trim().startsWith('-')) {
				// Remove the leading * and any extra spaces
				const bulletContent = processedLine.replace(/\*+/, '\t\t');
				console.log(bulletContent);
				
				
				return (
					<Text key={lineIndex} ml={10}>
						{renderHtml(bulletContent)}
					</Text>
				);
			}


			// Regular text line
			return <Text key={lineIndex}>{renderHtml(processedLine)}</Text>;
		});


			// Set the parsed content to state
			setParsedContent(parsedLines);
    };

    parseContent();
  }, [content]);

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="lg" maxW="2xl">
      <VStack align="stretch" spacing={3}>
        {parsedContent}
      </VStack>
    </Box>
  );
}

export default TextParser;