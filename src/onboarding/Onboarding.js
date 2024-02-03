"use client";

import {
  Stack,
  Heading,
  Divider,
  Text,
  useToast,
  Container,
  VStack,
  Flex,
  Spacer,
  ListItem,
  OrderedList,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  list,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Button,
} from "@chakra-ui/react";

import { OnboardingLayout } from "../layout/OnboardingLayout";

import { CustomButton } from "../components/Buttons";

import { useEffect, useState } from "react";

import { oonboading } from "../util/data";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";
import useUserContext from "../components/UserContext";

export default function Onboarding() {
  const [isLoading, setLoading] = useState();
  const [modalContent, setModalContent] = useState([]);

  const uid = Cookies.get("uid");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  function handleClick(content) {
    setModalContent(content);
    onOpen();
  }
   const { userDetails, loading, getUsersInfo,user } = useUserContext();

  return (
    <OnboardingLayout
      showAppProgress={true}
      //   pageTitle="Onboarding"
      mainContent={
        <>
          <Container width={"full"}>
            <Stack w={"full"} align={"center"} justifyContent={"center"}>
              <Heading>Welcome back, {userDetails?.fname}</Heading>
              <Text>
                You will need to prepare the following document through this
                onboarding stage:
              </Text>
              <VStack
                as={OrderedList}
                w={"full"}
                spacing={0}
                divider={<Divider w={"full"} />}
              >
                {oonboading.map((list, index) => (
                  <ListItem w={"full"}>
                    <Flex
                      px={".5em"}
                      py={".5em"}
                      index={index}
                      align={"center"}
                      gap={".5em"}
                    // justifyContent={"space-between"}
                    >
                      <Text>{list.title}</Text>
                      <Spacer />
                      <Menu>
                        <MenuButton
                          px={4}
                          py={2}
                          transition="all 0.2s"
                          borderRadius="md"
                          borderWidth="1px"
                          _hover={{ bg: "gray.400" }}
                          _expanded={{ bg: "blue.400" }}
                          _focus={{ boxShadow: "outline" }}
                        >
                          {list.type == "doc" ? "Upload" : "Add"}
                          <ChevronDownIcon />
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() =>
                              handleClick({
                                title: list.title,
                                content: list.component,
                              })
                            }
                          >
                            {list.type == "doc" ? "Upload Doc" : "Add Data"}
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              handleClick({
                                title: list.title,
                                content: list.component,
                              })
                            }
                          >View</MenuItem>

                        </MenuList>
                      </Menu>
                    </Flex>
                  </ListItem>
                ))}
              </VStack>
            </Stack>
          </Container>
          <Modal onClose={onClose} size={"lg"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{modalContent.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{modalContent.content}</ModalBody>
              <ModalFooter justifyContent={"start"}>
                <CustomButton
                  onClick={onClose}
                  bg={"red.400"}
                  colorScheme="red"
                  label="Close"
                />
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      }
    />
  );
}
