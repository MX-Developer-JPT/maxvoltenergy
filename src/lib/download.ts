// Working client-side document download.
// If `url` is provided (a real PDF placed in /public/docs), it downloads that file.
// Otherwise it generates a minimal valid PDF placeholder so the button always works.

function escapePdf(text: string) {
  return text.replace(/([\\()])/g, "\\$1");
}

function buildPlaceholderPDF(title: string): Blob {
  const lines = [
    "Maxvolt Energy Industries Limited",
    "",
    title,
    "",
    "This is an official investor document placeholder.",
    "The signed PDF is available on request from",
    "investor relations: info@maxvolt-one.co.in",
    "",
    "E 82, Bulandshahr Road Industrial Area,",
    "Ghaziabad (UP) 201009  |  +91 120 4291595",
    "",
    "Listed on NSE SME Emerge.",
  ];

  // Build text stream with line breaks
  let y = 760;
  let content = "BT /F1 16 Tf 70 800 Td (" + escapePdf("Maxvolt Energy — Investor Document") + ") Tj ET\n";
  content += "BT /F1 11 Tf ";
  let textOps = "";
  lines.forEach((ln, i) => {
    textOps += `1 0 0 1 70 ${y} Tm (${escapePdf(ln)}) Tj\n`;
    y -= 22;
  });
  content += textOps + "ET";

  const objects: string[] = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  objects.push("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>");
  objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((obj, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });
  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((off) => {
    pdf += String(off).padStart(10, "0") + " 00000 n \n";
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

interface CatProduct {
  name: string;
  description: string;
  specs: { label: string; value: string }[];
}

// Builds a real multi-product catalogue PDF from the product data.
function buildCataloguePDF(products: CatProduct[]): Blob {
  const PAGE_H = 842;
  const lines: { text: string; size: number; gap: number }[] = [];
  lines.push({ text: "Maxvolt Energy Industries Limited", size: 18, gap: 26 });
  lines.push({ text: "Product Catalogue — Lithium Battery Solutions", size: 12, gap: 28 });

  products.forEach((p) => {
    lines.push({ text: p.name, size: 13, gap: 18 });
    // wrap description to ~80 chars
    const words = p.description.split(" ");
    let cur = "";
    words.forEach((w) => {
      if ((cur + " " + w).length > 80) { lines.push({ text: cur, size: 9, gap: 14 }); cur = w; }
      else cur = cur ? cur + " " + w : w;
    });
    if (cur) lines.push({ text: cur, size: 9, gap: 14 });
    p.specs.forEach((s) => lines.push({ text: `   - ${s.label}: ${s.value}`, size: 9, gap: 13 }));
    lines.push({ text: "", size: 9, gap: 10 });
  });
  lines.push({ text: "Enquiries: info@maxvolt-one.co.in  |  +91 120 4291595", size: 9, gap: 14 });
  lines.push({ text: "E 82, Bulandshahr Road Industrial Area, Ghaziabad (UP) 201009", size: 9, gap: 14 });

  // Split into pages
  const pages: { text: string; size: number; gap: number }[][] = [];
  let page: typeof lines = [];
  let y = 800;
  lines.forEach((ln) => {
    if (y - ln.gap < 60) { pages.push(page); page = []; y = 800; }
    page.push(ln);
    y -= ln.gap;
  });
  if (page.length) pages.push(page);

  const objects: string[] = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  // placeholder for Pages object (index 1) — filled after we know kids
  objects.push("");
  const fontObjNum = () => objects.length; // will append font last

  const pageObjNums: number[] = [];
  const contentObjNums: number[] = [];
  pages.forEach((pg) => {
    let yy = 800;
    let content = "";
    pg.forEach((ln) => {
      if (ln.text) content += `BT /F1 ${ln.size} Tf 60 ${yy} Td (${escapePdf(ln.text)}) Tj ET\n`;
      yy -= ln.gap;
    });
    const contentObj = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
    objects.push(""); // page placeholder
    pageObjNums.push(objects.length); // 1-based index of page obj
    objects.push(contentObj);
    contentObjNums.push(objects.length);
  });
  // font object
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontNum = objects.length;

  // Fill page objects
  pageObjNums.forEach((pn, i) => {
    objects[pn - 1] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 ${PAGE_H}] /Resources << /Font << /F1 ${fontNum} 0 R >> >> /Contents ${contentObjNums[i]} 0 R >>`;
  });
  // Fill Pages object (index 1 => obj #2)
  objects[1] = `<< /Type /Pages /Kids [${pageObjNums.map((n) => `${n} 0 R`).join(" ")}] /Count ${pageObjNums.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((obj, i) => { offsets.push(pdf.length); pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`; });
  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((off) => { pdf += String(off).padStart(10, "0") + " 00000 n \n"; });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

// Catalogue PDFs hosted in /public/catalogue
export const CATALOGUES = {
  ev: "/catalogue/maxvolt-ev-battery-catalogue.pdf",
  solar: "/catalogue/maxvolt-solar-battery-catalogue.pdf",
} as const;

/**
 * Downloads the real product catalogue PDF for `url`. Falls back to a generated
 * catalogue from `fallbackProducts` only if the hosted file can't be fetched.
 */
export async function downloadCatalogue(url: string, fallbackProducts: CatProduct[] = []) {
  let blob: Blob;
  let filename = url.split("/").pop() || "maxvolt-catalogue.pdf";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("not found");
    blob = await res.blob();
  } catch {
    blob = buildCataloguePDF(fallbackProducts);
    filename = "maxvolt-product-catalogue.pdf";
  }
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

export async function downloadDocument(title: string, url?: string) {
  let blob: Blob;
  let filename = title.replace(/[^a-z0-9]+/gi, "-").toLowerCase();

  if (url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("not found");
      blob = await res.blob();
      filename = url.split("/").pop() || filename + ".pdf";
    } catch {
      blob = buildPlaceholderPDF(title);
      filename += ".pdf";
    }
  } else {
    blob = buildPlaceholderPDF(title);
    filename += ".pdf";
  }

  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}
