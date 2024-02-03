import {
  Box,
  Container,
  Divider,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import Footer from "./component/Footer";
import GeneralNavbar from "./component/GeneralNavbar";
import { useEffect } from "react";
import { useState } from "react";


export default function GeneralLayout({
  pageContent,
  description,
  infoALert,
  mainContent,
  nav
}) {
  const [navBackground, setNavBackground] = useState("transparent"); // State for background color
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setNavBackground("white"); // Change to the desired background color
      } else {
        setNavBackground("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Box
        bg={useColorModeValue(navBackground, "blue.900")}

        transition="background-color .7s ease-in-out"
        position="fixed"
        w="full"
        zIndex={2}
      >
        <Box width={"85%"} m={"auto"}>
          <GeneralNavbar />
        </Box>
      </Box>
      <Divider />
      <Box
        width={"full"}
        m={"auto"}
        color={useColorModeValue("gray.800", "gray.50")}
      >
        <Box>{pageContent}</Box>
      </Box>

      <Footer />
    </>
  );
}
