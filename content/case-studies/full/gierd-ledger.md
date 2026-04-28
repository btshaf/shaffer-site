<div class="cs-hero">
  <div class="cs-hero-side">
    <div class="label">Before</div>
    <div class="cs-hero-pill">settled_flag: BOOLEAN</div>
  </div>
  <div class="cs-hero-arrow">→</div>
  <div class="cs-hero-side">
    <div class="label">After</div>
    <div class="cs-hero-after">
      <span class="cs-badge cs-badge--estimated">Estimated</span>
      <span class="cs-badge cs-badge--unsettled">Unsettled</span>
      <span class="cs-badge cs-badge--settled">Settled</span>
      <span class="cs-badge cs-badge--reconciled">Reconciled</span>
    </div>
  </div>
</div>

<div class="cs-eyebrow">I</div>

## TL;DR

When I joined Gierd in September 2025, the platform's transaction ledger was a single boolean: settled, or not. About 50 enterprise customers including AT&T, Verizon, and Acer needed unit-level margin visibility across seven marketplaces, and the data layer could not produce it. Gierd's internal operations team was burning roughly 80 hours a month reformatting and normalizing financial data by hand to keep enterprise customers serviced.

I rebuilt the ledger as a four-state lifecycle (<span class="cs-badge cs-badge--estimated">Estimated</span> <span class="cs-badge cs-badge--unsettled">Unsettled</span> <span class="cs-badge cs-badge--settled">Settled</span> <span class="cs-badge cs-badge--reconciled">Reconciled</span>), added an append-only audit log, normalized cost and revenue across the seven marketplaces, and layered AI anomaly detection on top of the normalized foundation. The work returned the 80 monthly hours to ops, gave finance teams the audit trail their accounting workflows already assumed existed, and surfaced negative-margin channel exposure that had been hiding inside aggregate marketplace payouts.

<div class="cs-eyebrow">II</div>

## Context

Gierd is a B2B SaaS marketplace orchestration platform. Enterprise sellers use it to coordinate inventory, pricing, and reporting across seven channels, including Amazon, eBay, Walmart, and Backmarket. The customer list at the time included national carriers, consumer electronics brands, and other enterprise sellers operating at scale across all seven channels.

I joined as Senior Product Manager owning the finance pillar. The existing ledger had shipped just before I arrived.

<div class="cs-timeline">
  <div>
    <div class="when">Sept 2025</div>
    <div class="what">Joined Gierd. Inherited the binary ledger.</div>
  </div>
  <div>
    <div class="when">Weeks 1&ndash;4</div>
    <div class="what">Discovery. Mapped the per-customer logic and where the 80 ops hours per month were going.</div>
  </div>
  <div>
    <div class="when">Approval</div>
    <div class="what">Reframed the case. CEO and COO approved the rebuild against initial instincts.</div>
  </div>
  <div>
    <div class="when">~2 months</div>
    <div class="what">Build. Multi-state ledger, audit log, source attribution, semantic layer in parallel.</div>
  </div>
  <div>
    <div class="when">Q1 2026</div>
    <div class="what">Shipped. Anomaly detection layered on top of the normalized foundation.</div>
  </div>
</div>

<div class="cs-eyebrow">III</div>

## The problem

The ledger had been built to spec, but the spec had been pulled from Gierd's internal operations team and accountant, not from the enterprise finance teams whose audit and close obligations the data ultimately had to serve.

It was a binary state model. Each transaction record carried a `settled_flag BOOLEAN`. Either a transaction was settled, or it was not. There was no representation of the lifecycle in between. There was no variance tracking between an estimated value and what eventually settled. There was no audit log on changes. There was no source attribution telling you whether a record came from a channel API, a CSV import, or a planning configuration.

That last list is what enterprise finance teams need a ledger to be. Audit-ready trails. Variance between estimated and settled. Provenance on every record. Gierd's customer-facing positioning had been written on the assumption that the data layer could deliver those things. The data layer could not.

The visible symptom was that customers and ops users could see individual transactions in the app, but the response from enterprise customers in nearly every conversation was, "what am I supposed to do with this." They could not answer the question they had bought the platform to answer: which channels, which units, are we making money on.

The invisible symptom was operational. To keep customers serviced, Gierd's internal operations team was spending roughly 80 hours a month on manual work: reformatting marketplace exports, producing estimated-versus-settled summaries by hand, and normalizing financials at the channel and omnichannel level. Every one of the seven marketplaces reported financials in its own structure. None of them reconciled cleanly to the others. The 80 hours was the cost of bridging the gap between what the platform could compute and what enterprise finance teams needed to consume.

The deeper problem was structural. Per-customer logic had been layered on top of the unnormalized foundation to paper over specific reporting gaps for specific accounts. Every new feature on the existing ledger compounded that per-customer logic. Building anything omnichannel on financial data was approaching impossible. The next feature would make the next feature harder.

<div class="cs-eyebrow">IV</div>

## The conflict before any work could start

The strategic question I walked into was not whether to rebuild the ledger. It was whether anyone would let me.

Leadership wanted features. Most of the leadership team believed the data was in usable shape and that engineering should move directly to building new in-app financial features on top of it. The opportunity cost they were pricing was visible: a quarter of no new features in a market where competitors were shipping.

I disagreed. I spent the first weeks doing discovery rather than arguing. I researched what a financial ledger has to be at enterprise scale: append-only audit trails, variance tracking between estimated and reconciled states, export structure that drops directly into the accounting systems on the receiving end without manual rework. I mapped where the per-customer logic was concentrated and what it was hiding. I sat with the operations team and accounted for where the 80 hours a month was actually going.

Then I came back with a specific ask: two months of engineering for the ledger rebuild, plus parallel work from the data team on a semantic layer to standardize metrics. The trade-off I was asking for was approximately one quarter without new in-app financial features.

The first answer was no. The second answer, after I reframed the case, was yes.

The reframing was the work. The pitch I had walked in with was about architecture: state machines, variance tracking, audit logs. Executives correctly do not care about state machines. They care about what becomes possible after the state machine exists. The version that got approved was framed entirely in terms of unlocks. Unit-level margin dashboards that would replace the 80 hours a month of ops reformatting. True anomaly detection that could surface margin leaks aggregate payouts were hiding. Faster enterprise onboarding because per-customer logic would be solved at the data layer instead of reinvented per account. Same work. Different frame. The frame is what got the approval.

I had a fallback ready that I never had to use. If the rebuild had been rejected, I was going to propose rebuilding the ledger for a single marketplace as proof, then expanding. I was not willing to build features on the broken foundation. I was willing to negotiate on scope.

<div class="cs-eyebrow">V</div>

## The approach

Once approved, the rebuild was scoped as a single milestone with three layers: the data model, the audit and provenance layer, and the surface area in the Ledger Transactions UI.

<div class="cs-beforeafter">
  <div class="ba-before">
    <div class="ba-label">Before</div>
    <div class="ba-binary">settled_flag: BOOLEAN</div>
    <ul>
      <li>No variance tracking</li>
      <li>No audit log on state changes</li>
      <li>No source attribution</li>
      <li>Per-customer logic compounding per feature</li>
    </ul>
  </div>
  <div class="ba-after">
    <div class="ba-label">After</div>
    <div style="display: flex; flex-wrap: wrap; gap: 0.375rem; margin-bottom: 1rem;">
      <span class="cs-badge cs-badge--estimated">Estimated</span>
      <span class="cs-badge cs-badge--unsettled">Unsettled</span>
      <span class="cs-badge cs-badge--settled">Settled</span>
      <span class="cs-badge cs-badge--reconciled">Reconciled</span>
    </div>
    <ul>
      <li>variance_delta on every estimated record</li>
      <li>Append-only audit log on every transition</li>
      <li>source_attribution + import_job_id</li>
      <li>Per-customer logic retiring</li>
    </ul>
  </div>
</div>

### Four-state transaction model

The boolean became an enum. Every transaction now carries one of four states at any given time:

- <span class="cs-badge cs-badge--estimated">Estimated</span> &nbsp; amount is known or calculable before the channel has reported anything. Either from a customer's planning configuration (subsidies, co-funded coupons, commission breaks) or from the channel fee rate table applied to an incoming order.
- <span class="cs-badge cs-badge--unsettled">Unsettled</span> &nbsp; the channel has confirmed the transaction. Payout has not arrived.
- <span class="cs-badge cs-badge--settled">Settled</span> &nbsp; payout has arrived, invoice received, or imported data committed. Amount is final.
- <span class="cs-badge cs-badge--reconciled">Reconciled</span> &nbsp; validated as part of a formal close process. Immutable. Reversals create a new Unsettled transaction referencing this record. The Reconciled record is never modified.

Valid transitions:

<div class="cs-statemachine">
<svg viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Transaction state machine. Estimated transitions to Unsettled, Unsettled to Settled, Settled to Reconciled. CSV Import enters directly at Settled.">
  <defs>
    <marker id="cs-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6B6750"></path>
    </marker>
  </defs>
  <rect x="400" y="30" width="140" height="42" rx="6" fill="#F5F2E5" stroke="#BFB89D" stroke-width="1" stroke-dasharray="4 3"></rect>
  <text x="470" y="56" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="12" fill="#6B6750" letter-spacing="0.06em">CSV IMPORT</text>
  <line x1="470" y1="72" x2="470" y2="148" stroke="#6B6750" stroke-width="1.5" marker-end="url(#cs-arrow)"></line>
  <rect x="40" y="155" width="140" height="42" rx="999" fill="rgba(107,103,80,0.12)" stroke="#BFB89D"></rect>
  <text x="110" y="181" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="12" font-weight="600" fill="#6B6750" letter-spacing="0.08em">ESTIMATED</text>
  <rect x="220" y="155" width="140" height="42" rx="999" fill="rgba(139,105,20,0.12)" stroke="rgba(139,105,20,0.5)"></rect>
  <text x="290" y="181" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="12" font-weight="600" fill="#8B6914" letter-spacing="0.08em">UNSETTLED</text>
  <rect x="400" y="155" width="140" height="42" rx="999" fill="rgba(44,74,107,0.12)" stroke="rgba(44,74,107,0.5)"></rect>
  <text x="470" y="181" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="12" font-weight="600" fill="#2C4A6B" letter-spacing="0.08em">SETTLED</text>
  <rect x="580" y="155" width="140" height="42" rx="999" fill="rgba(77,107,46,0.14)" stroke="rgba(77,107,46,0.5)"></rect>
  <text x="650" y="181" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, monospace" font-size="12" font-weight="600" fill="#4D6B2E" letter-spacing="0.08em">RECONCILED</text>
  <line x1="180" y1="176" x2="215" y2="176" stroke="#6B6750" stroke-width="1.5" marker-end="url(#cs-arrow)"></line>
  <line x1="360" y1="176" x2="395" y2="176" stroke="#6B6750" stroke-width="1.5" marker-end="url(#cs-arrow)"></line>
  <line x1="540" y1="176" x2="575" y2="176" stroke="#6B6750" stroke-width="1.5" marker-end="url(#cs-arrow)"></line>
</svg>
<div class="cs-sm-note">CSV-imported cost transactions enter as Settled immediately. Reversals against a Reconciled record create a new Unsettled transaction referencing the original. The Reconciled record itself is never modified.</div>
</div>

### Append-only audit log

Every state transition writes a new row to an immutable audit log: transaction ID, from-state, to-state, the system event or user that triggered the transition, the user ID if user-triggered, and a timestamp. The log is never modified or deleted. Reconciled records cannot be modified by any system operation, enforced at the data model layer rather than only at the application layer.

Reversals against Reconciled transactions do not edit the original. They create a new Unsettled transaction that references the original by ID. The original Reconciled record stays exactly as it was at close.

This was the audit trail Gierd's customer-facing positioning had assumed existed. It now did.

### Variance tracking

Estimated records are not just a planning-time entry. They flow through the same lifecycle as everything else, with variance captured at each transition.

For planning-area inputs (subsidies, co-funded coupons, commission breaks), the Estimated record is created from the customer's own configuration. When the channel confirms it, it transitions to Unsettled. When the payout arrives, it transitions to Settled.

For channel fees, the Estimated record is created at order ingestion from the expected fee percentage and amount in the channel fee rate table. When the actual fee comes through with the order from the channel, the record transitions to Unsettled. When the payout finalizes the fee, it transitions to Settled.

Same three states. Same lifecycle. What differs is the source of the Estimated value: customer configuration in one case, the rate table in the other. At each transition, `variance_delta` is calculated and attached to the record. Finance teams now had two distinct variance points on every record: estimated versus what came through at order time, and what came through at order time versus what landed at payout. Both stay attached permanently.

### Source attribution

Every record carries a `source_attribution` field assigned at creation: Channel API, CSV Import, or Planning Configuration. System-assigned, immutable, never editable from the UI. CSV Import records carry an `import_job_id` that links back to the source file, so a user clicking a transaction can trace it directly to the file someone uploaded.

Provenance on every record solved a class of conversations that had been impossible: "where did this number come from."

### Surface area

The data work was not visible until it surfaced. Four reads were added to the existing Ledger Transactions view: a colored state badge on every row (<span class="cs-badge cs-badge--estimated">Estimated</span> grey, <span class="cs-badge cs-badge--unsettled">Unsettled</span> yellow, <span class="cs-badge cs-badge--settled">Settled</span> blue, <span class="cs-badge cs-badge--reconciled">Reconciled</span> green), a Source column showing whether the row came from a channel, an import, or a planning configuration, a File column linking imported transactions back to the import job that created them, and a state filter alongside the existing filter set.

None of those required new write paths. They were reads against fields the data layer now had.

### Anomaly detection on top

Once the normalized ledger existed, I layered AI anomaly detection on top of it. The detection surfaces channel-level negative-margin exposure that aggregate marketplace payouts had been masking. A customer's overall payout from a marketplace might be positive while a specific channel inside that marketplace was losing money on every unit. The detection flagged those channels and gave operators a path to reallocate inventory toward positive-margin channels.

The shipped feature, from a marketing perspective, was the AI. The work that mattered was the foundation underneath it.

<div class="cs-eyebrow">VI</div>

## Results

The ledger rebuild shipped in approximately the two-month engineering estimate. The data team's semantic layer landed in the same quarter.

Quantitative outcomes:

- ~80 hours per month returned to Gierd's internal operations team. The reconciliation, normalization, and reformatting they had been doing by hand was now produced by the platform.
- Audit-ready financial data with true variance tracking between estimated and settled states. The append-only log and immutable Reconciled state matched the audit trail Gierd's customer-facing positioning had assumed existed.
- Unit-level profitability analysis available for the first time across ~50 enterprise customers including AT&T, Verizon, and Acer, on transactions normalized across seven marketplaces.
- Negative-margin channel exposure surfaced for early users. In every case I observed, the user had not previously been aware of which specific channels were losing money. Inventory reallocation toward positive-margin channels followed.

Qualitative outcomes:

- Per-customer logic at the application layer started to retire. New enterprise onboarding stopped requiring custom reporting work, because the data layer now produced the reports the customer needed by default.
- The conversation with enterprise finance teams shifted. They stopped asking "what am I supposed to do with this" and started asking which channels to grow.

<div class="cs-eyebrow">VII</div>

## Key insight

<div class="cs-pullquote">The shipped feature was anomaly detection. The real work was the ledger rebuild underneath it.</div>

You cannot do meaningful financial analysis on data that has not been normalized, and you cannot do anomaly detection on data that does not know what state it is in. Most PMs would have started with the AI layer because it is the visible deliverable. I started with the infrastructure because the AI layer is worthless without it.

<div class="cs-eyebrow">VIII</div>

## What I'd do differently

The version of this section a reader might expect to see is "I should have brought enterprise finance leaders into the spec earlier." That option was not available. Gierd was selling the analysis as a service: enterprise customers paid for the platform and for ops and finance staff inside Gierd to do the heavy reconciliation and reporting work on their behalf. The 80 hours a month of internal labor was that service. Customers' finance teams consumed Gierd's deliverables; they did not operate the platform themselves. The people who knew the customer requirements inside and out were Gierd's ops and finance staff, doing the work every month. They were the right audience for the spec. I used them.

What I would change is how I led the first stakeholder conversation. I pitched the architecture. I should have pitched the outcomes from the start.

The first version of the pitch was about state machines, variance tracking, and audit logs. That version failed. The version that got approved was framed entirely around outcomes. If I were running it over, the first conversation would have been outcome-led:

- The unit-level margin visibility enterprise customers had been asking for, that the platform could not produce.
- Exports that drop directly into enterprise accounting systems without manual rework.
- A semantic layer over the normalized ledger giving every part of the app a single source of truth on key metrics, so internal numbers reconciled to the same definition and lined up cleanly against marketplace data. The lack of that single source of truth was already a problem inside the company before it became a customer-facing one.

Executives are correctly biased toward visible output, especially early in a company's life. Product's job in this kind of decision is not to win a technical argument. It is to translate the architecture into the outcomes it makes possible, and to lead the conversation with those outcomes from the start. "Multi-state ledger with append-only audit logs and variance tracking" is not a sentence that gets approved. "Cut 80 hours of monthly ops cost, give finance teams the audit trail your contracts already assume, and unblock unit-level margin analysis for the customers paying you the most" is the same project. It gets approved.
