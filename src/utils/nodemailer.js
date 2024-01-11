import nodemailer from "nodemailer";
//1smtp configuration
//2email body

//3send email

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const emailSender = async (obj) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail(obj);
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

export const sendEmailValificationLinkEmail = ({ email, fName, url }) => {
  const body = {
    from: `"International Drinks 👻" <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: `Valify your account ✔`, // Subject line
    text: `Hello, ${fName} from International Drinks`, // plain text body
    html: `
    
    
  <p>Hello ${fName}</p>
  <br />
  <br />
  <p>Thank you for creating an account,click the button below.</p>
  <p>
    <a href="${url}">
      <button style="background:blue; padding:1rem 2rem; color:white; font-weight:bold;">
      Verify</button>
    </a>
  </p>
  <br />
  <br />

  ---------------------------
  <p>
    Regards,
    <br/>
International Drink
  </p>

    
    
    
    `, // html body
  };
  emailSender(body);
};

export const sendEmailVerifiedNotificationEmail = ({ email, fName }) => {
  const body = {
    from: `"International Drinks 👻" <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: `Your email has been verified ✔`, // Subject line
    text: `Greeting 👻, ${fName} from International Drinks`, // plain text body
    html: `
    
    
  <p>Hello ${fName}</p>
  <br />
  <br />
  <p>Your email has been verified, login now</p>
 
  <p>
  <a href=``>
    <button style="background:blue; padding:1rem 2rem; color:white; font-weight:bold;">
    logIn</button>
  </a>
</p>
  <br />
  <br />

  ---------------------------
  <p>
    Regards,
    <br/>
International Drink
  </p>

    
    
    
    `, // html body
  };
  emailSender(body);
};
