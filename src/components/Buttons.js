import { Button } from "@chakra-ui/react";

import React from "react";

export function CustomButton({ other,
  label,
  type,
  link,
  onClick,
  as,
  disabled,

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
  rightIcon,
  variant,
  ...rest }) {

  return (
    <Button
      other={other}
      transition={transition}
      _hover={_hover}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      type={type}
      as={as}
      href={link}
      colorScheme={colorScheme == "" ? "blue" : colorScheme}
      bg={bg}
      onClick={onClick}
      size={"lg"}
      justifyContent={justifyContent}
      py={6}
      px={5}
      disabled={disabled}
      width={width}
      border
      rounded={rounded}
      borderWidth={borderWidth}
      borderColor={borderColor}
      color={color}
      variant={variant}
      {...rest}
    >
      {label}
    </Button>
  );
}

export function CustomBackButton({ label,
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
      colorScheme={colorScheme == "" ? "blue" : colorScheme}
      bg={bg}
      onClick={onClick}
      size={"lg"}
      justifyContent={justifyContent}
      py={8}
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
