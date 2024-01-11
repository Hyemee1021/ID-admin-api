import mongoose, { mongo } from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },

    associate: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const SessionSchema = mongoose.model("Session", sessionSchema);

//functions to run CRUD

export const creatNewSession = (obj) => {
  return SessionSchema(obj).save();
};
export const deleteSession = (filter) => {
  return SessionSchema.findOne(filter);
};
