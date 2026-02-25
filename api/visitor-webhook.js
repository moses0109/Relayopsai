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

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'RelayOpsAI Visitor Alert <alerts@relayopsai.com>',
          to: NOTIFY_EMAIL,
          subject: `${leadEmoji} ${leadTemp} Lead: ${companyInfo} just visited your site`,
          html: notifBody,
        }),
      });

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

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Eli from RelayOpsAI <hello@relayopsai.com>',
            to: email,
            subject: subjectLine,
            html: outreachBody,
          }),
        });

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
  // Build a personal opener based on what they were actually doing on the site
  let opener = '';
  if (pageContext === 'pricing') {
    opener = `I saw you were looking at our pricing -figured I'd reach out personally instead of letting you guess which plan fits ${companyInfo}.`;
  } else if (pageContext === 'med spa') {
    opener = `Noticed you were checking out what we do for med spas -wanted to reach out personally since I built this specifically for practices like ${companyInfo}.`;
  } else if (pageContext === 'about') {
    opener = `Saw you were reading about us -always nice when someone actually checks out the story behind the product. Wanted to say hey.`;
  } else if (visit_count && visit_count >= 2) {
    opener = `I noticed you've been back on our site a couple of times -figured I'd just reach out directly instead of waiting.`;
  } else {
    opener = `Noticed you were checking out RelayOpsAI earlier -wanted to reach out personally while it's still fresh.`;
  }

  // Industry-specific line if we have it
  let industryLine = '';
  if (company_industry) {
    industryLine = `<p>We work with a lot of ${company_industry.toLowerCase()} businesses, so I have a pretty good idea of what the phones look like on your end -and how much is slipping through.</p>`;
  }

  return `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 580px; margin: 0 auto; color: #1e293b; line-height: 1.7;">
      <p>Hey ${firstName},</p>

      <p>${opener}</p>

      ${industryLine}

      <p>Here's the short version: most businesses we talk to are losing <strong>$8K–$25K a month</strong> to calls that go unanswered -after hours, during busy periods, weekends. Not because the team doesn't care, just because there's only so many hands.</p>

      <p>We fix that. AI picks up every call, books appointments, texts back anyone who slips through. Your team doesn't change anything -they just stop losing leads.</p>

      <p>If you're curious whether the numbers work for ${companyInfo}, I can run through it with you in about 15 minutes. No deck, no pitch -just your actual numbers.</p>

      <p style="margin: 24px 0;">
        <a href="${CALENDLY_LINK}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0ea5e9, #6366f1); color: white; text-decoration: none; border-radius: 50px; font-weight: 800; font-size: 14px;">
          Grab 15 Min on My Calendar →
        </a>
      </p>

      <p>If the timing's off, no worries at all -the link's there whenever.</p>

      <p style="margin-top: 24px;">
        -Eli<br/>
        <span style="color: #64748b; font-size: 13px;">Founder, RelayOpsAI</span>
      </p>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 11px; color: #94a3b8;">
        You visited relayopsai.com -just following up. No spam, promise.
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
          ${email ? `<a href="mailto:${email}?subject=Following up -${companyInfo}&body=Hi ${visitorName.split(' ')[0]},%0D%0A%0D%0AJust wanted to follow up on my earlier email. Would love to show you how we help businesses like ${companyInfo} recover revenue from missed calls.%0D%0A%0D%0AHere's my calendar if you'd like to grab 15 minutes: ${CALENDLY_LINK}%0D%0A%0D%0ABest,%0D%0AEli -RelayOpsAI" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #0ea5e9, #6366f1); color: white; text-decoration: none; border-radius: 50px; font-weight: 800; font-size: 13px; margin: 0 6px;">
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
