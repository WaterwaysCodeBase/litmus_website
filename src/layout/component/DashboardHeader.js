import React from 'react';
import {
  Box,
  Flex,
  Text,
  Avatar,
  useColorModeValue,
  Stack,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  WrapItem,
  Wrap,
  Divider,
  others,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

import { CustomButton } from './Assets';



const DashboardHeader = ({ title,
  breadcrumb,
  icon,
  label,
  link,
  as,
  avatar,
  others,
  mt,
  buttonBG, }) => {

  return (
    <Card
      backgroundColor={useColorModeValue('transparent', 'blue.800')}
      shadow={'none'}
    >
      <CardBody>
        <Stack divider={<StackDivider />} spacing="2">
          <Box>
            <Box
              alignContent={{ base: 'center', md: '', lg: '' }}
              justifyContent={{ base: 'center', md: '', lg: '' }}
              alignItems={{ base: 'center', md: '', lg: '' }}
              textAlign={{ base: 'center', md: 'left', lg: '' }}
            >
              <Flex
                alignItems="center"
                justifyContent="space-between"
                spacing="2"
                direction={{ base: 'column', md: 'row', sm: 'row' }}
              >
                <Flex
                  alignItems={{ base: 'center', md: '', lg: '' }}
                  mb="2"
                  direction={{ base: 'column', md: 'row' }}
                >
                  {avatar}
                  <Box>
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: '12pt', md: '16pt' }}
                      lineHeight={{ base: '', md: '1' }}
                    >
                      {title}
                    </Text>
                    <Text
                      mt={mt}
                      color="gray.500"
                      fontSize={{ base: '1xl', md: '3xl' }}
                    >
                      {breadcrumb}
                    </Text>
                  </Box>
                </Flex>
                <CustomButton
                  as={as}
                  link={link}
                  label={label}
                  bg={buttonBG}
                  color={'white'}
                />
              </Flex>
            </Box>
          </Box>
        </Stack>
        {others}
      </CardBody>
    </Card>
  );
};

export default DashboardHeader;
