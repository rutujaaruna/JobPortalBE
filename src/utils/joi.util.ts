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
