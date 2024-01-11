import express from "express";
import { insertUser, updateUser } from "../modules/user/UserModule.js";
import { hashPassword } from "../utils/bcrypt.js";
import { newAdminValidation } from "../middlewares/joiValidation.js";
import { responder } from "../middlewares/response.js";
import { v4 as uuidv4 } from "uuid";
import {
  creatNewSession,
  deleteSession,
} from "../modules/session/SessionSchema.js";
import {
  sendEmailValificationLinkEmail,
  sendEmailVerifiedNotificationEmail,
} from "../utils/nodemailer.js";

let router = express.Router();

router.post("/", newAdminValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    //encrpt
    req.body.password = hashPassword(password);

    const user = await insertUser(req.body);

    if (user?._id) {
      //creating a random string
      const c = uuidv4(); // this must be stored in db

      //session table- i will store email, code= token
      //token and associte are only for verifyinh user
      const token = await creatNewSession({ token: c, associate: user.email });

      if (token?._id) {
        //after creating user->send verifying email
        const url = `${process.env.CLINT_ROOT_DOMAIN}/verify-email?e=${user.email}&c=${c}`;
        console.log(url);

        //send new email
        sendEmailValificationLinkEmail({
          email: user.email,
          url,
          fName: user.fName,
        });
      }
    }

    user?._id
      ? responder.SUCCESS({
          res,
          message: "Check your email for validation",
        })
      : responder.ERROR({
          res,
          errorCode: 200, // in pream;s code is 200
          message: "failed to create user",
        });
  } catch (error) {
    if (error.message.includes("E11000")) {
      error.errorCode = 200;

      error.message = "There is already an user with the email";
    }
    next(error);
  }
});

////====================
router.post("/verify-email", async (req, res, next) => {
  try {
    const { associate, token } = req.body;

    if (associate && token) {
      //deldete from seesion-success- user varify-change to active
      const session = await deleteSession({ token, associate });

      if (session?._id) {
        //update user to active

        //filter-email
        //thing to change
        const user = await updateUser(
          { email: associate },
          { status: "active" }
        );

        if (user?._id) {
          //send email
          sendEmailVerifiedNotificationEmail({
            email: associate,
            fName: user.fName,
          });

          return responder.SUCCESS({
            res,
            message: "Tour email is verified, lohin now",
          });
        }
      }
    }
    responder.ERROR({
      res,
      message: "Invalid, or expired link",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
