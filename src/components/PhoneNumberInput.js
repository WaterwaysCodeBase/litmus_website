import { FormControl, FormLabel } from '@chakra-ui/react';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function PhoneNumberInput({
    formLabel,
    name,
    isInvalid,
    value,
    onChange,
    disabled,
    formErroMsg,
    w,
    ...rest
}) {


    return (
        <FormControl isInvalid={isInvalid} w={w}>
            <FormLabel fontSize="12pt">{formLabel}</FormLabel>
            <PhoneInput
                name={name}
                type="text"
                enableAreaCodes={true}
                inputProps={{
                    name: name,
                    country: "gb",
                    required: true,
                    autoFocus: true
                }}
                value={value}
                onChange={onChange}
                inputStyle={{
                    width: "100%",
                    height: "40px",
                }}
                

            />

        </FormControl>
    );
}
