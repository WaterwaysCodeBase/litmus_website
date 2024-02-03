import { FormControl, FormLabel } from "@chakra-ui/react";
import { Widget } from "@uploadcare/react-widget";
import { useState } from "react";
import { UPLOADE_CARE_PUBLIC_KEY } from "./APIs";

interface UploadCareWidgetProps {
  formLabel: string;
  isInvalid: String;
  value: String;
  onChange: String;
  disabled: String;
}
const UploadCareWidget = (props: UploadCareWidgetProps) => {
  const { formLabel, isInvalid, value, onChange, disabled } = props;
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel fontSize={20}>{formLabel}</FormLabel>
      <Widget
        onChange={onChange}
        value={value}
        publicKey={UPLOADE_CARE_PUBLIC_KEY}
        id="file"
        height={20}
        fontSize={30}
        size={60}
        imagesOnly
        disabled={disabled}
        // validators={isInvalid}
      />
    </FormControl>
  );
};

export default UploadCareWidget;
