const nodemailer = require('nodemailer');

// Use environment variables for production-safe configuration
// EMAIL_USER: Gmail address
// EMAIL_PASS: Gmail app password
// EMAIL_FROM (optional): Display "from" address
// ADMIN_EMAIL (optional): Where admin/contact emails are sent

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const emailFrom = process.env.EMAIL_FROM || emailUser;
const adminEmail = process.env.ADMIN_EMAIL || emailUser;

let transporter;

if (emailUser && emailPass) {
  // Gmail SMTP transport
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  // Verify transporter configuration (logs once at startup)
  transporter.verify((error) => {
    if (error) {
      console.error('❌ Email transporter error:', error.message || error);
    } else {
      console.log('✅ Email server is ready to send messages');
    }
  });
} else {
  console.warn('⚠️ EMAIL_USER or EMAIL_PASS not set. Emails will be logged instead of sent.');
  // Fallback transport that just logs emails (useful for local dev without credentials)
  transporter = nodemailer.createTransport({ jsonTransport: true });
}

// Low-level reusable send function
const sendEmail = async ({ to, subject, html, text, replyTo }) => {
  if (!to) {
    throw new Error('Email recipient (to) is required');
  }

  const mailOptions = {
    from: emailFrom || emailUser,
    to,
    subject,
    html,
    text,
    replyTo,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent:', info.messageId || info);
    return { success: true, messageId: info.messageId || null };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

// Contact form email
const sendContactEmail = async ({ name, email, subject, message }) => {
  const safeSubject = subject || 'New Message';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">New Contact Form Submission</h2>
      <div style="margin: 20px 0;">
        <p style="margin: 10px 0;"><strong style="color: #374151;">Name:</strong> ${name}</p>
        <p style="margin: 10px 0;"><strong style="color: #374151;">Email:</strong> <a href="mailto:${email}" style="color: #1e40af;">${email}</a></p>
        <p style="margin: 10px 0;"><strong style="color: #374151;">Subject:</strong> ${safeSubject}</p>
      </div>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Message:</h3>
        <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #6b7280; font-size: 12px;">
        <p>This email was sent from the Premier Products contact form.</p>
        <p>Reply directly to this email to respond to ${name}.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `Contact Form: ${safeSubject}`,
    html,
    replyTo: email,
  });
};

// Order confirmation email to customer
const sendOrderConfirmationEmail = async ({ user, order }) => {
  if (!user?.email) {
    throw new Error('User email is required for order confirmation');
  }

  const itemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${item.productName}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${item.price.toFixed(2)}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${item.subtotal.toFixed(2)}</td>
        </tr>
      `
    )
    .join('');

  const address = order.shippingAddress || {};

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; background-color: #f9fafb;">
      <div style="background-color: #ffffff; border-radius: 8px; padding: 24px; border: 1px solid #e5e7eb;">
        <h1 style="color: #111827; font-size: 22px; margin-bottom: 8px;">Thank you for your order, ${user.username || user.email}!</h1>
        <p style="color: #4b5563; margin-bottom: 16px;">Your order has been received and is now being processed. A summary of your order is below.</p>

        <p style="color: #1f2937; font-weight: 600; margin-bottom: 4px;">Order Number: <span style="font-weight: normal;">${order.orderNumber || order._id}</span></p>
        <p style="color: #6b7280; margin-bottom: 16px;">Placed on ${new Date(order.createdAt || Date.now()).toLocaleString()}</p>

        <h2 style="color: #111827; font-size: 18px; margin: 16px 0 8px;">Order Details</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px 12px; border-bottom: 2px solid #e5e7eb;">Item</th>
              <th style="text-align: center; padding: 8px 12px; border-bottom: 2px solid #e5e7eb;">Qty</th>
              <th style="text-align: right; padding: 8px 12px; border-bottom: 2px solid #e5e7eb;">Price</th>
              <th style="text-align: right; padding: 8px 12px; border-bottom: 2px solid #e5e7eb;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="margin-top: 16px; text-align: right; font-size: 14px;">
          <p style="margin: 4px 0;">Subtotal: <strong>₹${order.subtotal.toFixed(2)}</strong></p>
          <p style="margin: 4px 0;">Tax: <strong>₹${(order.tax || 0).toFixed(2)}</strong></p>
          <p style="margin: 4px 0;">Shipping: <strong>₹${(order.shippingCost || 0).toFixed(2)}</strong></p>
          <p style="margin: 8px 0; font-size: 16px;">Total: <strong>₹${order.total.toFixed(2)} ${order.currency || 'INR'}</strong></p>
        </div>

        <h2 style="color: #111827; font-size: 18px; margin: 24px 0 8px;">Shipping Address</h2>
        <p style="color: #4b5563; white-space: pre-line;">
          ${address.fullName || ''}
          ${address.address ? '<br/>' + address.address : ''}
          ${address.city || ''}${address.state ? ', ' + address.state : ''} ${address.postalCode || ''}
          ${address.country ? '<br/>' + address.country : ''}
          ${address.phone ? '<br/>Phone: ' + address.phone : ''}
        </p>

        <h2 style="color: #111827; font-size: 18px; margin: 24px 0 8px;">Order Notes</h2>
        <p style="color: #4b5563; white-space: pre-wrap;">${order.notes || 'No additional notes provided.'}</p>

        <p style="color: #6b7280; font-size: 12px; margin-top: 24px;">If you have any questions about your order, simply reply to this email and we will be happy to help.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject: `Your Premier Products order ${order.orderNumber || ''}`.trim(),
    html,
  });
};

// Welcome email on signup
const sendWelcomeEmail = async ({ username, email }) => {
  if (!email) {
    throw new Error('User email is required for welcome email');
  }

  const name = username || email;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; background-color: #f9fafb;">
      <div style="background-color: #ffffff; border-radius: 8px; padding: 24px; border: 1px solid #e5e7eb;">
        <h1 style="color: #111827; font-size: 22px; margin-bottom: 8px;">Welcome to Premier Products, ${name}!</h1>
        <p style="color: #4b5563; margin-bottom: 16px;">Thank you for creating an account with us. You can now browse our full catalog of premium brass components and place orders directly from our website.</p>
        <p style="color: #4b5563; margin-bottom: 16px;">If you have any questions or need a custom solution, just reply to this email and our team will be happy to assist.</p>
        <p style="color: #6b7280; font-size: 12px;">This email was sent because an account was created using this address on Premier Products.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Welcome to Premier Products',
    html,
  });
};

// Password reset email (simple temporary password approach)
const sendPasswordResetEmail = async ({ username, email, tempPassword }) => {
  if (!email || !tempPassword) {
    throw new Error('Email and temporary password are required for password reset');
  }

  const name = username || email;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; background-color: #f9fafb;">
      <div style="background-color: #ffffff; border-radius: 8px; padding: 24px; border: 1px solid #e5e7eb;">
        <h1 style="color: #111827; font-size: 22px; margin-bottom: 8px;">Password Reset Request</h1>
        <p style="color: #4b5563; margin-bottom: 16px;">Hi ${name},</p>
        <p style="color: #4b5563; margin-bottom: 16px;">You (or someone else) requested a password reset for your Premier Products account.</p>
        <p style="color: #4b5563; margin-bottom: 16px;">Your temporary password is:</p>
        <p style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 16px;">${tempPassword}</p>
        <p style="color: #4b5563; margin-bottom: 16px;">Please log in using this password and change it immediately from your account settings.</p>
        <p style="color: #6b7280; font-size: 12px;">If you did not request this reset, you can ignore this email.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Your Premier Products password reset',
    html,
  });
};

module.exports = {
  sendEmail,
  sendContactEmail,
  sendOrderConfirmationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
};
