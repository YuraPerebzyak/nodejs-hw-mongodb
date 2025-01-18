import Joi from 'joi';

import { typeList } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20).allow(null),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...typeList)
    .min(3)
    .max(20)
    .required(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20).allow(null),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...typeList)
    .min(3)
    .max(20),
});
