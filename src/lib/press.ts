// Press releases / newsroom — replicated from maxvoltenergy.com/press-release
// The source site published ~60 SEO doorway variants of ~18 distinct stories.
// We consolidate them into the distinct, canonical stories for a premium newsroom.
// Authentic headlines, dates and excerpts are preserved; body copy is expanded
// into full press-release form consistent with each source summary.

export type PressCategory =
  | "Company News"
  | "Product & Technology"
  | "Sustainability"
  | "Industry & Policy"
  | "Financial"
  | "CSR";

export interface PressRelease {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  category: PressCategory;
  excerpt: string;
  image: string;
  body: string[];
  source?: { label: string; url: string };
}

export const PRESS_RELEASES: PressRelease[] = [
  {
    slug: "73-million-investment-energy-storage-recycling",
    title: "Maxvolt Accelerates Growth with $73 Million Investment in Energy Storage & Recycling",
    date: "2026-05-30",
    category: "Company News",
    excerpt:
      "Expanding beyond EV batteries, Maxvolt is investing in BESS, lithium recycling, and next-generation battery manufacturing while establishing a stronger presence across South India to meet the growing demand for sustainable energy solutions.",
    image: "/images/press/73-million-investment-energy-storage-recycling.webp",
    body: [
      "Maxvolt Energy Industries Limited has announced a landmark $73 million investment to accelerate its expansion across battery energy storage systems (BESS), lithium-ion battery recycling, and next-generation cell-to-pack manufacturing. The capital deployment marks the company's most ambitious growth phase since its 2019 founding and its listing on the NSE SME Emerge platform.",
      "A significant portion of the investment is directed toward scaling the company's manufacturing footprint — including its expanded 55,000 sq ft Duhai facility in Ghaziabad — and building out the ReEarth recycling ecosystem that recovers lithium, cobalt, nickel and manganese from spent batteries. Together these initiatives are designed to close the loop on India's battery supply chain.",
      "Beyond EV batteries, Maxvolt is investing heavily in grid-scale and commercial energy storage, where demand is rising sharply as India integrates more renewable generation. The company is also establishing a stronger presence across South India, adding warehousing, service infrastructure and dealer support to serve fast-growing Tier-2 and Tier-3 markets.",
      "\"This investment reflects our conviction that India's energy transition will be powered by domestic manufacturing and circular-economy thinking,\" the company noted. \"We are building capacity not just for today's two- and three-wheeler demand, but for the storage and recycling needs of the next decade.\"",
    ],
  },
  {
    slug: "fuel-prices-west-asia-tensions-accelerate-ev-adoption",
    title: "Fuel Price Hikes and West Asia Tensions Accelerate EV Adoption, Boosting Demand for Maxvolt Energy Solutions",
    date: "2026-05-23",
    category: "Industry & Policy",
    excerpt:
      "Rising fuel prices and geopolitical tensions are pushing EV adoption beyond metros into Tier-2 and Tier-3 markets, driving strong demand for electric two-wheelers, three-wheelers and commercial mobility.",
    image: "/images/press/fuel-prices-west-asia-tensions-accelerate-ev-adoption.webp",
    body: [
      "Amid rising fuel prices, energy-security concerns and growing geopolitical tensions in West Asia, electric vehicles are rapidly emerging as a practical and cost-effective alternative across India. The shift is no longer limited to metro cities — Tier-2 and Tier-3 markets are now witnessing strong growth in EV adoption.",
      "Industry data indicates that smaller cities are becoming key growth centres for electric two-wheelers, three-wheelers and commercial mobility applications, driven by rising transportation costs, expanding e-commerce operations and the need for more efficient last-mile logistics.",
      "Maxvolt Energy, with its AIS 156-certified lithium battery portfolio and a dealer network spanning more than 1,100 pincodes, is well positioned to meet this surge in demand. The company's e-rickshaw and e-scooter battery ranges are seeing accelerating order volumes from fleet operators seeking lower total cost of ownership.",
      "As fuel volatility persists, Maxvolt expects the structural shift toward electric mobility to continue strengthening — reinforcing the role of reliable, locally manufactured battery solutions in India's clean-mobility growth story.",
    ],
  },
  {
    slug: "reearth-recycling-research-published-internationally",
    title: "Maxvolt ReEarth Research Paper on Lithium-Ion Battery Recycling Published Internationally",
    date: "2026-05-22",
    category: "Sustainability",
    excerpt:
      "Maxvolt ReEarth's research on advanced lithium-ion battery recycling technologies has gained international recognition, underscoring the company's commitment to a circular battery economy.",
    image: "/images/press/reearth-recycling-research-published-internationally.webp",
    body: [
      "Maxvolt ReEarth — the dedicated battery-recycling subsidiary of Maxvolt Energy Industries Limited — has announced that its research paper on advanced lithium-ion battery recycling technologies has been published in an international peer-reviewed forum, earning recognition from the global research community.",
      "The study explores improved hydrometallurgical and pyrometallurgical pathways for recovering critical materials — including lithium, cobalt, nickel and manganese — from end-of-life LFP, NMC, NCA and LCO cells, with a focus on higher recovery yields and lower environmental impact.",
      "The publication reinforces ReEarth's positioning as a research-led recycler at a time when India is preparing for a wave of end-of-life EV and energy-storage batteries. ReEarth's upcoming Aligarh, Uttar Pradesh plant is designed to process 7,800 metric tonnes of spent batteries per year.",
      "\"Recycling is not an afterthought for us — it is core to how we think about responsible battery manufacturing,\" the ReEarth team noted. \"Publishing our research internationally is a step toward building credibility and collaboration across the global circular-economy ecosystem.\"",
    ],
  },
  {
    slug: "maxvolt-crosses-100-crore-revenue",
    title: "Maxvolt Energy Crosses ₹100 Crore Revenue Mark, Strengthening Its Position in India's Lithium Battery Sector",
    date: "2026-05-16",
    category: "Financial",
    excerpt:
      "Manufacturing Today India highlights Maxvolt Energy's rapid growth trajectory as the company surpasses ₹100 crore in revenue, driven by increasing demand for lithium-ion battery solutions across EV and energy-storage applications.",
    image: "/images/press/maxvolt-crosses-100-crore-revenue.webp",
    body: [
      "Maxvolt Energy Industries Limited has surpassed the ₹100 crore revenue milestone, marking a defining moment in the company's journey from a 15-battery-per-day startup in 2019 to one of India's fastest-growing lithium-ion battery manufacturers.",
      "The achievement is driven by increasing demand for lithium-ion battery solutions across electric vehicles and energy-storage applications. Maxvolt continues to expand its manufacturing capabilities, innovation focus and market presence within India's clean-energy ecosystem.",
      "The milestone reflects strong year-on-year growth, strategic expansion of the company's dealer and OEM network, and a deepening commitment to advancing sustainable energy solutions. Maxvolt now produces 15,000+ battery packs per month and serves customers across more than 1,100 pincodes.",
      "Industry observers, including Manufacturing Today India, have highlighted the company's trajectory as emblematic of the broader momentum in India's domestic battery-manufacturing sector.",
    ],
    source: { label: "Manufacturing Today India", url: "https://www.manufacturingtodayindia.com" },
  },
  {
    slug: "energy-crisis-fuel-prices-accelerate-ev-adoption",
    title: "Energy Crisis and Rising Fuel Prices Accelerate EV Adoption, Strengthening Maxvolt's Role in India's Clean Mobility Growth",
    date: "2026-05-15",
    category: "Industry & Policy",
    excerpt:
      "As fuel prices climb and energy-security concerns mount, electric mobility is gaining momentum across India — with Tier-2 and Tier-3 markets emerging as key growth centres.",
    image: "/images/press/energy-crisis-fuel-prices-accelerate-ev-adoption.webp",
    body: [
      "Amid rising fuel prices, energy-security concerns and growing geopolitical tensions, electric vehicles are rapidly emerging as a practical and cost-effective alternative across India. The shift is no longer limited to metro cities, as Tier-2 and Tier-3 markets witness strong growth in EV adoption.",
      "Rising transportation costs, expanding e-commerce operations and the need for more efficient mobility solutions are driving the change. Industry data indicates that smaller cities are becoming key growth centres for electric two-wheelers, three-wheelers and commercial mobility applications.",
      "Maxvolt Energy's locally manufactured, AIS 156-certified lithium battery portfolio positions the company to capitalise on this momentum. Its growing service and dealer infrastructure ensures reliable after-sales support — a critical factor for fleet operators evaluating the switch to electric.",
      "The company views the current energy environment as a structural inflection point that will sustain EV demand well beyond short-term fuel-price cycles.",
    ],
  },
  {
    slug: "domestic-investors-shift-towards-ev-energy-leaders",
    title: "Domestic Investors Shift Towards EV and Energy Leaders as Market Volatility Boosts Confidence in Companies Like Maxvolt",
    date: "2026-05-15",
    category: "Financial",
    excerpt:
      "Amid record FII sell-offs and global uncertainty, Indian investors are increasingly favouring companies with strong balance sheets and resilient, domestically focused business models.",
    image: "/images/press/domestic-investors-shift-towards-ev-energy-leaders.webp",
    body: [
      "Amid a record foreign institutional investor (FII) sell-off and rising global economic uncertainty, Indian investors are increasingly turning towards companies with strong balance sheets, resilient business models and long-term growth potential.",
      "As fuel prices remain elevated and energy security becomes a growing concern, sectors linked to electric mobility, battery technology and domestic manufacturing are witnessing stronger investor confidence.",
      "Industry experts believe the trend reflects a broader shift towards self-funded growth, localized supply chains and businesses less exposed to global market disruptions — characteristics that describe companies like Maxvolt Energy, which manufactures domestically and serves a fast-growing home market.",
      "Maxvolt's NSE SME Emerge listing, ₹100+ crore revenue and expanding manufacturing base have made it a name to watch within India's clean-energy investment landscape.",
    ],
  },
  {
    slug: "iot-enabled-smart-bms-launch",
    title: "Maxvolt Energy Launches IoT-Enabled Smart BMS for Smarter Lithium Battery Solutions",
    date: "2026-05-14",
    category: "Product & Technology",
    excerpt:
      "Maxvolt's new IoT-enabled Smart Battery Management System brings real-time monitoring, enhanced safety and predictive intelligence to its lithium battery range.",
    image: "/images/press/iot-enabled-smart-bms-launch.webp",
    body: [
      "Maxvolt Energy has launched a new IoT-enabled Smart Battery Management System (BMS) that brings real-time monitoring, advanced safety and predictive intelligence to its lithium battery portfolio.",
      "The Smart BMS continuously tracks cell voltage, temperature, state-of-charge and state-of-health, transmitting data to a connected mobile application. This allows fleet operators and individual users to monitor battery performance remotely, receive proactive alerts and optimise charging behaviour.",
      "Key benefits include improved thermal management, protection against over-charge and deep-discharge, cell balancing for extended cycle life, and tamper and theft detection. The system is designed to meet AIS 156 safety requirements while delivering a smarter ownership experience.",
      "The launch reinforces Maxvolt's strategy of layering intelligence onto reliable hardware — transforming the battery from a passive component into a connected, data-rich asset for electric mobility and energy storage.",
    ],
  },
  {
    slug: "top-battery-stocks-to-watch-2026",
    title: "Maxvolt Energy Gains Media Spotlight Among India's Top Battery Stocks to Watch in 2026",
    date: "2026-05-12",
    category: "Financial",
    excerpt:
      "Maxvolt's consistent focus on innovation, advanced battery technology and sustainable energy solutions has earned it recognition among India's most promising battery companies for 2026.",
    image: "/images/press/top-battery-stocks-to-watch-2026.webp",
    body: [
      "Maxvolt Energy has been featured in the media spotlight as one of India's top battery companies to watch in 2026, reflecting growing investor and industry interest in the domestic lithium-battery sector.",
      "The recognition reflects Maxvolt's consistent focus on innovation, advanced battery technology and sustainable energy solutions tailored for electric scooters, e-rickshaws, energy-storage systems and emerging EV applications.",
      "With its growing portfolio of smart lithium battery solutions, IoT-enabled technologies and battery-recycling initiatives through ReEarth, the company is steadily building a strong footprint in India's next-generation energy sector.",
      "Maxvolt continues to scale capacity, deepen its dealer and OEM relationships, and invest in R&D — positioning itself for sustained growth as India's electric transition accelerates.",
    ],
  },
  {
    slug: "intelligent-energy-storage-grid-dynamics",
    title: "Intelligent Energy Storage Solutions Are Transforming Modern Grid Dynamics",
    date: "2026-05-10",
    category: "Industry & Policy",
    excerpt:
      "Advanced battery technologies, AI-driven monitoring and smart energy integration are reshaping grid dynamics — improving stability, optimising distribution and enabling greater renewable adoption.",
    image: "/images/press/intelligent-energy-storage-grid-dynamics.webp",
    body: [
      "As the global energy landscape shifts towards cleaner and smarter infrastructure, intelligent energy-storage solutions are playing a crucial role in reshaping grid dynamics and power-management systems.",
      "Advanced battery technologies, AI-driven monitoring and smart energy integration are helping utilities improve grid stability, optimise energy distribution and support the growing adoption of renewable energy sources. The evolution of energy storage is enhancing operational efficiency while enabling faster response times, reduced energy losses and greater reliability.",
      "With rising energy demands and ambitious sustainability goals, intelligent storage systems are becoming a key driver in building resilient, future-ready power ecosystems across industrial and commercial sectors.",
      "Maxvolt Energy's LiFePO4-based energy-storage systems, paired with smart BMS technology, are designed to meet exactly these requirements — delivering dependable round-the-clock performance for residential, commercial and grid applications.",
    ],
  },
  {
    slug: "l3-lfp-battery-solution-electric-mobility",
    title: "Maxvolt Energy Launches Advanced L3 LFP Battery Solution for Electric Mobility",
    date: "2026-05-08",
    category: "Product & Technology",
    excerpt:
      "Maxvolt's new 51.2V-105Ah L3 LFP battery pack features an intelligent BMS, AIS-156 compliant safety and smart monitoring — built for electric three-wheelers, cargo vehicles and light EV platforms.",
    image: "/images/press/l3-lfp-battery-solution-electric-mobility.webp",
    body: [
      "Expanding its innovation in sustainable energy solutions, Maxvolt Energy has introduced its advanced L3 Lithium Ferrous Phosphate (LFP) battery system designed specifically for electric-mobility applications.",
      "The 51.2V–105Ah battery pack comes equipped with an intelligent Battery Management System (BMS), AIS-156 compliant safety standards and smart monitoring features for enhanced efficiency and reliability.",
      "Built for electric three-wheelers, cargo vehicles and light EV platforms, the solution focuses on longer lifecycle, reduced maintenance and dependable performance in demanding Indian road and weather conditions.",
      "The launch further strengthens Maxvolt's commitment towards supporting India's growing clean-mobility ecosystem with next-generation battery technology.",
    ],
  },
  {
    slug: "delhi-draft-ev-policy-2026",
    title: "Delhi's Draft EV Policy 2026 Signals Major Shift for Delivery and Aggregator Fleets",
    date: "2026-05-06",
    category: "Industry & Policy",
    excerpt:
      "Delhi's Draft EV Policy 2026 proposes strict electrification timelines for delivery platforms and fleet aggregators, accelerating the shift to electric two- and three-wheelers in the capital.",
    image: "/images/press/delhi-draft-ev-policy-2026.webp",
    body: [
      "Marking a significant push towards cleaner urban mobility, Delhi's Draft EV Policy 2026 proposes strict electrification timelines for delivery platforms and fleet aggregators operating in the capital.",
      "The policy aims to phase out the induction of conventional petrol and diesel vehicles in aggregator fleets while accelerating the adoption of electric two-wheelers, three-wheelers and light commercial vehicles.",
      "With a balanced mix of incentives, infrastructure development and regulatory mandates, the draft policy is expected to reshape last-mile logistics and ride-hailing operations across Delhi. It also highlights the government's broader commitment to reducing vehicular emissions.",
      "For battery manufacturers like Maxvolt Energy, the policy represents a major demand catalyst — fleet electrification mandates translate directly into sustained orders for reliable, fast-charging lithium battery packs.",
    ],
  },
  {
    slug: "indian-bess-margins-execution-risks",
    title: "Tight Margins and Execution Risks: The New Reality for Indian BESS",
    date: "2026-05-04",
    category: "Industry & Policy",
    excerpt:
      "As India scales battery energy storage, developers face tight margins and execution risks — making domestic manufacturing, quality and lifecycle performance more important than ever.",
    image: "/images/press/indian-bess-margins-execution-risks.webp",
    body: [
      "India's battery energy storage system (BESS) market is scaling rapidly, but developers and integrators increasingly face tight margins and significant execution risks as competition intensifies and tariffs compress.",
      "Project economics now hinge on factors such as cell quality, cycle life, thermal management and the reliability of after-sales support. Poorly engineered systems can erode returns quickly through premature degradation and downtime.",
      "In this environment, domestic manufacturing and vertical integration become competitive advantages. Companies that control quality across cell selection, pack assembly and BMS intelligence are better placed to deliver bankable, long-life systems.",
      "Maxvolt Energy's LiFePO4 storage platforms — engineered for 3,000+ cycles with smart monitoring — are designed to address exactly these execution risks, helping developers protect project margins over the full asset lifecycle.",
    ],
  },
  {
    slug: "maxvolt-iit-roorkee-ai-powered-bms",
    title: "Maxvolt Energy & IIT Roorkee Forge AI-Powered Battery Management Breakthrough for Clean Mobility and Storage",
    date: "2026-04-30",
    category: "Product & Technology",
    excerpt:
      "Maxvolt Energy has partnered with IIT Roorkee to co-develop AI-driven Battery Management Systems integrating predictive analytics and real-time monitoring for next-generation EVs and energy storage.",
    image: "/images/press/maxvolt-iit-roorkee-ai-powered-bms.webp",
    body: [
      "Maxvolt Energy has entered into a strategic collaboration with the Indian Institute of Technology (IIT) Roorkee to co-develop advanced AI-driven Battery Management Systems (BMS) designed for next-generation energy-storage and electric-mobility solutions.",
      "The partnership aims to integrate artificial intelligence, predictive analytics and real-time data monitoring into battery systems to significantly enhance safety, efficiency, thermal management and lifecycle performance.",
      "By combining Maxvolt's manufacturing and product expertise with IIT Roorkee's research capabilities, the collaboration seeks to develop intelligent algorithms that can predict cell behaviour, pre-empt failures and optimise charging in real time.",
      "The initiative reflects a growing trend of industry-academia partnerships driving deep-tech innovation in India's clean-energy sector, and positions Maxvolt at the forefront of smart battery development.",
    ],
  },
  {
    slug: "maxvolt-reearth-closed-loop-recycling-ecosystem",
    title: "Maxvolt Energy Establishes 'Maxvolt ReEarth' to Create a Closed-Loop Lithium Battery Recycling Ecosystem in India",
    date: "2026-04-22",
    category: "Sustainability",
    excerpt:
      "Maxvolt Energy has launched Maxvolt ReEarth, a dedicated subsidiary building an end-to-end lithium battery recycling ecosystem to recover critical materials and drive India's circular economy.",
    image: "/images/press/maxvolt-reearth-closed-loop-recycling-ecosystem.webp",
    body: [
      "Maxvolt Energy Industries Limited has established Maxvolt ReEarth, a dedicated subsidiary tasked with building a closed-loop lithium-battery recycling ecosystem in India — from collection and processing to material recovery and reintegration.",
      "As India's fleet of EV and energy-storage batteries grows, responsible end-of-life management becomes critical. ReEarth is designed to recover lithium, cobalt, nickel and manganese from spent cells and return these critical materials to the battery supply chain.",
      "ReEarth's upcoming plant in Aligarh, Uttar Pradesh is engineered to process 7,800 metric tonnes of spent batteries per year, supporting LFP, NMC, NCA and LCO chemistries through advanced hydrometallurgical and pyrometallurgical processes. Phase 1 is scheduled to launch in January 2026.",
      "\"Maxvolt ReEarth completes our vision of responsible battery manufacturing,\" the company said. \"Every battery we make should have a responsible end of life — and the materials inside it should power the next generation of cells.\"",
    ],
  },
  {
    slug: "budget-2026-manufacturing-capex-ev-supply-chain",
    title: "Budget 2026 Puts Manufacturing at the Centre: ₹12.2 Trillion Capex, MSME Push and EV Supply Chain Reset",
    date: "2026-02-02",
    category: "Industry & Policy",
    excerpt:
      "Union Budget 2026 marks a decisive shift toward building India into a global manufacturing powerhouse, with record capex, an MSME growth fund, and duty-free EV battery manufacturing inputs.",
    image: "/images/press/budget-2026-manufacturing-capex-ev-supply-chain.webp",
    body: [
      "Union Budget 2026 marks a decisive shift toward building India into a global manufacturing powerhouse. With a record ₹12.2 trillion capital expenditure, the launch of India Semiconductor Mission 2.0, and a dedicated ₹10,000 crore MSME Growth Fund, the government has laid the foundation for industrial resilience and high-tech self-reliance.",
      "Targeted measures such as duty-free EV battery-manufacturing inputs, rare-earth corridors, revived industrial clusters and higher foreign-investment limits further strengthen India's position across electronics, mobility and advanced manufacturing.",
      "For domestic battery makers, the removal of duties on key manufacturing inputs is especially significant — it improves cost competitiveness against imports and supports localisation of the EV supply chain.",
      "Maxvolt Energy welcomes the budget's manufacturing-first orientation, which aligns closely with the company's Make-in-India strategy and its investments in domestic cell-to-pack capacity and battery recycling.",
    ],
  },
  {
    slug: "union-budget-2026-gst-reforms-infrastructure",
    title: "Union Budget 2026 Live: Industry Leaders Call for GST Reforms and Infrastructure Boost",
    date: "2026-02-01",
    category: "Industry & Policy",
    excerpt:
      "As the Economic Survey 2025-26 is tabled in Parliament, industry leaders across sectors advocate for rationalised GST rates, stronger credit ecosystems and an infrastructure boost.",
    image: "/images/press/union-budget-2026-gst-reforms-infrastructure.webp",
    body: [
      "Finance Minister Nirmala Sitharaman has officially tabled the Economic Survey 2025-26 in Parliament, setting the stage for the upcoming Union Budget 2026.",
      "Industry leaders across real estate, MSMEs, healthcare and clean energy have voiced key expectations — with experts advocating for rationalised GST rates, increased affordable-housing limits and enhanced credit ecosystems for small and growing businesses.",
      "Within the energy and mobility sectors, stakeholders are calling for continued incentives for domestic battery manufacturing, clearer storage-procurement frameworks and infrastructure investment to support EV charging and grid modernisation.",
      "Maxvolt Energy, as a growing domestic manufacturer, echoes the call for GST rationalisation on battery components and supportive policy that strengthens India's clean-energy supply chain.",
    ],
  },
  {
    slug: "budget-2026-round-the-clock-renewable-power",
    title: "Budget 2026: The Inflection Point for Reliable, Round-the-Clock Renewable Power in India",
    date: "2026-01-30",
    category: "Industry & Policy",
    excerpt:
      "As solar and wind capacity accelerates, the next phase of India's energy transition demands a sharper focus on storage, grid resilience and domestic clean-tech manufacturing.",
    image: "/images/press/budget-2026-round-the-clock-renewable-power.webp",
    body: [
      "As India approaches Union Budget 2026, the renewable-energy sector stands at a defining crossroads. While solar and wind capacity additions have accelerated, the next phase of growth demands a sharper focus on energy storage, grid resilience, domestic manufacturing and policy certainty.",
      "Industry expectations centre on battery energy-storage systems, pumped hydro, green hydrogen, robust transmission infrastructure and a strong 'Make in India' clean-tech supply chain — the building blocks of reliable, 24/7 clean power.",
      "Strategic fiscal and policy interventions can enable round-the-clock renewable power, attract long-term capital, create skilled jobs and position India as a global leader in the energy transition.",
      "Maxvolt Energy sees energy storage as the linchpin of this transition — and continues to invest in LiFePO4 storage systems and smart BMS technology that make renewable power dependable around the clock.",
    ],
  },
  {
    slug: "blanket-distribution-drive-noida-ghaziabad",
    title: "Maxvolt Energy Completes 7-Day Blanket Distribution Drive Across Noida and Ghaziabad Slums",
    date: "2026-01-15",
    category: "CSR",
    excerpt:
      "Reinforcing its commitment to social welfare, Maxvolt Energy concluded a week-long blanket distribution drive supporting slum communities across Noida and Ghaziabad during peak winter.",
    image: "/images/press/blanket-distribution-drive-noida-ghaziabad.webp",
    body: [
      "Maxvolt Energy has concluded a seven-day blanket distribution drive across slum communities in Noida and Ghaziabad, reinforcing the company's commitment to social welfare and community responsibility during the peak winter season.",
      "Volunteers and team members from Maxvolt distributed blankets to families and individuals most affected by the cold, reaching vulnerable communities across multiple locations over the week-long campaign.",
      "The initiative reflects Maxvolt's belief that corporate growth must be accompanied by meaningful social contribution. As the company scales its manufacturing and market presence, it continues to invest in the communities surrounding its operations.",
      "\"Giving back to the community is integral to who we are,\" the company said. \"This drive is one of several CSR initiatives through which we aim to make a tangible difference in people's lives.\"",
    ],
  },
];

export function pressBySlug(slug: string) {
  return PRESS_RELEASES.find((p) => p.slug === slug);
}

export function pressSorted() {
  return [...PRESS_RELEASES].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export const PRESS_CATEGORIES: PressCategory[] = [
  "Company News",
  "Product & Technology",
  "Sustainability",
  "Industry & Policy",
  "Financial",
  "CSR",
];
