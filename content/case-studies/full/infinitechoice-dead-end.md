---
title: Turning a "no hotel availability" dead-end into a recovery surface
company: InfiniteChoice
period: 2023–2025
tag: Travel · Funnel Recovery
status: published
order: 2
metrics:
  - label: Users recovered
    value: 20
    unit: "%"
  - label: Recovered
    value: 30
    unit: "%"
  - label: Annualized
    value: $14
    unit: "M"
---

<div class="cs-hero">
  <div class="cs-hero-side">
    <div class="label">Before</div>
    <div class="cs-hero-pill">Static hotel names list</div>
  </div>
  <div class="cs-hero-arrow">→</div>
  <div class="cs-hero-side">
    <div class="label">After</div>
    <div class="cs-hero-after">
      <span class="cs-badge cs-badge--confirmed">Live availability</span>
      <span class="cs-badge cs-badge--pricing">Real-time pricing</span>
      <span class="cs-badge cs-badge--comparable">Comparable quality</span>
    </div>
  </div>
</div>

<div class="cs-eyebrow">I</div>

## TL;DR

About 20% of users hitting the hotel detail page were terminating on a "no availability" screen with no real path forward. Most teams treat that state as an inventory problem. It isn't. It's a moment of unusually high purchase intent that the previous design was throwing away.

I rebuilt that screen as a recovery surface, with confirmed availability and live pricing on nearby comparable hotels, converted 30% of previously lost users back into the booking funnel and recovered ~$14M in annualized bookings.

<div class="cs-eyebrow">II</div>

## Context

InfiniteChoice is a high-traffic B2C travel and events platform, ~11.8M annual visits, ~$1.5B in annual bookings. Hotel search and booking is one of the core funnels. I was the senior product manager running experimentation and conversion across checkout, pricing, and funnel recovery.

<div class="cs-eyebrow">III</div>

## The problem nobody was looking at

The 20% termination number was sitting in Mixpanel the whole time. Anyone could have found it. The reason nobody had was framing: the company viewed "no availability" as something the inventory team had to fix by signing more hotels, not as something product could fix by redesigning the screen.

The screen itself wasn't quite a hard dead-end. It already showed a list of nearby hotels. But it didn't check those hotels for availability against the user's search dates, and it didn't show prices. So the "recovery" was: here are some hotel names, click through to check each one yourself. Users didn't. They left.

The other thing on that screen was a prominent "call our customer service team" CTA. Hold that for later. It matters.

<div class="cs-statemachine">
<svg viewBox="0 0 700 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="User funnel flow. Search leads to hotel detail page, then 80% proceed to booking while 20% hit no availability dead-end.">
  <defs>
    <marker id="flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6B6750"></path>
    </marker>
  </defs>
  <!-- Flow boxes -->
  <rect x="40" y="55" width="100" height="35" rx="6" fill="#F5F2E5" stroke="#BFB89D"></rect>
  <text x="90" y="78" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="12" fill="#6B6750" letter-spacing="0.06em">SEARCH</text>
  <rect x="180" y="55" width="120" height="35" rx="6" fill="#F5F2E5" stroke="#BFB89D"></rect>
  <text x="240" y="78" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="12" fill="#6B6750" letter-spacing="0.06em">HOTEL DETAIL</text>
  <!-- Decision diamond -->
  <polygon points="350,72 390,55 430,72 390,89" fill="#F5F2E5" stroke="#BFB89D" stroke-width="1"/>
  <text x="390" y="76" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="10" fill="#6B6750">Available?</text>
  <!-- Success path (80%) -->
  <rect x="480" y="25" width="100" height="35" rx="6" fill="rgba(74,67,23,0.12)" stroke="#4A4317" stroke-width="2"></rect>
  <text x="530" y="47" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="12" font-weight="600" fill="#4A4317" letter-spacing="0.06em">BOOKING</text>
  <!-- Problem path (20%) -->
  <rect x="480" y="80" width="120" height="35" rx="6" fill="rgba(204,65,37,0.12)" stroke="#CC4125" stroke-width="2"></rect>
  <text x="540" y="103" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="12" font-weight="600" fill="#CC4125" letter-spacing="0.06em">NO AVAILABILITY</text>
  <!-- Flow arrows -->
  <line x1="140" y1="72" x2="175" y2="72" stroke="#6B6750" stroke-width="1.5" marker-end="url(#flow-arrow)"></line>
  <line x1="300" y1="72" x2="345" y2="72" stroke="#6B6750" stroke-width="1.5" marker-end="url(#flow-arrow)"></line>
  <line x1="415" y1="60" x2="475" y2="43" stroke="#4A4317" stroke-width="2" marker-end="url(#flow-arrow)"></line>
  <line x1="415" y1="84" x2="475" y2="98" stroke="#CC4125" stroke-width="2" marker-end="url(#flow-arrow)"></line>
  <!-- Percentage labels -->
  <text x="450" y="35" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="12" font-weight="700" fill="#4A4317">80%</text>
  <text x="450" y="115" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="12" font-weight="700" fill="#CC4125">20%</text>
</svg>
<div class="cs-sm-note">Figure 1: The 20% leak. The dead-end node was the focus.</div>
</div>

<div class="cs-eyebrow">IV</div>

## The reframe

A user who has searched, picked a hotel, clicked through, and tried to book has demonstrated more intent than 99% of the funnel. Treating that moment as a terminal state was the bug. The question isn't "how do we sell them this hotel" (we can't, it's not available). The question is "what does this user actually want, and what's the closest thing to it we can offer right now?"

Looking at the search behavior gave me the answer. ~60% of hotel searches on the platform were for "tonight" or "tomorrow night" check-in dates. For that majority, the dates aren't a flexible variable. The user has a specific need on a specific night. Suggesting they try different dates is useless. Suggesting a different hotel in the same area, on the same dates, at a comparable price tier, is exactly what they would do next on their own.

That ruled in the nearby-hotels pattern. It also ruled out the alternatives.

<div class="cs-statemachine">
<svg viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Decision tree for no availability alternatives. Four options evaluated: different dates (rejected), waitlist (rejected), different price tier (rejected), and nearby comparable hotels (shipped).">
  <defs>
    <marker id="choice-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6B6750"></path>
    </marker>
  </defs>
  <!-- Starting point -->
  <rect x="20" y="95" width="140" height="35" rx="6" fill="rgba(204,65,37,0.12)" stroke="#CC4125" stroke-width="2"></rect>
  <text x="90" y="117" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="11" font-weight="600" fill="#CC4125" letter-spacing="0.06em">NO AVAILABILITY</text>
  <!-- Option 1: Different dates -->
  <rect x="220" y="25" width="140" height="35" rx="6" fill="#F5F2E5" stroke="#BFB89D"></rect>
  <text x="290" y="47" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="11" fill="#6B6750" letter-spacing="0.06em">DIFFERENT DATES</text>
  <rect x="380" y="25" width="80" height="28" rx="4" fill="rgba(204,65,37,0.12)" stroke="#CC4125" stroke-width="1"></rect>
  <text x="420" y="42" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="9" font-weight="600" fill="#CC4125">REJECTED</text>
  <text x="480" y="35" font-family="ui-monospace, SFMono-Regular, monospace" font-size="9" fill="#6B6750">60% have fixed dates</text>
  <text x="480" y="47" font-family="ui-monospace, SFMono-Regular, monospace" font-size="9" fill="#6B6750">for tonight/tomorrow</text>
  <!-- Option 2: Waitlist -->
  <rect x="220" y="75" width="140" height="35" rx="6" fill="#F5F2E5" stroke="#BFB89D"></rect>
  <text x="290" y="97" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="11" fill="#6B6750" letter-spacing="0.06em">WAITLIST</text>
  <rect x="380" y="75" width="80" height="28" rx="4" fill="rgba(204,65,37,0.12)" stroke="#CC4125" stroke-width="1"></rect>
  <text x="420" y="92" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="9" font-weight="600" fill="#CC4125">REJECTED</text>
  <text x="480" y="85" font-family="ui-monospace, SFMono-Regular, monospace" font-size="9" fill="#6B6750">Inventory may not</text>
  <text x="480" y="97" font-family="ui-monospace, SFMono-Regular, monospace" font-size="9" fill="#6B6750">return in time</text>
  <!-- Option 3: Different price -->
  <rect x="220" y="125" width="140" height="35" rx="6" fill="#F5F2E5" stroke="#BFB89D"></rect>
  <text x="290" y="147" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="11" fill="#6B6750" letter-spacing="0.06em">DIFFERENT PRICE</text>
  <rect x="380" y="125" width="80" height="28" rx="4" fill="rgba(204,65,37,0.12)" stroke="#CC4125" stroke-width="1"></rect>
  <text x="420" y="142" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="9" font-weight="600" fill="#CC4125">REJECTED</text>
  <text x="480" y="135" font-family="ui-monospace, SFMono-Regular, monospace" font-size="9" fill="#6B6750">User already chose</text>
  <text x="480" y="147" font-family="ui-monospace, SFMono-Regular, monospace" font-size="9" fill="#6B6750">their price tier</text>
  <!-- Option 4: Nearby hotels (WINNER) -->
  <rect x="220" y="175" width="140" height="35" rx="6" fill="rgba(74,67,23,0.12)" stroke="#4A4317" stroke-width="2"></rect>
  <text x="290" y="197" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="11" font-weight="600" fill="#4A4317" letter-spacing="0.06em">NEARBY + PRICING</text>
  <rect x="380" y="175" width="80" height="28" rx="4" fill="rgba(74,67,23,0.12)" stroke="#4A4317" stroke-width="2"></rect>
  <text x="420" y="192" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="9" font-weight="600" fill="#4A4317">✓ SHIPPED</text>
  <text x="480" y="185" font-family="ui-monospace, SFMono-Regular, monospace" font-size="9" fill="#6B6750">Matches natural</text>
  <text x="480" y="197" font-family="ui-monospace, SFMono-Regular, monospace" font-size="9" fill="#6B6750">user behavior</text>
  <!-- Connecting arrows -->
  <line x1="160" y1="112" x2="215" y2="43" stroke="#6B6750" stroke-width="1.5" marker-end="url(#choice-arrow)"></line>
  <line x1="160" y1="112" x2="215" y2="93" stroke="#6B6750" stroke-width="1.5" marker-end="url(#choice-arrow)"></line>
  <line x1="160" y1="112" x2="215" y2="143" stroke="#6B6750" stroke-width="1.5" marker-end="url(#choice-arrow)"></line>
  <line x1="160" y1="112" x2="215" y2="193" stroke="#4A4317" stroke-width="2" marker-end="url(#choice-arrow)"></line>
</svg>
<div class="cs-sm-note">Figure 2: Alternatives considered. The dates-fixed insight from search behavior eliminated three options.</div>
</div>

<div class="cs-eyebrow">V</div>

## The build

The technical lift was real but bounded. Surfacing nearby hotels with confirmed availability and live pricing meant calling the availability and pricing APIs for the candidate hotels in real time when the user hit the dead-end screen, rather than rendering a static list. That added a few seconds to page load on a screen that previously rendered instantly.

I made the trade. A user who has just hit a dead-end has already absorbed a small failure. A 2-3 second wait to be shown working alternatives was a much better experience than an instant render of a list they had to manually verify hotel by hotel.

The candidate selection logic was: same geographic area, same star rating bucket, same price tier as the originally selected hotel. The goal was not to upsell or cross-sell. It was to surface what looked, to the user, like the same booking they had just tried to make.

<div class="cs-eyebrow">VI</div>

## The test

50/50 A/B against the existing screen, ~3 weeks of runtime to hit 7 consecutive days of statistical significance given the traffic on this part of the funnel.

I had modeled a 20% recovery rate going in. The test came back at 30%. The annualized lift was ~$14M in recovered bookings, and it didn't cannibalize anything else (no measurable impact on email recapture, return-visitor bookings, or other funnels).

<div class="cs-eyebrow">VII</div>

## The blind spot

Here's the part I almost missed.

The original "no availability" screen had a prominent "call our customer service team" CTA on it. When I shipped the recovery experience, I left that CTA in place, untouched. The win was clear, the test was positive, I moved on.

A few weeks later, looking at the segment data more closely, the call-volume number from that screen was not falling in proportion with the booking lift. Users were finding the recovery surface, but a meaningful subset were still calling CS instead of booking the alternative online. Online bookings were cheaper to fulfill than CS-assisted bookings by a substantial margin.

I de-emphasized the call CTA in a follow-on test. Online bookings rose, CS calls fell, total bookings held. The original $14M number was understated, because the first version of the recovery surface was competing with a CS button I should have moved or removed in the first ship.

The lesson: when you redesign a state with multiple CTAs, redesign all of them. Leaving an old CTA "unchanged for now" is a decision, not a non-decision, and it can suppress the lift you're measuring.

<div class="cs-eyebrow">VIII</div>

## What this changed

The dead-end framing extended past the no-availability case. The team started treating other terminal states (sold-out date ranges, search-with-no-results, payment failures) as recovery surfaces with their own design opportunity, rather than as states to clean up.

The next planned extension was a nearby-dates pattern for the ~40% of users who weren't booking tonight or tomorrow night, paired with a map visualization comparing the original hotel to nearby alternatives. That work was scoped and prioritized but didn't ship before I left the company.

<div class="cs-eyebrow">IX</div>

## What I'd do differently

Two things.

First, I'd audit every CTA on the redesigned screen as part of the same ship, not as a follow-on. The call-CS oversight cost real money for the weeks it sat live.

Second, I'd model the recovery rate more aggressively. I came in at 20% and the actual was 30%, which sounds like a happy surprise but it actually means I under-prioritized the work going in. If I'd modeled 30%, this project would have shipped a quarter sooner, and the $14M would have started compounding earlier. Conservative modeling on high-intent recovery surfaces is a habit worth questioning.

The bigger takeaway, the one that has stuck with me since: in any funnel, the moments of highest user intent and highest user frustration are the same moments. The dead-end states are where users want the product to work the most. Treating them as design opportunities rather than inventory problems is one of the highest-leverage patterns I know.
