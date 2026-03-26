const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendBookingNotification = async (booking) => {
  const transporter = createTransporter();
  const serviceLabels = {
    'video-editing': 'Video Editing',
    'event-videography': 'Event Videography',
    'photography': 'Photography',
    'other': 'Other',
  };

  // Notify admin
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `📅 New Booking Request from ${booking.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">New Booking Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.phone || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${serviceLabels[booking.service]}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.date ? new Date(booking.date).toDateString() : 'Not specified'}</td></tr>
          <tr><td style="padding: 8px;"><strong>Message:</strong></td><td style="padding: 8px;">${booking.message || 'N/A'}</td></tr>
        </table>
      </div>
    `,
  });

  // Auto-reply to client
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: booking.email,
    subject: `Thanks for your booking request, ${booking.name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 8px;">
        <h2 style="color: #c8a96e;">Hey ${booking.name},</h2>
        <p>Thanks for reaching out! I've received your booking request for <strong>${serviceLabels[booking.service]}</strong>.</p>
        <p>I'll review your request and get back to you within <strong>24–48 hours</strong> to confirm availability and discuss the details.</p>
        <p style="margin-top: 30px; color: #aaa;">Can't wait to work on your project,<br/><strong style="color: #c8a96e;">Jefte</strong></p>
      </div>
    `,
  });
};

const sendQuoteNotification = async (quote) => {
  const transporter = createTransporter();

  // Notify admin
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `💰 New Quote Request from ${quote.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Quote Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td>${quote.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td>${quote.email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Project Type:</strong></td><td>${quote.projectType}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Budget:</strong></td><td>${quote.budgetRange || 'Not specified'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Deadline:</strong></td><td>${quote.deadline ? new Date(quote.deadline).toDateString() : 'Flexible'}</td></tr>
          <tr><td style="padding: 8px;"><strong>Description:</strong></td><td>${quote.description}</td></tr>
        </table>
      </div>
    `,
  });

  // Auto-reply to client
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: quote.email,
    subject: `Quote Request Received — Jefte`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 8px;">
        <h2 style="color: #c8a96e;">Hey ${quote.name},</h2>
        <p>Your quote request has been received. I'll put together a detailed proposal for your <strong>${quote.projectType}</strong> project.</p>
        <p>Expect a response within <strong>48 hours</strong>.</p>
        <p style="margin-top: 30px; color: #aaa;">Talk soon,<br/><strong style="color: #c8a96e;">Jefte</strong></p>
      </div>
    `,
  });
};

const sendContactNotification = async (contact) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `✉️ New Message from ${contact.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${contact.name} (${contact.email})</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f5f5f5; padding: 16px; border-radius: 4px;">${contact.message}</p>
      </div>
    `,
  });
};

module.exports = { sendBookingNotification, sendQuoteNotification, sendContactNotification };
