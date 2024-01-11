import UserSchema from "./UserSchema.js";

//insert new user

export const insertUser = (userobj) => {
  return UserSchema(userobj).save();
};

export const updateUser = (filter, update) => {
  return UserSchema.findOneAndUpdate(filter, update, { new: true });
};
