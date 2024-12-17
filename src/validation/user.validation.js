import Joi from 'joi';

export const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(3).required(),
  companyname: Joi.string().required(),
  gstno: Joi.number().allow(null),
  phoneno: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
  address: Joi.string().required(),
  usernote: Joi.string().required(),
  showrates: Joi.number().default(0).required(),
  status: Joi.number().default(1).required(),
  role: Joi.string().default('Customer').valid('Customer', 'Admin', 'Manager').required(),
});
