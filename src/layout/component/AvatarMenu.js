import { useEffect, useState } from "react";

import {
  useColorMode,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  IconButton,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { FiLogOut, FiUser, FiUserCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom/dist";
import { useApiData } from "../../components/GetData";
import Cookies from "js-cookie";
import { useUserContext } from "../../components/UserContext";
import { BsFillDashSquareFill } from "react-icons/bs";
import { ReactIcon, ViewIcon } from "@chakra-ui/icons";

export const AvatarMenu = () => {
  const { toggleColorMode } = useColorMode(); // For toggling light/dark mode
  const [user, setUserInfo] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  // const userDetails = useUserContext();
  const {
    data: userDetails,
    loading,
    fetchData,
  } = useApiData("application/getUserDetails");
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userDetails) {
      setUserInfo(userDetails);
    }
  }, [userDetails]);

  const handleLogout = async () => {
    sessionStorage.clear();
    localStorage.clear();
    Cookies.remove('userData');
    Cookies.remove('uid');
    Cookies.remove('isLoggedin');
    Cookies.remove('userLevel');
    Cookies.remove('token');

    navigate("/login");
  };
  return (
    <>
      {!userDetails ? (
        <Spinner color="red" />
      ) : (
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<Avatar size="sm" name={user?.fname + " " + user?.lname} />}
            variant="link"
          />

          <MenuList>
            <MenuItem icon={<FiUser />}
            // onClick={() => toggleColorMode()}
            >
              {user?.fname + " " + user?.lname}
            </MenuItem>
            <MenuItem
              icon={<FiUserCheck />}
              as={"a"}
              href="/application/personal-info"
            >
              My Application
            </MenuItem>
            {user?.level > 5 &&
              <MenuItem
                icon={<FiUser />}
                as={"a"}
                href="/dashboard"
              >
                My Dashboard
              </MenuItem>
            }
            <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
              Logout {user?.fname}
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  );
};
