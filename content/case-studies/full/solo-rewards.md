---
title: "Designing a Rewards Program That Funds Itself"
company: "Solo Global"
period: "2022–2023"
tag: "Fintech · 0→1"
status: "published"
order: 3
metrics:
  - label: "Conversion lift"
    value: 10
    unit: "%"
  - label: "Interchange margin"
    value: 1.5
    unit: "%"
  - label: "Modeled concentration"
    value: 20
    unit: "%"
  - label: "Actual concentration"
    value: 15
    unit: "%"
  - label: "Closed beta users"
    value: 1000
    unit: "+"
---

<div class="cs-hero">
  <div class="cs-hero-side">
    <div class="label">Before</div>
    <div class="cs-hero-pill">Standard fintech playbook</div>
  </div>
  <div class="cs-hero-arrow">→</div>
  <div class="cs-hero-side">
    <div class="label">After</div>
    <div class="cs-hero-after">
      <span class="cs-badge cs-badge--personalized">Category-personalized</span>
      <span class="cs-badge cs-badge--concentrated">Spend-concentrated</span>
      <span class="cs-badge cs-badge--sustainable">Self-funding</span>
    </div>
  </div>
</div>

<div class="cs-eyebrow">I</div>

## TL;DR

Solo Global hired me as Product Lead to design a debit card rewards program for service-based solopreneurs on a 1.5% interchange margin. The standard fintech playbook of partner-subsidized rewards did not work at our scale. I ran two rounds of customer research, identified that solopreneurs concentrate business spend in 2 to 3 categories or specific merchants, and built a category-personalized rewards mechanic where each user's highest-spend category earned 2% cash back. The model required ~20% of total card volume to hit rewarded categories to remain solvent. Closed beta usage came in at 15% concentration, giving the program more margin headroom than the model required, with a 10% lift in card creation conversion against a generic offer.

<div class="cs-eyebrow">II</div>

## Context

Solo Global was an early-stage fintech building banking and business tools for service-based solopreneurs and gig workers: rideshare drivers, landscapers, at-home bakers, independent service providers. The thesis was that this segment was underserved by both consumer banks (which treated them as personal customers) and small business banks (which were structured for businesses with multiple employees, payroll, and accounts payable cycles).

I joined as Product Lead with the company at zero shipped product. The first launch was a debit card with a rewards program, paired with a banking experience and a basic expense view. Card revenue would come from interchange at roughly 1.5% per swipe, which is the standard prepaid debit margin. That number is the entire operating constraint of the business in year one, and every product decision I made had to defend against it.

<div class="cs-eyebrow">III</div>

## Problem

Fintech rewards programs at scale typically rely on one of two models. Premium credit cards run on 2% to 3% interchange margins and can fund 1% to 2% rewards out of that margin directly. Lower-margin debit programs lean on partner subsidies, where a merchant agrees to fund a portion of the reward in exchange for traffic. Neither was available to us. We were on a 1.5% interchange margin with no scale to negotiate partner deals.

The naive options all failed unit economics. A flat 1% across all spend would consume two-thirds of interchange and leave nothing to operate. A 2% flat reward would lose money on every swipe. Points programs that converted at low rates would feel like a gimmick to a segment that thinks in dollars, not in airline miles.

The deeper problem was that I had no behavioral data to design against. The product had not shipped. There was no transaction history to mine. I had to figure out how solopreneurs actually spent money before I could design a reward structure that could survive at our margin.

<div class="cs-eyebrow">IV</div>

## Approach

### Research: behavioral first, preference second

I ran two rounds of remote research over Google Meet with a panel of 10 solopreneurs from our ICP. The panel was sourced from an opted-in feedback pool from a predecessor company that had served the same small-business segment, with modest compensation per session.

Round one was behavioral, not preference-based. I deliberately did not ask about rewards cards, points, or cash back. The questions were about how they tracked expenses, whether they used a personal card or a business card for business spending (most used personal), what their largest recurring business expenses actually were, and how they thought about the day-to-day economics of running their business.

The pattern that emerged across all 10 was specific and consistent. Each one had a category, and sometimes a single merchant, that dominated their business spending in their own minds. The Uber driver named gas. The landscaper named the specific supply yard he drove to every Tuesday. The at-home baker named flour and packaging. This was not statistical category analysis. It was the thing they thought about when they thought about running their business. It was concentrated, and they knew it was concentrated, because it was the constraint on whether the business worked that month.

That behavioral pattern became the category-concentration thesis.

Round two was preference testing against the thesis. I went back to the same panel and started with an open question: what would you expect from a business debit card with rewards? They volunteered generic rewards-industry language. Cash back. Points. A percentage on every purchase. None of them volunteered category-concentration rewards unprompted. They did not have the concept.

Then I presented three concrete options:

1. Points that build up slowly and convert to cash back or rewards purchases
2. A smaller percentage of cash back across all purchases
3. A selectable category or store with higher cash back than a general rate

Ten out of ten chose option three. The reasoning was consistent across the panel. They could see the reward instantly building on something they already bought multiple times a week. The reward made the spending they already did feel like a return on the business, not an abstract points balance.

<div class="cs-statemachine">
<svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two-round research methodology: behavioral round produces concentration thesis, preference round validates it"><defs><marker id="solo-research-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#6B6750"></path></marker></defs><rect x="20" y="40" width="200" height="80" rx="6" fill="#F5F2E5" stroke="#BFB89D" stroke-width="1"></rect><text x="120" y="68" text-anchor="middle" fill="#1A1810" font-family="Inter, sans-serif" font-size="13" font-weight="600">Round 1</text><text x="120" y="88" text-anchor="middle" fill="#6B6750" font-family="Inter, sans-serif" font-size="11">Behavioral interviews</text><text x="120" y="104" text-anchor="middle" fill="#6B6750" font-family="Inter, sans-serif" font-size="11">No mention of rewards</text><rect x="280" y="40" width="200" height="80" rx="6" fill="#F0EEE6" stroke="#4A4317" stroke-width="2"></rect><text x="380" y="68" text-anchor="middle" fill="#4A4317" font-family="Inter, sans-serif" font-size="13" font-weight="600">Insight</text><text x="380" y="88" text-anchor="middle" fill="#1A1810" font-family="Inter, sans-serif" font-size="11">Spend concentrates in</text><text x="380" y="104" text-anchor="middle" fill="#1A1810" font-family="Inter, sans-serif" font-size="11">2 to 3 categories per user</text><rect x="540" y="40" width="200" height="80" rx="6" fill="#F5F2E5" stroke="#BFB89D" stroke-width="1"></rect><text x="640" y="68" text-anchor="middle" fill="#1A1810" font-family="Inter, sans-serif" font-size="13" font-weight="600">Round 2</text><text x="640" y="88" text-anchor="middle" fill="#6B6750" font-family="Inter, sans-serif" font-size="11">Preference test</text><text x="640" y="104" text-anchor="middle" fill="#6B6750" font-family="Inter, sans-serif" font-size="11">3 reward structures</text><line x1="220" y1="80" x2="278" y2="80" stroke="#6B6750" stroke-width="1.5" marker-end="url(#solo-research-arrow)"></line><line x1="480" y1="80" x2="538" y2="80" stroke="#6B6750" stroke-width="1.5" marker-end="url(#solo-research-arrow)"></line><rect x="120" y="170" width="520" height="80" rx="6" fill="#F0EEE6" stroke="#4A4317" stroke-width="2"></rect><text x="380" y="198" text-anchor="middle" fill="#4A4317" font-family="Inter, sans-serif" font-size="13" font-weight="600">Result: 10 of 10 selected category-personalized rewards</text><text x="380" y="220" text-anchor="middle" fill="#1A1810" font-family="Inter, sans-serif" font-size="11">Preference matched behavior. Users could not volunteer the concept</text><text x="380" y="236" text-anchor="middle" fill="#1A1810" font-family="Inter, sans-serif" font-size="11">unprompted but recognized it when shown alongside alternatives</text><line x1="640" y1="120" x2="640" y2="170" stroke="#6B6750" stroke-width="1.5" marker-end="url(#solo-research-arrow)"></line></svg>
<div class="cs-sm-note">Figure 1: Two-round research design. Behavioral observation produced the thesis; preference testing validated it against alternatives users could not have volunteered on their own.</div>
</div>

### Model: unit economics on category concentration

The behavioral insight gave me a structural advantage. If each user's reward was personalized to their highest-spend category rather than offered as a flat rate across all spend, I could pay 2% on a small slice of total card volume rather than 1% across all of it. The math became a question of how much total card volume hits rewarded categories in aggregate.

I modeled the program at 20% concentration. The logic was that even if an individual user concentrated 50% of their personal spend in their top category, the population-weighted average across all users and all card volume would settle lower because users swipe the card on plenty of things outside their top category. Twenty percent was a defensive estimate.

At 20% concentration, reward cost works out to 0.4% of total card volume (20% of volume earning 2%). Subtracted from 1.5% interchange, the program retains 1.1% of card volume in net margin. That was enough to fund the rewards operation against the rest of the company's cost base.

<div class="cs-statemachine">
<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Unit economics: 1.5% interchange margin minus reward cost at 20% modeled and 15% actual concentration"><defs><marker id="solo-econ-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#6B6750"></path></marker></defs><text x="380" y="32" text-anchor="middle" fill="#1A1810" font-family="Inter, sans-serif" font-size="14" font-weight="600">Net margin per dollar of card volume</text><text x="380" y="52" text-anchor="middle" fill="#6B6750" font-family="Inter, sans-serif" font-size="11">Interchange (1.5%) minus reward cost (concentration × 2%)</text><rect x="60" y="90" width="300" height="180" rx="6" fill="#F5F2E5" stroke="#BFB89D" stroke-width="1"></rect><text x="210" y="118" text-anchor="middle" fill="#1A1810" font-family="Inter, sans-serif" font-size="13" font-weight="600">Modeled: 20% concentration</text><line x1="90" y1="155" x2="330" y2="155" stroke="#BFB89D" stroke-width="1"></line><text x="100" y="148" text-anchor="start" fill="#6B6750" font-family="Inter, sans-serif" font-size="11">Interchange revenue</text><text x="320" y="148" text-anchor="end" fill="#1A1810" font-family="Inter, sans-serif" font-size="12" font-weight="500">+1.50%</text><text x="100" y="178" text-anchor="start" fill="#6B6750" font-family="Inter, sans-serif" font-size="11">Reward cost (20% × 2%)</text><text x="320" y="178" text-anchor="end" fill="#CC4125" font-family="Inter, sans-serif" font-size="12" font-weight="500">−0.40%</text><line x1="90" y1="200" x2="330" y2="200" stroke="#BFB89D" stroke-width="1"></line><text x="100" y="226" text-anchor="start" fill="#1A1810" font-family="Inter, sans-serif" font-size="12" font-weight="600">Net margin</text><text x="320" y="226" text-anchor="end" fill="#4A4317" font-family="Fraunces, serif" font-size="20" font-weight="600">1.10%</text><text x="210" y="252" text-anchor="middle" fill="#6B6750" font-family="Inter, sans-serif" font-size="10">73% of interchange retained</text><rect x="400" y="90" width="300" height="180" rx="6" fill="#F0EEE6" stroke="#4A4317" stroke-width="2"></rect><text x="550" y="118" text-anchor="middle" fill="#4A4317" font-family="Inter, sans-serif" font-size="13" font-weight="600">Actual: 15% concentration</text><line x1="430" y1="155" x2="670" y2="155" stroke="#BFB89D" stroke-width="1"></line><text x="440" y="148" text-anchor="start" fill="#6B6750" font-family="Inter, sans-serif" font-size="11">Interchange revenue</text><text x="660" y="148" text-anchor="end" fill="#1A1810" font-family="Inter, sans-serif" font-size="12" font-weight="500">+1.50%</text><text x="440" y="178" text-anchor="start" fill="#6B6750" font-family="Inter, sans-serif" font-size="11">Reward cost (15% × 2%)</text><text x="660" y="178" text-anchor="end" fill="#CC4125" font-family="Inter, sans-serif" font-size="12" font-weight="500">−0.30%</text><line x1="430" y1="200" x2="670" y2="200" stroke="#BFB89D" stroke-width="1"></line><text x="440" y="226" text-anchor="start" fill="#1A1810" font-family="Inter, sans-serif" font-size="12" font-weight="600">Net margin</text><text x="660" y="226" text-anchor="end" fill="#4A4317" font-family="Fraunces, serif" font-size="20" font-weight="600">1.20%</text><text x="550" y="252" text-anchor="middle" fill="#4A4317" font-family="Inter, sans-serif" font-size="10" font-weight="500">80% of interchange retained</text><line x1="362" y1="180" x2="398" y2="180" stroke="#6B6750" stroke-width="1.5" marker-end="url(#solo-econ-arrow)"></line><text x="380" y="298" text-anchor="middle" fill="#6B6750" font-family="Inter, sans-serif" font-size="11">Lower concentration than modeled meant lower payout and more margin headroom</text></svg>
<div class="cs-sm-note">Figure 2: Modeled vs actual unit economics. Closed beta usage came in below the modeled concentration, which improved net margin rather than degrading it.</div>
</div>

### Build: category personalization in the product

The model required the product to do two things well. First, identify each user's highest-spend category from their actual swipe history and assign that category as their rewarded one. Second, communicate to the user, before they swiped, where their reward was active so they could see the connection between their behavior and the cash back they earned.

The mechanic worked from real transaction data once a user had a small history of swipes, with a default category for new users based on the trade or vertical they identified at signup (rideshare, landscaping, baking, and so on). Users could re-select their rewarded category once a month if they wanted to override the system's pick.

The card itself shipped in closed beta to over 1,000 users, with onboarding routed through an invite list built from the same prior-company opted-in panel that sourced the research, plus referrals from early users.

<div class="cs-eyebrow">V</div>

## Results

- Modeled at 20% category concentration, actual usage came in at 15%, which improved net margin from 1.10% to 1.20% of card volume
- Personalizing the rewarded category to each user's highest-spend category lifted card creation conversion 10% against a generic flat-rate offer in onboarding
- Debit card and rewards program shipped to App Store and ran in closed beta with over 1,000 users
- Round one to round two consistency held: 10 of 10 panel respondents preferred category-personalized rewards in the structured test after describing concentrated spend behavior unprompted in the prior round

The two-round research structure (behavioral observation first, preference testing against the observed behavior second) became my default research pattern for ambiguous product problems where users cannot volunteer a concept they do not yet have.

<div class="cs-eyebrow">VI</div>

## Key Insight

Users cannot tell you what they want when the concept does not exist in their vocabulary. They can show you how they behave, and they can react to options grounded in that behavior. Those are different inputs and they have to be collected differently.

In round one, no one said they wanted category-based rewards. The concept did not exist for them. They described concentrated spending behavior because that is what their day-to-day looked like. In round two, when I asked open questions about rewards, they volunteered generic industry language because that was the vocabulary available to them. When I showed them concrete options grounded in the behavior they had already described, the choice was unanimous.

The implication is not that users do not know what they want. It is that the order of operations in research matters. Behavioral observation has to come before preference testing whenever the product is introducing a concept the user does not already have.

<div class="cs-eyebrow">VII</div>

## What I'd do differently

What I would do differently is run a quantitative validation round before committing to the model. The qualitative panel of 10 was strong signal but not statistical. A 100-plus survey across the broader target market would have confirmed the concentration pattern outside the panel before the build, rather than after. In production the economics held, but that was validation on shipped product, not validation before commit.

The other thing I carry from this project is a sharper instinct about category personalization in lower-margin financial products. The default fintech move is to compete on a flat reward rate that signals generosity. That is the wrong frame when interchange margins are thin. Personalization at the category level lets you pay a higher headline reward to each user on a small slice of their volume, which feels generous to them and stays solvent for you. The economics depend on aggregate concentration staying within a defensible band, which is a forecasting problem, not a marketing one.

The company wound down in May 2023 following the Silicon Valley Bank collapse, which took out our banking partner. The product economics were holding at the time of close. The shutdown was not a product outcome.
