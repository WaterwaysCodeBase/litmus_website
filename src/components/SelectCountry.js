import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { COUNTRY_LIST_API } from "./APIs";

interface SelectProps {
  formLabel: string;
  name: string;
  isInvalid: boolean;
  value: string;
  onChange: (value: any) => void; // Assuming you are using a controlled component
  disabled: boolean;
}

export function ListCountries(props: SelectProps) {
  const { formLabel, name, isInvalid, value, onChange, disabled } = props;
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    getContries();
  }, []);

  function getContries() {
    const url = COUNTRY_LIST_API;
    axios.get(url).then(
      (response) => {
        const options = response?.data.map((country) => ({
          value: `${country.nicename}`,
          label: country.nicename,
        }));
        setCountryOptions(options);
      },
      (error) => {}
    );
  }

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel fontSize={"12pt"}>{formLabel}</FormLabel>
      <Select
        isInvalid={isInvalid}
        placeholder={formLabel}
        name={name}
        value={countryOptions.find((option) => option.value === value)}
        onChange={onChange}
        isDisabled={disabled}
        options={countryOptions}
      />
    </FormControl>
  );
}
interface CustomSelectProps {
  formLabel: string;
  options: { value: string, label: string }[];
  name: string;
  isInvalid: boolean;
  value: { value: string, label: string }[] | null;
  onChange: (selectedOption: { value: string, label: string }[] | null) => void;
  isDisabled: boolean;
  placeholder: string;
  label: string;
  width: string;
  isMulti: boolean;
  required: Boolean;
}

export function CustomSearchableSelect(props: CustomSelectProps) {
  const {
    formLabel,
    options,
    name,
    isInvalid,
    value,
    onChange,
    isDisabled,
    placeholder,
    label,
    width,
    isMulti,
    required,
  } = props;

  return (
    <FormControl isInvalid={isInvalid} width={width}>
      <FormLabel fontSize={"12pt"}>{formLabel}</FormLabel>
      <Select
        required={required}
        isSearchable={true} // Enable search functionality
        isDisabled={isDisabled}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
      />
      {isInvalid && (
        <FormErrorMessage>Select a certificate</FormErrorMessage>
      )}
    </FormControl>
  );
}
