import { Box, div, Flex, HStack, Image, Input, li, OrderedList, position, Stack, Text, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import jsPDF from 'jspdf';
import FinanceOfferContent from './FinaTemp';


const mainPage = {
    // marginLeft: '9pt',
    // marginRight: '9pt',
    // marginTop:'20pt',

    fontFamily: 'Verdana',
    'page-break-after': 'always',
    width: '600px',
    padding: '0px 70px 30px 70px'

}
const page = {
    marginTop: '20px',

}
const sectionStyle = {
    marginBottom: '10px',
    flexGrow: 1
}
const listdivStyle = {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '9px',
    fontWeight: 'normal',
    textAlign: 'left',
    'page-break-after': 'always',
}
const listTextNumberStyle = {
    minWidth: '25pt'
}
const headingdivStyle = {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '9px',
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

const Contract = ({ acknowledged, position, employeeName, employeeAddress, employeeCommenceDate, signature, agree, offerCreatedOn, category, sector, fname }) => {

    return (
        <>

            <div style={mainPage} >
                <Flex gap={0} flexDir={'column'} mx={'auto'} alignItems={'center'}  >
                    <Text style={{ fontSize: '9px' }} lineHeight={0} pb={1}>
                        <Image h={'70px'} src={'/images/litmus-logo.png'} />

                        ...partnership that works</Text>
                    <Text textAlign={'center'} fontSize={'8pt'}>Sherbourne House, Humber Avenue, Coventry, CVI 2AQ
                    </Text>
                    <Text textAlign={'center'} fontSize={'8pt'} fontWeight={600}> www.litmusservices.co.uk | jobs@litmusservices.co.uk | 02080797305</Text>
                </Flex>


                <div style={page} bgColor={'white'} >
                    {
                        category == 1 &&
                        <>
                            <FinanceOfferContent
                            position={position}
                                fname={fname}
                                employeeCommenceDate={employeeCommenceDate}
                                employeeName={employeeName}
                                employeeAddress={employeeAddress}
                                sector={sector} />
                        </>

                    }
                    {
                        category == 2 &&
                        <div style={page} bgColor={'white'} >

                            <Text style={headingStyle}>EMPLOYMENT CONTRACT AND TERMS OF AGREEMENT</Text>

                            <div style={sectionStyle}>
                                <HeadingList
                                    text={'THE PARTIES'}
                                />
                                <List
                                    numbering={1}
                                    text={employeeName + ' - ' +
                                        + ' (The Employee).'}
                                />
                                <List
                                    numbering={2}
                                    text={'Litmus Services Limited registered company 13705311 of Sherbourne House, Humber Avenue, Coventry, CV1 2AQ (The Company)'}
                                />
                            </div>

                            <div style={sectionStyle}>
                                <HeadingList
                                    numbering={1}
                                    text={'THE AGREEMENT'}
                                />
                                <List
                                    numbering={1.1}
                                    text={'We are giving You this Agreement to comply with section 1 of the Employment Rights Act 1996. For each Assignment We will also give you an Assignment Details, which together with this Agreement forms Your contract of employment between You and the company.'}
                                />
                                <List
                                    numbering={1.2}
                                    text={'Any prior agreements or arrangements (written or oral, express or implied) between You and the company relating to or arising out of Your employment are hereby cancelled and superseded by this Agreement.'}
                                />
                                <List
                                    numbering={1.3}
                                    text={'Any reference, express or implied, to an enactment within this Agreement includes a reference to that enactment as from time to time amended, modified, extended, reenacted, replaced or applied by or under any other enactment (whether before or after the date of this Agreement) and all subordinate legislation made (before or after this Agreement) under it from time to time.'}
                                />
                                <List
                                    numbering={1.4}
                                    text={'No variation or alteration to this Agreement shall be valid unless the details of such variation are agreed between You and the Company and set out in writing and we give You a copy of the varied terms stating the date on or after which such varied terms shall apply'}
                                />
                                <List
                                    numbering={1.5}
                                    text={'1.5We act as an employment business (as defined in Section 13(3) of the Employment Agencies Act 1973 when introducing or supplying You for Assignments with Clients.'}
                                />
                            </div>
                            <div style={sectionStyle}>
                                {/* Section 2 */}
                                <HeadingList numbering={2} text={'COMMENCEMENT AND DURATION OF EMPLOYMENT'} />
                                <List
                                    numbering={2.1}
                                    text={'You will be engaged under a contract of employment and Your employment under this Agreement starts on ' + employeeCommenceDate}
                                />
                                <List
                                    numbering={2.2}
                                    text={'Your period of continuous employment with the Company will begin on the date Your employment begins for the purposes of the Employment Rights Act 1996.'}
                                />
                            </div>
                            <div style={sectionStyle}>
                                {/* Section 3 */}
                                <HeadingList numbering={3} text={'JOB TITLE AND DUTIES'} />
                                <List
                                    numbering={3.1}
                                    text={'Your job title is Healthcare Assistant.'}
                                />
                                <List
                                    numbering={3.2}
                                    text={'Your normal duties will entail you being assigned to various Clients of the Company who have requested us to provide them with temporary agency workers as a Carer. We will give you more details about each Assignment either verbally or in relevant Assignment Details Forms.'}
                                />
                                <List
                                    numbering={3.3}
                                    text={<>
                                        As soon as possible prior to the start of each Assignment and during each Assignment (as appropriate) and at any time at our request, you undertake to:
                                        <ul style={subList}>
                                            <li>inform us of any Calendar Weeks prior to the start date of the relevant Assignment and/or during the relevant Assignment in which You have worked in the same or a similar role with the relevant Client through any third party and which You believe count or may count toward the Qualifying Period; and</li>
                                            <li>provide us with all the details of such work, including (without limitation) details of where, when and the period(s) during which such work was undertaken and any other details requested by us; and</li>
                                            <li>inform us if you have, before starting the relevant Assignment and/or during the relevant Assignment, carried out work which could be deemed to count towards the Qualifying Period for the relevant Assignment in accordance with Regulation 9 of the AWR because You have:</li>
                                        </ul>
                                        <ol style={supreSubList}>
                                            <li>completed two or more assignments with the Client;</li>
                                            <li>completed at least one assignment with the Client and one or more earlier assignments with any member of the Client's Group; and/or</li>
                                            <li>worked in more than two roles during an assignment with the Client and on at least two occasions worked in a role that was not the same role as the previous role.</li>
                                        </ol>
                                    </>}
                                />
                                <List
                                    numbering={3.4}
                                    text={'We will take reasonable steps to find you suitable work with our Clients and You agree to accept all such Assignments We offer You. We may be entitled to terminate Your employment on notice in accordance with the Notice to Terminate Employment below if You refuse to accept suitable Assignments. Your refusal of a suitable Assignment may, depending on the circumstances, constitute gross misconduct under our disciplinary procedure entitling us to terminate Your employment with immediate effect'}
                                />
                                <List
                                    numbering={3.5}
                                    text={'If we are not able to assign you to any of our Clients for any period of time, you agree that you will remain contactable by telephone so that we can offer you suitable work as soon as it becomes available or you can call us to report your availability. Subject to clause in Other Employment, for the avoidance of doubt you are not prohibited from taking up other work under any other contract or arrangement with third parties, nor are you required to ask our permission to do so. However, for operational reasons you must keep us informed of when you are and are not available to accept an assignment from us. You must notify us immediately if you are not available to undertake assignments at any time during the period of this agreement and you must comply fully with any notification requirements specified by us in this regard. Failure to notify us of your unavailability shall constitute a disciplinary offence because you may receive payment to which you are not entitled and any such failure may result in the termination of your employment with immediate effect as set out in clause 14.4 below.'}
                                />
                                <List
                                    numbering={3.5}
                                    text={<>
                                        While you are on assignment with any of our Clients you shall:
                                        <ul style={subList}>
                                            <li>cooperate with the Client's staff and accept the direction, supervision and instruction of any responsible person in the Client's organisation;</li>
                                            <li>follow any of the Client's rules and regulations, including without limitation those regarding health and safety, to which your attention has been drawn;</li>
                                            <li>not engage in any conduct detrimental to our interests and/or the Client which includes any conduct which could bring us and/or the Client into disrepute and/or which results in the loss of custom or business by either us or the Client;</li>
                                            <li>not commit any act or omission constituting unlawful discrimination against or harassment of any member of the client's or our staff;</li>
                                            <li>not at any time divulge to any person, nor use for your own or any other person’s benefit, any confidential Information relating to the Client’s or our employees, business affairs, transactions or finances;</li>
                                            <li>comply strictly with the Data Protection Laws and shall not do or permit to be done anything which might cause us or the Client to breach any Data Protection Laws; and</li>
                                            <li>when you finish an assignment or at any time when requested by the client or us, return to the client or where appropriate, to us, any client property or items provided to you in connection with or for the purpose of the assignment, including, but not limited to any equipment, materials, documents, swipe cards or ID cards, uniforms, personal protective equipment or clothing.</li>
                                        </ul>
                                    </>}
                                />
                                {/* ... Add more lists for Section 3 ... */}
                            </div>
                            <div style={sectionStyle}>
                                {/* Section 4 */}
                                <HeadingList numbering={4} text={'HOURS OF WORK'} />
                                <List
                                    numbering={4.1}
                                    text={'Whilst on assignment, you will be required to work such hours as are set out in the relevant assignment details and in any event the normal hours of work required by the Client.'}
                                />
                                <List
                                    numbering={4.2}
                                    text={'You may be required to work/offered overtime in addition to your normal hours of work if instructed to do so by us or the Client. If this is the case it will be stated in the relevant assignment details and You may receive additional payment for such overtime hours worked.'}
                                />
                                <List
                                    numbering={4.3}
                                    text={'Subject to any amendments made to your basic working and employment conditions during the term of this agreement in compliance with Regulation 5 of the AWR, time spent travelling to and from the premises of the Company or its Clients (apart from time spent travelling between two or more premises of the Client), lunch breaks and other rest breaks and periods during which we are not able to offer you any assignments shall not count as part of your working time for the purpose of the WTR.'}
                                />
                                <List
                                    numbering={4.4}
                                    text={'If you are entitled to any terms and conditions relating to the duration of working time, night work, rest periods and/or rest breaks under the AWR which are preferential to rights and entitlements relating to the same under the WTR, any such terms and conditions and the date from which they commence will be as set out in the relevant Assignment Details or any amendments to that form.'}
                                />
                                {/* ... Add more lists for Section 4 ... */}
                            </div>
                            <div style={sectionStyle}>
                                {/* Section 5 */}
                                <HeadingList numbering={5} text={'OTHER EMPLOYMENT'} />
                                <List
                                    numbering={5.1}
                                    text={'During each and every assignment, you must devote the whole of your time, attention and abilities during your normal hours of work to your duties for us. If during the course of this agreement, you accept other work under any other contract or arrangement with any other party you must ensure that you continue to comply with the terms of this Agreement, including but not limited to, clause 17.1 (Confidentiality).'}
                                />
                                <List
                                    numbering={5.2}
                                    text={'5.2.If, before or during an assignment or during the relevant period, the client wishes to engage you directly or through another employment business, you acknowledge that you are to inform us immediately and we will be entitled either to charge the client a fee or to agree a period of extended hire with the client at the end of which you may be engaged directly by the client or through another employment business without further charge to the client. In addition, we will be entitled to charge a fee to the client if the client introduces you to a third party who subsequently engages you within the periods'}
                                />
                                <List
                                    numbering={5.3}
                                    text={'5.3.Under no circumstances are you allowed to solicit work directly with our clients where we have sent you to work. Doing this may result in immediate termination and possible legal action.'}
                                />


                            </div>
                            <div style={sectionStyle}>
                                {/* Section 6 */}
                                <HeadingList numbering={6.0} text={'INFORMATION TO BE PROVIDED'} />
                                <List
                                    numbering={6.1}
                                    text={
                                        <>
                                            <Text> At the same time as we offer you an assignment, we will give you an assignment details setting out the following:</Text>
                                            <div style={subList}>
                                                <HeadingList text={'For the purposes of the Conduct Regulations:'} />
                                                <List numbering={'6.1.1'}
                                                    text={'the identity of the Client, and if applicable the nature of their business;'}
                                                />
                                                <List numbering={'6.1.2'}
                                                    text={'the date the Assignment is to start and how long the Assignment will last or is expected to last;'}
                                                />
                                                <List numbering={'6.1.3'}
                                                    text={'the Type of Work, location and hours during which You would be required to work;'}
                                                />
                                                <List numbering={'6.1.4'}
                                                    text={'the Actual Rate of Pay that We will pay You and any expenses payable by or to You;'}
                                                />
                                                <List numbering={'6.1.5'}
                                                    text={'any risks to health and safety known to the Client in relation to the Assignment and the steps the Client has taken to prevent or control such risks; and'}
                                                />
                                                <List numbering={'6.1.6'}
                                                    text={'what experience, training, qualifications and any authorization required by law or a professional body the Client considers necessary or which are required by law to work in the Assignment.'}
                                                />

                                            </div>
                                        </>
                                    }
                                />
                                <List numbering={'6.2'}
                                    text={<>
                                        <Text>Where such information is not given in paper form or by electronic means it shall be confirmed by such means by the end of the third business day (excluding Saturday, Sunday and any Public or Bank Holiday) following except where:</Text>
                                        <div style={subList}>
                                            <List numbering={'6.2.1'}
                                                text={'We offer You an Assignment in the same position as one in which You have previously worked within the previous 5 business days and We already gave You has not changed; or'}
                                            />
                                            <List numbering={'6.2.2'}
                                                text={'The Assignment is intended to last for 5 consecutive business days or less and the information we already gave You has not changed, we need only to give You written confirmation of the identity of the Client and how long We expect the Assignment to last.'}
                                            />

                                        </div>
                                    </>}
                                />
                                <List numbering={'6.3'}
                                    text={'Where the provisions are met but the Assignment extends beyond the intended 5 consecutive business day period, we shall provide such information to You in paper or electronic form within 8 days of the start of the Assignment'}
                                />
                                <List numbering={'6.4'}
                                    text={'For the purpose of calculating the average number of weekly hours worked by You on an Assignment for the purposes of the WTR, the start date for the relevant averaging period shall be the date on which You commence the First Assignment.'}
                                />
                                <List numbering={'6.5'}
                                    text={<>If You have completed the Qualifying Period on the start date of the relevant Assignment or following completion of the Qualifying Period during the relevant Assignment, and if You are entitled to any terms and conditions relating to the duration of working time, night work, rest periods and/or rest breaks under the AWR which are different and preferential <br /> to rights and entitlements relating to the same under the WTR, We will set out such terms and conditions in the relevant Assignment Details Form or any variation to the relevant Assignment Details Form (as appropriate).</>}
                                />
                                <List numbering={'6.6'}
                                    text={'The client reserves their right to cancel work at any time.'}
                                />
                            </div>
                            <div style={sectionStyle}>
                                {/* Section 7 */}
                                <HeadingList numbering={7} text={'LOCATION OF WORK'} />
                                <List
                                    numbering={7.1}
                                    text={'You will be required to work for our Clients at various locations within the UK. We will give You the exact address of each Assignment in the relevant Assignment Details Form. For the avoidance of doubt, we regard total daily commuting time of under 4 hours to be reasonable. We will not pay You for the time it takes to travel to work.'}
                                />
                                {/* ... Add more lists for Section 7 ... */}
                            </div>
                            <div style={sectionStyle}>
                                {/* Section 8 */}
                                <HeadingList numbering={8} text={'PAY'} />
                                <List
                                    numbering={8.1}
                                    text={'During periods when You are carrying out Assignments for our Clients, we will pay You the Hourly Rate. We will tell You the exact amount of pay (the Actual Rate of Pay) for any particular Assignment in the relevant Assignment Details Form.'}
                                />
                                <List
                                    numbering={8.2}
                                    text={'Subject to any statutory entitlement under the relevant legislation and any other statutory entitlement, you will not be entitled to be paid during rest periods, lunch breaks, time spent travelling to and from work and during periods when You are not working on an Assignment (including periods when We have been unable to find You an Assignment or You have chosen not to accept any Assignment offered to You).'}
                                />
                                <List
                                    numbering={8.3}
                                    text={'We will pay You weekly in arrears by credit transfer on Fridays. You must give us Your timesheets in time, Every Monday on or before 10am otherwise there may be a delay in paying You.'}
                                />
                                <List
                                    numbering={8.4}
                                    text={'Your pay and any Minimum Pay are subject to any Agreed Deductions and any deductions which the Company may be required by law to make and in particular in respect of PAYE pursuant to Sections 44-47 of the Income Tax (Earnings and Pensions) Act 2003, Class 1 National Insurance Contributions and employee pension contribution (where relevant).'}
                                />
                                <List
                                    numbering={8.5}
                                    text={'Subject to compliance with Regulation 12 of the Conduct Regulations We reserve the right in our absolute discretion to deduct from Your pay any sums which You may owe Us including, without limitation, any overpayments (whether made as a result of our mistake or as a result of Your submission of an incorrect (including fraudulent) timesheet) or loans made to You by Us or losses suffered by Us as a result of Your negligence or breach of our rules or this Agreement.'}
                                />
                                <List
                                    numbering={8.6}
                                    text={'You must take reasonable care of any equipment or clothing We give You to be used whilst on an Assignment with the Client. You must also return any equipment or clothing to Us upon termination of this Agreement or within [3] days of a request from Us. If You do not comply with the obligations set out in this clause, we reserve the right to deduct the cost of replacement equipment or clothing from any sums owed to You. The question of whether You have taken reasonable care of the equipment or clothing will be solely assessed by our reasonable judgment.'}
                                />

                                {/* ... Add more lists for Section 8 ... */}


                            </div>
                            <div style={sectionStyle}>

                                {/* Section 9 */}
                                <HeadingList numbering={9} text={'TIMESHEETS'} />
                                <List
                                    numbering={9.1}
                                    text={'At the end of each week of an Assignment (or at the end of the Assignment where it is for a period of 1 week or less or is completed before the end of a week) You shall deliver to Us a timesheet duly completed to indicate the number of hours worked during the preceding week (or such lesser period) and signed by an authorized representative of the Client by Monday before 10am.'}
                                />
                                <List
                                    numbering={9.3}
                                    text={'Subject to the provisions of clause 10.3, We will pay You for all hours worked regardless of whether We have received payment from the Client.'}
                                />
                                <List
                                    numbering={9.3}
                                    text={'If You do not give us a timesheet signed by the Client We shall, in a timely fashion, conduct further investigations into the hours claimed by You and the reasons that the Client has refused to sign a timesheet in respect of those hours. This may delay any payment due to You. We will not pay You for hours claimed but not worked. If You claim for hours not worked You may be subject to our disciplinary procedure.'}
                                />

                            </div>
                            <div style={sectionStyle}>
                                {/* Section 10 */}
                                <HeadingList numbering={10} text={'NOTIFICATION OF ABSENCES AND SICK PAY'} />
                                <List
                                    numbering={10.1}
                                    text={'If You cannot attend work for any reason and We have not previously authorized Your absence, you must tell Us that You are absent, and why. Once You have been absent for a total of 7 days including weekends You must provide Us with a medical certificate or statement of fitness for work on the eighth day of sickness or injury if Your absence is medically related. After that, you must give Us medical certificates or statements of fitness for work to cover any continued medical related absence. If, on a medical certificate or statement of fitness for work, your doctor recommends any adjustments to your duties, hours or working conditions to facilitate a return to work, you must cooperate with us regarding the possible implementation of such changes, notwithstanding the fact that the advice on a statement of fitness for work is not binding on us.'}
                                />
                                <List
                                    numbering={10.2}
                                    text={'Immediately following Your return to work after a period of absence which has not previously been authorized by us, You are required to complete a self-certification form (irrespective of whether You have a medical certificate or statement of fitness for work to cover part or all of the period of absence) stating the dates of and the reason for Your absence, including details of sickness on non-working days as this information is required by us for calculating statutory sick pay entitlement. We will keep self-certification forms in our records.'}
                                />
                                <List
                                    numbering={10.3}
                                    text={'If you have accepted an offer of work but are subsequently unable to work the hours agreed, you must notify us immediately of the reason for your absence as soon as possible but no later than 24hours, prior to your start time on the first day of absence. Late cancellations will incur a fee of £50.'}
                                />
                                <List
                                    numbering={10.4}
                                    text={' Lateness without a valid reason determined by us or the client will not be tolerated and may result in disciplinary action.'}
                                />



                            </div>
                            <div style={sectionStyle}>
                                {/* Section 11 */}
                                <HeadingList numbering={11} text={'PENSION AND OTHER BENEFITS'} />
                                <List
                                    numbering={11.1}
                                    text={'As at the date of this Agreement, there is no pension scheme in force in relation to Your employment, but We will comply with our obligations under the Pensions Act 2008.'}
                                />
                                <List
                                    numbering={11.2}
                                    text={'We may vary this clause in order to comply with any statutory obligations we may have in the future under the Pensions Act 2008 or any subsequent or equivalent legislation.'}
                                />
                            </div>
                            <div style={sectionStyle}>
                                {/* Section 12 */}
                                <HeadingList numbering={12} text={'NOTICE TO TERMINATE EMPLOYMENT'} />
                                <List
                                    numbering={12.1}
                                    text={
                                        <>
                                            <Text>If We wish to terminate Your employment, we will give You the following notice in writing:</Text>
                                            <div style={subList}>
                                                <List numbering={'12.1.1'}
                                                    text={'four weeks’ notice if You have been continuously employed for one month or more but less than two years; followed by'}
                                                />
                                                <List numbering={'12.1.2'}
                                                    text={'four weeks’ notice for each completed year of continuous service plus an additional week up to a maximum of 13 weeks’ notice after 12 years’ continuous service.'}
                                                />

                                            </div>
                                        </>
                                    }
                                />
                                <List
                                    numbering={12.2}
                                    text={'If You want to terminate Your employment, you must give us four weeks’ notice in writing.'}
                                />
                                <List
                                    numbering={12.3}
                                    text={'If you are found to have committed an act of gross misconduct, we will be entitled to terminate your employment without notice or pay in lieu of notice and may take legal action.'}
                                />
                            </div>
                            <div style={sectionStyle}>
                                {/* Section 13 */}
                                <HeadingList numbering={13} text={'DISCIPLINARY AND GRIEVANCE PROCEDURES'} />
                                <List
                                    numbering={13.1}
                                    text={'We expressly reserve the right to suspend You from employment pending investigation and any further action in relation to any disciplinary or related matters, for such period as We consider appropriate or until any disciplinary process has been completed.'}
                                />
                                <List
                                    numbering={13.2}
                                    text={'If, either before or during the course of an Assignment, you become aware of any reason why You may not be suitable for an Assignment, you shall notify us without delay. A failure to notify us under this clause shall constitute a disciplinary offence.'}
                                />
                            </div>
                            <div style={sectionStyle}>
                                {/* Section 14 */}
                                <HeadingList numbering={14} text={'EXPENSES'} />
                                <List
                                    numbering={14.1}
                                    text={'We will reimburse You all expenses properly incurred by You in the proper performance of Your duties, provided that You seek prior authorization to incur those expenses and provide Us with such receipts or other evidence of actual payment of such expenses as We may reasonably require.'}
                                />
                                <List
                                    numbering={14.2}
                                    text={'We will not usually reimburse You for travelling expenses incurred to and from Your place of employment or the Client’s premises.'}
                                />
                            </div>
                            <div style={sectionStyle}>
                                {/* Section 15 */}
                                <HeadingList numbering={15} text={'CONFIDENTIALITY'} />
                                <List
                                    numbering={15.1}
                                    text={'You must not disclose any trade secrets or other information of a confidential nature relating to our business or any of our Clients or any of their business associates or in respect of which We or any of our Clients owes an obligation of confidence to any third party either during or after Your employment except in the proper course of Your employment or as required by law.'}
                                />
                                <List
                                    numbering={15.2}
                                    text={'You must not remove any documents or tangible items which belong to Us or our Clients which contain any Confidential Information from either our premises or a Client’s premises at any time without proper advance authorization.'}
                                />
                                <List
                                    numbering={15.3}
                                    text={'If We request it, on the termination of Your employment, you must return all property belonging to Us or any of our Clients or any of their business associates including without limitation all documents and tangible items including those which contain or refer to any Confidential Information and which are in Your possession or under Your control.'}
                                />

                            </div>
                            <div style={sectionStyle}>

                                {/* Section 16 */}
                                <HeadingList numbering={16} text={'HEALTH AND SAFETY AT WORK'} />
                                <List
                                    numbering={16.1}
                                    text={'We will take all reasonably practicable steps to ensure Your health, safety and welfare while at work.'}
                                />
                                <List
                                    numbering={16.2}
                                    text={'During every Assignment You will take all reasonable steps to safeguard Your own health and safety and that of any other person who may be present or be affected by Your actions on the Assignment and comply with the health and safety policies and procedures of the Client'}
                                />

                            </div>
                            <div style={sectionStyle}>
                                {/* Section 17 */}
                                <HeadingList numbering={17} text={'DATA PROTECTION'} />
                                <List
                                    numbering={17.1}
                                    text={'You acknowledge that We must process personal data about You in order to properly fulfil its obligations under this Agreement and as otherwise required by law in relation to Your employment in accordance with the Data Protection Laws. Such processing will principally be for personnel, administrative and payroll purposes.'}
                                />
                                {/* ... Add more lists for Section 17 ... */}
                            </div>
                            <div style={sectionStyle}>

                                {/* Section 20 */}
                                <HeadingList numbering={20} text={'SEVERABILITY'} />
                                <List
                                    numbering={20.1}
                                    text={'If any of the provisions of this Agreement shall be determined by any competent authority to be unenforceable to any extent, such provision shall, to that extent, be severed from the remaining Agreement, which shall continue to be valid to the fullest extent permitted by applicable laws.'}
                                />
                                {/* ... Add more lists for Section 20 ... */}
                            </div>
                            <div style={sectionStyle}>
                                {/* Section 21 */}
                                <HeadingList numbering={21} text={'RIGHTS OF THIRD PARTIES'} />
                                <List
                                    numbering={21.1}
                                    text={'None of the provisions of this Agreement are intended to be for the benefit of or enforceable by third parties and the operation of the Contracts (Rights of Third Parties) Act 1999 is excluded.'}
                                />
                                {/* ... Add more lists for Section 21 ... */}
                            </div>
                            <div style={sectionStyle}>
                                {/* Section 22 */}
                                <HeadingList numbering={22} text={'NOTICES'} />
                                <List
                                    numbering={22.1}
                                    text={'All notices which are required to be given in accordance with this Agreement shall be in writing and may be delivered personally or by first class prepaid post to the registered office of the party upon whom the notice is to be served or any other address that the party has notified the other party in writing including by email. Any such notice shall be deemed to have been served: if by hand when delivered; if by first class post 48 hours following posting; and if by email, when that email is sent.'}
                                />
                                {/* ... Add more lists for Section 22 ... */}
                            </div>
                            <div style={sectionStyle}>

                                {/* Section 23 */}
                                <HeadingList numbering={23} text={'JURISDICTION AND GOVERNING LAW'} />
                                <List
                                    numbering={23.1}
                                    text={'This Agreement shall be governed and interpreted in all respects by English law and the parties irrevocably submit to the non-exclusive jurisdiction of the Courts of England and Wales/Scotland/ Northern Ireland.'}
                                />
                                {/* ... Add more lists for Section 23 ... */}
                            </div>





                            {/* Repeat the structure for other sections, adjusting styles as needed */}



                            <Stack style={signatureContainerStyle}>

                                <Box gap={2}>
                                    <Text textTransform={'uppercase'} fontWeight={'bold'} fontSize={'12px'}> {signature}</Text>
                                    <Text>Signed by the employee</Text>
                                    <Text>Name of Employee</Text>
                                    <Text>Date: {employeeCommenceDate}</Text>
                                </Box>

                            </Stack>
                        </div>
                    }
                </div>
                {
                    (agree == "I agree" && signature == employeeName) &&
                    <Box my={2} alignSelf={'center'} bg={'green.100'} borderRadius={'lg'} p={3}>
                        <Text color={'green.500'} fontWeight={800} fontSize={'9pt'}>I acknowledge receipt of and accept the terms and conditions of my employment.
                            Accepted by: {employeeName}</Text>
                    </Box>
                }



            </div >
        </>
    );
};

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

// export default ReportTemplate;
export default Contract


