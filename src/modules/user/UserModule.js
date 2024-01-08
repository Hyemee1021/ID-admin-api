import UserSchema from "./UserSchema.js";

//insert new user

export const insertUser = (userobj) => {
  return UserSchema(userobj).save();
};
