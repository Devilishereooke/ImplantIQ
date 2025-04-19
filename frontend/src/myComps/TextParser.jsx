import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

function TextParser({ content }) {
  const [parsedContent, setParsedContent] = useState([]);

  // **word** -- bold
  // * line -- bullet
  // ### -- heading
  // starts with number -- bullet point

  useEffect(() => {
    const parseContent = () => {

		const renderHtml = (text) => {
			return text.split(/(<b>.*?<\/b>)/g).map((part, i) => {
				if (part.startsWith('<b>')) {
					return (
						<Text as="span" fontSize={'xl'} fontWeight="bold" key={i}>
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
			
			// FIRST: Check for bold patterns ( **word** )
			const boldRegex = /\*\*(?![*\s])([^*]+?)(?<!\s)\*\*/g;
			processedLine = processedLine.replace(boldRegex, (match, word) => {
				return `<b>${word.trim()}</b>`;
			});

			// THEN: Check if line starts with *
			if (
				processedLine.trim().startsWith('*') || 
				/^\d+\./.test(processedLine.trim())
			  ) {
				// Remove the bullet/number but preserve indentation
				let bulletContent = processedLine;
				
				// Handle numbered lists (1., 2., etc.)
				if (/^\d+\./.test(processedLine.trim())) {
				  bulletContent = processedLine.replace(/^\s*\d+\.\s*/, '');
				} 
				// Handle asterisk/hyphen bullets
				else if (processedLine.trim().startsWith('*')) {
				  bulletContent = processedLine.replace(/^\s*[\*-]\s*/, '');
				}
				
				return (
				  <Text key={lineIndex} ml={4}>
					• {renderHtml(bulletContent)}
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