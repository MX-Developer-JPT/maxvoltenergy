import type { JobOpening } from "@/lib/careers-store.server";

// Default openings shown on /career. Merged with any roles created through the
// admin portal (admin roles take precedence; seeds fill in the rest).
function mk(
  title: string, department: string, location: string, color: string,
  experience: string, description: string,
): JobOpening {
  const ts = Date.now();
  return {
    id: `SEED-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
    title, department, location, type: "Full Time", experience,
    description: description.trim(), color, published: true,
    createdAt: ts, updatedAt: ts,
  };
}

export const SEED_OPENINGS: JobOpening[] = [
  mk("Battery Design Engineer", "R&D", "Ghaziabad, UP", "#FFD100", "3-6 years",
    "Design lithium-ion battery packs (LFP/NMC) for EV and energy-storage applications — cell selection, pack architecture, thermal management and validation against AIS 156."),
  mk("Sales Manager – EV Products", "Sales", "Delhi / Mumbai / Bangalore", "#FFA800", "4-8 years",
    "Own regional revenue for Maxvolt's EV battery range. Build dealer and OEM relationships, drive primary and secondary sales, and grow market share across your territory."),
  mk("Manufacturing Supervisor", "Operations", "Ghaziabad, UP", "#FF8C00", "3-5 years",
    "Run the production line at our Duhai facility — manage shift output, quality, line balancing and a team of operators to hit the 25,000+ packs/month target."),
  mk("BMS Firmware Engineer", "Engineering", "Ghaziabad, UP", "#7c3aed", "2-5 years",
    "Develop and test Battery Management System firmware — cell balancing, SoC/SoH estimation, protection logic, CAN/UART communication and field diagnostics."),
  mk("Regional Dealer Development Manager", "Business Development", "Pan India", "#f97316", "5-10 years",
    "Expand the 950+ dealer network into new pincodes. Identify, onboard and enable channel partners, and support them with training and after-sales coordination."),
  mk("Quality Assurance Technician", "Quality", "Ghaziabad, UP", "#ec4899", "1-3 years",
    "Perform incoming, in-process and final inspection of cells and packs. Maintain test records, support ISO 9001:2015 compliance and drive continuous improvement."),
];

export function seedById(id: string): JobOpening | undefined {
  return SEED_OPENINGS.find((j) => j.id === id);
}
