import { Text } from "@chakra-ui/react";

export const TruncatedText = ({ html, maxLength }) => {
  const text = html.replace(/<[^>]+>/g, ""); // Strip HTML tags
  if (text.length <= maxLength) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  const truncatedText = text.substring(0, maxLength - 3) + "...";

  return <Text textAlign={'justify'} fontSize={{ base: "14pt", md: "18pt", sm: "14pt" }} dangerouslySetInnerHTML={{ __html: truncatedText }} />;
};
