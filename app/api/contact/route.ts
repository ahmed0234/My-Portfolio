import { NextResponse } from "next/server";
import { transporter } from "@/lib/mail";
import { contactSchema } from "@/lib/validations/contact";
import { z } from "zod";

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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
    const escapedName = escapeHtml(validated.name);
    const escapedEmail = escapeHtml(validated.email);
    const escapedProjectDetails = escapeHtml(validated.projectDetails);

    await transporter.sendMail({
      from: {
        name: validated.name,
        address: process.env.EMAIL_USER || "",
      },
      replyTo: validated.email,
      to: process.env.CONTACT_RECEIVER,
      subject: `🚀 New Portfolio Inquiry - ${validated.name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa; padding: 40px 20px; color: #111111; line-height: 1.6;">
          <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 40px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);">
            
            <!-- Header -->
            <div style="margin-bottom: 28px;">
              <h2 style="font-size: 18px; font-weight: 700; color: #000000; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.05em;">New Inquiry</h2>
              <p style="font-size: 14px; color: #737373; margin: 0;">You have received a new submission from your portfolio contact form.</p>
            </div>
            
            <!-- Divider -->
            <div style="height: 1px; background-color: #e5e5e5; margin-bottom: 28px;"></div>
            
            <!-- Details Section -->
            <div style="margin-bottom: 28px;">
              
              <!-- Sender Info -->
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 0 0 16px 0; width: 45%; vertical-align: top;">
                    <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #737373; display: block; margin-bottom: 4px;">From</span>
                    <span style="font-size: 14px; color: #000000; font-weight: 600;">${escapedName}</span>
                  </td>
                  <td style="padding: 0 0 16px 0; width: 55%; vertical-align: top;">
                    <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #737373; display: block; margin-bottom: 4px;">Email Address</span>
                    <span style="font-size: 14px; color: #000000;"><a href="mailto:${escapedEmail}" style="color: #000000; text-decoration: underline;">${escapedEmail}</a></span>
                  </td>
                </tr>
              </table>
              
              <!-- Project Details -->
              <div style="margin-bottom: 28px;">
                <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #737373; display: block; margin-bottom: 8px;">Message / Project Details</span>
                <div style="font-size: 14px; line-height: 1.6; color: #171717; background-color: #f9f9f9; border-left: 2px solid #000000; padding: 18px 24px; white-space: pre-wrap; font-style: italic;">${escapedProjectDetails}</div>
              </div>
              
            </div>
            
            <!-- Divider -->
            <div style="height: 1px; background-color: #e5e5e5; margin-bottom: 28px;"></div>
            
            <!-- Reply Button -->
            <div style="text-align: center;">
              <a href="mailto:${escapedEmail}?subject=${encodeURIComponent(`Re: Portfolio Inquiry - ${validated.name}`)}" 
                 style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 4px; letter-spacing: 0.05em; text-transform: uppercase;">
                Reply to Inquiry
              </a>
            </div>
            
          </div>
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
