import React from "react";
import {
  Box,
  IconButton,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import SideNav from "./ApplicationSidebar";

import { AvatarMenu } from "./AvatarMenu";
import { Logo } from "../../components/Logo";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      // bg={"blue.100"}
      px={5}
      py={5}
    >
      {/* Logo or Title */}
      <Button
        as={IconButton}
        aria-label=" Show Sidebar"
        icon={<HamburgerIcon />}
        display={{ base: "block", md: "none" }} // Show the button on mobile, hide on medium screens and above
        onClick={onOpen}
      >
        
      </Button>

      <Stack fontSize="lg" fontWeight="bold" direction={"row"} spacing={0} just>
        <Logo height={"50px"} />
        {/* <Text> Litmus Care</Text> */}
      </Stack>

      <Box>
        {/* Sidebar */}
        <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay bg={"white"}>
            <DrawerContent bg={"blue.50"}>
              <DrawerCloseButton />
              <DrawerHeader>YOUR APPLICATION</DrawerHeader>
              <DrawerBody>
                {/* Sidebar content */}
                <SideNav />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
      {/* User Avatar and Dropdown */}
      <AvatarMenu />

      {/* <Button
        as={IconButton}
        aria-label=" Show Sidebar"
        icon={<HamburgerIcon />}
        display={{ base: "block", md: "none" }} // Show the button on mobile, hide on medium screens and above
        onClick={onOpen}
      >
        SHow
      </Button> */}
    </Box>
  );
};

export default Header;
