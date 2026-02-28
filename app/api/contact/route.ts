import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: 'All fields required' }, { status: 400 });
        }

        await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'atharva3895@gmail.com',
            subject: `Portfolio Contact: ${subject}`,
            html: `
        <div style="font-family: monospace; background: #0D0D0D; color: #F5F5F5; padding: 24px; border-radius: 8px; border: 1px solid #FF6B35;">
          <h2 style="color: #FF6B35; margin-top: 0;">New message from ${name}</h2>
          <p><strong style="color: #FF6B35;">Email:</strong> ${email}</p>
          <p><strong style="color: #FF6B35;">Subject:</strong> ${subject}</p>
          <p><strong style="color: #FF6B35;">Message:</strong></p>
          <div style="background: #1A1A1A; padding: 12px; border-radius: 4px; border-left: 3px solid #FF6B35;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 16px;">Sent from atharva-soundankar.vercel.app</p>
        </div>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[Contact API]', err);
        return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
    }
}
