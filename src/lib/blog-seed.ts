import type { BlogPost } from "@/lib/blog-store.server";

// Curated, full-length articles shown as real /blog/[slug] pages.
// These are merged with any posts created through the admin portal.
function mk(
  slug: string, title: string, category: string, excerpt: string,
  coverImage: string, dateISO: string, content: string,
): BlogPost {
  const ts = new Date(dateISO).getTime();
  return {
    id: `SEED-${slug}`, slug, title, category, excerpt,
    author: "Maxvolt Energy", coverImage, published: true,
    createdAt: ts, updatedAt: ts, content: content.trim(),
  };
}

export const SEED_POSTS: BlogPost[] = [
  mk(
    "lithium-vs-lead-acid-e-rickshaw",
    "Lithium vs Lead-Acid for E-Rickshaws: The Real Cost of Ownership",
    "Product Guide",
    "Lead-acid batteries look cheaper upfront, but lithium wins decisively on lifespan, range and daily earnings. Here's the math every e-rickshaw owner should see.",
    "/images/product/e-rickshaw-lithium-battery-ohn.webp",
    "2026-05-20",
    `For an e-rickshaw driver, the battery is the single most important investment after the vehicle itself. The choice between a traditional lead-acid pack and a modern lithium (LiFePO4 / LFP) pack determines daily range, charging downtime, and ultimately how much money the driver takes home each month.

Lead-acid batteries carry a lower sticker price, which is why many first-time buyers choose them. But they typically last only 12–18 months, lose capacity quickly in Indian heat, and require 8–10 hours to fully charge. That charging time is income lost — every hour on the charger is an hour the rickshaw is not earning.

Maxvolt's LiFePO4 e-rickshaw packs are built for a very different economics. With a usable life of several years and thousands of charge cycles, a single lithium pack often outlasts three or four lead-acid replacements. Fast charging means the vehicle is back on the road in a fraction of the time, and a smart Battery Management System (BMS) protects against overcharge, deep discharge and thermal stress.

When you add up replacement frequency, charging downtime, and maintenance, lithium delivers a dramatically lower total cost of ownership despite the higher upfront price. For a working driver, that translates directly into more trips, more range per charge, and more rupees earned every single day.

If you are switching from lead-acid, look at three numbers: voltage (Maxvolt e-rickshaw packs are 51.2V), capacity (86Ah–200Ah depending on your daily distance), and warranty. Match the capacity to your route, and the pack will pay for itself well before it needs replacing.`,
  ),
  mk(
    "ais-156-battery-safety-standard-explained",
    "AIS 156 Explained: What India's Battery Safety Standard Means for You",
    "Safety & Compliance",
    "AIS 156 is India's mandatory EV battery safety standard. We break down what it tests, why it matters, and how to verify a battery is genuinely certified.",
    "/images/certificate/-zrp.webp",
    "2026-04-28",
    `AIS 156 is the Automotive Industry Standard that governs the safety of batteries used in electric vehicles in India. After several high-profile EV fire incidents, the standard was strengthened to ensure that every battery sold for EV use meets rigorous safety benchmarks before it reaches the road.

So what does AIS 156 actually test? The standard covers thermal propagation (how a single faulty cell affects its neighbours), short-circuit protection, overcharge and over-discharge behaviour, vibration and mechanical shock resistance, and overall pack-level safety. A battery that passes has demonstrated it can contain faults rather than cascade into a dangerous failure.

For buyers, AIS 156 certification is the clearest signal that a battery has been engineered and validated for safety — not just assembled to hit a price point. Every Maxvolt EV battery is AIS 156 certified, and our manufacturing includes multi-stage testing for charge/discharge cycling, thermal stress and BMS validation before any pack leaves the facility.

How do you verify a certificate is real? Ask for the Type Approval Certificate (TAC) that lists the specific battery model and rating. Maxvolt publishes its TAC certificates for models such as the 51.2V 105Ah e-rickshaw pack and multiple e-scooter packs, and they are available to view in full on our certificates page.

The bottom line: never compromise on certification. A certified battery costs a little more, but it protects your vehicle, your investment and — most importantly — your safety.`,
  ),
  mk(
    "how-to-choose-inverter-lithium-battery",
    "How to Choose the Right Lithium Inverter Battery for Your Home",
    "Product Guide",
    "Lithium inverter batteries last longer, charge faster and need zero maintenance. Here's how to pick the right voltage and capacity for your backup needs.",
    "/images/product/lithium-battery-energy-storage-solutions-tjf.webp",
    "2026-03-30",
    `Frequent power cuts make a reliable inverter battery essential for Indian homes and small businesses. While lead-acid tubular batteries have dominated this space for decades, lithium (LiFePO4) inverter batteries are quickly becoming the smarter long-term choice.

The first decision is voltage. Maxvolt offers lithium inverter batteries from 12.8V up to 51.2V. Lower voltages (12.8V) suit small inverters and single-room backup, while higher voltages (25.6V, 48V, 51.2V) pair with larger inverters running multiple appliances or whole-home loads.

Next is capacity, measured in amp-hours (Ah). Maxvolt's range spans 100Ah to 300Ah. To size it, estimate your backup load in watts and the hours of backup you need, then choose a capacity that comfortably covers it with headroom. A higher Ah rating means longer runtime between charges.

Why lithium over lead-acid for backup? Lithium packs deliver a much higher usable depth of discharge, charge significantly faster, last far more cycles, and are completely maintenance-free — no water topping, no acid fumes, no corrosion. They are also lighter and more compact for the same usable energy.

Every Maxvolt inverter battery includes a smart BMS that manages cell balancing and protects against overcharge, deep discharge and short circuits. The result is dependable, silent, maintenance-free backup that easily outlasts several lead-acid replacements.`,
  ),
  mk(
    "solar-battery-storage-roi",
    "Solar Battery Storage: How Lithium Maximizes Your Solar ROI",
    "Solar Energy",
    "A solar panel only pays back when you can store what it generates. Here's how a lithium storage system turns daytime sunshine into round-the-clock savings.",
    "/images/product/lithium-battery-for-solar-application-zhs.webp",
    "2026-02-26",
    `Solar panels generate the most power exactly when many homes and businesses use the least — the middle of the day. Without storage, that surplus energy is either exported cheaply or wasted entirely. A lithium solar battery storage system captures it so you can use clean, free energy in the evening and overnight.

Maxvolt's solar battery storage systems scale from 48V to 120V and from 100Ah up to 500Ah, covering everything from residential rooftops to large commercial installations. The LiFePO4 chemistry is ideal for solar: it tolerates daily deep cycling, holds up over thousands of cycles, and delivers more than 95% round-trip efficiency, so very little of your stored solar energy is lost.

The return-on-investment case is straightforward. By shifting solar energy from daytime generation to evening consumption, you cut your reliance on grid power during peak tariff hours. Over the multi-year life of a lithium pack, those daily savings add up to far more than the cost of the storage system — while also providing backup during outages.

Maxvolt systems include app-enabled monitoring so you can track state of charge, energy flow and system health from your phone. Combined with a long cycle life and minimal maintenance, that makes lithium storage the component that finally lets a solar investment deliver its full value — day and night.`,
  ),
  mk(
    "maxvolt-reearth-battery-recycling",
    "Maxvolt ReEarth: Building a Circular Economy for Lithium Batteries",
    "Sustainability",
    "Every battery has a second life. Maxvolt ReEarth recovers lithium, cobalt, nickel and manganese to close the loop on sustainable energy.",
    "/images/category/why-choose-us-wrn.webp",
    "2026-01-25",
    `The clean-energy transition cannot be truly clean unless we solve what happens to batteries at the end of their life. That is the mission of Maxvolt ReEarth, a subsidiary dedicated to establishing one of India's first dedicated lithium-ion battery recycling ecosystems.

ReEarth's recycling plant in Aligarh, Uttar Pradesh, is being built with a 7,800 metric-tonne-per-year recycling capacity. It collects used batteries from multiple sources — EV packs, telecom backup units and energy-storage systems — and processes them to recover high-value materials including lithium, cobalt, nickel and manganese.

The advanced recycling process combines mechanical processing, hydrometallurgical extraction and direct lithium recycling to recover materials at high purity and efficiency. Crucially, the process is compatible with multiple chemistries — LFP, NMC, NCA and LCO — so it can handle the full diversity of batteries entering the waste stream.

Recovered materials flow straight back into new production: lithium and other metals re-enter the supply chain to build new EV, telecom and renewable-energy batteries. This "closing the loop" approach reduces the need for fresh mining, lowers carbon footprint, and supports a genuinely circular battery economy.

For Maxvolt, ReEarth is more than compliance — it is a commitment to recycling today so we can repower tomorrow. Manufacture, use, recycle, repeat.`,
  ),
  mk(
    "custom-lithium-battery-packs-applications",
    "Custom Lithium Battery Packs: Powering Medical, IoT and Industrial Devices",
    "Technology",
    "Beyond EVs, lithium powers ultrasound machines, CCTV, routers and power tools. Here's how Maxvolt engineers application-specific custom packs.",
    "/images/product/customized-battery-solution-jkz.webp",
    "2025-12-18",
    `Not every device fits a standard battery. Medical equipment, industrial tools, surveillance systems and portable electronics each demand a specific combination of voltage, capacity, size and discharge behaviour. That is where Maxvolt's customized lithium battery solutions come in.

Our in-house R&D team designs application-specific packs from the cell up. Tell us your voltage, capacity, form factor, discharge profile and operating environment, and we engineer a pack built precisely for that use case — complete with an advanced smart BMS tuned to the application.

The range of applications is broad. In healthcare, Maxvolt packs power ultrasound machines, ECG units and BP monitors, where reliability and clean, stable power are non-negotiable. In industry, our packs run cordless mechanical tools and equipment that demand high discharge currents. And in everyday electronics, we build packs for power banks, flashlights, router backup UPS, CCTV and surveillance systems, toys, hobby devices and IoT gadgets.

Medical and industrial batteries are offered in common 12V and 24V configurations across 12Ah to 80Ah, but custom voltages and capacities are available on request. Every pack carries the same safety-first engineering and quality testing as our EV range.

Whether you are an OEM building a new product or replacing an ageing battery in existing equipment, a custom Maxvolt pack delivers the exact performance your application needs. Get in touch with your specification and our team will engineer the right solution.`,
  ),
];

export function seedBySlug(slug: string) {
  return SEED_POSTS.find((p) => p.slug === slug);
}
