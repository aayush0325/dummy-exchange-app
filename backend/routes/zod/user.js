const zod = require('zod');

const signupSchema = zod.object({
firstname:zod.string().min(3).max(50),
lastname: zod.string().min(3).max(50),
username: zod.string().min(3).max(50),
password: zod.string().min(3).max(50),
})

const signinSchema = zod.object({
firstname:zod.string().min(3).max(50),
lastname: zod.string().min(3).max(50),
})

const updateBodySchema = zod.object({
firstname:zod.string().min(3).max(50).optional(),
password:zod.string().min(3).max(50).optional(),
lastname:zod.string().min(3).max(50).optional(),
})
  
module.exports = {
    signinSchema,
    signupSchema,
    updateBodySchema,
}
