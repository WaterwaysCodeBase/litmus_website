import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

const DashboardContent = ({ submenu }) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState(submenu[0]?.id);
    const selectedContent = submenu.find(item => item.id === selectedMenuItem)?.content;
    const selectedTitile = submenu.find(item => item.id === selectedMenuItem)?.title;
    const handleMenuItemClick = (id) => {
        setSelectedMenuItem(id);
    };

    return (
        <Box display={"flex"} py={2} gap={2} flexDirection={"row"} >
            <Box
                width={"250px"}
                bg={"white"}
                left={"0"}
                height={"auto"}
                pos={"absolute"}
                borderRadius={"lg"}
                border={"solid 2px #ccc"}
                top={"2"}
                p={2}
            >
                <Stack spacing={1} alignSelf={"center"} justifySelf={"center"}>
                    {submenu &&
                        submenu.map((subMenuItem) => (
                            <Link
                                key={subMenuItem.id}
                                _hover={{
                                    bg: "blue.400",
                                    color: "white"
                                }}
                                boxShadow={"md"}
                                px={3}
                                py={2}
                                as={"a"}
                                bg={subMenuItem.id === selectedMenuItem ? "blue.400" : "white"}
                                color={subMenuItem.id === selectedMenuItem ? "white" : "inherit"}
                                borderRadius={"lg"}
                                onClick={() => handleMenuItemClick(subMenuItem.id)}
                                cursor="pointer"
                            >
                                {subMenuItem.label}
                            </Link>
                        ))}
                </Stack>
            </Box>
            <Box gap={5} flexGrow={1} py={2} px={5} ml={"255px"} bg={"white"} borderRadius={"lg"}>
                <Text fontSize={'18pt'} fontWeight={'bold'}>
                    {selectedTitile}
                </Text>
                {selectedContent}
            </Box>
        </Box>
    );
};

export default DashboardContent;
