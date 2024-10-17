import nodemailer, { Transporter } from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
export const sendEmail = async({email,emailType,userId}: any) =>{
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(),10);

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken: hashedToken,verifyTokenExpiry: Date.now() + 3600000
        })
        
    }else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{forgetPasswordToken : hashedToken,forgetPasswordTokenExpiry:Date.now()+ 3600000})
        }
    
            // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport:Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "0", 10),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from : 'er.adnan16@gmail.com',
    to: email,
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
    or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </p>`
  }

  const mailresponse = await transport.sendMail(mailOptions);
  return mailresponse;
      

    } catch (error : any) {
        throw new Error(error.message);
    }
}