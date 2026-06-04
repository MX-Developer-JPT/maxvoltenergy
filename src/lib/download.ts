// Working client-side document download.
// If `url` is provided (a real PDF placed in /public/docs), it downloads that file.
// Otherwise it generates a minimal valid PDF placeholder so the button always works.

function escapePdf(text: string) {
  return text.replace(/([\\()])/g, "\\$1");
}

function buildPlaceholderPDF(title: string): Blob {
  const lines = [
    "MaxVolt Energy Industries Limited",
    "",
    title,
    "",
    "This is an official investor document placeholder.",
    "The signed PDF is available on request from",
    "investor relations: info@maxvoltenergy.com",
    "",
    "E 82, Bulandshahr Road Industrial Area,",
    "Ghaziabad (UP) 201009  |  +91 120 4291595",
    "",
    "Listed on NSE SME Emerge.",
  ];

  // Build text stream with line breaks
  let y = 760;
  let content = "BT /F1 16 Tf 70 800 Td (" + escapePdf("MaxVolt Energy — Investor Document") + ") Tj ET\n";
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
