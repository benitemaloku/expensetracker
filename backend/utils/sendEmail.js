const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `Expense Tracker <no-reply@auth-expensetracker.bmxdev.site>`,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error("Email failed to send");
    }

    console.log("Email sent successfully to:", to);
    return data;

  } catch (err) {
    console.error("Email sending failed:", err.message);
    throw err;
  }
};

module.exports = sendEmail;
