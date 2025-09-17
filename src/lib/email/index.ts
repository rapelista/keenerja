import FormData from 'form-data'; // form-data v4.0.1
import Mailgun from 'mailgun.js'; // mailgun.js v11.1.0

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const mailgunUsername = process.env.MAILGUN_USERNAME!;
  const mailgunSecret = process.env.MAILGUN_SECRET!;

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: mailgunUsername,
    key: mailgunSecret,
  });

  try {
    const data = await mg.messages.create('gvstang.com', {
      from: `Mailgun Sandbox <${mailgunUsername}>`,
      to: [to],
      subject,
      text,
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}
