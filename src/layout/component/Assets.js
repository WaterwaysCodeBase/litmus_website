import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import React from 'react';

import { Widget } from '@uploadcare/react-widget';
import { ChevronRightIcon } from '@chakra-ui/icons';

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
  bgColor: string;
  StatLink: string;
}

export function StatsCard(props: StatsCardProps) {
  const { title, stat, icon, bgColor, StatLink } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      bg={bgColor}
      as="a"
      href={StatLink}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel
            fontWeight={'bold'}
            fontSize={{ base: '1xl', md: '2xl' }}
            isTruncated
          >
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}
export function CustomButton({ label,
  type,
  link,
  onClick,
  as,
  disabled,
  hover,
  justifyContent,
  bg,
  colorScheme,
  width,
  leftIcon,
  rounded,
  borderWidth,
  borderColor,
  color,
  transition,
  _hover,
  variant,
  rightIcon, }) {

  return (
    <Button
      transition={transition}
      _hover={_hover}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      type={type}
      as={as}
      variant={variant}
      href={link}
      colorScheme={colorScheme == '' ? 'blue' : colorScheme}
      bg={bg}
      onClick={onClick}
      // size={'sm'}
      justifyContent={justifyContent}
      py={1}
      px={5}
      disabled={disabled}
      width={width}
      border
      rounded={rounded}
      borderWidth={borderWidth}
      borderColor={borderColor}
      color={color}
    >
      {label}
    </Button>
  );
}
interface CustomInputProps {
  formLabel: string;
  type: string;
  icon: ReactNode;
  placeholder: string;
  name: string;
  isInvalid: String;
  value: String;
  onChange: String;
  disabled: String;
  formErroMsg: string;
  ref: String;
}
export function CustomInput(props: CustomInputProps) {
  const {
    formLabel,
    type,
    icon,
    placeholder,
    name,
    isInvalid,
    value,
    onChange,
    disabled,
    formErroMsg,
    ref,
  } = props;
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel fontSize={20}>{formLabel}</FormLabel>
      <Input
        className="custom-input"
        type={type}
        placeholder={placeholder}
        name={name}
        py={6}
        height={20}
        fontSize={30}
        value={value}
        onChange={onChange}
        disabled={disabled}
        ref={ref}
      />
      <FormErrorMessage>{formErroMsg}</FormErrorMessage>
    </FormControl>
  );
}


// CustumSelect componennt

interface CustumSelectProps {
  formLabel: string;
  type: string;
  icon: ReactNode;
  placeholder: string;
  name: string;
  isInvalid: String;
  value: String;
  onChange: String;
  disabled: String;
  label: String;
}
export function CustumSelect(props: CustumSelectProps) {
  const {
    formLabel,
    options,
    name,
    isInvalid,
    value,
    onChange,
    disabled,
    placeholder,
    label,
  } = props;

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel fontSize={20}>{formLabel}</FormLabel>
      <Select
        isInvalid={isInvalid}
        placeholder={placeholder}
        mr={-4}
        height={20}
        fontSize={30}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        label={label}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

interface CustumBreadCrumpProps {
  root: string;
  page: Array<{ label: string, link: string, isCurrentPage: String }>;
}

export function CustumBreadCrump(props: CustumBreadCrumpProps) {
  const { root, page, isCurrentPage } = props;

  return (
    <Breadcrumb
      spacing="8px"
      // backgroundColor={'blue.100'}
      px={2}
      py={2}
      separator={<ChevronRightIcon color="gray.500" />}
    >
      {/* Root breadcrumb */}
      <BreadcrumbItem>
        <BreadcrumbLink href={root}>Dashboard</BreadcrumbLink>
      </BreadcrumbItem>

      {/* Page-specific breadcrumbs */}
      {page.map((item, index) => (
        <BreadcrumbItem key={index} isCurrentPage={item.isCurrentPage}>
          <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
