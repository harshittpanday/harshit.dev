import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is missing.");

            return NextResponse.json(
                { error: "Email service is not configured." },
                { status: 500 }
            );
        }

        const { error } = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL!,
            replyTo: email,
            subject: `New portfolio message from ${name}`,
            text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
        });

        if (error) {
            console.error("Resend error:", error);

            return NextResponse.json(
                { error: "Failed to send message." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact API error:", error);

        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}