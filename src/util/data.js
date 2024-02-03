import { Spinner } from "@chakra-ui/react";

import { Referee } from "../onboarding/Referee";
import { Dbs } from "../onboarding/Dbs";

export const USER_LEVELS = {
  SIGNUP: 1,
  APPLICATION_PROCESS: 2,
  INTERVIEW: 3,
  PRE_EMPLOYMENT_CHECK: 4,
  CONTRACT_AGREEMENT: 5,
  STAFF: 6,
  ADMIN: 7,
  FAIL: 9,
};


export const services = [
  {
    title: "Web Development",
    description: "Building amazing web applications",
    image: "web-development-image.jpg",
  },
  {
    title: "Graphic Design",
    description: "Creating stunning visual designs",
    image: "graphic-design-image.jpg",
  },
  // Add more service objects as needed
];
export const oonboading = [
  {
    id: 1,
    type: "text",
    title: "Referee",
    link: "#",
    component: <Referee />,
  },
  {
    id: 2,
    type: "doc",
    title: "DBS",
    link: "#",
    component: <Dbs />,
  },
];
export const dbst_type = [
  { value: "Basic DBS", label: "Basic DBS" },
  { value: "Enhanced DBS", label: "Enhanced DBS" },
  {
    value: " Enhanced with Barred List(s) DBS.",
    label: "Enhanced with Barred List(s) DBS",
  },
  ,
];

export const DataBoolean = [
  { value: 1, label: "No" },
  { value: 0, label: "Yes" },
];
export const DriverLicenseType = [
  { value: "Valid Full UK", label: "Valid Full UK" },
  { value: "Valid International", label: "Valid International" },
];

export const nokRelationship = [
  { label: 'Brother', value: 'Brother' },
  { label: 'Sister', value: 'Sister' },
  { label: 'Father', value: 'Father' },
  { label: 'Mother', value: 'Mother' },
  { label: 'Spouse', value: 'Spouse' },
  { label: 'Child', value: 'Child' },
  { label: 'Friend', value: 'Friend' },
  // Add more relationships as needed
];

export const interviewFeedbackChoices = [
  { value: 5, label: 'Very Clear' },
  { value: 4, label: 'Clear' },
  { value: 3, label: 'Neutral' },
  { value: 2, label: 'Unclear' },
  { value: 1, label: 'Very Unclear' },
];
export const likelihoodChoices = [
  { value: 5, label: 'Very Likely' },
  { value: 4, label: 'Likely' },
  { value: 3, label: 'Neutral' },
  { value: 2, label: 'Unlikely' },
  { value: 1, label: 'Very Unlikely' },
];

export const interviewAligned = [
  { value: 5, label: 'Aligned Perfectly' },
  { value: 4, label: 'Mostly Aligned' },
  { value: 3, label: 'Neutral' },
  { value: 2, label: 'Partially Aligned' },
  { value: 1, label: 'Misaligned' },
];

export const yesNoSomewhat = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
  { value: 'Somewhat', label: 'Somewhat' },
];

export const rating = [
  { value: 5, label: 5 },
  { value: 4, label: 4 },
  { value: 3, label: 3 },
  { value: 2, label: 2 },
  { value: 1, label: 1 },
];

export const infoSource = [
  { value: 'Social Media', label: 'Social Media' },
  { value: "From a Freind", label: "From a Freind" },
  { value: "Printed flyers", label: "Printed flyers" },
];

export const refPos = 
[{ value: 'CEO/Founder', label: 'CEO/Founder' },
{ value: 'Director', label: 'Director' },
{ value: 'Manager', label: 'Manager' },
{ value: 'Line Manager', label: 'Line Manager' },
{ value: 'Supervisor', label: 'Supervisor' },
{ value: 'Head of Department', label: 'Head of Department' }]
export const refCandidatePos = 
[{ value: 'Care Support Worker', label: 'Care Support Worker' },
{ value: 'Registered Nurse', label: 'Registered Nurse' },
{ value: 'others', label: 'Others' },
]
export const assessment = [
  { value: 5, label: "Excellent" },
  { value: 4, label:"Good" },
  { value: 3, label: "Average" },
  { value: 2, label: "Poor"},
];