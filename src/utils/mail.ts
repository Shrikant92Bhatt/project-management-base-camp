import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const emailVerificationMailgenContent = (
    username: string,
    verificationUrl: string,
) => {
    return {
        body: {
            name: username,
            intro: 'Welcome to Project Camp! Please verify your email to continue.',
            action: {
                instructions:
                    'To verify your email, please click the button below:',
                button: {
                    color: '#1aae5aff',
                    text: 'Verify your email',
                    link: verificationUrl,
                },
            },
            outro: 'If you need help, or have any questions? just reply to this email and we will be happy to help you.',
        },
    };
};

const forgotPasswordMailgenContent = (
    username: string,
    resetPasswordUrl: string,
) => {
    return {
        body: {
            name: username,
            intro: 'Welcome to Project Camp! Please reset your password to continue.',
            action: {
                instructions:
                    'To reset your password, please click the button below:',
                button: {
                    color: '#1aae5aff',
                    text: 'Reset your password',
                    link: resetPasswordUrl,
                },
            },
            outro: 'If you need help, or have any questions? just reply to this email and we will be happy to help you.',
        },
    };
};

const sendEmail = async (options: any) => {
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Task Management System',
            link: 'https://taskmanagement.com',
        },
    });

    const emailTextual = mailGenerator.generatePlaintext(
        options.mailgenContent,
    );
    const emailHtml = mailGenerator.generate(options.mailgenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST!,
        port: process.env.MAILTRAP_SMTP_PORT!,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER!,
            pass: process.env.MAILTRAP_SMTP_PASS!,
        },
    } as any);

    const mail = {
        from: 'mail.taskmanagement@example.com',
        to: options.email,
        subject: options.subject,
        html: emailHtml,
        text: emailTextual,
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error(error);
    }
};

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail,
};
