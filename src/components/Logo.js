import {
  Flex,
  Image,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Logo = ({ desktopNav, height, ...rest }) => {

  return (
    <Flex
      flex={{ base: 1 }}
      justify={{ base: "center", md: "start" }}
      alignItems={"center"}
    >
      <Link
        to={"/"}
      // alignItems={"center"}
      // justify={{ base: "center", md: "start" }}
      >
        <Image src="/images/litmus-logo.png" height={height} {...rest} />
      </Link>
      <Flex display={{ base: "none", md: "flex" }} ml={10}>
        {desktopNav && desktopNav}
      </Flex>
    </Flex>
  );
};
