import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";


export function CustomInput({ formLabel,
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
  w,
  onBlur, popover, popLabel,
  ...rest }) {

  return (
    <FormControl isInvalid={isInvalid} w={w}>


      <FormLabel fontSize={"10pt"}  >
        <Flex gap={3} ><span> {formLabel}</span>
          {popover &&
            <Popover>
              <PopoverTrigger>
                <Box
                  tabIndex='0'
                  role='button'
                  aria-label='Some box'

                  children={
                    popLabel ?
                      <Text color={'blue'} textDecoration={'underline'}>
                        {popLabel}
                      </Text>
                      :
                      <InfoIcon bg={'black'} rounded={'full'} fontSize={'1.5em'} color={'yellow'} />
                  }
                />
              </PopoverTrigger>
              <PopoverContent bg='white' color='#000'>
                <PopoverCloseButton bg='blue' />
                <PopoverBody w={'95%'} >

                  {popover}
                </PopoverBody>
              </PopoverContent>
            </Popover>}
        </Flex>

      </FormLabel>
      <Input
        onBlur={onBlur}
        className="custom-input"
        type={type}
        placeholder={placeholder}
        name={name}
        py={4}
        // borderWidth={2}
        borderColor={"gray.200"}
        fontSize={'10pt'}
        value={value}
        onChange={onChange}
        disabled={disabled}
        ref={ref}
        {...rest}
      />
      <FormErrorMessage>{formErroMsg}</FormErrorMessage>
    </FormControl>
  );
}

export function CustumSelect({ formLabel,
  options,
  name,
  isInvalid,
  value,
  onChange,
  disabled,
  placeholder,
  label,
  w,
  formErroMsg }) {


  return (
    <FormControl isInvalid={isInvalid} w={w}>
      <FormLabel fontSize={"12pt"}>{formLabel}</FormLabel>
      <Select
        isInvalid={isInvalid}
        placeholder={placeholder}
        // mr={-4}
        height={"40px"}
        fontSize={15}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        label={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{formErroMsg}</FormErrorMessage>
    </FormControl>
  );
}
export function CustumSelectPosition({ formLabel,
  options,
  name,
  isInvalid,
  value,
  onChange,
  disabled,
  placeholder,
  label,
  w }) {


  return (
    <FormControl isInvalid={isInvalid} w={w}>
      <FormLabel fontSize={"12pt"}>{formLabel}</FormLabel>
      <Select
        isInvalid={isInvalid}
        placeholder={placeholder}
        // mr={-4}
        height={"40px"}
        fontSize={15}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        label={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.vacancy_id}>
            {option.job_title}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
export function CustomTextarea({ formLabel,
  placeholder,
  name,
  isInvalid,
  value,
  onChange,
  disabled,
  formErroMsg,
  ref,
  w, }) {

  return (
    <FormControl isInvalid={isInvalid} w={w}>
      <FormLabel fontSize={"12pt"}>{formLabel}</FormLabel>
      <Textarea
      
        placeholder={placeholder}
        name={name}
        // py={6}
        fontSize={20}
        value={value}
        onChange={onChange}
        disabled={disabled}
        ref={ref}
      />
      <FormErrorMessage>{formErroMsg}</FormErrorMessage>
    </FormControl>
  );
}
