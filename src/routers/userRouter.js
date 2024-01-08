import express from "express";
import { insertUser } from "../modules/user/UserModule.js";
let router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const user = await insertUser(req.body);

    user?._id
      ? res.json({
          status: "success",
          message: "The user has been created",
        })
      : res.json({
          status: "error",
          message: "failed to create user",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
