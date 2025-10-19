import nodemailer from "nodemailer";

const createTransport = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

const verifyTransport = async (transport) => {
    await transport.verify();
    console.log("Conexión SMTP exitosa");
};

export const sendMail = async (from, to, subject, contentHtml) => {
    try {
        const transport = createTransport();
        await verifyTransport(transport);

        const result = await transport.sendMail({
            from,
            to,
            subject,
            html: contentHtml,
        });

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};