import { Box, Heading, List, ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react"

const listdivStyle = {

    fontSize: '8pt',

    textAlign: 'justify',
    'page-break-after': 'always',
}
const listTextNumberStyle = {
    minWidth: '25pt'
}
const headingdivStyle = {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '8pt',
    fontWeight: 'bold',
    color: '#3182ce',
}
const subList = {
    paddingLeft: '11pt'
}
const supreSubList = {
    paddingLeft: '30px'
}
const headingStyle = {
    fontSize: '10pt',
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
const FinanceOfferContent = ({ employeeName, employeeAddress, fname, employeeCommenceDate, signature, agree, offerCreatedOn, position, sector }) => {
    return (
        <Box textAlign={'left'}>
            <Text pb={2} color={'red'} fontWeight={700} fontSize={'8pt'} >Private and Confidential</Text>

            <Text style={listdivStyle}>{employeeName}</Text>
            <Text style={listdivStyle}>{employeeAddress}</Text>
            <Text style={listdivStyle}>{employeeCommenceDate}</Text>
            <Text style={listdivStyle} py={2}>Dear {fname}</Text>
            <Heading py={2} style={headingdivStyle}>Your Conditional Offer of Employment: {position}</Heading>

            <Text style={listdivStyle} py={2}>Further to your recent interview, I am pleased to confirm our conditional offer of appointment to the above post. This offer remains subject to completion of a series of satisfactory Pre-Employment Checks within the next 4 weeks. Your job offer and start date will be confirmed in writing once all the necessary checks have been completed.</Text>

            <Text style={listdivStyle} py={2}>We are pleased to confirm your conditional offer of employment as summarised below:

                <UnorderedList style={subList}>
                    <ListItem >Job Title: {position}</ListItem>
                    <ListItem>Salary/Hourly rate: £10.79</ListItem>
                    <ListItem >Hours/days per week: 40</ListItem>
                    <ListItem >Main Office: Sherbourne House, Humber Avenue, Coventry, CV1 2AQ</ListItem>
                </UnorderedList>
            </Text>


            <Text style={listdivStyle} py={2}>Please confirm your acceptance of this position by signing one copy of this letter and returning it to us via email within the next 5 days to enable us to promptly continue with your pre-employment checks. Should we not receive your acceptance within that time, we will assume that you do not wish to take up the post.</Text>
            {sector == 'finance' &&
                <Text pb={2} style={listdivStyle}>
                    Because of the nature of the “Bank” arrangements I would like to draw your attention to the following:
                    <UnorderedList style={subList}>
                        <ListItem>Working on the bank is not considered to be employment.</ListItem>
                        <ListItem>There is no obligation on the Trust to offer you work or for you to accept any work offered to you.</ListItem>
                        <ListItem>Your position on the bank will be reviewed periodically. This is dependent on the completion of a certain number of shifts each year, details of which will be provided at a
                            later date.</ListItem>
                    </UnorderedList>
                    In your work you are likely to come across sensitive and personal information relating to our organization, clients and your colleagues.  As a member of the Bank you have an obligation to ensure this information is kept confidential and only used in direct connection to your work. This includes but is not limited to information taken in conversation, maintained via computerised records and used in client’s records. Breaches of this principle will be taken seriously and may jeopardise your position on the bank.
                </Text>
            }


            <h2 style={headingdivStyle}>Pre-Employment Checks</h2>
            <Text pb={2} style={listdivStyle}>The following information is important relating to your pre-employment checks for the above position, these checks will include:

                <OrderedList style={subList} >
                    <ListItem style={{
                        fontSize: '8pt'
                    }}>
                        <strong>Identity checking</strong>: As part of your application process, we need to verify your identity. In order to do this, we will book you for an ID Check appointment. It is very important that you bring the correct documents with you to the ID Check appointment. Failure to do this will mean that you will have to return on another date and repeat the ID check.</ListItem>

                    <ListItem style={{
                        fontSize: '8pt'
                    }} ><b>Qualifications</b>: Please provide evidence of all your qualifications relevant to the position you have applied for.</ListItem>

                    <ListItem style={{
                        fontSize: '8pt'
                    }} ><b>Reference Checks</b>: References will now be requested from the referee’s provided in your application form. Please notify them to expect this request and to follow up with them to ensure a prompt response. Please ensure you have provided correct and up-to-date referee contact details, failure to comply with this could lead to withdrawal of your offer.</ListItem>

                    <ListItem style={{
                        fontSize: '8pt'
                    }} ><b>Disclosure and Barring Service (DBS) Check</b>: Disclosure and Barring Service (DBS) check is required for this role. This check includes information on Police Cautions, Reprimands, Convictions, and Warnings. Proceed to click <a style={{ color: 'blue' }} href="https://www.hr-platform.co.uk/individual/application-login/?HT6u7Zv9CHXDkPSlVKq6CYHMniEhelow0fiOCbpNteab%2Fr%2B3adgiv9zHZUCM5WZkzzXGLbFV6m6x%2F6Zd%2FDGMWINCe8YSxht7oBmC%2F%2B6G1AlQQ4xI7ExcOQRk4MwyaZ64">HERE</a>  and fill in your details.</ListItem>

                    {/* <!-- Add more list items as needed --> */}

                </OrderedList>
            </Text>

            <Text pb={2} style={listdivStyle}>Your offer is subject to satisfactory DBS clearance and signing up to the DBS update service. Registration for the update service costs £13 and is renewed annually. You are expected to keep this registration live and active as a continuing condition of employment. If you require further information about the DBS Update Service please visit <a href="https://www.gov.uk/dbs-update-service">https://www.gov.uk/dbs-update-service</a></Text>

            <Text pb={2} style={listdivStyle}>It is important that you sign up to the update service in a timely fashion. You have 19 days to sign up for the update service following the DBS certificate being issued (if you have not already started the process). If you do not sign up in this period your check will be deemed not valid and you may need to resubmit the application to the DBS upon expiration.</Text>

            <h2 style={headingdivStyle}>HMRC New Starter</h2>
            <Text pb={2} style={listdivStyle}>Prior to starting with us, you must complete the HMRC New Starter Checklist, to ensure that the correct tax code is applied. This can be completed electronically at the following link: <a href="https://www.gov.uk/government/publications/paye-starter-checklist">https://www.gov.uk/government/publications/paye-starter-checklist</a></Text>
            <Text pb={2} style={listdivStyle}>This should be completed and sent along to account@litmusservices.co.uk with your P45 if applicable.</Text>

            <h2 style={headingdivStyle}>ID Badge</h2>
            <Text pb={2} style={listdivStyle}>Upload a passport photo of yourself on the portal.</Text>

            <h2 style={headingdivStyle}>Declaration by Candidate</h2>
            <Text pb={2} style={listdivStyle}>The information I have provided is true and complete. I agree that any deliberate omissions, falsifications, or misrepresentation will be grounds for withdrawing any offer of employment or subsequent dismissal if employed by the organisation. Where applicable, I give my permission for enquiries to be made to confirm qualifications and registrations, experience, dates of employment, right to work in the UK and for the release by other people or organisations of necessary information to verify the content.</Text>

            <Text pb={2} style={listdivStyle}>May I, on behalf of Litmus Services Limited, take this opportunity to welcome you and to wish you every success in your post.</Text>

            <Text style={listdivStyle} pb={'5em'}>Yours sincerely,</Text>
            <Text style={listdivStyle}>Ayo Olowoyeye</Text>
            <Text style={listdivStyle}>Registered Manager</Text>
        </Box>
    )
}

export default FinanceOfferContent