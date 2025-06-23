import nodemailer from "nodemailer";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

interface EmailPayload {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailPayload) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        const tokenExpiry = Date.now() + 3600000; // 1 hour

        // Update user with appropriate token and expiry
        const updateData =
            emailType === "VERIFY"
                ? { verifyToken: hashedToken, verifyTokenExpiry: tokenExpiry }
                : { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: tokenExpiry };

        await User.findByIdAndUpdate(userId, updateData);

        // Setup transporter
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });

        // Construct link and subject
        const tokenPath = emailType === "VERIFY" ? "verifyemail" : "reset";
        const link = `${process.env.DOMAIN}/${tokenPath}?token=${hashedToken}`;
        const subject = emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password";

        // Email content
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject,
            html: `
        <p>
            Click <a href="${link}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
        </p>
        <p>
            Or copy and paste this link into your browser:<br/>
            ${link}
        </p>
        `,
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        if (!mailResponse.accepted.length) {
            console.error("Email not accepted:", mailResponse.rejected);
            throw new Error("Email was not accepted by the server.");
        }

        console.log("Email sent:", mailResponse.response);
        return mailResponse;
    } catch (error: any) {
        console.error("Error in sendEmail:", error.message || error);
        throw new Error("Failed to send email. Please try again.");
    }
};
