$base = "https://www.maxvoltenergy.com/assets/images"
$dest = "D:\Maxvolt-Jai\Development\Site\maxvolt-energy\public\images"

$images = @(
  # Logo & core
  "logo.webp",
  "header-image.webp",
  "breadcrumb-image.webp",
  "whats-app.webp",
  "reload.webp",
  "loader-circulation.svg",

  # Banners
  "banner/1-puu.webp",
  "banner/748685-mqc.webp",
  "banner/banner-vzj.webp",
  "banner/banner-ygm.webp",
  "banner/ygjghj-bng.webp",
  "banner/32-ayi.webp",

  # Category / section images
  "category/banners-section-pch.webp",
  "category/powered-with-new-gen-technology-enj.webp",
  "category/powered-with-new-gen-technology-zoc.webp",
  "category/why-choose-us-wrn.webp",
  "category/about-us-eej.webp",
  "category/about-us-rja.webp",
  "category/our-mission-cai.webp",
  "category/our-vision-tut.webp",
  "category/gallery-ina.webp",
  "category/investors-xup.webp",
  "category/earnings-call-udw.webp",
  "category/management-hmh.webp",
  "category/management-iei.webp",
  "category/corporate-governance-jig.webp",
  "category/corporate-announcement-eqn.webp",
  "category/shareholding-pattern-dvd.webp",
  "category/initial-public-offering-kpe.webp",
  "category/policies-xax.webp",
  "category/notices-zqp.webp",
  "category/financial-dqf.webp",
  "category/investors-contact-puv.webp",
  "category/material-contract-qog.webp",
  "category/material-document-fca.webp",
  "category/investors-presentation-vnr.webp",
  "category/annual-report-gwe.webp",

  # Product category images (used on product listing)
  "product/e-cycle-lithium-battery-txc.webp",
  "product/e-scooter-bike-lithium-battery-mpu.webp",
  "product/e-rickshaw-lithium-battery-ohn.webp",
  "product/lithium-battery-energy-storage-solutions-tjf.webp",
  "product/lithium-battery-for-solar-application-zhs.webp",
  "product/customized-battery-solution-jkz.webp",
  "product/graphene-battery-fnx.webp",

  # E-Scooter products
  "product/e-scooter-battery-48v-29ah-kac.webp",
  "product/e-scooter-battery-48v-29ah-caj.webp",
  "product/e-scooter-battery-48v-25ah-rug.webp",
  "product/e-scooter-battery-48v-25ah-xoq.webp",
  "product/e-scooter-battery-48v-29ah-17-5-kg-oxr.webp",
  "product/e-scooter-battery-48v-29ah-17-5-kg-cbm.webp",
  "product/e-scooter-battery-60v-25ah-bfq.webp",
  "product/e-scooter-battery-60v-25ah-gru.webp",
  "product/e-scooter-battery-60v-29ah-zvm.webp",
  "product/e-scooter-battery-60v-29ah-pau.webp",
  "product/e-scooter-battery-60v-34ah-uuy.webp",
  "product/e-scooter-battery-60v-34ah-stf.webp",
  "product/e-scooter-battery-63v-18-kg-idi.webp",
  "product/e-scooter-battery-63v-29ah-18-kg-aqd.webp",
  "product/e-scooter-battery-63v-29ah-hkv.webp",
  "product/e-scooter-battery-63v-29ah-qtb.webp",
  "product/e-scooter-battery-63v-34ah-sdx.webp",
  "product/e-scooter-battery-63v-34ah-olk.webp",
  "product/e-scooter-battery-63v-40ah-mre.webp",
  "product/e-scooter-battery-63v-40ah-euj.webp",
  "product/e-scooter-battery-74v-25ah-sdv.webp",
  "product/e-scooter-battery-74v-25ah-guy.webp",
  "product/e-scooter-battery-74v-29ah-bbb.webp",
  "product/e-scooter-battery-74v-29ah-19-5-kg-ukn.webp",
  "product/e-scooter-battery-74v-29ah-ehh.webp",
  "product/e-scooter-battery-74v-29ah-xmq.webp",
  "product/e-scooter-battery-74v-34ah-lyb.webp",
  "product/e-scooter-battery-74v-34ah-onq.webp",
  "product/e-scooter-battery-74v-40ah-qrg.webp",
  "product/e-scooter-battery-74v-40ah-wwh.webp",

  # E-Rickshaw products
  "product/51-2v-100ah-e-rickshaw-battery-roc.webp",
  "product/e-rickshaw-battery-51-2v-uif.webp",
  "product/51-2v-150ah-e-rickshaw-battery-szt.webp",
  "product/51-2v-e-rickshaw-battery-wbv.webp",
  "product/51-2v-200ah-e-rickshaw-battery-fjv.webp",
  "product/e-rickshaw-battery-200ah-rxs.webp",

  # Inverter/ESS batteries
  "product/12-8v-100ah-inverter-battery-xgc.webp",
  "product/12-8v-100ah-inverter-battery-add.webp",
  "product/12-8v-150ah-inverter-battery-wru.webp",
  "product/12-8v-150ah-inverter-battery-jou.webp",
  "product/12-8v-200ah-inverter-battery-qed.webp",
  "product/12-8v-200ah-inverter-battery-amo.webp",
  "product/12-8v-300ah-inverter-battery-ygj.webp",
  "product/12-8v-300ah-inverter-battery-sjm.webp",
  "product/25-6v-100ah-inverter-battery-xiy.webp",
  "product/25-6v-100ah-inverter-battery-ypz.webp",
  "product/25-6v150ah-inverter-battery-ums.webp",
  "product/25-6v150ah-inverter-battery-mou.webp",
  "product/25-6v-200ah-inverter-battery-ckm.webp",
  "product/25-6v-200ah-inverter-battery-xsv.webp",
  "product/48v-100ah-inverter-battery-bcg.webp",
  "product/48v-100ah-inverter-battery-mgv.webp",
  "product/48v-150ah-inverter-battery-zuk.webp",
  "product/48v-150ah-inverter-battery-gkr.webp",
  "product/51-2v-100ah-inverter-battery-oqh.webp",
  "product/51-2v-100ah-inverter-battery-jln.webp",
  "product/51-2v-150ah-inverter-battery-rwe.webp",
  "product/51-2v-150ah-inverter-battery-uju.webp",

  # Certificates
  "certificate/-zrp.webp",
  "certificate/-fzl.webp",
  "certificate/450-tac-maxvolt-62940-106-xkd.webp",
  "certificate/tac-maxvolt-51-2v-105ah-brz.webp",
  "certificate/449-tac-maxvolt-62934-105-tki.webp",
  "certificate/448-tac-maxvolt-62929-104-kkc.webp",

  # Team photos
  "our-team/vishal-gupta-oxh.webp",
  "our-team/bhuvneshwar-pal-singh-sxx.webp",
  "our-team/satendra-shukla-shc.webp",
  "our-team/sachin-gupta-lau.webp",
  "our-team/mukesh-gupta-cva.webp",

  # Gallery
  "gallery/-zxk.webp",
  "gallery/-xgo.webp",
  "gallery/-crj.webp",
  "gallery/-pve.webp",
  "gallery/-okz.webp",

  # Blog
  "blog/rising-fuel-prices-and-west-asia-tensions-accelerate-ev-shift-strengthening-demand-for-maxvolt-solu-ael.webp",
  "blog/fuel-price-hikes-and-west-asia-tensions-accelerate-ev-adoption-boosting-demand-for-maxvolt-energy-s-xmk.webp",
  "blog/fuel-price-hikes-and-west-asia-tensions-accelerate-ev-adoption-strengthening-maxvolts-role-in-indi-akb.webp",
  "blog/maxvolt-reearth-publishes-study-on-advanced-lithium-ion-battery-recycling-technologies-nnx.webp",
  "blog/maxvolt-reearth-publishes-research-on-advanced-lithium-ion-battery-recycling-technologies-xrb.webp",
  "blog/maxvolt-reearth-research-paper-on-lithium-ion-battery-recycling-published-internationally-pgg.webp",
  "blog/maxvolt-reearth-research-paper-on-lithium-ion-battery-recycling-gains-international-recognition-mqe.webp",
  "blog/maxvolt-reearth-research-on-li-ion-battery-recycling-published-internationally-zmh.webp",
  "blog/maxvolt-reearth-research-on-li-ion-battery-recycling-published-internationally-qsa.webp",
  "blog/maxvolt-reearth-energy-industries-research-paper-on-lithium-ion-battery-recycling-published-internat-yje.webp",

  # Social share icons
  "addtoany/facebook.webp",
  "addtoany/x.webp",
  "addtoany/linkedin.webp",
  "addtoany/whatsapp.webp",
  "addtoany/gmail.webp",

  # Brand partners
  "brand/client-pwd.webp",
  "brand/client-eav.webp",
  "brand/-ols.webp",
  "brand/-enx.webp",
  "brand/-auo.webp",
  "brand/-doh.webp",
  "brand/-zsc.webp",
  "brand/-ojz.webp",
  "brand/-nyl.webp",
  "brand/-yvg.webp",
  "brand/-ami.webp",
  "brand/-bfs.webp",
  "brand/-axl.webp",
  "brand/-rxh.webp",
  "brand/-exa.webp",
  "brand/-xhe.webp",
  "brand/-oei.webp",
  "brand/-myc.webp",
  "brand/-kfv.webp",
  "brand/-ocj.webp",
  "brand/-ckk.webp",
  "brand/-ghi.webp",
  "brand/-apy.webp",
  "brand/-arz.webp",
  "brand/-ylh.webp",
  "brand/-swi.webp",
  "brand/-hpz.webp",
  "brand/-aur.webp",
  "brand/-kcp.webp",
  "brand/-zou.webp",
  "brand/-qtv.webp",
  "brand/-wgv.webp",
  "brand/-nmq.webp",
  "brand/-yjw.webp",
  "brand/-kin.webp",
  "brand/-iwc.webp",
  "brand/-vrh.webp",
  "brand/-jfb.webp",
  "brand/-kuz.webp",
  "brand/-icu.webp",
  "brand/-ftk.webp",
  "brand/-seo.webp",
  "brand/-uqw.webp",
  "brand/-dps.webp"
)

$ok = 0
$fail = 0
foreach ($img in $images) {
  $url = "$base/$img"
  $subfolder = Split-Path $img -Parent
  $filename = Split-Path $img -Leaf
  $outDir = if ($subfolder) { Join-Path $dest $subfolder } else { $dest }
  $outPath = Join-Path $outDir $filename
  if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Force $outDir | Out-Null }
  try {
    Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
    $ok++
  } catch {
    $fail++
    Write-Host "FAIL: $img"
  }
}
Write-Host "Done: $ok OK, $fail failed"
