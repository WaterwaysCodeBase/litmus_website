import React from "react";
import { Box, Text, Button, useColorModeValue } from "@chakra-ui/react";

const AnimatedBox = ({
  title,
  buttonText,
  buttonColorScheme,
  buttonVariant,
  link,
}) => {
  return (
    <Box
      as="a"
      href={link}
      minW={{base:"300px",md:"350px"}}
      border="1px"
      borderColor="blue.400"
      w="full"
      bg={useColorModeValue("transparent", "gray.800")}
      rounded="30"
      overflow="hidden"
      textAlign="center"
      py={10}
      _hover={{
        bg: "blue.400",
        ".btnchange": {
          transform: "translateY(-5px)", // Move the button slightly upwards on hover
        },
      }}
    >
      <Text fontSize={{ base: "20px", md: "30px" }} fontWeight={600} px={"5"}>
        {title}
      </Text>

      <Button
        mt={4}
        className="btnchange"
        size="lg"
        py="8"
        colorScheme={buttonColorScheme}
        variant={buttonVariant}
        rounded="xl"
        _hover={{
          bg: "white",
          color: "blue.400",
        }}
        _focus={{
          bg: "blue.200",
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default AnimatedBox;
