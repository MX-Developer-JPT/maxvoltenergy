$base = "https://www.maxvoltenergy.com/assets/docs/policy"
$dest = "D:\Maxvolt-Jai\Development\Site\maxvolt-energy\public\docs"

$files = @(
  # Earnings call
  "investors-presentation-fy-25-oai.pdf",
  "earnings-call-audio-fy-2025-aoh.mp3",
  "earnings-call-transcript-h2-fy25-ruy.pdf",
  "investors-presentation-h1-fy-26-czv.pdf",
  "earnings-call-transcript-h1-fy26-hwv.pdf",
  "earnings-call-audio-h1-fy26-cwo.mp3",
  "earnings-call-audio-kxd.mp3",
  "earning-call-transcript-h2-fy26-pgf.pdf",
  # Corporate announcements
  "outcome-of-board-meeting-whl.pdf",
  "change-in-cs-qqf.pdf",
  "pcs-certificate-regulation-163-cgl.pdf",
  "copy-of-np-xxh.pdf",
  "maxvolt2019-20122025131628-copy-of-newspaper-lfs.pdf",
  "egm-proceedings-nzm.pdf",
  "voting-results-and-scrutinizers-report-lmf.pdf",
  "incorporation-reg-30-ctk.pdf",
  "final-notice-newspaper-zeg.docx",
  "combinedvrsr-tcr.pdf",
  "trading-window-closure-ksz.pdf",
  "corrigendum-exp-statement-final-zle.pdf",
  "bmintimation12052026-wqt.pdf",
  "bm-intimation12052026revised-lhj.pdf",
  "maxvoltoutcome-hqo.pdf",
  # Shareholding
  "list-of-shareholders-as-on-31-03-2024-yak.pdf",
  "list-of-shareholder-as-on-31st-march-2023-xns.pdf",
  "list-of-shareholder-as-on-31-03-2022-lay.pdf",
  # Policies
  "familiarization-programme-of-id-ree.pdf",
  "nomination-and-remuneration-policy-akg.pdf",
  "vigil-mechanism-and-whistler-blower-policy-tgx.pdf",
  "code-of-conduct-for-bod-and-smt-ugo.pdf",
  "code-of-practice-and-procedure-for-upsi-dxi.pdf",
  "criteria-or-policy-for-making-payments-to-ned-yvx.pdf",
  "policy-on-preservation-and-archival-of-documents-ruk.pdf",
  "policy-on-prevention-of-sexual-harrasement-at-workplace-posh-fum.pdf",
  "terms-and-conditions-of-appointment-of-independent-directors-ajy.pdf",
  "prohibition-of-insider-trading-policy-ofl.pdf",
  "policy-on-identification-of-group-companies-material-creditors-hzb.pdf",
  "csr-policy-fzh.pdf",
  "policy-on-succession-planning-for-the-board-and-senior-management-axh.pdf",
  "rpt-updated-policy-wlf.pdf",
  # Financial / annual reports
  "annual-report-2023-24-ium.pdf",
  "annual-report-2022-23-zhq.pdf",
  "annual-report-2021-22-kyd.pdf",
  "mgt-9-f-y-21-22-gjr.pdf",
  "aoc-2-f-y-22-23-hah.pdf",
  "aoc-2-f-y-21-22-yov.pdf",
  "aoc-f-y-2023-24-zcf.pdf",
  "re-audited-financials-2023-24-hep.pdf",
  "financials-2024-25-hvs.pdf",
  "lr-half-yearly-financials-30-09-2025-grz.pdf"
)

$ok = 0; $fail = 0; $failed = @()
foreach ($f in $files) {
  $url = "$base/$f"
  $out = Join-Path $dest $f
  try {
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -TimeoutSec 40 -ErrorAction Stop
    $size = (Get-Item $out).Length
    if ($size -lt 100) { throw "too small ($size bytes)" }
    $ok++
  } catch {
    $fail++; $failed += $f
    Write-Host "FAIL: $f  ($($_.Exception.Message))"
  }
}
Write-Host "Done: $ok OK, $fail failed"
if ($failed.Count -gt 0) { Write-Host "Failed files:"; $failed | ForEach-Object { Write-Host "  $_" } }
