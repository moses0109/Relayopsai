// Vercel Serverless Function — Day 3 and Day 7 follow-up emails
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
        from: 'Eli from RelayOpsAI <hello@relayopsai.com>',
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

    // ─── Day 3: Casual follow-up with proof ─────────────────────
    followup: {
      subject: `re: ${company}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 580px; margin: 0 auto; color: #1e293b; line-height: 1.7;">
          <p>Hey ${name},</p>

          <p>Just bumping this up — totally get it if the timing wasn't right the other day.</p>

          <p>Quick story that might hit home: one of our clients (med spa owner, similar size to ${company}) was losing about <strong>$15K a month</strong> to missed calls. Not because her team sucked — they were literally in sessions and couldn't pick up.</p>

          <p>We turned on the AI voice system and within the first month:</p>

          <ul style="padding-left: 20px; margin: 12px 0;">
            <li>Went from catching ~55% of calls to <strong>98%</strong></li>
            <li>Recovered <strong>$22K in bookings</strong> that would've walked</li>
            <li>Didn't hire anyone new</li>
          </ul>

          <p>I keep thinking ${company} could see similar numbers. Would be happy to run through it — literally takes 15 minutes and you'll walk away knowing your exact number either way.</p>

          <p style="margin: 24px 0;">
            <a href="${CALENDLY_LINK}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0ea5e9, #6366f1); color: white; text-decoration: none; border-radius: 50px; font-weight: 800; font-size: 14px;">
              Pick a Time That Works →
            </a>
          </p>

          <p>No worries if not — just didn't want you to miss out if it's something that could actually help.</p>

          <p style="margin-top: 24px;">
            — Eli
          </p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 11px; color: #94a3b8;">
            <a href="mailto:hello@relayopsai.com?subject=Unsubscribe" style="color: #64748b;">Unsubscribe</a>
          </p>
        </div>
      `,
    },

    // ─── Day 7: Last touch — direct, personal, no pressure ──────
    roi: {
      subject: `last thing — then I'll leave you alone, ${name}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 580px; margin: 0 auto; color: #1e293b; line-height: 1.7;">
          <p>Hey ${name},</p>

          <p>Last email from me on this — I promise.</p>

          <p>I'll just leave you with the napkin math:</p>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 16px 0;">
            <p style="margin: 0 0 8px;">If ${company} gets <strong>20 calls a week</strong> and misses even 30%:</p>
            <p style="margin: 0 0 8px;">→ <strong>24 missed leads/month</strong></p>
            <p style="margin: 0 0 8px;">→ Even if only 25% would've booked = <strong>6 lost clients</strong></p>
            <p style="margin: 0 0 8px;">→ At $300 average = <strong style="color: #e11d48;">$1,800/month walking out the door</strong></p>
            <p style="margin: 0; font-size: 13px; color: #64748b;">Most businesses we audit are 2-5x this. The system pays for itself with one booking.</p>
          </div>

          <p>If those numbers bother you even a little, I'd love 15 minutes to show you your real ones. And if it turns out ${company} is actually catching everything — great, I'll tell you that too.</p>

          <p style="margin: 24px 0;">
            <a href="${CALENDLY_LINK}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0ea5e9, #6366f1); color: white; text-decoration: none; border-radius: 50px; font-weight: 800; font-size: 14px;">
              15 Min — See Your Numbers →
            </a>
          </p>

          <p>Either way, the calendar link stays open whenever you're ready. No expiration, no pressure.</p>

          <p>Rooting for ${company} either way.</p>

          <p style="margin-top: 24px;">
            — Eli
          </p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 11px; color: #94a3b8;">
            Last email — won't send any more unless you reply.
            <a href="mailto:hello@relayopsai.com?subject=Unsubscribe" style="color: #64748b;">Unsubscribe</a>
          </p>
        </div>
      `,
    },
  };

  return templates[template] || templates.followup;
}
