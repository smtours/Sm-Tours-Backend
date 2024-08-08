import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config();



const transporter = nodemailer.createTransport({
  service: 'gmail',
  host:'smtp.gmail.com',
  port:465,
  auth: {
      user:"uzairsmtoursntravels@gmail.com",
      pass:process.env.PASSWORD
  }
});

const registerUser = async (req, res) => {
  try {
    const { username, email, password, photo } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.isActive) {
        return res.status(400).json({ message: "Email is already registered" });
      } else {
        // If the user exists but is inactive, resend the verification email
        const emailtoken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '10m' });
        const verificationUrl = `${process.env.FRONTENDURL}/verify/${emailtoken}`;
        
        await transporter.sendMail({
          from: "uzairsmtoursntravels@gmail.com",
          to: email,
          subject: 'Email Verification',
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta name="x-apple-disable-message-reformatting" />
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <meta name="color-scheme" content="light dark" />
              <meta name="supported-color-schemes" content="light dark" />
              <title></title>
              <style type="text/css" rel="stylesheet" media="all">
              /* Base ------------------------------ */
              
              @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
              body {
                width: 100% !important;
                height: 100%;
                margin: 0;
                -webkit-text-size-adjust: none;
              }
              
              a {
                color: #3869D4;
              }
              
              a img {
                border: none;
              }
              
              td {
                word-break: break-word;
              }
              
              .preheader {
                display: none !important;
                visibility: hidden;
                mso-hide: all;
                font-size: 1px;
                line-height: 1px;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
              }
              /* Type ------------------------------ */
              
              body,
              td,
              th {
                font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
              }
              
              h1 {
                margin-top: 0;
                color: #333333;
                font-size: 22px;
                font-weight: bold;
                text-align: left;
              }
              
              h2 {
                margin-top: 0;
                color: #333333;
                font-size: 16px;
                font-weight: bold;
                text-align: left;
              }
              
              h3 {
                margin-top: 0;
                color: #333333;
                font-size: 14px;
                font-weight: bold;
                text-align: left;
              }
              
              td,
              th {
                font-size: 16px;
              }
              
              p,
              ul,
              ol,
              blockquote {
                margin: .4em 0 1.1875em;
                font-size: 16px;
                line-height: 1.625;
              }
              
              p.sub {
                font-size: 13px;
              }
              /* Utilities ------------------------------ */
              
              .align-right {
                text-align: right;
              }
              
              .align-left {
                text-align: left;
              }
              
              .align-center {
                text-align: center;
              }
              
              .u-margin-bottom-none {
                margin-bottom: 0;
              }
              /* Buttons ------------------------------ */
              
              .button {
                background-color: #3869D4;
                border-top: 10px solid #3869D4;
                border-right: 18px solid #3869D4;
                border-bottom: 10px solid #3869D4;
                border-left: 18px solid #3869D4;
                display: inline-block;
                color: #FFF;
                text-decoration: none;
                border-radius: 3px;
                box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
                -webkit-text-size-adjust: none;
                box-sizing: border-box;
              }
              
              .button--green {
                background-color: #22BC66;
                border-top: 10px solid #22BC66;
                border-right: 18px solid #22BC66;
                border-bottom: 10px solid #22BC66;
                border-left: 18px solid #22BC66;
              }
              
              .button--red {
                background-color: #FF6136;
                border-top: 10px solid #FF6136;
                border-right: 18px solid #FF6136;
                border-bottom: 10px solid #FF6136;
                border-left: 18px solid #FF6136;
              }
              
              @media only screen and (max-width: 500px) {
                .button {
                  width: 100% !important;
                  text-align: center !important;
                }
              }
              /* Attribute list ------------------------------ */
              
              .attributes {
                margin: 0 0 21px;
              }
              
              .attributes_content {
                background-color: #F4F4F7;
                padding: 16px;
              }
              
              .attributes_item {
                padding: 0;
              }
              /* Related Items ------------------------------ */
              
              .related {
                width: 100%;
                margin: 0;
                padding: 25px 0 0 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
              }
              
              .related_item {
                padding: 10px 0;
                color: #CBCCCF;
                font-size: 15px;
                line-height: 18px;
              }
              
              .related_item-title {
                display: block;
                margin: .5em 0 0;
              }
              
              .related_item-thumb {
                display: block;
                padding-bottom: 10px;
              }
              
              .related_heading {
                border-top: 1px solid #CBCCCF;
                text-align: center;
                padding: 25px 0 10px;
              }
              /* Discount Code ------------------------------ */
              
              .discount {
                width: 100%;
                margin: 0;
                padding: 24px;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                background-color: #F4F4F7;
                border: 2px dashed #CBCCCF;
              }
              
              .discount_heading {
                text-align: center;
              }
              
              .discount_body {
                text-align: center;
                font-size: 15px;
              }
              /* Social Icons ------------------------------ */
              
              .social {
                width: auto;
              }
              
              .social td {
                padding: 0;
                width: auto;
              }
              
              .social_icon {
                height: 20px;
                margin: 0 8px 10px 8px;
                padding: 0;
              }
              /* Data table ------------------------------ */
              
              .purchase {
                width: 100%;
                margin: 0;
                padding: 35px 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
              }
              
              .purchase_content {
                width: 100%;
                margin: 0;
                padding: 25px 0 0 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
              }
              
              .purchase_item {
                padding: 10px 0;
                color: #51545E;
                font-size: 15px;
                line-height: 18px;
              }
              
              .purchase_heading {
                padding-bottom: 8px;
                border-bottom: 1px solid #EAEAEC;
              }
              
              .purchase_heading p {
                margin: 0;
                color: #85878E;
                font-size: 12px;
              }
              
              .purchase_footer {
                padding-top: 15px;
                border-top: 1px solid #EAEAEC;
              }
              
              .purchase_total {
                margin: 0;
                text-align: right;
                font-weight: bold;
                color: #333333;
              }
              
              .purchase_total--label {
                padding: 0 15px 0 0;
              }
              
              body {
                background-color: #F2F4F6;
                color: #51545E;
              }
              
              p {
                color: #51545E;
              }
              
              .email-wrapper {
                width: 100%;
                margin: 0;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                background-color: #F2F4F6;
              }
              
              .email-content {
                width: 100%;
                margin: 0;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
              }
              /* Masthead ----------------------- */
              
              .email-masthead {
                padding: 25px 0;
                text-align: center;
              }
              
              .email-masthead_logo {
                width: 94px;
              }
              
              .email-masthead_name {
                font-size: 16px;
                font-weight: bold;
                color: #A8AAAF;
                text-decoration: none;
                text-shadow: 0 1px 0 white;
              }
              /* Body ------------------------------ */
              
              .email-body {
                width: 100%;
                margin: 0;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
              }
              
              .email-body_inner {
                width: 570px;
                margin: 0 auto;
                padding: 0;
                -premailer-width: 570px;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                background-color: #FFFFFF;
              }
              
              .email-footer {
                width: 570px;
                margin: 0 auto;
                padding: 0;
                -premailer-width: 570px;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                text-align: center;
              }
              
              .email-footer p {
                color: #A8AAAF;
              }
              
              .body-action {
                width: 100%;
                margin: 30px auto;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                text-align: center;
              }
              
              .body-sub {
                margin-top: 25px;
                padding-top: 25px;
                border-top: 1px solid #EAEAEC;
              }
              
              .content-cell {
                padding: 45px;
              }
              /*Media Queries ------------------------------ */
              
              @media only screen and (max-width: 600px) {
                .email-body_inner,
                .email-footer {
                  width: 100% !important;
                }
              }
              
              @media (prefers-color-scheme: dark) {
                body,
                .email-body,
                .email-body_inner,
                .email-content,
                .email-wrapper,
                .email-masthead,
                .email-footer {
                  background-color: #333333 !important;
                  color: #FFF !important;
                }
                p,
                ul,
                ol,
                blockquote,
                h1,
                h2,
                h3,
                span,
                .purchase_item {
                  color: #FFF !important;
                }
                .attributes_content,
                .discount {
                  background-color: #222 !important;
                }
                .email-masthead_name {
                  text-shadow: none !important;
                }
              }
              
              :root {
                color-scheme: light dark;
                supported-color-schemes: light dark;
              }
              </style>
              <!--[if mso]>
              <style type="text/css">
                .f-fallback  {
                  font-family: Arial, sans-serif;
                }
              </style>
            <![endif]-->
            </head>
            <body>
              <span class="preheader">Use this link to reset your password. The link is only valid for 24 hours.</span>
              <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
              
                      <!-- Email Body -->
                      <tr>
                        <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                          <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                            <!-- Body content -->
                            <tr>
                              <td class="content-cell">
                                <div class="f-fallback">
                                  <h1>Hi ${newUser.username}</h1>
                                  <p>You recently requested to create your account. Use the button below to confirm your account. <strong>This verification link is only valid for the next 10 minutes.</strong></p>
                                  <!-- Action -->
                                  <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                      <td align="center">
                                        <!-- Border based button
                     https://litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design -->
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                          <tr>
                                            <td align="center">
                                              <a href=${verificationUrl} class="f-fallback button button--green" target="_blank">Confirm Account</a>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                
                                    
                                  <!-- Sub copy -->
                                
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td class="content-cell" align="center">
                                <p class="f-fallback sub align-center">
                                  SM TOURS AND TRAVELS
                                  <br>Sultanpur , Tehsil Havelian District Abbottabad , kpk , Pakistan
                                  <br>+92 3126067717
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>` 
        });
        
        return res.status(200).json({ message: "Verification email resent" });
      }
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user with inactive status and verification token
    const emailtoken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '10m' });

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      photo,
      isActive: false,
      emailtoken
    });

    await newUser.save();

    // Send verification email
    const verificationUrl = `${process.env.FRONTENDURL}/verify/${emailtoken}`;
    await transporter.sendMail({
      from: "uzairsmtoursntravels@gmail.com",
      to: email,
      subject: 'Email Verification',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="x-apple-disable-message-reformatting" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="color-scheme" content="light dark" />
          <meta name="supported-color-schemes" content="light dark" />
          <title></title>
          <style type="text/css" rel="stylesheet" media="all">
          /* Base ------------------------------ */
          
          @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
          body {
            width: 100% !important;
            height: 100%;
            margin: 0;
            -webkit-text-size-adjust: none;
          }
          
          a {
            color: #3869D4;
          }
          
          a img {
            border: none;
          }
          
          td {
            word-break: break-word;
          }
          
          .preheader {
            display: none !important;
            visibility: hidden;
            mso-hide: all;
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
          }
          /* Type ------------------------------ */
          
          body,
          td,
          th {
            font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
          }
          
          h1 {
            margin-top: 0;
            color: #333333;
            font-size: 22px;
            font-weight: bold;
            text-align: left;
          }
          
          h2 {
            margin-top: 0;
            color: #333333;
            font-size: 16px;
            font-weight: bold;
            text-align: left;
          }
          
          h3 {
            margin-top: 0;
            color: #333333;
            font-size: 14px;
            font-weight: bold;
            text-align: left;
          }
          
          td,
          th {
            font-size: 16px;
          }
          
          p,
          ul,
          ol,
          blockquote {
            margin: .4em 0 1.1875em;
            font-size: 16px;
            line-height: 1.625;
          }
          
          p.sub {
            font-size: 13px;
          }
          /* Utilities ------------------------------ */
          
          .align-right {
            text-align: right;
          }
          
          .align-left {
            text-align: left;
          }
          
          .align-center {
            text-align: center;
          }
          
          .u-margin-bottom-none {
            margin-bottom: 0;
          }
          /* Buttons ------------------------------ */
          
          .button {
            background-color: #3869D4;
            border-top: 10px solid #3869D4;
            border-right: 18px solid #3869D4;
            border-bottom: 10px solid #3869D4;
            border-left: 18px solid #3869D4;
            display: inline-block;
            color: #FFF;
            text-decoration: none;
            border-radius: 3px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
            -webkit-text-size-adjust: none;
            box-sizing: border-box;
          }
          
          .button--green {
            background-color: #22BC66;
            border-top: 10px solid #22BC66;
            border-right: 18px solid #22BC66;
            border-bottom: 10px solid #22BC66;
            border-left: 18px solid #22BC66;
          }
          
          .button--red {
            background-color: #FF6136;
            border-top: 10px solid #FF6136;
            border-right: 18px solid #FF6136;
            border-bottom: 10px solid #FF6136;
            border-left: 18px solid #FF6136;
          }
          
          @media only screen and (max-width: 500px) {
            .button {
              width: 100% !important;
              text-align: center !important;
            }
          }
          /* Attribute list ------------------------------ */
          
          .attributes {
            margin: 0 0 21px;
          }
          
          .attributes_content {
            background-color: #F4F4F7;
            padding: 16px;
          }
          
          .attributes_item {
            padding: 0;
          }
          /* Related Items ------------------------------ */
          
          .related {
            width: 100%;
            margin: 0;
            padding: 25px 0 0 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
          }
          
          .related_item {
            padding: 10px 0;
            color: #CBCCCF;
            font-size: 15px;
            line-height: 18px;
          }
          
          .related_item-title {
            display: block;
            margin: .5em 0 0;
          }
          
          .related_item-thumb {
            display: block;
            padding-bottom: 10px;
          }
          
          .related_heading {
            border-top: 1px solid #CBCCCF;
            text-align: center;
            padding: 25px 0 10px;
          }
          /* Discount Code ------------------------------ */
          
          .discount {
            width: 100%;
            margin: 0;
            padding: 24px;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #F4F4F7;
            border: 2px dashed #CBCCCF;
          }
          
          .discount_heading {
            text-align: center;
          }
          
          .discount_body {
            text-align: center;
            font-size: 15px;
          }
          /* Social Icons ------------------------------ */
          
          .social {
            width: auto;
          }
          
          .social td {
            padding: 0;
            width: auto;
          }
          
          .social_icon {
            height: 20px;
            margin: 0 8px 10px 8px;
            padding: 0;
          }
          /* Data table ------------------------------ */
          
          .purchase {
            width: 100%;
            margin: 0;
            padding: 35px 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
          }
          
          .purchase_content {
            width: 100%;
            margin: 0;
            padding: 25px 0 0 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
          }
          
          .purchase_item {
            padding: 10px 0;
            color: #51545E;
            font-size: 15px;
            line-height: 18px;
          }
          
          .purchase_heading {
            padding-bottom: 8px;
            border-bottom: 1px solid #EAEAEC;
          }
          
          .purchase_heading p {
            margin: 0;
            color: #85878E;
            font-size: 12px;
          }
          
          .purchase_footer {
            padding-top: 15px;
            border-top: 1px solid #EAEAEC;
          }
          
          .purchase_total {
            margin: 0;
            text-align: right;
            font-weight: bold;
            color: #333333;
          }
          
          .purchase_total--label {
            padding: 0 15px 0 0;
          }
          
          body {
            background-color: #F2F4F6;
            color: #51545E;
          }
          
          p {
            color: #51545E;
          }
          
          .email-wrapper {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #F2F4F6;
          }
          
          .email-content {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
          }
          /* Masthead ----------------------- */
          
          .email-masthead {
            padding: 25px 0;
            text-align: center;
          }
          
          .email-masthead_logo {
            width: 94px;
          }
          
          .email-masthead_name {
            font-size: 16px;
            font-weight: bold;
            color: #A8AAAF;
            text-decoration: none;
            text-shadow: 0 1px 0 white;
          }
          /* Body ------------------------------ */
          
          .email-body {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
          }
          
          .email-body_inner {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            -premailer-width: 570px;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #FFFFFF;
          }
          
          .email-footer {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            -premailer-width: 570px;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            text-align: center;
          }
          
          .email-footer p {
            color: #A8AAAF;
          }
          
          .body-action {
            width: 100%;
            margin: 30px auto;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            text-align: center;
          }
          
          .body-sub {
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #EAEAEC;
          }
          
          .content-cell {
            padding: 45px;
          }
          /*Media Queries ------------------------------ */
          
          @media only screen and (max-width: 600px) {
            .email-body_inner,
            .email-footer {
              width: 100% !important;
            }
          }
          
          @media (prefers-color-scheme: dark) {
            body,
            .email-body,
            .email-body_inner,
            .email-content,
            .email-wrapper,
            .email-masthead,
            .email-footer {
              background-color: #333333 !important;
              color: #FFF !important;
            }
            p,
            ul,
            ol,
            blockquote,
            h1,
            h2,
            h3,
            span,
            .purchase_item {
              color: #FFF !important;
            }
            .attributes_content,
            .discount {
              background-color: #222 !important;
            }
            .email-masthead_name {
              text-shadow: none !important;
            }
          }
          
          :root {
            color-scheme: light dark;
            supported-color-schemes: light dark;
          }
          </style>
          <!--[if mso]>
          <style type="text/css">
            .f-fallback  {
              font-family: Arial, sans-serif;
            }
          </style>
        <![endif]-->
        </head>
        <body>
          <span class="preheader">Use this link to reset your password. The link is only valid for 24 hours.</span>
          <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
          
                  <!-- Email Body -->
                  <tr>
                    <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                      <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                        <!-- Body content -->
                        <tr>
                          <td class="content-cell">
                            <div class="f-fallback">
                              <h1>Hi ${newUser.username}</h1>
                              <p>You recently requested to create your account. Use the button below to confirm your account. <strong>This verification link is only valid for the next 10 minutes.</strong></p>
                              <!-- Action -->
                              <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td align="center">
                                    <!-- Border based button
                 https://litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                      <tr>
                                        <td align="center">
                                          <a href=${verificationUrl} class="f-fallback button button--green" target="_blank">Confirm Account</a>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            
                                
                              <!-- Sub copy -->
                            
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td class="content-cell" align="center">
                            <p class="f-fallback sub align-center">
                              SM TOURS AND TRAVELS
                              <br>Sultanpur , Tehsil Havelian District Abbottabad , kpk , Pakistan
                              <br>+92 3126067717
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>` 
    });

    return res.status(201).json({ message: "User registered successfully. Please check your email to verify your account." });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const activeuser=await User.findOne({isActive:true})
    if(!activeuser){
      return res.status(401).json({message:"User does not exist"})
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const { password: _, role, ...rest } = user._doc;
    // Generate a JWT token
    // const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '5d' });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    // Set the token as a cookie in the response
    res.cookie("accessToken", token, {
      httpOnly: true,
      expires: token.expiresIn,
    });

    res
      .status(200)
      .json({ message: "Login successful", data: { ...rest }, token, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { tokenlink } = req.params;

    // Verify the token
    jwt.verify(tokenlink, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid or expired verification token." });
      }

      // Find user by email from decoded token
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return res.status(400).json({ message: "Invalid verification token." });
      }

      // Activate the user's account
      user.isActive = true;
      user.emailtoken = undefined;
      await user.save();

      res.status(200).json({ message: "Account verified successfully." });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export { registerUser, loginUser ,verifyUser};
