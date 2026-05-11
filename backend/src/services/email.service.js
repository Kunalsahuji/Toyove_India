import nodemailer from 'nodemailer';
import env from '../config/env.js';
import logger from '../utils/logger.js';

let transporter;

const canSendEmail = () => Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);

const getTransporter = () => {
  if (!canSendEmail()) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }

  return transporter;
};

const currency = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

const buildBaseTemplate = (content, title) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 16px; overflow: hidden; }
        .header { background: #6651A4; padding: 30px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 24px; letter-spacing: 1px; }
        .content { padding: 30px; line-height: 1.6; }
        .card { background: #f9f9f9; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #eee; }
        .footer { background: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #888; }
        .btn { display: inline-block; padding: 12px 24px; background: #F1641E; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px; }
        .item-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .item-table th { text-align: left; border-bottom: 2px solid #6651A4; padding-bottom: 10px; font-size: 13px; text-transform: uppercase; color: #6651A4; }
        .item-table td { padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; }
        .summary-table { width: 100%; margin-top: 15px; }
        .summary-table td { padding: 4px 0; font-size: 14px; }
        .total-row { font-weight: bold; font-size: 18px; color: #6651A4; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Toyovo India</h1>
          <p style="margin: 5px 0 0; opacity: 0.8; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Premium Kids Wear</p>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p><strong>Toyovo India</strong><br/>Email: toyovoindia@gmail.com | Web: toyovo.in</p>
          <p>&copy; 2026 Toyovo India. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
`;

const buildOrderConfirmationHtml = (order, isAdmin = false) => {
  const items = (order.items || [])
    .map((item) => `<tr>
      <td>${item.productName}</td>
      <td style="text-align:center;">${item.quantity}</td>
      <td style="text-align:right;">${currency(item.totalPrice)}</td>
    </tr>`)
    .join('');

  const content = `
    <h2 style="color: #6651A4; margin-top: 0;">${isAdmin ? 'New Order Alert!' : 'Order Confirmed!'}</h2>
    <p>Hello ${isAdmin ? 'Admin' : order.customer.firstName},</p>
    <p>${isAdmin ? `A new order has been placed by ${order.customer.firstName} ${order.customer.lastName}.` : 'Thank you for shopping with Toyovo India. Your order has been received successfully.'}</p>
    
    <div class="card">
      <p style="margin: 0 0 8px;"><strong>Order ID:</strong> #${order.orderNumber}</p>
      <p style="margin: 0 0 8px;"><strong>Date:</strong> ${new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date(order.createdAt))}</p>
      <p style="margin: 0 0 8px;"><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
      <p style="margin: 0;"><strong>Status:</strong> <span style="color: #F1641E; font-weight: bold;">Processing</span></p>
    </div>

    <table class="item-table">
      <thead>
        <tr>
          <th>Item</th>
          <th style="text-align:center;">Qty</th>
          <th style="text-align:right;">Price</th>
        </tr>
      </thead>
      <tbody>${items}</tbody>
    </table>

    <table class="summary-table">
      <tr><td>Subtotal:</td><td style="text-align:right;">${currency(order.subtotal)}</td></tr>
      <tr><td>Shipping:</td><td style="text-align:right;">${currency(order.shippingAmount)}</td></tr>
      ${order.discountAmount > 0 ? `<tr><td style="color: green;">Discount:</td><td style="text-align:right; color: green;">-${currency(order.discountAmount)}</td></tr>` : ''}
      <tr class="total-row"><td>Total Amount:</td><td style="text-align:right;">${currency(order.totalAmount)}</td></tr>
    </table>

    <div class="card" style="background: #fff; border: 1px dashed #6651A4;">
      <p style="margin: 0 0 5px; color: #6651A4; font-weight: bold; text-transform: uppercase; font-size: 11px;">Shipping Address</p>
      <p style="margin: 0; font-size: 13px;">
        ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br/>
        ${order.shippingAddress.address}${order.shippingAddress.apartment ? `, ${order.shippingAddress.apartment}` : ''}<br/>
        ${order.shippingAddress.city === 'Other' ? order.shippingAddress.district : order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.postalCode}
      </p>
    </div>

    ${!isAdmin ? `<div style="text-align: center;"><a href="${env.CLIENT_URL}/account/orders/${order._id}" class="btn">Track My Order</a></div>` : ''}
  `;

  return buildBaseTemplate(content, isAdmin ? 'New Order Alert' : 'Order Confirmation');
};

const buildOrderStatusUpdateHtml = (order, options = {}, isAdmin = false) => {
  const statusColor = order.status === 'cancelled' ? '#E8312A' : order.status === 'delivered' ? '#10b981' : '#6651A4';
  
  const deliveryLine = order.estimatedDeliveryDate
    ? `<p style="margin: 0 0 8px;"><strong>Estimated Delivery:</strong> ${new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date(order.estimatedDeliveryDate))}</p>`
    : '';

  const trackingLine = order.trackingNumber
    ? `<p style="margin: 0 0 8px;"><strong>Tracking Number:</strong> <span style="font-family: monospace; background: #eee; padding: 2px 5px; border-radius: 4px;">${order.trackingNumber}</span></p>`
    : '';

  const reasonLine = options.deliveryDelayReason
    ? `<p style="margin: 0 0 8px; color: #666;"><strong>Update Reason:</strong> ${options.deliveryDelayReason}</p>`
    : '';

  const noteLine = options.note
    ? `<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee; font-style: italic; color: #555;">"${options.note}"</div>`
    : '';

  const content = `
    <h2 style="color: ${statusColor}; margin-top: 0;">Order Status: ${order.status.toUpperCase()}</h2>
    <p>Hello ${isAdmin ? 'Admin' : order.customer.firstName},</p>
    <p>${isAdmin ? `Order #${order.orderNumber} status has been updated to <strong>${order.status}</strong>.` : `The status of your Toyovo India order has been updated.`}</p>
    
    <div class="card">
      <p style="margin: 0 0 8px;"><strong>Order ID:</strong> #${order.orderNumber}</p>
      <p style="margin: 0 0 8px;"><strong>Current Status:</strong> <span style="color: ${statusColor}; font-weight: bold; text-transform: uppercase;">${order.status}</span></p>
      ${deliveryLine}
      ${trackingLine}
      ${reasonLine}
      ${noteLine}
    </div>

    <p style="font-size: 13px; color: #777;">Order Total: ${currency(order.totalAmount)}</p>
    ${!isAdmin ? `<div style="text-align: center;"><a href="${env.CLIENT_URL}/account/orders/${order._id}" class="btn">View Order Details</a></div>` : ''}
  `;

  return buildBaseTemplate(content, 'Order Update');
};

export const sendOrderConfirmationEmail = async (order) => {
  const mailer = getTransporter();
  if (!mailer) {
    logger.warn('Order confirmation email skipped because SMTP is not configured.');
    return { skipped: true };
  }

  const adminEmail = process.env.ADMIN_SEED_EMAIL || 'toyovoindia@gmail.com';

  try {
    // Send to Customer
    await mailer.sendMail({
      from: `"Toyovo India" <${env.SMTP_USER}>`,
      to: order.customer.email,
      subject: `Order Confirmed! ID: #${order.orderNumber}`,
      html: buildOrderConfirmationHtml(order, false),
    });

    // Send to Admin
    await mailer.sendMail({
      from: `"Toyovo India System" <${env.SMTP_USER}>`,
      to: adminEmail,
      subject: `[NEW ORDER] #${order.orderNumber} - ${order.customer.firstName}`,
      html: buildOrderConfirmationHtml(order, true),
    });

    logger.info(`Order confirmation emails sent for ${order.orderNumber} to customer and admin.`);
    return { skipped: false };
  } catch (error) {
    logger.error(`Error sending confirmation email: ${error.message}`);
    throw error;
  }
};

export const sendOrderStatusUpdateEmail = async (order, options = {}) => {
  const mailer = getTransporter();
  if (!mailer) {
    logger.warn('Order update email skipped because SMTP is not configured.');
    return { skipped: true };
  }

  const adminEmail = process.env.ADMIN_SEED_EMAIL || 'toyovoindia@gmail.com';

  try {
    // Send to Customer
    await mailer.sendMail({
      from: `"Toyovo India" <${env.SMTP_USER}>`,
      to: order.customer.email,
      subject: `Update on your Order #${order.orderNumber} - ${order.status.toUpperCase()}`,
      html: buildOrderStatusUpdateHtml(order, options, false),
    });

    // Send to Admin
    await mailer.sendMail({
      from: `"Toyovo India System" <${env.SMTP_USER}>`,
      to: adminEmail,
      subject: `[STATUS UPDATE] Order #${order.orderNumber} is now ${order.status.toUpperCase()}`,
      html: buildOrderStatusUpdateHtml(order, options, true),
    });

    logger.info(`Order update emails sent for ${order.orderNumber} to customer and admin.`);
    return { skipped: false };
  } catch (error) {
    logger.error(`Error sending status update email: ${error.message}`);
    throw error;
  }
};
