// Vercel Serverless Function -Day 3 and Day 7 follow-up emails
// Trigger manually or via cron after the auto Day 0 email from visitor-webhook

const CALENDLY_LINK = 'https://calendly.com/elironebusiness/15-minute-call-capture-setup';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.OUTREACH_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { to_email, first_name, company_name, template } = req.body;

    if (!to_email) {
      return res.status(400).json({ error: 'to_email is required' });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const name = first_name || 'there';
    const company = company_name || 'your business';

    const emailContent = getTemplate(template || 'followup', { name, company });

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || 'RelayOpsAI <onboarding@resend.dev>',
        to: to_email,
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    });

    console.log(`[OUTREACH] Sent "${template || 'followup'}" email to ${to_email} (${company})`);

    return res.status(200).json({ success: true, template: template || 'followup' });
  } catch (error) {
    console.error('[OUTREACH ERROR]', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}

function getTemplate(template, { name, company }) {
  const templates = {

    // ─── Day 3: Casual follow-up ─────────────────────
    followup: {
      subject: `re: ${company}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 580px; margin: 0 auto; color: #1e293b; line-height: 1.6; font-size: 15px;">
          <p>Hey ${name},</p>

          <p>Just circling back on this. Totally get it if you were busy.</p>

          <p>Quick thing that might be relevant - we just wrapped up a project with a med spa owner, similar setup to ${company}. She was losing about $15K a month in missed calls. Not because her team was bad, they were literally with clients and couldn't get to the phone.</p>

          <p>After we set up the AI phone system:</p>

          <ul style="padding-left: 20px; margin: 12px 0;">
            <li>Went from catching about 55% of calls to 98%</li>
            <li>Recovered $22K in bookings the first month</li>
            <li>Didn't have to hire anyone</li>
          </ul>

          <p>I keep thinking ${company} would see something similar. Happy to show you what the numbers look like on your end. Takes about 15 min.</p>

          <p style="margin: 24px 0;">
            <a href="${CALENDLY_LINK}" style="display: inline-block; padding: 12px 28px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
              Grab a time here
            </a>
          </p>

          <p>If it's not a fit no worries at all.</p>

          <p style="margin-top: 24px;">
            Moses
          </p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 11px; color: #94a3b8;">
            <a href="mailto:hello@relayopsai.com?subject=Unsubscribe" style="color: #64748b;">Unsubscribe</a>
          </p>
        </div>
      `,
    },

    // ─── Day 7: Last touch ──────
    roi: {
      subject: `last one from me ${name}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 580px; margin: 0 auto; color: #1e293b; line-height: 1.6; font-size: 15px;">
          <p>Hey ${name},</p>

          <p>Last time I'll bug you about this I promise.</p>

          <p>Just wanted to leave you with some quick math that might be worth thinking about:</p>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 16px 0;">
            <p style="margin: 0 0 8px;">Say ${company} gets 20 calls a week and misses even 30% of them</p>
            <p style="margin: 0 0 8px;">That's about 24 missed leads a month</p>
            <p style="margin: 0 0 8px;">If even a quarter of those would've booked, that's 6 clients gone</p>
            <p style="margin: 0 0 8px;">At $300 average that's <strong>$1,800/month</strong> just gone</p>
            <p style="margin: 0; font-size: 13px; color: #64748b;">Most businesses we look at are actually 2-5x worse than this.</p>
          </div>

          <p>If that number bugs you at all I can show you what the real ones look like for ${company}. And if it turns out you're actually catching everything then I'll tell you that too.</p>

          <p style="margin: 24px 0;">
            <a href="${CALENDLY_LINK}" style="display: inline-block; padding: 12px 28px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
              15 min - let's look at your numbers
            </a>
          </p>

          <p>Link's there whenever. No expiration.</p>

          <p style="margin-top: 24px;">
            Moses
          </p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 11px; color: #94a3b8;">
            Last one from me. Won't email again unless you reply.
            <a href="mailto:hello@relayopsai.com?subject=Unsubscribe" style="color: #64748b;">Unsubscribe</a>
          </p>
        </div>
      `,
    },
  };

  return templates[template] || templates.followup;
}
