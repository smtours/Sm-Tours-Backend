import nodemailer from "nodemailer"
import User from "../models/User.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const sendmail = async (req, res) => {
    const { email, subject, message} = req.body;
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host:'smtp.gmail.com',
            port:465,
            auth: {
                user:"uzairsmtoursntravels@gmail.com",
                pass:process.env.PASSWORD
            }
          });
          await transporter.sendMail({
            from:email,
            to:"uzairsmtoursntravels@gmail.com",
            subject: subject,
            text:message

        })
        res.status(201).json({message:"Email has been send"})
    } catch (error) {
        res.status(401).json({message:error.message})
        
    }
};

export { sendmail };
