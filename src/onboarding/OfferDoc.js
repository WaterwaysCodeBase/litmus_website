import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

const OfferDoc = ({ userDetails, agree, date }) => {
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
        fontSize: '9pt',
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

            <h2 style={headingStyle}>Provisional Offer of Employment {userDetails?.job_title}</h2>

            <p style={paraSytle}>Congratulations on your success at the interview. We are happy to proceed with a Provisional Offer of Employment for you.</p>
            <p style={paraSytle}>If you are happy with this, kindly log in on the portal to accept the conditional offer of employment.</p>

            <p style={paraSytle}>This offer is subject to an Enhanced Disclosure & Barring Service, satisfactory references, and your Right to Work in the UK.</p>

            <h3 style={headingStyle}>References</h3>
            <p style={paraSytle}>As part of our employment checks, we need to take up references covering the last 3 years of employment/education from you. If you have any gaps in your employment/education during the last 3 years, we will require a character reference.</p>
            <p style={paraSytle}>If you can confirm who your line employer/manager/tutor was during the last 3 years and enter their email address/details and phone number on the portal. We cannot accept personal email addresses for references; it must be a professional work email address.</p>

            <h3 style={headingStyle}>Convictions</h3>
            <p style={paraSytle}>This post requires a DBS check to be carried out, which will be completed online. Please go to link below and fill in your details:</p>
            <p
                style={{
                    color: 'blue',
                    paddingBottom: '10px',
                    fontSize: '9pt',
                    textAlign: 'justify'
                }}>https://www.hr-platform.co.uk/individual/application-login/?HT6u7Zv9CHXDkPSlVKq6CYHMniEhelow0fiOCbpNteab%2Fr%2B3adgiv9zHZUCM5WZkzzXGLbFV6m6x%2F6Zd%2FDGMWINCe8YSxht7oBmC%2F%2B6G1AlQQ4xI7ExcOQRk4MwyaZ64</p>
            <p style={paraSytle}>The form will require details of ALL names you have used since birth and details of ALL addresses you have lived at over the past 5 years (including full postcodes). Please include overseas addresses where applicable.</p>
            <p style={paraSytle}>Your offer is subject to satisfactory Enhanced DBS clearance and signing up to the DBS update service. Registration for the update service costs £13 and is renewed annually. For further information and registration with the DBS update service, please visit <a href="https://www.gov.uk/dbs-update-service" target="_blank" rel="noopener noreferrer" style={linkStyle}>DBS Update Service</a>.<br />
                https://www.gov.uk/dbs-update-service
            </p>
            <p style={paraSytle}>If you are not sure about anything in this letter or have any questions, please feel free to call 02080797305.</p>
            <p style={paraSytle}>Once again, congratulations on your offer, and we hope that you have a happy and fulfilling journey with us.</p>
            <p style={paraSytle}></p>
            <p style={paraSytle}>
                <p style={paraSytle}></p>
                <p style={paraSytle}></p>
            </p>
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

export default OfferDoc;
