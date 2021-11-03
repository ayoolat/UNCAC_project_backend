const Joi = require('joi');

const schemas = {
    signUpAdmin: Joi.object().keys({
        userName: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().required()
    }),
    signUpAgency: Joi.object().keys({
        agencyName: Joi.string().alphanum().min(3).max(15).required(),
        phoneNumber: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
        email: Joi.string().email().required(),
        password: Joi.string().optional()
    }),
    signUpAgent: Joi.object().keys({
        agencyName: Joi.string().alphanum().min(3).max(15).required(),
        password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required(),
        confirmPassword: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    }),
    addReport: Joi.object().keys({
        name: Joi.string().min(3).max(30),
        report: Joi.string().min(15).max(500).required(),
        title: Joi.string().min(3).max(50).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    }),
    createReport: Joi.object().keys({
        title: Joi.string().min(3).max(60).required(),
        type: Joi.string().min(3).max(30).required(),
        description1: Joi.string().min(5).max(1000).required(),
        description2: Joi.string().allow("").optional(),
        preferredAgency: Joi.string().allow("").optional(),
        supportingDocuments: Joi.any().optional()
    }),
    updateReport: Joi.object().keys({
        caseId: Joi.string().min(3).max(50).required(),
        agencyName: Joi.string().min(3).max(50).optional(),
        status: Joi.number().max(10).min(1).optional(),
        comment: Joi.string().min(5).max(500).optional()
    }),
    addToHallOfShame: Joi.object().keys({
        fullName: Joi.string().min(3).max(50),
        crime: Joi.string().min(15).max(500).required(),
        consequence: Joi.string().min(3).max(150).required(),
        gender: Joi.string().min(5).max(6).required(),
    })
};

module.exports = schemas;