import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'
import User from '@/models/models';
import { NextResponse } from 'next/server';

export async function sendEmail({email, emailType, userId}) {
    try {
       
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000
                    }
                }
            )
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        resetPasswordToken: hashedToken, resetPasswordTokenExpiry: Date.now() + 3600000
                    }
                }
            )
        }

   console.log(process.env.MAILTRAP_HOST)
   console.log(process.env.MAILTRAP_PASS)
        var transport = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        const mailoptions = {
            from: "expense@gmail.com",
            to: email,
            subject: emailType == 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "changePassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "changePassword"}?token=${hashedToken}
            </p>`, // HTML body
        }

      
        const mailResponse = await transport.sendMail(mailoptions)
        console.log(mailResponse)
        return mailResponse
    }
    catch (error) {
        return NextResponse.json(error.message)
    }
}