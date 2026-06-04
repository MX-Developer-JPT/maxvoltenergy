// Real investor documents fetched from maxvoltenergy.com, served from /public/docs.
// Maps the display title (as shown in each investor page) → local file path.
// DownloadButton uses this to download the genuine file; missing entries fall back
// to a generated placeholder PDF.

export const DOC_FILES: Record<string, string> = {
  // ── Earnings Call ──
  "Investors Presentation FY 25": "/docs/investors-presentation-fy-25-oai.pdf",
  "Earnings Call Audio FY 2025": "/docs/earnings-call-audio-fy-2025-aoh.mp3",
  "Earnings Call Transcript H2 FY25": "/docs/earnings-call-transcript-h2-fy25-ruy.pdf",
  "Investors Presentation H1 FY 26": "/docs/investors-presentation-h1-fy-26-czv.pdf",
  "Earnings Call Transcript H1 FY26": "/docs/earnings-call-transcript-h1-fy26-hwv.pdf",
  "Earnings Call Audio H1 FY26": "/docs/earnings-call-audio-h1-fy26-cwo.mp3",
  "Earnings Call Audio FY26": "/docs/earnings-call-audio-kxd.mp3",
  "Earning Call Transcript H2 FY26": "/docs/earning-call-transcript-h2-fy26-pgf.pdf",

  // ── Corporate Announcements ──
  "Outcome of Board Meeting": "/docs/outcome-of-board-meeting-whl.pdf",
  "Change in Company Secretary": "/docs/change-in-cs-qqf.pdf",
  "PCS Certificate Regulation 163": "/docs/pcs-certificate-regulation-163-cgl.pdf",
  "Copy of Newspaper Publication": "/docs/copy-of-np-xxh.pdf",
  "Copy of Newspaper (Dec 2025)": "/docs/maxvolt2019-20122025131628-copy-of-newspaper-lfs.pdf",
  "EGM Proceedings": "/docs/egm-proceedings-nzm.pdf",
  "Voting Results and Scrutinizers Report": "/docs/voting-results-and-scrutinizers-report-lmf.pdf",
  "Incorporation REG 30": "/docs/incorporation-reg-30-ctk.pdf",
  "Final Notice Newspaper": "", // original served only as .docx (406) — placeholder fallback
  "Combined VRSR": "/docs/combinedvrsr-tcr.pdf",
  "Trading Window Closure": "/docs/trading-window-closure-ksz.pdf",
  "Corrigendum Expenditure Statement Final": "/docs/corrigendum-exp-statement-final-zle.pdf",
  "Board Meeting Intimation (12 May 2026)": "/docs/bmintimation12052026-wqt.pdf",
  "Board Meeting Intimation Revised (12 May 2026)": "/docs/bm-intimation12052026revised-lhj.pdf",
  "MaxVolt Outcome of Board Meeting": "/docs/maxvoltoutcome-hqo.pdf",

  // ── Shareholding Pattern ──
  "List of Shareholders as on 31-03-2024": "/docs/list-of-shareholders-as-on-31-03-2024-yak.pdf",
  "List of Shareholders as on 31st March 2023": "/docs/list-of-shareholder-as-on-31st-march-2023-xns.pdf",
  "List of Shareholders as on 31.03.2022": "/docs/list-of-shareholder-as-on-31-03-2022-lay.pdf",

  // ── Annual Reports / Financials ──
  "MaxVolt Annual Report FY 2023-24": "/docs/annual-report-2023-24-ium.pdf",
  "MaxVolt Annual Report FY 2022-23": "/docs/annual-report-2022-23-zhq.pdf",
  "MaxVolt Annual Report FY 2021-22": "/docs/annual-report-2021-22-kyd.pdf",
  "Financials 2024-25": "/docs/financials-2024-25-hvs.pdf",
  "Re-Audited Financials 2023-24": "/docs/re-audited-financials-2023-24-hep.pdf",
  "LR Half Yearly Financials 30.09.2025": "/docs/lr-half-yearly-financials-30-09-2025-grz.pdf",
  "MGT-9 F.Y. 21-22": "/docs/mgt-9-f-y-21-22-gjr.pdf",
  "AOC 2 F.Y. 22-23": "/docs/aoc-2-f-y-22-23-hah.pdf",
  "AOC 2 F.Y. 21-22": "/docs/aoc-2-f-y-21-22-yov.pdf",
  "AOC F.Y. 2023-24": "/docs/aoc-f-y-2023-24-zcf.pdf",

  // ── Policies ──
  "Familiarization Programme of ID": "/docs/familiarization-programme-of-id-ree.pdf",
  "Nomination And Remuneration Policy": "/docs/nomination-and-remuneration-policy-akg.pdf",
  "Vigil Mechanism & Whistle Blower Policy": "/docs/vigil-mechanism-and-whistler-blower-policy-tgx.pdf",
  "Code of Conduct For BoD and SMT": "/docs/code-of-conduct-for-bod-and-smt-ugo.pdf",
  "Code of Practice and Procedure for UPSI": "/docs/code-of-practice-and-procedure-for-upsi-dxi.pdf",
  "Criteria or Policy for Making Payments to NED": "/docs/criteria-or-policy-for-making-payments-to-ned-yvx.pdf",
  "Policy on Preservation and Archival of Documents": "/docs/policy-on-preservation-and-archival-of-documents-ruk.pdf",
  "POSH Policy": "/docs/policy-on-prevention-of-sexual-harrasement-at-workplace-posh-fum.pdf",
  "Terms & Conditions of Appointment of Independent Directors": "/docs/terms-and-conditions-of-appointment-of-independent-directors-ajy.pdf",
  "Prohibition of Insider Trading Policy": "/docs/prohibition-of-insider-trading-policy-ofl.pdf",
  "Policy On Identification Of Group Companies & Material Creditors": "/docs/policy-on-identification-of-group-companies-material-creditors-hzb.pdf",
  "CSR Policy": "/docs/csr-policy-fzh.pdf",
  "Policy on Succession Planning for the Board and Senior Management": "/docs/policy-on-succession-planning-for-the-board-and-senior-management-axh.pdf",
  "Related Party Transaction Policy": "/docs/rpt-updated-policy-wlf.pdf",
};

export function docUrl(title: string): string | undefined {
  return DOC_FILES[title] || undefined;
}
