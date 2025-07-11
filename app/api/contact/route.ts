import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, company, interest, budget, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Admin notification email
    const adminMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Grentech Contact Form</p>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #1e293b; margin-top: 0;">Contact Information</h2>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #475569;">Name:</strong>
                <span style="margin-left: 10px;">${firstName} ${lastName}</span>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #475569;">Email:</strong>
                <span style="margin-left: 10px;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></span>
              </div>
              
              ${
                company
                  ? `
                <div style="margin-bottom: 20px;">
                  <strong style="color: #475569;">Company:</strong>
                  <span style="margin-left: 10px;">${company}</span>
                </div>
              `
                  : ""
              }
              
              ${
                interest
                  ? `
                <div style="margin-bottom: 20px;">
                  <strong style="color: #475569;">Interest:</strong>
                  <span style="margin-left: 10px;">${interest}</span>
                </div>
              `
                  : ""
              }
              
              ${
                budget
                  ? `
                <div style="margin-bottom: 20px;">
                  <strong style="color: #475569;">Budget:</strong>
                  <span style="margin-left: 10px;">${budget}</span>
                </div>
              `
                  : ""
              }
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #475569;">Message:</strong>
                <div style="margin-top: 10px; padding: 15px; background: #f1f5f9; border-radius: 5px; border-left: 4px solid #3b82f6;">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="color: #64748b; font-size: 14px; margin: 0;">
                  Submitted on: ${new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div style="padding: 20px; text-align: center; background: #1e293b; color: white;">
            <p style="margin: 0; font-size: 14px;">
              This email was sent from the Grentech contact form
            </p>
          </div>
        </div>
      `,
    }

    // Client confirmation email
    const clientMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Thank you for contacting Grentech - We'll be in touch soon!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 40px; text-align: center;">
            <div style="background: rgba(255,255,255,0.1); width: 80px; height: 80px; border-radius: 20px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 36px; font-weight: bold;">G</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 32px;">Thank You, ${firstName}!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 18px;">We've received your message and will respond within 2 hours</p>
          </div>
          
          <div style="padding: 40px; background: #f8fafc;">
            <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              <h2 style="color: #1e293b; margin-top: 0; font-size: 24px;">What happens next?</h2>
              
              <div style="margin: 30px 0;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 25px;">
                  <div style="background: #3b82f6; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</div>
                  <div>
                    <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 18px;">Review & Analysis</h3>
                    <p style="margin: 0; color: #64748b; line-height: 1.6;">Our technical team will review your requirements and prepare a tailored solution approach.</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: flex-start; margin-bottom: 25px;">
                  <div style="background: #8b5cf6; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</div>
                  <div>
                    <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 18px;">Personal Consultation</h3>
                    <p style="margin: 0; color: #64748b; line-height: 1.6;">We'll schedule a call to discuss your project in detail and answer any questions.</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: flex-start;">
                  <div style="background: #10b981; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">3</div>
                  <div>
                    <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 18px;">Proposal & Timeline</h3>
                    <p style="margin: 0; color: #64748b; line-height: 1.6;">Receive a detailed proposal with timeline, milestones, and next steps.</p>
                  </div>
                </div>
              </div>
              
              <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 25px; border-radius: 10px; border-left: 4px solid #3b82f6; margin: 30px 0;">
                <h3 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px;">Your Submission Summary:</h3>
                <div style="color: #475569; line-height: 1.8;">
                  <strong>Name:</strong> ${firstName} ${lastName}<br>
                  <strong>Email:</strong> ${email}<br>
                  ${company ? `<strong>Company:</strong> ${company}<br>` : ""}
                  ${interest ? `<strong>Interest:</strong> ${interest}<br>` : ""}
                  ${budget ? `<strong>Budget:</strong> ${budget}<br>` : ""}
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:hello@grentech.com" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Reply to this Email
                </a>
              </div>
            </div>
          </div>
          
          <div style="padding: 30px; text-align: center; background: #1e293b; color: white;">
            <h3 style="margin: 0 0 15px 0; font-size: 20px;">Need immediate assistance?</h3>
            <p style="margin: 0 0 20px 0; color: rgba(255,255,255,0.8);">
              📧 hello@grentech.com | 📞 +1 (555) 123-4567
            </p>
            <div style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 20px; margin-top: 20px;">
              <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.6);">
                © 2024 Grentech. Building tomorrow's technology today.
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
Hi ${firstName},

Thank you for contacting Grentech! We've received your message and will respond within 2 hours.

What happens next:
1. Review & Analysis - Our technical team will review your requirements
2. Personal Consultation - We'll schedule a call to discuss your project
3. Proposal & Timeline - You'll receive a detailed proposal

Your submission summary:
Name: ${firstName} ${lastName}
Email: ${email}
${company ? `Company: ${company}` : ""}
${interest ? `Interest: ${interest}` : ""}
${budget ? `Budget: ${budget}` : ""}

Need immediate assistance?
Email: hello@grentech.com
Phone: +1 (555) 123-4567

Best regards,
The Grentech Team
      `,
    }

    // Send both emails
    await Promise.all([transporter.sendMail(adminMailOptions), transporter.sendMail(clientMailOptions)])

    return NextResponse.json(
      {
        message: "Emails sent successfully",
        details: "Confirmation sent to client and notification sent to admin",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
