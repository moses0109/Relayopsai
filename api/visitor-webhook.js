// Vercel Serverless Function -Receives RB2B webhook data
// Identifies business visitors → sends YOU a notification → auto-emails THEM

const CALENDLY_LINK = 'https://calendly.com/elironebusiness/15-minute-call-capture-setup';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const visitor = req.body;

    const {
      email,
      first_name,
      last_name,
      company_name,
      company_domain,
      company_industry,
      company_size,
      city,
      state,
      country,
      linkedin_url,
      page_url,
      referrer,
      visit_count,
      first_seen,
      last_seen,
    } = visitor;

    const visitorName = [first_name, last_name].filter(Boolean).join(' ') || 'Unknown';
    const firstName = first_name || 'there';
    const companyInfo = company_name || company_domain || 'Unknown Company';
    const location = [city, state, country].filter(Boolean).join(', ') || 'Unknown';

    // Lead scoring
    let leadTemp = 'Warm';
    let leadEmoji = '🟡';
    if (visit_count >= 3 || (page_url && page_url.includes('medspa'))) {
      leadTemp = 'Hot';
      leadEmoji = '🔴';
    }
    if (page_url && (page_url.includes('pricing') || page_url.includes('#consultation'))) {
      leadTemp = 'On Fire';
      leadEmoji = '🔥';
    }

    console.log(`[VISITOR] ${leadEmoji} ${leadTemp} -${companyInfo} (${visitorName}) from ${location}`);
    console.log(`[VISITOR] Page: ${page_url || 'homepage'} | Visits: ${visit_count || 1}`);
    console.log(`[VISITOR] Email: ${email || 'N/A'} | LinkedIn: ${linkedin_url || 'N/A'}`);

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'team@relayopsai.com';

    if (RESEND_API_KEY) {
      // 1) Send YOU the internal notification
      const notifBody = buildNotificationEmail({
        visitorName, companyInfo, location, email, linkedin_url,
        company_industry, company_size, page_url, visit_count,
        leadTemp, leadEmoji, referrer, first_seen, last_seen,
      });

      const FROM_EMAIL = process.env.FROM_EMAIL || 'RelayOpsAI <onboarding@resend.dev>';

      const notifRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: NOTIFY_EMAIL,
          subject: `${leadEmoji} ${leadTemp} Lead: ${companyInfo} just visited your site`,
          html: notifBody,
        }),
      });

      const notifResult = await notifRes.json();
      console.log('[NOTIFY RESULT]', JSON.stringify(notifResult));

      // 2) Auto-send outreach email to the VISITOR (if we have their email)
      if (email) {
        // Figure out what they were looking at so the email feels personal
        let pageContext = '';
        let subjectLine = `${firstName} -wanted to make sure you saw this`;
        if (page_url && page_url.includes('medspa')) {
          pageContext = 'med spa';
          subjectLine = `${firstName} -saw you checking out our med spa solutions`;
        } else if (page_url && page_url.includes('pricing')) {
          pageContext = 'pricing';
          subjectLine = `${firstName} -quick note before you decide`;
        } else if (page_url && page_url.includes('about')) {
          pageContext = 'about';
          subjectLine = `${firstName} -glad you're looking into us`;
        }

        const outreachBody = buildOutreachEmail({
          firstName, companyInfo, pageContext, visit_count, company_industry,
        });

        const outreachRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to: email,
            subject: subjectLine,
            html: outreachBody,
          }),
        });

        const outreachResult = await outreachRes.json();
        console.log('[OUTREACH RESULT]', JSON.stringify(outreachResult));
        console.log(`[AUTO-OUTREACH] Sent initial email to ${email} (${companyInfo})`);
      }
    }

    return res.status(200).json({
      success: true,
      lead_temp: leadTemp,
      company: companyInfo,
      auto_emailed: !!email,
    });
  } catch (error) {
    console.error('[VISITOR WEBHOOK ERROR]', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ─── Auto-outreach email sent TO the visitor ────────────────────────
function buildOutreachEmail({ firstName, companyInfo, pageContext, visit_count, company_industry }) {
  let opener = '';
  if (pageContext === 'pricing') {
    opener = `Saw you looking at pricing on our site. Didn't want you to bounce without at least saying what's up. Happy to walk you through what actually makes sense for ${companyInfo} if you want.`;
  } else if (pageContext === 'med spa') {
    opener = `Saw you checking out what we do for med spas. I actually built this thing specifically for practices like yours so if you have questions I'm around.`;
  } else if (pageContext === 'about') {
    opener = `Saw you poking around our about page. Appreciate you actually reading that lol. Figured I'd say hey real quick.`;
  } else if (visit_count && visit_count >= 2) {
    opener = `You've been on our site a few times now so I figured I'd just shoot you a note instead of being weird about it.`;
  } else {
    opener = `Saw you on our site earlier. Figured I'd reach out real quick while you're still thinking about it.`;
  }

  let industryLine = '';
  if (company_industry) {
    industryLine = `<p>I talk to a lot of people in ${company_industry.toLowerCase()} so I already know what your phones probably look like. It's rough out here.</p>`;
  }

  return `
    <div style="font-family: -apple-system, sans-serif; max-width: 580px; margin: 0 auto; color: #1e293b; line-height: 1.6; font-size: 15px;">
      <p>Hey ${firstName},</p>

      <p>${opener}</p>

      ${industryLine}

      <p>We build custom automations for businesses - stuff like AI that answers your phones 24/7, books appointments, follows up over text, and handles the stuff that normally falls through the cracks. Every setup is different depending on what the business actually needs.</p>

      <p>Most people we talk to don't realize how much revenue they're losing to things that could be automated. It's usually way more than they think.</p>

      <p>If you want I can show you what that looks like for ${companyInfo}. Takes about 30 min and I'm not gonna pitch you on anything weird.</p>

      <p style="margin: 24px 0;">
        <a href="${CALENDLY_LINK}" style="display: inline-block; padding: 12px 28px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
          Grab a time here
        </a>
      </p>

      <p>No pressure either way. Link's there if you want it.</p>

      <p style="margin-top: 24px;">
        Moses<br/>
        <span style="color: #64748b; font-size: 13px;">RelayOpsAI</span>
      </p>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 11px; color: #94a3b8;">
        You were on relayopsai.com earlier, just following up.
        <a href="mailto:hello@relayopsai.com?subject=Unsubscribe" style="color: #64748b;">Unsubscribe</a>
      </p>
    </div>
  `;
}

// ─── Internal notification email sent TO YOU ────────────────────────
function buildNotificationEmail({
  visitorName, companyInfo, location, email, linkedin_url,
  company_industry, company_size, page_url, visit_count,
  leadTemp, leadEmoji, referrer, first_seen, last_seen,
}) {
  return `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 16px; overflow: hidden;">

      <div style="background: linear-gradient(135deg, #0ea5e9, #6366f1); padding: 24px 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 900; color: white;">
          ${leadEmoji} NEW VISITOR IDENTIFIED
        </h1>
        <p style="margin: 8px 0 0; font-size: 13px; color: rgba(255,255,255,0.8);">
          Lead Temperature: <strong>${leadTemp}</strong>
          ${email ? ' · <span style="color: #4ade80;">Auto-email sent ✓</span>' : ' · <span style="color: #fbbf24;">No email found -manual outreach needed</span>'}
        </p>
      </div>

      <div style="padding: 32px;">

        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h2 style="margin: 0 0 16px; font-size: 16px; font-weight: 800; color: #38bdf8;">
            ${companyInfo}
          </h2>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #64748b; width: 140px;">Contact</td>
              <td style="padding: 6px 0; color: #e2e8f0; font-weight: 600;">${visitorName}</td>
            </tr>
            ${email ? `<tr>
              <td style="padding: 6px 0; color: #64748b;">Email</td>
              <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
            </tr>` : ''}
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Location</td>
              <td style="padding: 6px 0; color: #e2e8f0;">${location}</td>
            </tr>
            ${company_industry ? `<tr>
              <td style="padding: 6px 0; color: #64748b;">Industry</td>
              <td style="padding: 6px 0; color: #e2e8f0;">${company_industry}</td>
            </tr>` : ''}
            ${company_size ? `<tr>
              <td style="padding: 6px 0; color: #64748b;">Company Size</td>
              <td style="padding: 6px 0; color: #e2e8f0;">${company_size}</td>
            </tr>` : ''}
            ${linkedin_url ? `<tr>
              <td style="padding: 6px 0; color: #64748b;">LinkedIn</td>
              <td style="padding: 6px 0;"><a href="${linkedin_url}" style="color: #38bdf8; text-decoration: none;">View Profile</a></td>
            </tr>` : ''}
          </table>
        </div>

        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 800; color: #a78bfa;">VISIT DETAILS</h3>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #64748b; width: 140px;">Page Viewed</td>
              <td style="padding: 6px 0; color: #e2e8f0;">${page_url || 'Homepage'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Total Visits</td>
              <td style="padding: 6px 0; color: #e2e8f0; font-weight: 700;">${visit_count || 1}</td>
            </tr>
            ${referrer ? `<tr>
              <td style="padding: 6px 0; color: #64748b;">Referrer</td>
              <td style="padding: 6px 0; color: #e2e8f0;">${referrer}</td>
            </tr>` : ''}
            ${first_seen ? `<tr>
              <td style="padding: 6px 0; color: #64748b;">First Seen</td>
              <td style="padding: 6px 0; color: #e2e8f0;">${new Date(first_seen).toLocaleString()}</td>
            </tr>` : ''}
          </table>
        </div>

        <div style="text-align: center; margin-top: 24px;">
          ${email ? `<a href="mailto:${email}?subject=Following up -${companyInfo}&body=Hi ${visitorName.split(' ')[0]},%0D%0A%0D%0AJust wanted to follow up on my earlier email. Would love to show you how we help businesses like ${companyInfo} recover revenue from missed calls.%0D%0A%0D%0AHere's my calendar if you'd like to grab 30 minutes: ${CALENDLY_LINK}%0D%0A%0D%0ABest,%0D%0AMoses - RelayOpsAI" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #0ea5e9, #6366f1); color: white; text-decoration: none; border-radius: 50px; font-weight: 800; font-size: 13px; margin: 0 6px;">
            Send Follow-Up
          </a>` : ''}
          ${linkedin_url ? `<a href="${linkedin_url}" style="display: inline-block; padding: 14px 28px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 13px; margin: 0 6px;">
            View LinkedIn
          </a>` : ''}
        </div>
      </div>

      <div style="padding: 16px 32px; background: rgba(0,0,0,0.3); text-align: center;">
        <p style="margin: 0; font-size: 11px; color: #475569;">
          RelayOpsAI Visitor Intelligence · relayopsai.vercel.app
        </p>
      </div>
    </div>
  `;
}
