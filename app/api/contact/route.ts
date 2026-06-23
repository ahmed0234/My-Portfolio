import { NextResponse } from "next/server";
import { transporter } from "@/lib/mail";
import { contactSchema } from "@/lib/validations/contact";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Honeypot Validation
    if (body.website) {
      return NextResponse.json(
        {
          success: false,
          message: "Spam detected."
        },
        { status: 400 }
      );
    }

    // 2. Turnstile Verification
    const turnstileToken = body.turnstileToken;
    if (!turnstileToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification failed."
        },
        { status: 400 }
      );
    }

    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${encodeURIComponent(
          process.env.TURNSTILE_SECRET_KEY || ""
        )}&response=${encodeURIComponent(turnstileToken)}`,
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification failed."
        },
        { status: 400 }
      );
    }

    // 3. Zod Input Validation
    const validated = contactSchema.parse(body);

    // 4. Send Email via Nodemailer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_RECEIVER,
      subject: `🚀 New Portfolio Inquiry - ${validated.name}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h1>New Portfolio Inquiry</h1>
          <p><strong>Name:</strong> ${validated.name}</p>
          <p><strong>Email:</strong> ${validated.email}</p>
          <hr />
          <h2>Project Details</h2>
          <p>${validated.projectDetails}</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully."
    });
  } catch (error) {
    console.error("Error in contact API route:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: error.errors[0]?.message || "Invalid input data",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message.",
      },
      {
        status: 500,
      },
    );
  }
}
