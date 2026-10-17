const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendWelcomeEmail = async ({ email, userName }) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Carlify 🏎️🚨" ${process.env.EMAIL_USERNAME}`, // sender address
    to: `${email}`, // list of receivers
    subject: "Welcome to Carlify Community 🙏", // Subject line
    html: `<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7ff;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header with Car Icon -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <div style="background-color: #EBF5FF; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" style="margin: 20px;">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.4 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
            </td>
          </tr>
          
          <!-- Welcome Content -->
          <tr>
            <td style="padding: 0 40px;">
              <h1 style="color: #1F2937; font-size: 28px; font-weight: 700; text-align: center; margin: 0 0 20px;">
                Welcome to Carlify!
              </h1>
              <p style="color: #4B5563; font-size: 16px; line-height: 24px; text-align: center; margin: 0 0 24px;">
                Hi ${userName}, we're thrilled to have you join our community of car enthusiasts and buyers!
              </p>
              
              <!-- Features Grid -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 16px; text-align: center; width: 33%;">
                    <div style="color: #3B82F6; font-size: 24px; margin-bottom: 8px;">🔍</div>
                    <div style="color: #1F2937; font-weight: 600; margin-bottom: 4px;">Search Cars</div>
                    <div style="color: #6B7280; font-size: 14px;">Find your perfect match</div>
                  </td>
                  <td style="padding: 16px; text-align: center; width: 33%;">
                    <div style="color: #3B82F6; font-size: 24px; margin-bottom: 8px;">💰</div>
                    <div style="color: #1F2937; font-weight: 600; margin-bottom: 4px;">Best Deals</div>
                    <div style="color: #6B7280; font-size: 14px;">Compare prices easily</div>
                  </td>
                  <td style="padding: 16px; text-align: center; width: 33%;">
                    <div style="color: #3B82F6; font-size: 24px; margin-bottom: 8px;">✨</div>
                    <div style="color: #1F2937; font-weight: 600; margin-bottom: 4px;">Verified Sellers</div>
                    <div style="color: #6B7280; font-size: 14px;">Safe transactions</div>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                <tr>
                  <td align="center">
                    <a href="https://carlify-by-malviyarohitttt.vercel.app/" style="display: inline-block; background-color: #3B82F6; color: white; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: 600; transition: background-color 0.2s;">
                      Start Exploring
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Help Section -->
              <p style="color: #6B7280; font-size: 14px; line-height: 20px; text-align: center; margin: 0 0 24px;">
                Need help getting started? Check out our <a href="#" style="color: #3B82F6; text-decoration: none;">quick start guide</a> or contact our support team at <a href="mailto:support@carlify.com" style="color: #3B82F6; text-decoration: none;">support@carlify.com</a>
              </p>
            </td>
          </tr>
          
          <!-- Social Links -->
          <tr>
            <td style="padding: 0 40px 24px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="#" style="display: inline-block; margin: 0 8px; color: #6B7280; text-decoration: none;">
                      <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/facebook.svg" alt="Facebook" style="width: 24px; height: 24px;">
                    </a>
                    <a href="#" style="display: inline-block; margin: 0 8px; color: #6B7280; text-decoration: none;">

                      <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/instagram.svg" alt="Instagram" style="width: 24px; height: 24px;">
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px 40px; text-align: center; border-top: 1px solid #E5E7EB;">
              <p style="color: #9CA3AF; font-size: 14px; margin: 0 0 8px;">
                &copy; ${new Date().getFullYear()} Carlify. All rights reserved.
              </p>
              <p style="color: #9CA3AF; font-size: 12px; margin: 0;">
                You received this email because you signed up for Carlify. If you didn't sign up, you can safely ignore this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
`, // html body
  });
};

const sendOTP = async ({ userName, email, otp }) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Carlify 🏎️🚨" ${process.env.EMAIL_USERNAME}`, // sender address
    to: `${email}`, // list of receivers
    subject: "Verify You Email", // Subject line
    html: `<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7ff;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <div style="background-color: #EBF5FF; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" style="margin: 14px;">
                  <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2" />
                  <path d="M22 6v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6" />
                  <path d="m2 6 10 7 10-7" />
                </svg>
              </div>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px;">
              <h1 style="color: #1F2937; font-size: 24px; font-weight: 700; text-align: center; margin: 0 0 16px;">
                Verify your email
              </h1>
              <p style="color: #6B7280; font-size: 16px; line-height: 24px; text-align: center; margin: 0 0 24px;">
                Hi ${userName}, please use the verification code below to complete your email verification.
              </p>
              <div style="background-color: #F3F4F6; border-radius: 8px; padding: 24px; margin-bottom: 24px; text-align: center;">
                <div style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #1F2937;">
                  ${otp}
                </div>
              </div>
              <p style="color: #6B7280; font-size: 14px; line-height: 20px; text-align: center; margin: 0 0 24px;">
                This code will expire in 5 minutes. If you didn't request this code, you can safely ignore this email.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px 40px; text-align: center; border-top: 1px solid #E5E7EB;">
              <p style="color: #9CA3AF; font-size: 14px; margin: 0;">
                &copy; ${new Date().getFullYear()} Carlify. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>`, // html body
  });
};

module.exports = { sendWelcomeEmail, sendOTP };
