import {

  ListItem,
  Collapse,

  Stack,
  Link,
  List,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";

import { FaCheckCircle, FaLink } from "react-icons/fa";
import { useState, useEffect } from "react";

import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useApiData } from "../../components/GetData";
import Cookies from "js-cookie";

const SideNav = () => {
  const [activeItem, setActiveItem] = useState(null);
  const userLevel = Cookies.get("userLevel") // Initialize with 0 as the default user level
  const [applicationProgress, setApplicationProgress] = useState([]);
  const {
    data: AppProgress,
    loading,
    fetchData,
  } = useApiData("application/getAppProgress");
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(
    (AppProgress) => {
      setApplicationProgress(AppProgress);
    },
    [AppProgress]
  );
  const menuItems = [
    {
      accessLevel: 1, // Adjust access levels as needed
      label: "About You",
      link: "#",
      subMenu: [
        {
          accessLevel: 2,

          label: "Personal Info",
          link: "/application/personal-info",
          status: AppProgress?.personal_info,
        },
        {
          accessLevel: 2,
          requisite: AppProgress?.poa,
          label: "Address Details",
          link: "/application/address",
          status: AppProgress?.poa,
        },
        {
          accessLevel: 2,

          label: "Upload Proof of Identity",
          link: "/application/id-upload",
          status: AppProgress?.poi,
        },
        {
          accessLevel: 2,
          prerequisite: AppProgress?.poa,
          label: "Right to Work",
          link: "/application/right-to-work",
          status: AppProgress?.rtw,
        },
        {
          accessLevel: 2,
          label: "Next of Kin",
          link: "/application/next-of-kin",
          status: AppProgress?.nok,
        },
        {
          accessLevel: 2,

          label: "Mobility Status",
          link: "/application/mobility-status",
          status: AppProgress?.mobility_status,
        },
      ],
    },

    {
      accessLevel: 2,
      // status: training,
      label: "Work History",
      subMenu: [
        {
          accessLevel: 2,

          label: "Work History",
          link: "/application/work-history",
          status: AppProgress?.work_history,
        },
        {
          accessLevel: 2,

          label: "Upload Resume",
          link: "/application/resume",
          status: AppProgress?.resume,
        },
      ],
    },
    {
      accessLevel: 2,
      label: "Training",
      link: "/application/training",
      subMenu: [
        {
          accessLevel: 2,

          label: "Certificates",
          link: "/application/training/certificate",
          status: AppProgress?.certificates,
        },
      ],
    },
    {
      accessLevel: 3,
      label: "Interview",
      subMenu: [
        {
          accessLevel: 3,
          label: "Schedule Interview",
          link: "/interview/schedule",
          status: AppProgress?.interview,
        },

        // {
        //   accessLevel: 3,
        //   label: "Interview Progress",
        //   link: "/interview/progress",
        // },
      ],
    },
    {
      accessLevel: 4,
      label: "Pre-Employment Check",
      subMenu: [
        {
          accessLevel: 4,

          label: "Provisional Offer",
          link: "/employment-check/provisional-offer",
          status: AppProgress?.referee,
        },
        {
          accessLevel: 4,
          label: "Proof of Right to work",
          link: "/employment-check/rtw-proof",
          status: AppProgress?.referee,
        },
        {
          accessLevel: 4,

          label: "DBS",
          link: "/employment-check/dbs",
          status: AppProgress?.referee,
        },
        {
          accessLevel: 4,

          label: "Referee",
          link: "/employment-check/referee",
          status: AppProgress?.referee,
        },




      ],
    },
    {
      accessLevel: 5,
      label: "Contract Agreement",
      subMenu: [
        {
          accessLevel: 5,

          label: "Contract Agreement",
          link: "/contract-agreement",
          status: AppProgress?.referee,
        },
      ],
    },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => item.accessLevel <= userLevel
  );

  // const handleItemClick = (index) => {
  //   setActiveItem(activeItem == index ? null : index);
  // };

  return (
    <>
      <Box gap={3} py={{ base: 0, md: 5 }} bg={"blue.50"}>
        <Stack px={{ base: 0, md: 3 }}>
          <Text
            fontSize={"20px"}
            textTransform={"uppercase"}
            fontWeight={"bold"}
            display={{ base: "none", md: "initial" }}
          >
            {" "}
            YOUR Application
          </Text>
          <Text>
            Please go through the following steps to complete your application.
          </Text>
        </Stack>
        <List>
          {loading && (
            <>
              <LoadingSpinner />
            </>
          )}
          {filteredMenuItems.map((item, index) => (
            <ListItem key={index}>
              <Link
                as={'flex'}
                justifyItems={'start'}
                pointerEvents={"none"}
                fontWeight={"bold"}
                _disabled={item.accessLevel < userLevel ? "none" : ""}
                fontSize={"14pt"}
                px={3}
                py={1}
                _hover={{ textDecoration: "none" }}
                href={item.link}
                dir="row"
                // justifyContent={"space-evenly"}
                alignItems={'center'}
                gap={1}
                display={"flex"}
              >
                <FaLink fontSize={"10"} color={"blue.700"} />
                <Text>{item.label}</Text>
              </Link>
              {item.subMenu && (
                <Box>
                  <Collapse in={true}>
                    <List spacing={0}>
                      {item.subMenu.map((subItem, subIndex) => (
                        <ListItem key={subIndex}>
                          <Flex
                            as={subItem.prerequisite == 2 ? 'flex' : 'a'}
                            display={"flex"}

                            borderRadius={
                              subItem.accessLevel < userLevel ? "" : "2xl"
                            }
                            ml={8}
                            _hover={{
                              bg: "blue.400",
                              borderRadius:
                                subItem.accessLevel < userLevel ? "" : "2xl",
                              color: "white",
                            }}
                            bg={
                              subItem.prerequisite == 2 ? 'yellow.100' : subItem.accessLevel < userLevel ? "green.100" : ""
                            }
                            px={3}
                            py={2}
                            href={subItem.link}
                            align={"center"}
                            justify={"space-between"}


                          >
                            <Text justifySelf={"flex-start"}>

                              {subItem.label} <br /> <b>{subItem.prerequisite == 2 && '(Not Required for Int. Applicant)'}</b>
                            </Text>
                            {subItem.status == 1 && (
                              <FaCheckCircle
                                justifySelf={"flex-end"}
                                color={"green"}
                              />
                            )}

                            {subItem.requisite == 2 && <FaCheckCircle
                              justifySelf={"flex-end"}
                              color={"green"}
                            />}
                          </Flex>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default SideNav;
