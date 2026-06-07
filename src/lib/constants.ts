export const SITE_CONFIG = {
  name: "Maxvolt Energy Industries Limited",
  tagline: "Powering India's Electric Future",
  description: "Industry-leading lithium battery technology for EVs, solar systems, and energy storage.",
  url: "https://site.maxvolt-one.co.in",
  phone: "01204291595",
  whatsapp: "+918130327183",
  email: "info@maxvoltenergy.com",
  supportEmail: "customersupport@maxvoltenergy.com",
  supportPhone: "+91-9560718827",
  careersEmail: "maxvolt.india@gmail.com",
  addresses: {
    corporate: "E 82, Bulandshahr Road Industrial Area, Ghaziabad (UP) 201009",
    plant: "Meerut Rd, Duhai, Basantpur Saitli, Uttar Pradesh 201206",
    /** @deprecated use corporate */
    ghaziabad: "E 82, Bulandshahr Road Industrial Area, Ghaziabad (UP) 201009",
    /** @deprecated use plant */
    delhi: "Meerut Rd, Duhai, Basantpur Saitli, Uttar Pradesh 201206",
  },
  maps: {
    corporate: "https://maps.google.com/?q=E+82+Bulandshahr+Road+Industrial+Area+Ghaziabad+UP+201009",
    plant: "https://maps.google.com/?q=Meerut+Rd+Duhai+Basantpur+Saitli+Uttar+Pradesh+201206",
  },
  social: {
    facebook: "https://www.facebook.com/Maxvoltbattery",
    instagram: "https://www.instagram.com/visitmaxvoltenergy",
    linkedin: "https://www.linkedin.com/company/maxvoltbattery",
    youtube: "https://www.youtube.com/@maxvoltenergy",
  },
};

export const NAV_ITEMS = [
  {
    label: "About",
    href: "/about-us",
    children: [
      { label: "Mission & Vision", href: "/about-us#mission" },
      { label: "Company Journey", href: "/about-us#journey" },
      { label: "Leadership Team", href: "/about-us#team" },
      { label: "Certificates", href: "/about-us/certificates" },
      { label: "Press Releases", href: "/press-release" },
      { label: "Media Coverage", href: "/media" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Electric Vehicles", href: "/solutions/electric-vehicles" },
      { label: "Portable Lighting", href: "/solutions/portable-lighting" },
      { label: "Solar Storage", href: "/solutions/solar-storage" },
      { label: "Consumer Electronics", href: "/solutions/consumer-electronics" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Product Portfolio", href: "/portfolio" },
      { label: "Shop All Batteries", href: "/shop" },
      { label: "E-Cycle Batteries", href: "/products/e-cycle-lithium-battery" },
      { label: "E-Scooter / Bike Batteries", href: "/products/e-scooter-bike-lithium-battery" },
      { label: "E-Rickshaw Batteries", href: "/products/e-rickshaw-lithium-battery" },
      { label: "Energy Storage Systems", href: "/products/lithium-battery-energy-storage-solutions" },
      { label: "Solar Batteries", href: "/products/lithium-battery-for-solar-application" },
      { label: "Customized Solutions", href: "/products/customized-battery-solution" },
    ],
  },
  {
    label: "Investors",
    href: "/investors",
    children: [
      { label: "Earnings Call", href: "/investors/earnings-call" },
      { label: "Management", href: "/investors/management" },
      { label: "Corporate Governance", href: "/investors/corporate-governance" },
      { label: "Corporate Announcements", href: "/investors/corporate-announcement" },
      { label: "Shareholding Pattern", href: "/investors/shareholding-pattern" },
      { label: "Initial Public Offering", href: "/investors/initial-public-offering" },
      { label: "Investors Presentation", href: "/investors/investors-presentation" },
      { label: "Annual Reports", href: "/investors/annual-reports" },
      { label: "Financials", href: "/investors/financial" },
      { label: "Notices", href: "/investors/notices" },
      { label: "Material Contracts", href: "/investors/material-contract" },
      { label: "Material Documents", href: "/investors/material-document" },
      { label: "Investors Contact", href: "/investors/investors-contact" },
      { label: "CSR", href: "/investors/csr" },
    ],
  },
  {
    label: "Tools",
    href: "/battery-calculator",
    children: [
      { label: "Battery Calculator", href: "/battery-calculator" },
      { label: "Find a Dealer", href: "/find-dealer" },
      { label: "Our Presence", href: "/our-presence" },
    ],
  },
  {
    label: "Reach Us",
    href: "/contact-us",
    children: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "Support", href: "/support" },
      { label: "Find a Dealer", href: "/find-dealer" },
      { label: "Become a Dealer", href: "/become-a-dealer" },
    ],
  },
];

export const PRODUCTS = [
  {
    id: "e-cycle-lithium-battery",
    name: "E-Cycle Lithium Battery",
    shortName: "E-Cycle",
    description: "High-capacity, long-lasting performance that keeps you cruising for extended distances.",
    image: "/images/product/e-cycle-lithium-battery-txc.webp",
    href: "/products/e-cycle-lithium-battery",
    category: "Electric Vehicle",
    color: "#FFD100",
    specs: [
      { label: "Voltage Range", value: "36V – 48V" },
      { label: "Capacity Range", value: "7.5Ah – 15Ah" },
      { label: "Cell Chemistry", value: "LiFePO4" },
      { label: "Pack Type", value: "Soft / Hard Pack" },
    ],
  },
  {
    id: "e-scooter-bike-lithium-battery",
    name: "E-Scooter / Bike Lithium Battery",
    shortName: "E-Scooter",
    description: "Compact, powerful batteries engineered for modern electric two-wheelers.",
    image: "/images/product/e-scooter-bike-lithium-battery-mpu.webp",
    href: "/products/e-scooter-bike-lithium-battery",
    category: "Electric Vehicle",
    color: "#FFA800",
    specs: [
      { label: "Voltage Range", value: "48V – 74V" },
      { label: "Capacity Range", value: "24Ah – 40Ah" },
      { label: "Cell Chemistry", value: "NMC / Li-Ion" },
      { label: "Pack Type", value: "PVC / Box" },
    ],
  },
  {
    id: "e-rickshaw-lithium-battery",
    name: "E-Rickshaw Lithium Battery",
    shortName: "E-Rickshaw",
    description: "Fast-charging, high-capacity batteries solving the battery drain issue for e-rickshaw drivers.",
    image: "/images/product/e-rickshaw-lithium-battery-ohn.webp",
    href: "/products/e-rickshaw-lithium-battery",
    category: "Electric Vehicle",
    color: "#FF8C00",
    specs: [
      { label: "Voltage", value: "51V" },
      { label: "Capacity", value: "86Ah – 100Ah" },
      { label: "Cell Chemistry", value: "LiFePO4 / LFP" },
      { label: "Pack Type", value: "Metal Case" },
    ],
  },
  {
    id: "lithium-battery-energy-storage-solutions",
    name: "Energy Storage Systems",
    shortName: "ESS",
    description: "Scalable lithium energy storage for residential, commercial, and grid applications.",
    image: "/images/product/lithium-battery-energy-storage-solutions-tjf.webp",
    href: "/products/lithium-battery-energy-storage-solutions",
    category: "Energy Storage",
    color: "#7c3aed",
    specs: [
      { label: "Voltage Range", value: "12.8V – 51.2V" },
      { label: "Capacity Range", value: "100Ah – 300Ah" },
      { label: "Cell Chemistry", value: "LiFePO4" },
      { label: "Applications", value: "Residential / Commercial" },
    ],
  },
  {
    id: "lithium-battery-for-solar-application",
    name: "Solar Battery",
    shortName: "Solar",
    description: "Optimized for solar energy storage with fast absorption and long cycle life.",
    image: "/images/product/lithium-battery-for-solar-application-zhs.webp",
    href: "/products/lithium-battery-for-solar-application",
    category: "Solar",
    color: "#f97316",
    specs: [
      { label: "Compatibility", value: "All Solar Systems" },
      { label: "Cycle Life", value: "3,000+ Cycles" },
      { label: "Efficiency", value: ">95% Round-Trip" },
      { label: "Monitoring", value: "Mobile App Enabled" },
    ],
  },
  {
    id: "customized-battery-solution",
    name: "Customized Battery Solution",
    shortName: "Custom",
    description: "Tailor-made battery packs for medical devices, industrial, and specialized applications.",
    image: "/images/product/customized-battery-solution-jkz.webp",
    href: "/products/customized-battery-solution",
    category: "Customized",
    color: "#ec4899",
    specs: [
      { label: "Industries", value: "Medical / Industrial / Auto" },
      { label: "Voltage", value: "Custom Range" },
      { label: "BMS", value: "Advanced Smart BMS" },
      { label: "Pricing", value: "Competitive" },
    ],
  },
];

export const STATS = [
  { value: "100+", label: "Crore Revenue", suffix: "₹" },
  { value: "6000+", label: "Monthly Production", suffix: "" },
  { value: "58+", label: "Retail Dealers", suffix: "" },
  { value: "6+", label: "OEM Partnerships", suffix: "" },
  { value: "170+", label: "Team Members", suffix: "" },
  { value: "2019", label: "Founded", suffix: "" },
];

export const TIMELINE = [
  {
    year: "2019",
    title: "The Beginning",
    events: [
      "First prototype created",
      "Production facility established",
      "15 batteries/day initial capacity",
      "Manufacturing trial initiated",
    ],
  },
  {
    year: "2020",
    title: "First Milestones",
    events: [
      "First OEM supply to Hyderabad",
      "3 retail dealers signed",
      "Capacity increased to 20 batteries/day",
      "First service center in Bangalore",
    ],
  },
  {
    year: "2021",
    title: "Rapid Expansion",
    events: [
      "14 retail dealers nationwide",
      "2 authorized service centers",
      "Expanded to 22 distributors",
      "7 service centers, 4 OEM suppliers",
    ],
  },
  {
    year: "2022",
    title: "Scaling Up",
    events: [
      "Production doubled to 50 batteries/day",
      "R&D center established",
      "32 retail dealers",
      "4 OEM partnerships secured",
    ],
  },
  {
    year: "2023",
    title: "Compliance Achievement",
    events: [
      "58 retail dealers onboarded",
      "6 OEM partnerships",
      "6 service centers operational",
      "AIS 156 government safety compliance achieved",
    ],
  },
  {
    year: "2024",
    title: "Innovation Launch",
    events: [
      "Eco-Series product line launched",
      "AIS 156 certification obtained",
      "Monthly production: 2,200–2,500 units",
      "R&D capabilities expanded",
    ],
  },
  {
    year: "2025",
    title: "Public Listing",
    events: [
      "Listed on NSE SME Emerge Platform",
      "Revenue exceeded ₹100 Crore",
      "Team grew to 170+ members",
      "Monthly capacity: 6,000+ battery packs",
    ],
  },
];

export const LEADERSHIP = [
  {
    name: "Vishal Gupta",
    role: "Chairman & Whole Time Director",
    designation: "Chief Technical Officer",
    age: 29,
    education: "Bachelor of Mechanical Technology, Manav Bharti University | Advanced E-Vehicle Technology, IIT Delhi (2023)",
    experience: "5+ years",
    focus: "Factory administration, production oversight, logistics management, lithium battery R&D",
    image: "/images/our-team/vishal-gupta-oxh.webp",
  },
  {
    name: "Bhuvneshwar Pal Singh",
    role: "Managing Director & CFO",
    designation: "Chief Financial Officer",
    age: 37,
    education: "Bachelor of Commerce, Chhatrapati Shahu Ji Maharaj University, Kanpur (2008)",
    experience: "4+ years in finance",
    focus: "Day-to-day operations, accounts, finance, and administration",
    image: "/images/our-team/bhuvneshwar-pal-singh-sxx.webp",
  },
  {
    name: "Preet Kumar",
    role: "Non-Executive Independent Director",
    designation: "Company Secretary (ICSI)",
    age: 31,
    education: "Company Secretary, ICSI Associate Member",
    experience: "5+ years in secretarial compliance",
    focus: "Corporate secretarial compliance and governance",
    image: "",
  },
  {
    name: "Kavita Dixit",
    role: "Non-Executive Independent Director",
    designation: "Chartered Accountant (ICAI)",
    age: 33,
    education: "Bachelor of Commerce, Gorakhpur University | CA, ICAI Fellow",
    experience: "6+ years in accounts, taxation, compliance",
    focus: "Financial oversight and regulatory compliance",
    image: "",
  },
  {
    name: "Ajay Kumar",
    role: "Non-Executive Independent Director",
    designation: "Chartered Accountant",
    age: 34,
    education: "BCom & MCom, University of Delhi | CA",
    experience: "6+ years in audit, taxation, accounting",
    focus: "Audit committee oversight and financial governance",
    image: "",
  },
];

export const COMMITTEES = [
  {
    name: "Audit Committee",
    members: [
      { name: "Ajay Kumar", role: "Chairman" },
      { name: "Preet Kumar", role: "Member" },
      { name: "Bhuvneshwar Pal Singh", role: "Member" },
    ],
  },
  {
    name: "Stakeholders' Relationship Committee",
    members: [
      { name: "Kavita Dixit", role: "Chairman" },
      { name: "Preet Kumar", role: "Member" },
      { name: "Vishal Gupta", role: "Member" },
    ],
  },
  {
    name: "Nomination & Remuneration Committee",
    members: [
      { name: "Preet Kumar", role: "Chairman" },
      { name: "Kavita Dixit", role: "Member" },
      { name: "Ajay Kumar", role: "Member" },
    ],
  },
  {
    name: "CSR Committee",
    members: [
      { name: "Vishal Gupta", role: "Chairman" },
      { name: "Bhuvneshwar Pal Singh", role: "Member" },
      { name: "Preet Kumar", role: "Member" },
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: "Rent Energies",
    role: "E-Rickshaw Fleet Operator",
    content: "The Maxvolt e-rickshaw battery has transformed our fleet operations. Quick charging means our vehicles spend more time on the road and less time at the charging station.",
    rating: 5,
  },
  {
    name: "Aakash Gupta",
    role: "E-Vehicle Dealer",
    content: "Purchased dual batteries for our dealership and the reliability has been outstanding. Our customers keep coming back for Maxvolt products.",
    rating: 5,
  },
  {
    name: "Sunil Bansal",
    role: "E-Bicycle Enthusiast",
    content: "Using the e-bicycle battery for multiple weeks now. The performance on long rides is excellent and the charging is very quick.",
    rating: 5,
  },
  {
    name: "Javed",
    role: "E-Bike Rider",
    content: "Excellent battery backup and charging speed. Maxvolt has set a new standard for EV batteries in India.",
    rating: 5,
  },
];

// Authorized service centers — replicated from maxvoltenergy.com/customer-support
export const SERVICE_CENTERS = [
  { state: "Uttar Pradesh", city: "Noida" },
  { state: "Uttar Pradesh", city: "Ghaziabad" },
  { state: "Uttar Pradesh", city: "Bulandshahr" },
  { state: "Uttar Pradesh", city: "Lucknow" },
  { state: "NCT of Delhi", city: "New Ashok Nagar" },
  { state: "NCT of Delhi", city: "Vasundhara Enclave" },
  { state: "Bihar", city: "Patna" },
  { state: "Gujarat", city: "Ahmedabad" },
  { state: "Madhya Pradesh", city: "Indore" },
];

export const INDIA_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export const INDIA_CITIES = {
  North: ["Delhi", "Noida", "Ghaziabad", "Faridabad", "Chandigarh", "Ludhiana", "Amritsar", "Lucknow", "Agra", "Meerut"],
  West: ["Mumbai", "Pune", "Ahmedabad", "Surat", "Jaipur", "Indore", "Vadodara", "Rajkot", "Nagpur", "Bhopal"],
  South: ["Bangalore", "Chennai", "Hyderabad", "Coimbatore", "Kochi", "Mysore", "Mangalore", "Visakhapatnam", "Vijayawada"],
  East: ["Kolkata", "Patna", "Ranchi", "Jamshedpur", "Bhubaneswar", "Guwahati", "Siliguri"],
};
