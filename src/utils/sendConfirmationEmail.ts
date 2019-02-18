import * as SparkPost from "sparkpost";

const client = new SparkPost(process.env.SPARKPOST_API_KEY);

export const sendConfirmationEmail = async (recipient: string, url: string) => {
    const response = await client.transmissions.send({
        options: {
            sandbox: true
        },
        content: {
            from: "testing@sparkpostbox.com",
            subject: "Confirm Email",
            html: `<html>
        <body>
        <p>Testing email confirmation with SparkPost</p>
        <a href="${url}">confirm email</a>
        </body>
        </html>`
        },
        recipients: [{address: recipient}]
    });
    console.log(response);
};
