import { Box, Stack, Text } from "@chakra-ui/react";
import { CustomButton } from "../../components/Buttons";
import { ArrowForwardIcon } from "@chakra-ui/icons";
interface FancyNavItemsProps {
  FancySideBarTitle: String;
  FancyNavItems: Array<FancyNavItems>;
}
export const FancySidebar = (props: FancyNavItemsProps) => {
  const { FancySideBarTitle, FancyNavItems, ...rest } = props;
  const hover = {
    backgroundColor: "blue.400",
    color: "white",
    transform: "translateX(5px)",
  };
  const buttonTransition =
    '"background-color 0.3s, color 0.3s, transform 0.3s"';

  return (
    <Box
      width={{ base: "100%", md: "100%" }} // Adjust width as needed
      px={3}
      rounded={20}
      py={3}
      gap={5}
      borderWidth={1}
      borderColor={"blue.400"}
      backgroundColor="white"
      boxShadow={"md"}
      color="white" // Change to your desired text color
    >
      <Text color={"blue.500"} fontSize={{ base: "2xl", md: "3xl" }} px={5}>
        {FancySideBarTitle}
      </Text>
      <Stack justify={"left"} spacing={1}>
        {FancyNavItems &&
          FancyNavItems.map((item, index) => (
            <CustomButton
              as={"a"}
              transition={buttonTransition}
              _hover={hover}
              rounded={"40"}
              bg={"transparent"}
              justifyContent={"left"}
              leftIcon={
                <ArrowForwardIcon
                  fontSize={"2rem"}
                  p={1}
                  color={"white"}
                  bg={"blue.400"}
                  rounded={"full"}
                />
              }
              {...rest}
              borderColor={"gray.100"}
              borderWidth={2}
              color={"blue.400"}
              label={item.label}
              link={item.link}
            />
          ))}
      </Stack>
    </Box>
  );
};
