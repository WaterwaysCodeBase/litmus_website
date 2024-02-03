"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  ListItem,
  List,
  Link,
  ListIcon,
  Slide,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Logo } from "../../components/Logo";
import { AvatarMenu } from "./AvatarMenu";
import { useAuthentication } from "../../auth/useAuthentication";

export default function GeneralNavbar() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const isAuthenticated = useAuthentication();
  return (
    <Box>
      <Flex
        // bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"90px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={0}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Logo desktopNav={<DesktopNav />} height={"50px"} />

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {isAuthenticated ? (
            <AvatarMenu />
          ) : (
            <>
              <Button
                color={"blue"}
                as={"a"}
                fontSize={"sm"}
                fontWeight={700}
                variant={"link"}
                href={"/login"}
              >
                Login
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={700}
                color={"white"}
                bg={"blue.400"}
                href={"/register"}
                _hover={{
                  bg: "blue.50",
                  color: "blue.400",
                }}
              >
                Register
              </Button>
            </>
          )}
        </Stack>
      </Flex>
      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Drawer
          onClose={onClose}
          isOpen={isOpen}
          in={isOpen}
          animateOpacity
          size={"lg"}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton py={5} px={5} size={"2em"} color={"white"} />
            <DrawerHeader
              py={5}
              bg={"blue.400"}
              borderBottom={"1px"}
              borderBottomColor={"gray.50"}
              color={"white"}
            >
              {" "}
              Site Menu
            </DrawerHeader>
            <DrawerBody bg={"blue.400"}>
              <MobileNav />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Slide>
      {/* <Collapse >
       
      </Collapse> */}
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "blue.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"blue.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      // bg={useColorModeValue("white", "gray.800")}
      color={"white"}
      display={{ md: "none" }}
      w="100%"
    >
      <List spacing={3} fontSize={{ base: "14pt", md: "18pt", sm: "14pt" }}>
        {NAV_ITEMS.map((menuItem, index) => (
          <ListItem key={index} borderBottomWidth={1}>
            <Link href={menuItem.href} width={"full"}>
              <Text>{menuItem.label}</Text>
            </Link>
            {menuItem.children && (
              <List ml={4} mt={2}>
                {menuItem.children.map((childItem, childIndex) => (
                  <ListItem key={childIndex}>
                    <Link href={childItem.href}>
                      <Text>{childItem.label}</Text>
                    </Link>
                  </ListItem>
                ))}
              </List>
            )}
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const NAV_ITEMS = [
    {
      label: "Litmus Care",
      href: "/healthcare",
      children: [
        {
          label: "Live-In Care",
          href: "/healthcare/live-in-care",
        },
        {
          label: "Domiciliary",
          href: "/healthcare/domiciliary",
        },
      ],
    },
    {
      label: "Career Page",
      children: [
        {
          label: "Career",
          // subLabel: "Find your dream design job",
          href: "/career",
        },
        {
          label: "Trainings & Support",
          href: "/career/trainings",
        },
        {
          label: "FAQ",
          href: "career/faq",
        },
      ],
    },
  ];
  return (
    <>
      <List spacing={3}>
        {NAV_ITEMS.map((menuItem, index) => (
          <ListItem key={index}>
            <Link href={menuItem.href}>
              <Text>{menuItem.label}</Text>
            </Link>
            {menuItem.children && (
              <List ml={4} mt={2}>
                {menuItem.children.map((childItem, childIndex) => (
                  <ListItem key={childIndex}>
                    <Link href={childItem.href}>
                      <Text>{childItem.label}</Text>
                    </Link>
                  </ListItem>
                ))}
              </List>
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Litmus Care",
    href: "/healthcare",
    children: [
      {
        label: "Live-In Care",
        href: "/healthcare/live-in-care",
      },
      {
        label: "Domiciliary",
        href: "/healthcare/domiciliary",
      },
    ],
  },

  {
    label: "Career Page",
    children: [
      {
        label: "Career",
        // subLabel: "Find your dream design job",
        href: "/career",
      },
      {
        label: "Trainings & Support",
        href: "#",
      },
      {
        label: "FAQ",
        href: "#",
      },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];
