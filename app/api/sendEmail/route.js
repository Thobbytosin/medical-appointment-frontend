import { Resend } from "resend";
import { Email } from "../../../emails";
import { NextResponse } from "next/server";
// import { EmailTemplate } from "../../../emails/index";
import EmailTemplate from "@/emails";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const response = await req.json();
  const result = response.data;

  try {
    const data = await resend.emails.send({
      from: "no-reply@thefalodetobi.com.ng",
      to: [response.data.Email],
      subject: "Appointment Booking Confirmation",
      react: EmailTemplate({ ...result }),
      // react: <EmailTemplate UserName={result.data.UserName}  />,
    });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

// import { Resend } from "resend";
// import { NextResponse } from "next/server";
// import EmailTemplate from "@/emails";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req) {
//   const response = await req.json();
//   const result = response.data;
//   try {
//     const data = await resend.emails.send({
//       from: "Doctor-Appointment-Booking@tubeguruji-app.tubeguruji.com",
//       to: [response.data.Email],
//       subject: "Appointment Booking Confirmation",
//       react: EmailTemplate({ result }),
//     });
//     return NextResponse.json({ data });
//   } catch (error) {
//     return NextResponse.json({ error });
//   }
// }
