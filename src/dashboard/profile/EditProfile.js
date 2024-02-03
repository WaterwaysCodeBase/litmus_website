import React, { useEffect, useState } from 'react';
import {
  Flex,
  FormControl,
  Input,
  Select,
  Text,
  Stack,
  FormLabel,
  Box,
  Divider,
  InputGroup,
  InputLeftAddon,
  useColorModeValue,
  Button,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



import { ArrowBackIcon } from '@chakra-ui/icons';

import AsyncSelect from 'react-select/async';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { API_BASE_URL } from '../../components/APIs';
import { CustomInput, CustumSelect } from '../../components/Input';


const EditProfile = () => {
  const [loading, setLoading] = useState(true);
  const uid = sessionStorage.getItem('uid');

  React.useEffect(() => {
    getUsersInfo();
    getContries();
  }, []);

  const toast = useToast();
  const navigate = useNavigate();

  const [ListCountries, setListCountries] = useState([]);
  const [user, setUserDetails] = useState([]);
  const country = ListCountries;
  function getContries() {
    axios.get('https://litmusservices.co.uk/api/getCountries.php').then(
      response => {
        setListCountries(response?.data);
      },
      error => {}
    );
  }
  const countryOptions = ListCountries
  function getUsersInfo() {
    const uid = sessionStorage.getItem('uid');
    setLoading(true);
    const input = {
      user_id: uid,
    };
    const url = API_BASE_URL + '/dashboard/getUserInfo';
    axios.post(url, input).then(
      response => {
        console.log(response.data);
        setUserDetails(response?.data);
        setLoading(false);
      },
      error => {}
    );
  }
  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      oname: '',
      gender: '',
      birth_day: '',
      birth_month: '',
      birth_year: '',
      marital_status: '',
      mobile_country_code: '',
      mobile_number: '',
      address_line: '',
      town_city: '',
      postcode: '',
      county: '',
      user_id: uid,
    },
    validationSchema: Yup.object({
      fname: Yup.string().required(),
      lname: Yup.string().required(),
      oname: Yup.string().required(),
      gender: Yup.string().required(),
      birth_day: Yup.number().required(),
      birth_month: Yup.string().required(),
      birth_year: Yup.number().required(),
      marital_status: Yup.string().required(),
      mobile_country_code: Yup.string().required(),
      mobile_number: Yup.string().required(),
      town_city: Yup.string().required(),
      postcode: Yup.string().required(),
      county: Yup.string().required(),
      address_line: Yup.string().required(),
    }),
    onSubmit: data => {
      // setLoading(true);
      const url = API_BASE_URL + '/onboarding/saveBiodata';
      axios
        .post(url, data)
        .then(response => {
          if (response.data.status === '200') {
            toast({
              title: 'Profile Update',
              description: response.data.message,
              position: 'top',
              status: 'success',
              isClosable: true,
            });
            setLoading(false);
            navigate('/onboarding/identity');
          }
        })
        .catch(error => {
          // Other errors
          toast({
            title: 'error',
            description: error.message,
            position: 'top',
            status: 'error',
            isClosable: true,
          });
          setLoading(false);
        });
    },
  });
  useEffect(() => {
    if (user) {
      formik.setValues({
        email: user.email || '',
        fname: user.fname || '',
        lname: user.lname || '',
        oname: user.oname || '',
        gender: user.gender || '',
        birth_day: user.birth_day || '',
        birth_month: user.birth_month || '',
        birth_year: user.birth_year || '',
        marital_status: user.marital_status || '',
        mobile_country_code: user.mobile_country_code || '',
        mobile_number: user.mobile_number || '',
        address_line: user.address_line || '',
        town_city: user.town_city || '',
        postcode: user.postcode || '',
        county: user.county || '',
      });
    }
    setLoading(false);
  }, [user]);

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    // Add more options as needed
  ];

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(filteredOptions);
    }, 1000);
  };
  return (
    <>
      <Box
        backgroundColor={useColorModeValue('transparent', 'transparent')}
        width={{ base: '100%', md: '80%' }}
        px={{ base: '4', md: '' }}
        m="auto"
        as="form"
        my="10"
        onSubmit={formik.handleSubmit}
      >
        <Stack
          py={20}
          gap={6}
          direction={{ base: 'column', md: 'column', sm: 'row' }}
        >

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {/* Names */}
              <Stack gap={2} direction={['column', 'row']}>
                <CustomInput
                  isInvalid={formik.errors.fname && formik.touched.fname}
                  type="text"
                  formLabel="First Name"
                  placeholder="First Name"
                  name="fname"
                  disabled={'disabled'}
                  value={formik.values.fname}
                  onChange={formik.handleChange}
                />

                <FormControl
                  isInvalid={formik.errors.lname && formik.touched.lname}
                >
                  <FormLabel >Last Name Name</FormLabel>
                  <Input
                    className="custom-input"
                    type="text"
                    placeholder="Last Name"
                    name="lname"
                    
                    disabled
                    
                    
                    value={formik.values.lname}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </Stack>
              {/* gender and DOB */}
              <Stack gap={2} direction={['column', 'row']}>
                <FormControl
                  isInvalid={formik.errors.oname && formik.touched.oname}
                >
                  <FormLabel >Other Names</FormLabel>
                  <Input
                    className="custom-input"
                    type="text"
                    placeholder="Other Name"
                    name="oname"
                    
                    disabled
                    
                    
                    value={formik.values.oname}
                    onChange={formik.handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel >Email Address</FormLabel>
                  <Input
                    className="custom-input"
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    
                    
                    
                    disabled
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </Stack>
              {/* Date of Birth */}
              <Stack gap={2} direction={['column', 'row']}>
                <FormControl
                  isInvalid={
                    formik.errors.birth_day && formik.touched.birth_day
                  }
                >
                  <FormLabel >Date of Birth</FormLabel>
                  <Input
                    className="custom-input"
                    type="number"
                    placeholder="Day"
                    name="birth_day"
                    
                    
                    
                    value={formik.values.birth_day}
                    onChange={formik.handleChange}
                  />
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.errors.birth_month && formik.touched.birth_month
                  }
                >
                  <FormLabel >{'Month of birth'} </FormLabel>
                  <Select
                    placeholder="Select Month"
                    name="birth_month"
                    
                    
                    value={formik.values.birth_month}
                    onChange={formik.handleChange}
                  >
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </Select>
                </FormControl>
              </Stack>
              <Stack gap={2} direction={['column', 'row']}>
                <FormControl
                  isInvalid={
                    formik.errors.birth_year && formik.touched.birth_year
                  }
                >
                  <FormLabel >{'Year of birth'} </FormLabel>
                  <Input
                    className="custom-input"
                    type="number"
                    placeholder="Year"
                    name="birth_year"
                    
                    
                    
                    value={formik.values.birth_year}
                    onChange={formik.handleChange}
                  />
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.errors.marital_status &&
                    formik.touched.marital_status
                  }
                >
                  <FormLabel >{'Marital Status'} </FormLabel>
                  <Select
                    placeholder="Marital Status"
                    name="marital_status"
                    
                    
                    value={formik.values.marital_status}
                    onChange={formik.handleChange}
                  >
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="divorced">Divorced</option>
                  </Select>
                </FormControl>
              </Stack>
              <Stack gap={2} direction={['column', 'row']}>
                <FormControl
                  isInvalid={formik.errors.gender && formik.touched.gender}
                >
                  <FormLabel >Gender</FormLabel>
                  <Select
                    placeholder="Select Gender"
                    name="gender"
                    
                    
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel >Mobile Number</FormLabel>
                  <InputGroup>
                    <InputLeftAddon
                      pl={'-10'}
                      children={
                        <CustumSelect
                          isInvalid={
                            formik.errors.mobile_country_code &&
                            formik.touched.mobile_country_code
                          }
                          options={countryOptions}
                          placeholder="Select country code"
                          value={countryOptions.find(
                            option =>
                              option.value === formik.values.mobile_country_code
                          )}
                          onChange={selectedOption => {
                            formik.setFieldValue(
                              'mobile_country_code',
                              selectedOption.value
                            );
                          }}
                          menuPlacement="auto"
                        />
                      }
                      
                      
                      
                    />
                    <Input
                      isInvalid={
                        formik.errors.mobile_number &&
                        formik.touched.mobile_number
                      }
                      type="tel"
                      placeholder="phone number"
                      
                      
                      
                      name="mobile_number"
                      value={formik.values.mobile_number}
                      onChange={formik.handleChange}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
              <Text fontSize={'3xl'}>Address</Text>
              <Divider />

              <Stack gap={2} direction={['column', 'row']}>
                <FormControl
                  isInvalid={
                    formik.errors.address_line && formik.touched.address_line
                  }
                >
                  <FormLabel >
                    House number and Street name
                  </FormLabel>
                  <Input
                    className="custom-input"
                    type="text"
                    placeholder="House number and Street name"
                    name="address_line"
                    
                    
                    
                    value={formik.values.address_line}
                    onChange={formik.handleChange}
                  />
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.errors.town_city && formik.touched.town_city
                  }
                >
                  <FormLabel >{'City '} </FormLabel>
                  <Input
                    className="custom-input"
                    type="text"
                    placeholder="City"
                    name="town_city"
                    
                    
                    
                    value={formik.values.town_city}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </Stack>
              <Stack gap={2} direction={['column', 'row']}>
                <FormControl
                  isInvalid={formik.errors.county && formik.touched.county}
                >
                  <FormLabel >County</FormLabel>
                  <Input
                    className="custom-input"
                    type="text"
                    placeholder="County"
                    name="county"
                    
                    
                    
                    value={formik.values.county}
                    onChange={formik.handleChange}
                  />
                </FormControl>

                <FormControl
                  isInvalid={formik.errors.postcode && formik.touched.postcode}
                >
                  <FormLabel >{'Post Code'} </FormLabel>
                  <Input
                    className="custom-input"
                    type="text"
                    placeholder="Post Code"
                    name="postcode"
                    
                    
                    
                    value={formik.values.postcode}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </Stack>

              <ButtonGroup w="100%" justifyContent={'center'}>
                <Flex w="100%" justifyContent="space-between">
                  <Flex>
                    <Button
                      py={8}
                      px={16}
                      w="7rem"
                      type="submit"
                      colorScheme="blue"
                      variant="solid"
                    >
                      Update
                    </Button>
                  </Flex>
                </Flex>
              </ButtonGroup>
            </>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default EditProfile;
