import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config()

const EMAIL = process.env.EMAIL
const SECRET_CODE = process.env.SECRET_CODE

export const emailAdapter = {
    async sendMessage(email: string,  subject: string, message: string){
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL,
                pass: SECRET_CODE
            },
        });

        await transporter.sendMail({
            from: 'From Margo 👻 <margo.incubator@gmail.com>', // от кого
            to: email, // кому будет отправлено
            subject: subject, // описание темы
            html: message, // сообщение
        });
    }
}