const zod = require("zod");
const createTodo = zod.object({
    title : zod.string(),
    description : zod.string()
});
const updateTodo = zod.object({
    id : zod.string()
});
const userSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
  });

module.exports = {
    createTodo : createTodo,
    updateTodo : updateTodo,
    userSchema : userSchema
}