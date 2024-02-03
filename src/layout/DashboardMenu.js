import React from 'react';
import {
  Box,
  Flex,
  Spacer,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
} from '@chakra-ui/react';

const DashboardHeaderMenu = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="4"
      borderBottom="1px"
      borderColor="gray.200"
      bg="white"
      boxShadow="sm"
    >
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="blue.500">
          Recruitment Agency
        </Text>
      </Box>

      <Spacer />

      <Box>
        <Menu>
          <MenuButton
            as={Link}
            color="gray.600"
            _hover={{ textDecor: 'none', color: 'blue.500' }}
          >
            Personal Info
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} href="/profile">
              My Profile
            </MenuItem>
            <MenuItem as={Link} href="/settings">
              Account Settings
            </MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton
            as={Link}
            color="gray.600"
            _hover={{ textDecor: 'none', color: 'blue.500' }}
          >
            Work Documents
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} href="/brp">
              BRP
            </MenuItem>
            <MenuItem as={Link} href="/dbs">
              DBS
            </MenuItem>
            {/* Add more submenu items as needed */}
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton
            as={Link}
            color="gray.600"
            _hover={{ textDecor: 'none', color: 'blue.500' }}
          >
            Timesheet
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} href="/timesheet">
              My Timesheet
            </MenuItem>
            <MenuItem as={Link} href="/add-timesheet">
              Add Timesheet
            </MenuItem>
          </MenuList>
        </Menu>

        <Link
          href="/job-applications"
          color="gray.600"
          _hover={{ textDecor: 'none', color: 'blue.500' }}
        >
          My Job Applications
        </Link>
      </Box>
    </Flex>
  );
};

export default DashboardHeaderMenu;
