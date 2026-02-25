# RelayOpsAI — Outbound Outreach Scripts

## How the Visitor ID → Outreach Pipeline Works

```
Business owner visits relayopsai.vercel.app
    ↓
RB2B identifies the company (reverse IP lookup)
    ↓
Webhook fires → /api/visitor-webhook
    ↓
You get an email notification with:
  - Company name, industry, size
  - Contact name + email (if available)
  - LinkedIn profile
  - Pages viewed, visit count, referrer
  - Lead temperature (Warm / Hot / On Fire)
    ↓
OUTREACH OPTIONS (pick based on lead temp):
```

---

## Option A: Automated Email Sequence (Safest — CAN-SPAM Compliant)

### Email 1 — Day 0 (Immediately after identification)
**Subject:** `[Company Name] — quick question about your missed calls`
**Template:** `initial` (see /api/outreach-email.js)

### Email 2 — Day 3 (Follow-up with case study)
**Subject:** `How a spa recovered $22K/month from missed calls`
**Template:** `followup`

### Email 3 — Day 7 (Final — ROI math)
**Subject:** `The math on AI answering for [Company Name]`
**Template:** `roi`

**CAN-SPAM Compliance Checklist:**
- [x] Business email from identified company (not personal)
- [x] Clear sender identity (RelayOpsAI)
- [x] Unsubscribe link in every email
- [x] Physical address required (add yours)
- [x] Honest subject lines (no deception)
- [x] Stop emailing within 10 days of unsubscribe

---

## Option B: Manual Phone Call Script (Legal for B2B)

> Use this when you see a HOT lead in your notification email.
> Calling a business phone number listed on Google is standard B2B sales.

### Opening (first 15 seconds — critical)

"Hi, this is [Your Name] from RelayOpsAI. I'm reaching out to [Company Name] — I work with [industry] businesses on their phone operations. Is the owner or manager available for about 60 seconds?"

### If they ask "What's this about?"

"We help businesses like yours stop losing revenue to missed calls. I noticed [Company Name] might be a fit — I just had a quick question about how you handle after-hours calls. Totally understand if now's not the time."

### The Question (creates curiosity)

"Quick question — do you happen to know roughly how many calls you miss per week? After hours, during busy periods, when the front desk is tied up?"

### If they say "I don't know" or "Not many"

"That's actually the most common answer — and usually the biggest surprise. Most businesses we audit are missing 30-40% of their inbound calls without realizing it. Each one of those is a potential client who just dials the next business on Google."

### The Pivot

"We built an AI system that answers every call 24/7, books appointments directly into your calendar, and texts back anyone who slips through — all automatically. Our clients typically recover $15,000 to $27,000 a month in revenue that was already leaving."

### The Close

"I'm not trying to sell you anything on this call — I just wanted to see if it'd be worth a 15-minute demo where I show you your actual numbers. Would [Tuesday/Thursday] work, or is there a better time?"

### If they push back

"Totally get it. Would it help if I just sent over a quick case study by email? That way you can look at the numbers on your own time. What's the best email?"

---

## Option C: AI Pre-Recorded Voicemail Drop (For Kevva/Vapi)

> This is a voicemail drop — goes straight to voicemail, never rings the phone.
> Legal under TCPA because no live conversation = no "call" in TCPA terms.
> Use sparingly and only for business numbers.

### Script (30 seconds max)

"Hi, this is [Name] from RelayOpsAI. I'm reaching out to [Company Name] because we work with [industry] businesses in [their city/state] on their phone operations.

The reason for my call — we recently helped a business similar to yours recover over $22,000 a month in revenue they were losing to missed calls. I thought it might be worth a quick conversation to see if the numbers work for you too.

If you're curious, feel free to call me back at [your number], or I'll drop you an email with a case study. Either way — have a great day."

---

## Option D: LinkedIn DM Script (For identified visitors with LinkedIn)

### Message 1 — Connection Request

"Hi [First Name] — I run RelayOpsAI, we help [industry] businesses handle their phones with AI. Saw [Company Name] might be a fit. Would love to connect."

### Message 2 — After they accept (wait 1 day)

"Thanks for connecting, [First Name]. Quick question — how are you currently handling after-hours calls at [Company Name]? Most businesses we talk to are surprised by how many they're actually missing.

We built an AI system that answers 24/7, books appointments, and texts back missed callers. Happy to share how it works if you're curious — no pitch, just a 15-min walkthrough."

---

## Lead Temperature → Action Matrix

| Lead Temp | Trigger | Action |
|-----------|---------|--------|
| **Warm** (1-2 visits, homepage) | First visit notification | Email sequence (auto) |
| **Hot** (3+ visits OR medspa page) | Multi-visit alert | Email + LinkedIn DM |
| **On Fire** (pricing page OR consultation section) | High-intent alert | Email + Phone call within 2 hours |

---

## TCPA / Legal Quick Reference

| Method | Legal? | Requirements |
|--------|--------|-------------|
| Email to business address | YES | CAN-SPAM: unsubscribe link, physical address, honest subject |
| Manual call to business phone | YES | No consent needed for B2B. Don't use autodialer. |
| Voicemail drop (ringless) | YES* | Gray area but generally accepted for B2B. Use sparingly. |
| AI automated call | RISKY | TCPA requires prior consent for auto/prerecorded calls. Don't auto-call without opt-in. |
| Automated SMS | NO | TCPA requires prior express written consent. Never auto-text without opt-in. |
| LinkedIn DM | YES | LinkedIn's own TOS apply. Don't spam. |

---

## Setup Checklist

1. [ ] Sign up for RB2B (free tier: https://rb2b.com) — get your API key
2. [ ] Replace `YOUR_RB2B_API_KEY` in index.html with your actual key
3. [ ] Sign up for Resend (free tier: https://resend.com) — get API key
4. [ ] Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY` = your Resend API key
   - `NOTIFY_EMAIL` = your email for notifications
   - `OUTREACH_SECRET` = a random string for API auth
5. [ ] Set up RB2B webhook URL: `https://relayopsai.vercel.app/api/visitor-webhook`
6. [ ] Deploy: `npx vercel --prod --yes`
7. [ ] Test by visiting your site in incognito → check Vercel function logs
