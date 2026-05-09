import nodemailer from 'nodemailer';
import env from '../config/env.js';
import logger from '../utils/logger.js';

let transporter;

const canSendEmail = () => Boolean(env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_PASS && env.SMTP_FROM);

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

const currency = (amount) => `Rs ${Number(amount || 0).toFixed(2)}`;

const buildOrderConfirmationHtml = (order) => {
  const items = (order.items || [])
    .map((item) => `<tr>
      <td style="padding:8px 0;border-bottom:1px solid #eee;">${item.productName}</td>
      <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
      <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">${currency(item.totalPrice)}</td>
    </tr>`)
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;color:#222;max-width:640px;margin:0 auto;">
      <h2 style="margin-bottom:8px;">Order Confirmed</h2>
      <p>Hello ${order.customer.firstName},</p>
      <p>Thank you for shopping with Toyovo India. Your order has been received successfully.</p>
      <div style="background:#f7f7f7;padding:16px;border-radius:12px;margin:20px 0;">
        <p style="margin:0 0 6px;"><strong>Order Number:</strong> ${order.orderNumber}</p>
        <p style="margin:0 0 6px;"><strong>Payment Status:</strong> ${order.paymentStatus}</p>
        <p style="margin:0;"><strong>Total Paid:</strong> ${currency(order.totalAmount)}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <thead>
          <tr>
            <th style="text-align:left;padding-bottom:10px;border-bottom:2px solid #ddd;">Item</th>
            <th style="text-align:center;padding-bottom:10px;border-bottom:2px solid #ddd;">Qty</th>
            <th style="text-align:right;padding-bottom:10px;border-bottom:2px solid #ddd;">Total</th>
          </tr>
        </thead>
        <tbody>${items}</tbody>
      </table>
      <p><strong>Shipping Address:</strong><br/>
      ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br/>
      ${order.shippingAddress.address}${order.shippingAddress.apartment ? `, ${order.shippingAddress.apartment}` : ''}<br/>
      ${order.shippingAddress.city === 'Other' ? order.shippingAddress.district : order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}</p>
      <p style="margin-top:24px;">We will notify you once your order is packed and shipped.</p>
    </div>
  `;
};

const buildOrderStatusUpdateHtml = (order, options = {}) => {
  const deliveryLine = order.estimatedDeliveryDate
    ? `<p style="margin:0 0 6px;"><strong>Estimated Delivery:</strong> ${new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(order.estimatedDeliveryDate))}</p>`
    : '';

  const trackingLine = order.trackingNumber
    ? `<p style="margin:0 0 6px;"><strong>Tracking Number:</strong> ${order.trackingNumber}</p>`
    : '';

  const reasonLine = options.deliveryDelayReason
    ? `<p style="margin:0 0 6px;"><strong>Update Reason:</strong> ${options.deliveryDelayReason}</p>`
    : '';

  const noteLine = options.note
    ? `<p style="margin:0;"><strong>Admin Note:</strong> ${options.note}</p>`
    : '<p style="margin:0;"><strong>Current Status:</strong> ' + order.status + '</p>';

  return `
    <div style="font-family:Arial,sans-serif;color:#222;max-width:640px;margin:0 auto;">
      <h2 style="margin-bottom:8px;">Order Update</h2>
      <p>Hello ${order.customer.firstName},</p>
      <p>Your Toyovo India order has been updated.</p>
      <div style="background:#f7f7f7;padding:16px;border-radius:12px;margin:20px 0;">
        <p style="margin:0 0 6px;"><strong>Order Number:</strong> ${order.orderNumber}</p>
        ${deliveryLine}
        ${trackingLine}
        ${reasonLine}
        ${noteLine}
      </div>
      <p>Please keep this email for your reference.</p>
    </div>
  `;
};

export const sendOrderConfirmationEmail = async (order) => {
  const mailer = getTransporter();
  if (!mailer) {
    logger.warn('Order confirmation email skipped because SMTP is not configured.');
    return { skipped: true };
  }

  await mailer.sendMail({
    from: env.SMTP_FROM,
    to: order.customer.email,
    subject: `Order Confirmed - ${order.orderNumber}`,
    html: buildOrderConfirmationHtml(order),
  });

  logger.info(`Order confirmation email sent for ${order.orderNumber}`);
  return { skipped: false };
};

export const sendOrderStatusUpdateEmail = async (order, options = {}) => {
  const mailer = getTransporter();
  if (!mailer) {
    logger.warn('Order update email skipped because SMTP is not configured.');
    return { skipped: true };
  }

  await mailer.sendMail({
    from: env.SMTP_FROM,
    to: order.customer.email,
    subject: `Order Update - ${order.orderNumber}`,
    html: buildOrderStatusUpdateHtml(order, options),
  });

  logger.info(`Order update email sent for ${order.orderNumber}`);
  return { skipped: false };
};
