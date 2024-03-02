import Joi from 'joi';

// Define a schema for LoginForm object
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid Email',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

// Define a schema for RegistrationForm object
export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid Email',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
  confirmPassword: Joi.string().required().messages({
    'any.required': 'Password is required',
  })
});

//post Job and Internship Schema for validating the fields
export const postJobSchema = Joi.object({
  jobTitle: Joi.string().required().messages({
    'any.required': 'Job Title is required',
  }),
  companyName: Joi.string().required().messages({
    'any.required': 'Company Name is required',
  }),
  companyWebsite: Joi.string().required().messages({
    'any.required': 'Company Website is required',
  }),
  experienceFrom: Joi.number().required().messages({
    'any.required': 'Experience Level From is required',
  }),
  experienceTo: Joi.number().required().messages({
    'any.required': 'Experience Level To is required',
  }),
  jobLocation: Joi.string().required().messages({
    'any.required': 'Location is required',
  }),
  contactEmail: Joi.string().required().email().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid Email',
  }),
  skills: Joi.array().required().messages({
    'any.required': 'Skills are required',
  }),
  salaryPackage: Joi.allow(null).messages({
    'any.required': 'Salary Package is required',
  }),
  salaryStipend: Joi.allow(null).messages({
    'any.required': 'Salary Stipend is required',
  }),
  applicationDeadline: Joi.date().required().messages({
    'any.required': 'Application Deadline is required',
  }),
  jobsDescription: Joi.string().required().messages({
    'any.required': 'Job Description is required',
  }),
  user: Joi.string().required().messages({
    'number.required': 'User ID is required',
  }),
  jobType: Joi.string().required().messages({
    'any.required': 'Job Type is required',
  }),
  education: Joi.string().required().messages({
    'any.required': 'Education is required',
  }),
  department: Joi.string().required().messages({
    'any.required': 'Department is required',
  }),
  industryType: Joi.string().required().messages({
    'any.required': 'Industry Type is required',
  }),
  role: Joi.string().required().messages({
    'any.required': 'Role is required',
  }),
  employmentType: Joi.string().required().messages({
    'any.required': 'Employment Type is required',
  })
});


export const userBasicSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'any.required': 'First Name is required',
  }),
  lastName: Joi.string().required().messages({
    'any.required': 'last Name is required',
  }),
  email: Joi.string().required().email().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid Email',
  }),
  middleName: Joi.allow(null).required().messages({
    'any.required': 'Middle name is required',
  }),
  dateOfBirth: Joi.date().messages({
    'any.required': 'Date of Birth is required',
  }),
  gender: Joi.string().messages({
    'any.required': 'Gender is required',
  }),
  profileVisit: Joi.boolean().messages({
    'any.required': 'profileVisit is required',
  }),
});

export const userPersonalSchema = Joi.object({
  location: Joi.string().required().messages({
    'any.required': 'location is required',
  }),
  address: Joi.string().messages({
    'any.required': 'Address is required',
  }),
  mobileNo: Joi.number().messages({
    'any.required': 'Mobile Number  is required',
  }),
  bloodGroup: Joi.string().required().messages({
    'any.required': 'Blood Group is required',
  }),
  relationshipStatus: Joi.string().messages({
    'any.required': 'relationShip Status is required',
  }),
  user: Joi.string().messages({
    'any.required': 'user is required',
  }),
  nationality: Joi.string().messages({
    'any.required': 'Nationality is required',
  }),
});

export const userEduDetails = Joi.object({
  programDegree: Joi.string().required().messages({
    'any.required': 'program Degree is required',
  }),
  collegeName: Joi.string().messages({
    'any.required': 'College Name is required',
  }),
  startDate: Joi.date().messages({
    'any.required': 'Start date  is required',
  }),
  endDate: Joi.date().required().messages({
    'any.required': 'End Date is required',
  }),
  location: Joi.string().messages({
    'any.required': 'location  is required',
  }),
  user: Joi.string().messages({
    'any.required': 'User Id is required',
  }),
});

export const WorkExpDetails = Joi.object({
  companyName: Joi.string().required().messages({
    'any.required': 'companyName is required',
  }),
  designation: Joi.string().messages({
    'any.required': 'designation is required',
  }),
  joiningDate: Joi.date().messages({
    'any.required': 'joiningDate  is required',
  }),
  leavingDate: Joi.date().required().messages({
    'any.required': 'leavingDate is required',
  }),
  location: Joi.string().messages({
    'any.required': 'location Status is required',
  }),
  user: Joi.string().messages({
    'any.required': 'User Id is required',
  }),
});

//post Resume of user and friends Schema for validating the fields
export const postResumeSchema = Joi.object({
  applicantFullName: Joi.string().required().messages({
    'any.required': 'Applicant Name is required',
  }),
  applicantEmail: Joi.string().required().email().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid Email',
  }),
  mobileNumber: Joi.number().required().messages({
    'any.required': 'Mobile Number is required',
  }),
  applicantRelevantSkills: Joi.string().required().messages({
    'any.required': 'Skills is required',
  }),
  designation: Joi.string().required().messages({
    'any.required': 'Designation is required',
  }),
  applicantResumePath: Joi.string().required().messages({
    'any.required': 'Resume Path is required',
  }),
  user: Joi.number().required().messages({
    'any.required': 'userId are required',
  }),
});
