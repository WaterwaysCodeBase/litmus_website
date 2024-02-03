import {
  Box,
  Flex,
  Avatar,
  HStack,
  WrapItem,
  Wrap,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Divider,
  Center,
  Link,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Logo } from '../../components/Logo';



const menuItems = [
  {
    label: 'Complaince',
    link: '/dashboard/identity/view',
    submenu: [
      { label: 'Proof of Identity', link: '/dashboard/compliance/' },
      { label: 'View', link: '/dashboard/compliance/' },
      { label: 'Certificates', link: '/dashboard/compliance/' },
      { label: 'Work History', link: '/dashboard/compliance/' },
      { label: 'Address Details', link: '/dashboard/compliance/' },
      { label: 'Skills', link: '/dashboard/compliance/' },
      { label: 'Right to Work', link: '/dashboard/compliance/' },
      { label: 'DBS', link: '/dashboard/compliance/' },
    ],
  },

  {
    label: 'Other Information',
    submenu: [
      { label: 'Next of Kin', link: '/dashboard/nok/view' },
      { label: 'Employement Status', link: '/dashboard/nok/view' },
      { label: 'Educational Qualification', link: '/dashboard/nok/view' },
      { label: 'Contact Preference', link: '/dashboard/nok/view' },
    ],
  },

  // Add more menu items as needed
];


export default function DashboardNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
        alignContent={'center'}
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.800', 'gray.100')}
        py={2}
        width={'85%'}
        mx={'auto'}
        px={2}
        borderRadius={'lg'}
      >
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'} bg={'inherit'}>

          <Image src="/litmus-logo.png" h={'50px'}  />

          <HStack as={'nav'} spacing={0} display={{ base: 'none', md: 'flex' }}>
            {menuItems.map((menuItem, index) => (
              <Menu key={index} >
                <MenuButton
                  bg={'transparent'}
                  as={Button}
                  href={menuItem?.link}
                  rightIcon={<ChevronDownIcon />}
                >
                  {menuItem.label}
                </MenuButton>
                <MenuList>
                  {menuItem.submenu.map((subMenuItem, subIndex) => (
                    <MenuItem as={'a'} href={subMenuItem.link} key={subIndex}>
                      {subMenuItem.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            ))}
            <Center px={1}>
              <Divider orientation="vertical" />
            </Center>
            <Menu>
              <MenuButton
                bg={'transparent'}
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                TimeSheet
              </MenuButton>
              <MenuList>
                <MenuItem as={'a'} href={'/dashboard/timesheet'} >
                  TimeSheet
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              <Wrap>
                <WrapItem>
                  <Avatar name="John Doe" bg="teal.500" src="#" />
                </WrapItem>
              </Wrap>
            </MenuButton>
            <MenuList>
              <MenuItem as={'a'} href="/dashboard/profile/edit">
                Profile
              </MenuItem>
              <MenuItem>Settings</MenuItem>
              {/* <MenuItem>Notifications</MenuItem> */}
              <MenuDivider />
              <MenuItem as={'a'} href="/logout">
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={0}>
            {menuItems.map((menuItem, index) => (
              <Menu key={index}>
                <MenuButton
                  bg={'white'}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                >
                  {menuItem.label}
                </MenuButton>
                <MenuList>
                  {menuItem.submenu.map((subMenuItem, subIndex) => (
                    <MenuItem as={'a'} href={subMenuItem.link} key={subIndex}>
                      {subMenuItem.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            ))}
          </Stack>
        </Box>
      ) : null}
    </>
  );
}
