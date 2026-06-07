export interface SolutionSection {
  heading: string;
  body: string[];
}

export interface SolutionType {
  name: string;
  desc: string;
}

export interface SolutionFaq {
  q: string;
  a: string;
}

export interface Solution {
  slug: string;
  title: string;
  icon: "Zap" | "Sun" | "Lightbulb" | "Cpu";
  description: string;
  longDescription: string;
  products: string[];
  benefits: string[];
  applications: string[];
  color: string;
  image: string;
  // Rich landing-page content (structure replicated from maxvoltenergy.com)
  intro: string[];
  sections: SolutionSection[];
  typesHeading: string;
  types: SolutionType[];
  future: { heading: string; body: string[] };
  dealerHeading: string;
  faqs: SolutionFaq[];
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "electric-vehicles",
    title: "Electric Vehicles",
    icon: "Zap",
    description: "Complete lithium battery solutions for e-cycles, e-scooters, e-bikes and e-rickshaws.",
    longDescription:
      "Maxvolt powers India's electric mobility with AIS 156 certified lithium battery packs engineered for the country's road and climate conditions. Two-wheeler packs use high-density NMC / Li-Ion cells, while e-rickshaw packs use rugged LiFePO4 / LFP chemistry for safety and long cycle life.",
    products: ["E-Cycle Batteries", "E-Scooter / Bike Batteries", "E-Rickshaw Batteries", "Customized EV Packs"],
    benefits: ["AIS 156 certified safety", "Fast charging support", "Smart BMS protection", "Long cycle life"],
    applications: ["E-scooters & e-bikes", "E-rickshaws & e-autos", "E-cycles", "Two/three-wheeler OEMs"],
    color: "#FFD100",
    image: "/images/category/electric-vehicle-fxl.webp",
    intro: [
      "Electric Vehicles (EVs) represent the future of mobility — efficient, clean and built for modern transportation. Maxvolt Energy is a trusted name in the Indian EV ecosystem, supplying advanced lithium batteries and complete power solutions for two-wheelers, three-wheelers and light commercial platforms.",
      "EVs run on electric power instead of conventional fuels, making them cost-effective, low-maintenance and environmentally responsible. As awareness of pollution and rising fuel costs grows, more individuals and businesses are switching to electric mobility — and Maxvolt supports that transition with AIS 156 certified products, strong after-sales support and reliable warranty assurance.",
    ],
    sections: [
      {
        heading: "Evolution of Electric Vehicles in India and Worldwide",
        body: [
          "The evolution of electric vehicles has been remarkable. Once seen as experimental, EVs are now mainstream thanks to advances in battery technology, government incentives and rising public demand for eco-friendly transport. Globally, countries like the USA, China and Germany lead EV adoption with large manufacturing bases and charging infrastructure.",
          "In India, the EV movement accelerated after the FAME (Faster Adoption and Manufacturing of Electric Vehicles) scheme encouraged both manufacturers and consumers to go electric. Cities like Delhi, Pune and Bengaluru are now major EV hubs supported by expanding charging networks and favourable policy — a permanent shift toward cleaner, smarter mobility, with Maxvolt at the centre of the transformation.",
        ],
      },
      {
        heading: "Importance of EVs in Reducing Pollution and Fuel Dependency",
        body: [
          "Electric vehicles play a direct role in lowering pollution and reducing reliance on imported fuel. Conventional vehicles emit harmful gases like CO₂, NOx and particulate matter; EVs produce zero tailpipe emissions, helping cities breathe cleaner air.",
          "Reducing fuel dependency also strengthens national energy security. India imports a significant share of its crude oil, so the shift to electric mobility means lower import bills and greater energy independence. Maxvolt's high-quality lithium batteries support these goals with reliability, performance and eco-efficiency in every drive.",
        ],
      },
    ],
    typesHeading: "Types of Electric Vehicles",
    types: [
      { name: "Battery Electric Vehicle (BEV)", desc: "Fully electric vehicles powered solely by a battery and charged from external sources — zero emissions. Maxvolt supplies lithium packs engineered for consistent power, faster charging and reliable BEV performance." },
      { name: "Plug-In Hybrid Electric Vehicle (PHEV)", desc: "Combines an electric motor and an internal-combustion engine; runs on electricity for short trips and fuel for longer journeys — a flexible bridge between traditional and fully electric vehicles." },
      { name: "Hybrid Electric Vehicle (HEV)", desc: "Uses both a fuel engine and an electric motor without plug-in charging; the battery recharges via regenerative braking and the engine — popular where users want fuel savings without charging." },
      { name: "Fuel Cell Electric Vehicle (FCEV)", desc: "Uses hydrogen fuel cells to generate electricity and emits only water vapour. Still developing in India, FCEVs are gaining global attention for high efficiency and environmental benefits." },
    ],
    future: {
      heading: "Future of Lithium Battery for Electric Vehicles in India",
      body: [
        "Lithium batteries are the foundation of the EV revolution. Their high energy density, fast-charging capability and long cycle life make them the preferred choice across every EV category.",
        "Demand for lithium batteries in India is set to grow exponentially with rising EV sales and government support for local manufacturing. Maxvolt supplies premium-grade lithium batteries that meet global safety and performance standards — every pack backed by warranty and technical support so manufacturers and dealers can deliver dependable performance to end users.",
      ],
    },
    dealerHeading: "Become a Certified Electric Vehicle Dealer",
    faqs: [
      { q: "What is an Electric Vehicle (EV)?", a: "An electric vehicle runs on electricity stored in rechargeable batteries instead of petrol or diesel. It powers an electric motor that drives the vehicle efficiently with zero tailpipe emissions." },
      { q: "How long does it take to charge an EV?", a: "Charging time depends on battery capacity and charger type. With a fast charger, most EVs can charge up to 80% in 45–60 minutes." },
      { q: "What type of battery is used in Electric Vehicles?", a: "Most EVs use lithium-ion batteries for their long life, light weight and high efficiency. Maxvolt supplies certified lithium batteries for all EV categories." },
      { q: "Are Electric Vehicles expensive to maintain?", a: "No. EVs have fewer moving parts, so maintenance is minimal — there is no engine oil, clutch or exhaust system, which reduces long-term costs significantly." },
      { q: "Does Maxvolt provide warranty and after-sales support?", a: "Yes. All lithium batteries and EV components from Maxvolt come with warranty coverage, technical assistance and nationwide service support." },
    ],
  },
  {
    slug: "solar-storage",
    title: "Solar Storage",
    icon: "Sun",
    description: "High-efficiency lithium batteries for residential and commercial solar energy storage.",
    longDescription:
      "Maxvolt's solar storage systems capture daytime solar generation for round-the-clock use. With LiFePO4 chemistry, 3,000+ cycle life and over 95% round-trip efficiency, they maximize the return on any solar investment — from rooftops to large commercial installations.",
    products: ["Solar Lithium Batteries", "Grid-Tied Storage", "Off-Grid Systems", "Hybrid Solutions"],
    benefits: [">95% round-trip efficiency", "3,000+ cycles", "App-enabled monitoring", "Scalable 48V–120V"],
    applications: ["Rooftop solar storage", "Off-grid solar", "Commercial backup", "Solar + inverter hybrid"],
    color: "#f97316",
    image: "/images/category/solar-energy-storage-ewr.webp",
    intro: [
      "Solar energy storage is the key to making renewable power dependable around the clock. Maxvolt Energy supplies high-efficiency lithium-ion solar batteries that capture excess solar electricity during the day and release it whenever sunlight is unavailable or the grid fails.",
      "Built on LiFePO4 chemistry with long cycle life and high round-trip efficiency, our solar storage systems maximize the return on any solar investment — from residential rooftops to large commercial installations.",
    ],
    sections: [
      {
        heading: "Role of Solar Batteries in Renewable Energy Management",
        body: [
          "Solar batteries sit at the heart of modern renewable-energy management. By storing surplus generation, they smooth out the gap between when the sun shines and when energy is actually needed, turning intermittent solar into a reliable, dispatchable resource.",
          "With high energy density and rapid response times, Maxvolt's lithium solar batteries help homes and businesses cut grid dependence, stabilise supply and make the most of every unit of clean energy generated.",
        ],
      },
      {
        heading: "Importance of Energy Storage in Solar Power Systems",
        body: [
          "Without storage, solar power is only available while the sun is out. Energy storage unlocks the full value of a solar system — powering homes and businesses through evenings, cloudy spells and outages.",
          "Maxvolt's lithium solar batteries deliver over 95% round-trip efficiency and 3,000+ cycles, meaning minimal energy loss and many years of dependable service, all monitored in real time through a user-friendly mobile app.",
        ],
      },
    ],
    typesHeading: "Types of Solar Energy Storage Systems",
    types: [
      { name: "Off-Grid Solar Energy Storage", desc: "Completely independent of the utility grid — ideal for remote sites. Maxvolt batteries store enough energy to run loads through the night and extended low-sun periods." },
      { name: "On-Grid Solar with Battery Backup", desc: "Works alongside the grid while adding battery backup for outages, combining day-time savings with reliable power security." },
      { name: "Standalone Solar Battery Systems", desc: "Plug-and-play battery banks that integrate easily with most existing on-grid or off-grid solar setups for added capacity." },
      { name: "DC-Coupled Energy Storage Systems", desc: "High-efficiency architecture where the battery couples directly on the DC side of the array, minimising conversion losses for maximum yield." },
    ],
    future: {
      heading: "Future of Lithium-ion Solar Battery for Solar Energy Storage",
      body: [
        "As India accelerates its renewable-energy transition, lithium-ion solar storage is becoming the backbone of round-the-clock clean power. Falling cell costs, smart monitoring and longer lifespans make lithium the clear choice over legacy lead-acid systems.",
        "Maxvolt is investing in scalable, app-enabled solar storage built for Indian conditions — helping households, businesses and developers store more, waste less and rely on clean power 24/7.",
      ],
    },
    dealerHeading: "Become a Certified Solar Energy Storage Dealer",
    faqs: [
      { q: "What is solar energy storage?", a: "Solar energy storage captures excess solar electricity in batteries for later use — when sunlight is unavailable or grid power fails." },
      { q: "Which type of battery is best for solar energy storage?", a: "Lithium-ion batteries are currently the best choice due to high efficiency, longer lifespan and low maintenance compared with lead-acid alternatives." },
      { q: "How long do solar batteries last?", a: "High-quality lithium-ion solar batteries from Maxvolt typically last 8–12 years depending on usage and environmental factors." },
      { q: "Can I add batteries to my existing solar system?", a: "Yes. Maxvolt's standalone and hybrid solutions integrate easily with most on-grid and off-grid systems." },
      { q: "Does Maxvolt offer warranty and support?", a: "Yes. All Maxvolt products include manufacturer warranty and dedicated after-sales service across India." },
    ],
  },
  {
    slug: "portable-lighting",
    title: "Portable Lighting",
    icon: "Lightbulb",
    description: "Reliable lithium batteries for solar lanterns, emergency lights and outdoor illumination.",
    longDescription:
      "Maxvolt lithium packs deliver dependable, long-runtime power for portable and emergency lighting. Lightweight and maintenance-free, they keep solar lanterns, emergency lights and outdoor illumination systems running far longer than conventional batteries.",
    products: ["Solar Lanterns", "Emergency Lighting", "Outdoor Lighting", "Portable Power"],
    benefits: ["Long runtime", "Lightweight design", "Fast recharge", "Maintenance-free"],
    applications: ["Solar lanterns", "Emergency lights", "Street & outdoor lighting", "Portable power units"],
    color: "#FFA800",
    image: "/images/category/portable-lighting-bna.webp",
    intro: [
      "Portable lighting keeps work, life and safety moving wherever fixed power isn't available. Maxvolt Energy supplies long-runtime lithium-ion batteries that power solar lanterns, emergency lights, floodlights and outdoor illumination with dependable, maintenance-free performance.",
      "Lightweight, fast-charging and built to last, our lithium packs run far longer than conventional batteries — making them the reliable choice for homes, worksites and the field.",
    ],
    sections: [
      {
        heading: "How Portable Lighting Systems Work",
        body: [
          "Portable lighting systems pair an efficient LED light source with a rechargeable lithium-ion battery and smart charge control. Energy is stored when power (or sunlight) is available and delivered on demand, giving hours of bright, stable illumination anywhere.",
          "Maxvolt batteries provide the steady voltage and high cycle life these systems need — so lights stay bright from full charge to empty without flicker or fade.",
        ],
      },
      {
        heading: "Importance of Portable Lighting in Modern Work Environments",
        body: [
          "From construction sites and warehouses to events, emergencies and rural areas, reliable portable lighting is essential for safety and productivity after dark or during outages.",
          "With long runtime, rapid recharge and rugged, lightweight design, Maxvolt-powered portable lights keep critical spaces lit when and where it matters most.",
        ],
      },
    ],
    typesHeading: "Types of Portable Lighting Systems",
    types: [
      { name: "LED Portable Lighting", desc: "Uses less power while producing more brightness — longer life, less heat and safe for indoor and outdoor use." },
      { name: "Solar-Powered Portable Lights", desc: "High-efficiency panels and smart charge controllers store energy even in partial sunlight for dependable off-grid illumination." },
      { name: "Battery-Operated Portable Floodlights", desc: "High-capacity lithium packs deliver powerful, wide-area light for worksites, events and security applications." },
      { name: "Portable Emergency Lighting", desc: "Instant, reliable light during power cuts and emergencies, with long standby life and fast recharge." },
    ],
    future: {
      heading: "Future of Lithium-ion Inverter Battery for Portable Lighting in India",
      body: [
        "As demand for reliable off-grid and emergency lighting grows across India, lithium-ion batteries are replacing heavier, shorter-lived alternatives thanks to their runtime, weight and lifespan advantages.",
        "Maxvolt continues to engineer lighter, longer-running lithium packs with smart protection — powering the next generation of portable and emergency lighting.",
      ],
    },
    dealerHeading: "Become a Certified Portable Lighting Dealer",
    faqs: [
      { q: "What is the main advantage of using portable LED lighting?", a: "LED portable lights use less power while producing more brightness. They last longer, generate less heat and are safer for indoor and outdoor use." },
      { q: "How long do Maxvolt portable lights run on a single charge?", a: "Depending on model and brightness mode, runtime ranges from 4 to 40 hours. Floodlights and solar models can run even longer with higher battery capacity." },
      { q: "Are solar portable lights reliable during cloudy weather?", a: "Yes. Maxvolt solar lights include high-efficiency panels and smart charging controllers that store energy even in partial sunlight." },
      { q: "Can I replace the battery in my portable light?", a: "Most Maxvolt portable lights use user-replaceable lithium-ion batteries, available through our authorized service centers." },
      { q: "Does Maxvolt provide warranty and service?", a: "Yes. Every Maxvolt product comes with official warranty coverage and after-sales support throughout India." },
    ],
  },
  {
    slug: "consumer-electronics",
    title: "Consumer Electronics",
    icon: "Cpu",
    description: "Custom battery packs for consumer devices, wearables, IoT and smart home products.",
    longDescription:
      "From power banks and routers to CCTV, IoT sensors and smart-home devices, Maxvolt engineers application-specific lithium packs tailored to each product's voltage, capacity and form factor — all built with an advanced smart BMS.",
    products: ["Smart Devices", "IoT Batteries", "Wearable Power", "Home Automation"],
    benefits: ["Custom form factors", "Advanced smart BMS", "Stable, clean power", "Rapid prototyping"],
    applications: ["Power banks", "Router backup UPS", "CCTV & surveillance", "IoT & smart-home devices"],
    color: "#FF8C00",
    image: "/images/category/consumer-electronics-ish.webp",
    intro: [
      "Consumer electronics power everyday life — entertainment, communication and productivity. Maxvolt Energy designs and supplies custom lithium-ion battery packs for these devices, tailored to each product's exact voltage, capacity and form factor.",
      "With high energy density, fast charging and an advanced smart BMS, our packs deliver the stable, long-lasting power modern electronics demand.",
    ],
    sections: [
      {
        heading: "Evolution of the Consumer Electronics Industry",
        body: [
          "Consumer electronics have evolved from bulky standalone gadgets into sleek, connected, always-on devices. As products shrink and add features, their power sources must become smaller, lighter and more efficient — exactly where custom lithium-ion packs excel.",
          "Maxvolt builds application-specific batteries that keep pace with this evolution, matching each device's performance and form-factor requirements.",
        ],
      },
      {
        heading: "Technological Advancements Driving the Electronics Sector",
        body: [
          "Advances in IoT, wireless connectivity and smart-home automation are driving demand for compact, reliable power. Devices now need batteries that deliver clean, stable output over long lifecycles with built-in safety.",
          "Maxvolt's smart BMS technology provides cell balancing, thermal protection and real-time safety — enabling the dependable performance today's electronics require.",
        ],
      },
    ],
    typesHeading: "Types of Consumer Electronics We Power",
    types: [
      { name: "Home Theatres", desc: "Reliable backup and portable power for immersive home-entertainment systems and their connected components." },
      { name: "Sound Systems", desc: "Custom lithium packs for portable speakers and audio gear — long playtime with consistent, clean power delivery." },
      { name: "Projectors", desc: "Compact, high-density batteries for portable projectors, enabling untethered presentations and entertainment." },
      { name: "Streaming Devices", desc: "Stable power for routers, streaming boxes and IoT hubs, including backup UPS to keep connectivity alive during outages." },
    ],
    future: {
      heading: "Future of Custom Lithium-Ion Battery for Consumer Electronics",
      body: [
        "As devices get smarter and more portable, demand for custom lithium-ion packs with higher density and intelligent management will keep rising across India's electronics sector.",
        "Maxvolt partners with manufacturers and innovators to design tailor-made battery solutions — from rapid prototyping to volume supply — backed by warranty and technical support.",
      ],
    },
    dealerHeading: "Become a Certified Consumer Electronics Dealer",
    faqs: [
      { q: "What are consumer electronics?", a: "Consumer electronics are everyday electronic devices used for entertainment, communication and productivity — like TVs, sound systems and projectors." },
      { q: "Why are lithium-ion batteries preferred for these devices?", a: "They offer high energy density, faster charging and longer lifespan than traditional batteries, making them ideal for modern devices." },
      { q: "Does Maxvolt provide custom battery packs?", a: "Yes. We design and supply custom lithium-ion battery packs for various consumer-electronics applications, tailored to specific voltage and capacity needs." },
      { q: "Is Maxvolt a trusted lithium battery supplier in India?", a: "Absolutely. Maxvolt Energy is a trusted manufacturer and supplier of lithium-ion batteries in India, offering full warranty and after-sales support." },
      { q: "How can I get a dealership or bulk order?", a: "Call us at 01204291595 or email info@maxvoltenergy.com to discuss dealership opportunities and pricing for bulk lithium-ion battery requirements." },
    ],
  },
];

export function getSolution(slug: string) {
  return SOLUTIONS.find((s) => s.slug === slug);
}
