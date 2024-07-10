const zod = require('zod');


const transferSchema = zod.object({
  to: zod.string().min(3),
  amount: zod.number(),
})

module.exports= {
  transferSchema,
}
