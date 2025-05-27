
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationEmailRequest {
  type: 'part_request' | 'contact_form' | 'low_stock' | 'admin_login';
  customerName?: string;
  customerEmail?: string;
  subject?: string;
  message?: string;
  productName?: string;
  imageUrl?: string;
  metadata?: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      type, 
      customerName, 
      customerEmail, 
      subject, 
      message, 
      productName, 
      imageUrl,
      metadata 
    }: NotificationEmailRequest = await req.json();

    console.log('Processing notification email for:', type, customerName);

    let emailSubject = '';
    let emailHtml = '';

    switch (type) {
      case 'part_request':
        emailSubject = `🔧 URGENT: New Part Request from ${customerName}`;
        emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🔧 New Part Request</h1>
              <p style="color: #bfdbfe; margin: 10px 0 0 0;">Wings Engineering Services</p>
            </div>
            
            <div style="padding: 30px; background: #f8fafc;">
              <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #1e40af; margin-top: 0;">Customer Information</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td style="padding: 8px 0;">${customerName}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${customerEmail}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Subject:</td><td style="padding: 8px 0;">${subject}</td></tr>
                  ${productName ? `<tr><td style="padding: 8px 0; font-weight: bold;">Product:</td><td style="padding: 8px 0;">${productName}</td></tr>` : ''}
                </table>
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: 20px;">
                <h3 style="color: #1e40af; margin-top: 0;">Request Details</h3>
                <p style="background: #f1f5f9; padding: 15px; border-radius: 6px; line-height: 1.6;">${message}</p>
              </div>

              ${imageUrl ? `
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: 20px;">
                  <h3 style="color: #1e40af; margin-top: 0;">Attached Image</h3>
                  <img src="${imageUrl}" alt="Part request image" style="max-width: 100%; height: auto; border: 2px solid #e2e8f0; border-radius: 6px;">
                </div>
              ` : ''}
              
              <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #3b82f6;">
                <h3 style="color: #1e40af; margin-top: 0;">⚡ Action Required</h3>
                <ul style="margin: 0; padding-left: 20px; color: #1e40af;">
                  <li>Review request in admin dashboard</li>
                  <li>Contact customer within 2 hours</li>
                  <li>Prepare quote if applicable</li>
                  <li>Update request status</li>
                </ul>
              </div>
            </div>
            
            <div style="background: #1e40af; padding: 20px; text-align: center;">
              <p style="color: #bfdbfe; margin: 0; font-size: 12px;">
                Wings Engineering Services | Executive Notification System<br>
                This is an automated high-priority notification.
              </p>
            </div>
          </div>
        `;
        break;

      case 'low_stock':
        emailSubject = `⚠️ INVENTORY ALERT: Low Stock Warning`;
        emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #dc2626; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">⚠️ Low Stock Alert</h1>
            </div>
            <div style="padding: 20px; background: #fef2f2;">
              <p>The following items require immediate attention:</p>
              <div style="background: white; padding: 15px; border-radius: 6px;">
                ${message}
              </div>
            </div>
          </div>
        `;
        break;

      case 'admin_login':
        emailSubject = `🔐 CEO Dashboard Access Alert`;
        emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #059669; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">🔐 CEO Access Alert</h1>
            </div>
            <div style="padding: 20px;">
              <p>CEO dashboard access detected:</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Status:</strong> Successful authentication</p>
            </div>
          </div>
        `;
        break;

      default:
        emailSubject = `📧 New Contact Form Submission from ${customerName}`;
        emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #3b82f6; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">📧 New Contact</h1>
            </div>
            <div style="padding: 20px;">
              <p><strong>From:</strong> ${customerName} (${customerEmail})</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <div style="background: #f8fafc; padding: 15px; border-radius: 6px;">
                ${message}
              </div>
            </div>
          </div>
        `;
    }

    const emailResponse = await resend.emails.send({
      from: "Wings Engineering <notifications@wingsengineering.com>",
      to: ["admin@wingsengineering.com"],
      subject: emailSubject,
      html: emailHtml,
    });

    // Log the notification in database
    if (type === 'part_request' || type === 'contact_form') {
      await supabase.from('notifications').insert([{
        type: 'email_sent',
        title: `Email notification sent: ${type}`,
        message: `Notification email sent for ${customerName || 'system event'}`,
        related_id: emailResponse.data?.id || 'unknown'
      }]);
    }

    console.log("Notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
