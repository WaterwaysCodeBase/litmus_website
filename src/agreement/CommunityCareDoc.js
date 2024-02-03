import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

const CommunityCareAgreementDoc = ({ userDetails, agree, date, employeeCommenceDate }) => {
    const containerStyle = {
        width: '600px',
        margin: '0 auto',
        // paddingTop: '.2em',
        paddingBottom: '1em',
        paddingLeft: '3.5em',
        paddingRight: '3.5em',
        fontFamily: 'Arial, sans-serif',
        'page-break-after': 'always',
        boxShadow: 'lg',

    };

    const headingStyle = {
        color: '#004080',
        fontSize: '10pt',
        fontWeight: 700,
        paddingBottom: '10px',
    };

    const linkStyle = {
        color: '#0066cc',
        textDecoration: 'underline',
    };
    const paraSytle = {
        paddingBottom: '10px',
        fontSize: '10pt',
        textAlign: 'justify'
    }
    return (
        <div style={containerStyle}>
            <Image w={'80%'}
                mx={'auto'} src={'/images/letter_head.png'} />

            <br />
            <p
                style={{
                    paddingBottom: '10px',
                    fontSize: '9pt',
                    textAlign: 'right',

                }}
            >{date}</p>
            <p style={paraSytle}>
                {userDetails &&
                    <>
                        {userDetails?.fname} {userDetails?.oname} {userDetails?.lname},<br />
                        {userDetails?.house_number} {userDetails?.address_line1}, <br />
                        {userDetails?.town_city},  {userDetails?.county}, <br />
                        {userDetails?.post_code}.
                    </>
                }
            </p>
            <p style={paraSytle}>Dear {userDetails?.fname},</p>


           

            <p><br/></p>
            <p><br/></p>
            <p style={paraSytle}>
                Yours sincerely                <br />
                Litmus Recruitment Team            <br />
                Tel: 02080797305          </p>
            {
                agree &&
                <Box my={2} alignSelf={'center'} bg={'green.100'} borderRadius={'lg'} p={3}>
                    <Text color={'green.500'} fontWeight={800} fontSize={'9pt'}>I acknowledge receipt of the terms and conditions of my employment and accept the terms and conditions atteched.
                        Accepted by: {userDetails?.fname + ' ' + userDetails?.lname}</Text>
                </Box>
            }

        </div>
    );
}



const sectionStyle = {
    marginBottom: '10px',
    flexGrow: 1
}
const listdivStyle = {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '10pt',
    fontWeight: 'normal',
    textAlign: 'justify',
    'page-break-after': 'always',
}
const listTextNumberStyle = {
    minWidth: '25pt'
}
const headingdivStyle = {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '10pt',
    fontWeight: 'bold',
    color: '#3182ce',
}
const subList = {
    paddingLeft: '9pt'
}
const supreSubList = {
    paddingLeft: '30px'
}

const headingStyle = {
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3182ce',
    paddingBottom: '10px'
}
const signatureContainerStyle = {
    // marginTop: '30px',
    // borderTop: '1pt solid #000',
    fontSize: '10px',
    // paddingTop: '10px',
}


const List = ({ numbering, text }) => {


    return (
        <>
            <div
                style={listdivStyle}
            >
                <p
                    style={listTextNumberStyle}
                >{numbering}</p>
                <p>{text}</p>
            </div>
        </>
    )
}
const HeadingList = ({ numbering, text }) => {

    return (
        <>
            <div
                style={headingdivStyle} alignItems={'start'}
            >
                <p
                    style={listTextNumberStyle} >
                    {numbering}
                </p>
                <p >{text}</p>
            </div>
        </>
    )
}
export default CommunityCareAgreementDoc;
