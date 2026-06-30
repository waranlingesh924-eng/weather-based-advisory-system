// WEATHER BASED FARMING ADVISOR SYSTEM

const state = { currentStep:0, totalSteps:8, data:{} };

// INDIAN STATES & DISTRICTS
const stateDistricts = {
  "Andhra Pradesh":["Visakhapatnam","Vijayawada","Guntur","Nellore","Kurnool","Tirupati"],
  "Bihar":["Patna","Gaya","Muzaffarpur","Bhagalpur","Darbhanga","Begusarai"],
  "Gujarat":["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar"],
  "Haryana":["Ambala","Hisar","Karnal","Rohtak","Gurugram","Faridabad"],
  "Karnataka":["Bengaluru","Mysuru","Hubli","Mangaluru","Belagavi","Davangere"],
  "Kerala":["Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Kollam","Palakkad"],
  "Madhya Pradesh":["Bhopal","Indore","Gwalior","Jabalpur","Ujjain","Sagar"],
  "Maharashtra":["Mumbai","Pune","Nagpur","Nashik","Aurangabad","Solapur"],
  "Punjab":["Amritsar","Ludhiana","Jalandhar","Patiala","Bathinda","Mohali"],
  "Rajasthan":["Jaipur","Jodhpur","Udaipur","Kota","Ajmer","Bikaner"],
  "Tamil Nadu":["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli"],
  "Telangana":["Hyderabad","Warangal","Nizamabad","Karimnagar","Khammam","Mahbubnagar"],
  "Uttar Pradesh":["Lucknow","Kanpur","Agra","Varanasi","Allahabad","Meerut"],
  "West Bengal":["Kolkata","Howrah","Durgapur","Asansol","Siliguri","Bardhaman"],
  "Odisha":["Bhubaneswar","Cuttack","Rourkela","Sambalpur","Berhampur","Puri"]
};

// CROP SUITABILITY
const cropSuitability = {
  "Rice":     {soils:["Clay","Loamy","Black Soil"],    climates:["Rainy","Summer"]},
  "Wheat":    {soils:["Loamy","Clay","Black Soil"],    climates:["Winter","Autumn"]},
  "Maize":    {soils:["Loamy","Sandy","Red Soil"],     climates:["Summer","Rainy"]},
  "Sugarcane":{soils:["Loamy","Black Soil","Clay"],    climates:["Summer","Rainy"]},
  "Cotton":   {soils:["Black Soil","Red Soil","Loamy"],climates:["Summer","Rainy"]},
  "Soybean":  {soils:["Loamy","Black Soil","Clay"],    climates:["Rainy","Summer"]},
  "Groundnut":{soils:["Sandy","Red Soil","Loamy"],     climates:["Summer","Rainy"]},
  "Tomato":   {soils:["Loamy","Sandy","Red Soil"],     climates:["Summer","Winter","Autumn"]},
  "Onion":    {soils:["Loamy","Sandy","Black Soil"],   climates:["Winter","Autumn","Summer"]},
  "Potato":   {soils:["Sandy","Loamy","Clay"],         climates:["Winter","Autumn"]},
  "Banana":   {soils:["Loamy","Black Soil","Clay"],    climates:["Summer","Rainy"]},
  "Mango":    {soils:["Loamy","Red Soil","Sandy"],     climates:["Summer","Autumn"]},
  "Chilli":   {soils:["Loamy","Sandy","Red Soil"],     climates:["Summer","Rainy"]},
  "Turmeric": {soils:["Loamy","Clay","Red Soil"],      climates:["Rainy","Summer"]},
  "Sunflower":{soils:["Loamy","Black Soil","Sandy"],   climates:["Summer","Winter"]},
  "Jowar":    {soils:["Black Soil","Red Soil","Sandy"],climates:["Rainy","Summer"]},
  "Bajra":    {soils:["Sandy","Red Soil","Loamy"],     climates:["Summer","Rainy"]},
  "Mustard":  {soils:["Loamy","Sandy","Clay"],         climates:["Winter","Autumn"]},
  "Lentil":   {soils:["Loamy","Clay","Black Soil"],    climates:["Winter","Autumn"]},
  "Chickpea": {soils:["Sandy","Loamy","Black Soil"],   climates:["Winter","Autumn"]}
};

const cropAlternatives = {
  "Sandy":      ["Groundnut","Bajra","Maize","Jowar","Potato"],
  "Clay":       ["Rice","Wheat","Lentil","Chickpea","Banana"],
  "Loamy":      ["Tomato","Wheat","Sugarcane","Soybean","Onion"],
  "Black Soil": ["Cotton","Jowar","Sugarcane","Wheat","Lentil"],
  "Red Soil":   ["Groundnut","Chilli","Maize","Jowar","Tomato"]
};

// DISEASE DATA
const diseaseData = {
  "Rice":     [{name:"Blast Disease 🍃",reason:"Humid climate, dense planting, nitrogen excess",prevention:"Use resistant varieties, balanced fertilization, fungicide (Tricyclazole)"},{name:"Brown Plant Hopper 🦗",reason:"Excessive rain, waterlogging",prevention:"Drain water periodically, use recommended insecticides"}],
  "Wheat":    [{name:"Rust (Yellow/Brown) 🟡",reason:"Cool & moist weather in winter",prevention:"Sow resistant varieties, apply Propiconazole fungicide early"},{name:"Aphids 🐜",reason:"Cool winter temperatures",prevention:"Spray Dimethoate or Imidacloprid"}],
  "Cotton":   [{name:"Bollworm 🐛",reason:"Rainy season, high humidity",prevention:"Use Bt cotton varieties, spray Chlorpyrifos"},{name:"Cotton Leaf Curl Virus 🍂",reason:"White fly infestation during summer",prevention:"Control white fly with Imidacloprid, remove infected plants"}],
  "Tomato":   [{name:"Early Blight 🍅",reason:"Warm & humid climate, poor drainage",prevention:"Apply Mancozeb fungicide, ensure proper spacing"},{name:"Fruit Borer 🐛",reason:"High temperature during fruit set",prevention:"Spray Spinosad or Emamectin Benzoate"}],
  "Potato":   [{name:"Late Blight 🥔",reason:"Cold & moist winter conditions",prevention:"Apply Ridomil Gold fungicide, use certified disease-free seeds"},{name:"Common Scab 🌿",reason:"Alkaline soil, dry conditions at tuber initiation",prevention:"Maintain soil pH 5-5.5, ensure adequate moisture"}],
  "Maize":    [{name:"Fall Armyworm 🐛",reason:"Warm & humid rainy season",prevention:"Spray Chlorantraniliprole or Spinetoram, use pheromone traps"},{name:"Stalk Rot 🌽",reason:"Waterlogged soil, late sowing",prevention:"Ensure drainage, balanced potassium fertilization"}],
  "Groundnut":[{name:"Tikka Disease (Leaf Spot) 🟤",reason:"Rainy season, high humidity",prevention:"Spray Chlorothalonil at 45-day interval"},{name:"Stem Rot 🌱",reason:"Wet soil, poor drainage",prevention:"Apply Carbendazim, avoid over-irrigation"}],
  "Sugarcane":[{name:"Red Rot 🔴",reason:"Waterlogging, infected planting material",prevention:"Use disease-free setts, apply Carbendazim"},{name:"Wilt 🌿",reason:"Soil-borne Fusarium, water stress",prevention:"Select resistant varieties, treat setts in hot water"}],
  "Onion":    [{name:"Purple Blotch 🟣",reason:"High humidity, rainy climate",prevention:"Apply Mancozeb or Iprodione fungicide"},{name:"Thrips 🐜",reason:"Hot & dry summer conditions",prevention:"Spray Spinosad or Fipronil, use sticky yellow traps"}],
  "default":  [{name:"Fungal Leaf Spot 🍂",reason:"High humidity, poor air circulation",prevention:"Use registered fungicides (Mancozeb/Copper Oxychloride), ensure spacing"},{name:"Root Rot 🌱",reason:"Overwatering, waterlogged soil",prevention:"Improve drainage, reduce irrigation, use Trichoderma biofungicide"}]
};

// FERTILIZER DATA
const fertilizerData = {
  "Rice":      {name:"Urea + DAP",          qty:"120 kg Urea + 60 kg DAP per hectare",method:"Broadcast at transplanting; split dose at tillering",timing:"Basal at transplanting + Top dress at 21 & 45 days"},
  "Wheat":     {name:"DAP + MOP",            qty:"125 kg DAP + 60 kg MOP per hectare", method:"Mix in soil before sowing; urea top-dress after irrigation",timing:"Before sowing + Top dress at crown-root stage"},
  "Maize":     {name:"Urea + SSP",           qty:"100 kg Urea + 80 kg SSP per hectare",method:"Band placement near seed rows",timing:"Half urea at sowing + half at knee-high stage"},
  "Sugarcane": {name:"NPK 15-15-15",         qty:"250 kg NPK per hectare",             method:"Furrow application before planting",timing:"At planting + supplemental urea at 3 & 6 months"},
  "Cotton":    {name:"Urea + Potash",        qty:"100 kg Urea + 50 kg Potash per ha",  method:"Row application; side dress",timing:"At sowing + square formation stage"},
  "Tomato":    {name:"NPK 19-19-19",         qty:"200 kg NPK per hectare",             method:"Fertigation through drip system",timing:"Weekly from transplanting to fruit set"},
  "Potato":    {name:"DAP + MOP + Urea",     qty:"150 kg DAP + 100 kg MOP per ha",    method:"Apply in furrows at planting",timing:"At planting + 30 days after planting"},
  "Onion":     {name:"NPK 12-32-16",         qty:"200 kg per hectare",                 method:"Incorporate in soil before transplanting",timing:"At transplanting + 6 weeks later"},
  "Groundnut": {name:"Gypsum + DAP",         qty:"400 kg Gypsum + 50 kg DAP per ha",  method:"Broadcast before sowing, gypsum at pegging",timing:"Before sowing + at pegging stage"},
  "Banana":    {name:"Urea + Potassium Sulfate",qty:"300 g N + 300 g K per plant/year",method:"Split into 4 doses per year",timing:"Every 3 months"},
  "default":   {name:"NPK 14-14-14 Balanced",qty:"150-200 kg per hectare",            method:"Broadcast or band application",timing:"At sowing and 30 days after"}
};

// IRRIGATION DATA
const irrigationData = {
  "Rice":      {freq:"Continuous flooding (2-5 cm)", water:"1200-2000 mm/season",method:"Flood",     recommended:"Flood"},
  "Wheat":     {freq:"6-7 irrigations per season",   water:"450-600 mm/season",  method:"Sprinkler", recommended:"Sprinkler"},
  "Maize":     {freq:"Every 10-12 days",             water:"500-800 mm/season",  method:"Sprinkler", recommended:"Sprinkler"},
  "Sugarcane": {freq:"Every 7-10 days",              water:"1500-2500 mm/season",method:"Drip",      recommended:"Drip"},
  "Cotton":    {freq:"Every 12-15 days",             water:"700-1200 mm/season", method:"Drip",      recommended:"Drip"},
  "Tomato":    {freq:"Every 4-5 days",               water:"400-600 mm/season",  method:"Drip",      recommended:"Drip"},
  "Potato":    {freq:"Every 7-10 days",              water:"500-700 mm/season",  method:"Sprinkler", recommended:"Sprinkler"},
  "Onion":     {freq:"Every 8-10 days",              water:"350-550 mm/season",  method:"Drip",      recommended:"Drip"},
  "Groundnut": {freq:"Every 10-12 days",             water:"500-700 mm/season",  method:"Sprinkler", recommended:"Sprinkler"},
  "Banana":    {freq:"Every 4-5 days",               water:"900-1200 mm/season", method:"Drip",      recommended:"Drip"},
  "Chilli":    {freq:"Every 5-7 days",               water:"400-600 mm/season",  method:"Drip",      recommended:"Drip"},
  "Mustard":   {freq:"2-3 irrigations per season",   water:"250-350 mm/season",  method:"Flood",     recommended:"Flood"},
  "default":   {freq:"Every 10 days",                water:"400-600 mm/season",  method:"Sprinkler", recommended:"Sprinkler"}
};

// MARKET PRICE DATA
const marketData = {
  "Rice":      {price:"₹2,183", unit:"per quintal",market:"APMC Warangal",  trend:"stable",pct:"0%"},
  "Wheat":     {price:"₹2,275", unit:"per quintal",market:"APMC Indore",    trend:"up",    pct:"+3.2%"},
  "Maize":     {price:"₹1,870", unit:"per quintal",market:"APMC Davangere", trend:"up",    pct:"+5.1%"},
  "Sugarcane": {price:"₹340",   unit:"per quintal",market:"APMC Kolhapur",  trend:"stable",pct:"0%"},
  "Cotton":    {price:"₹6,800", unit:"per quintal",market:"APMC Akola",     trend:"down",  pct:"-2.3%"},
  "Soybean":   {price:"₹4,600", unit:"per quintal",market:"APMC Indore",    trend:"up",    pct:"+4.5%"},
  "Groundnut": {price:"₹5,850", unit:"per quintal",market:"APMC Rajkot",    trend:"up",    pct:"+6.0%"},
  "Tomato":    {price:"₹1,200", unit:"per quintal",market:"Koyambedu Chennai",trend:"down",pct:"-8.2%"},
  "Onion":     {price:"₹2,100", unit:"per quintal",market:"Lasalgaon Nashik",trend:"up",   pct:"+12.5%"},
  "Potato":    {price:"₹1,400", unit:"per quintal",market:"APMC Agra",      trend:"stable",pct:"0%"},
  "Banana":    {price:"₹1,800", unit:"per quintal",market:"APMC Jalgaon",   trend:"stable",pct:"0%"},
  "Mango":     {price:"₹4,500", unit:"per quintal",market:"APMC Vashi",     trend:"down",  pct:"-3.0%"},
  "Chilli":    {price:"₹8,200", unit:"per quintal",market:"APMC Guntur",    trend:"up",    pct:"+7.8%"},
  "Turmeric":  {price:"₹9,000", unit:"per quintal",market:"APMC Erode",     trend:"up",    pct:"+9.2%"},
  "Sunflower": {price:"₹5,800", unit:"per quintal",market:"APMC Bijapur",   trend:"stable",pct:"+1.0%"},
  "Jowar":     {price:"₹2,758", unit:"per quintal",market:"APMC Solapur",   trend:"stable",pct:"0%"},
  "Bajra":     {price:"₹2,350", unit:"per quintal",market:"APMC Jodhpur",   trend:"stable",pct:"0%"},
  "Mustard":   {price:"₹5,650", unit:"per quintal",market:"APMC Alwar",     trend:"up",    pct:"+4.3%"},
  "Lentil":    {price:"₹6,400", unit:"per quintal",market:"APMC Indore",    trend:"up",    pct:"+2.8%"},
  "Chickpea":  {price:"₹5,440", unit:"per quintal",market:"APMC Bikaner",   trend:"stable",pct:"+0.5%"},
  "default":   {price:"₹3,000", unit:"per quintal",market:"Local APMC",     trend:"stable",pct:"0%"}
};

// UTILITIES
function showToast(msg) {
  const t = document.getElementById("toast");
  t.querySelector(".toast-msg").textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

function updateProgress() {
  const pct = ((state.currentStep) / (state.totalSteps - 1)) * 100;
  document.getElementById("progress-fill").style.width = pct + "%";
  document.getElementById("progress-pct").textContent = Math.round(pct) + "%";
  document.getElementById("progress-step-label").textContent = "Step " + (state.currentStep + 1) + " of " + state.totalSteps;
  document.querySelectorAll(".step-dot").forEach((dot, i) => {
    dot.classList.remove("done","active");
    if (i < state.currentStep) dot.classList.add("done");
    if (i === state.currentStep) dot.classList.add("active");
  });
}

function switchStep(step) {
  document.querySelectorAll(".module-card").forEach(c => c.classList.remove("active"));
  const card = document.getElementById("module-" + step);
  if (card) { card.classList.add("active"); card.scrollIntoView({behavior:"smooth",block:"start"}); }
  state.currentStep = step;
  updateProgress();
}

// MODULE 1
function initModule1() {
  const stateSelect = document.getElementById("m1-state");
  stateSelect.innerHTML = '<option value="">-- Select State --</option>';
  Object.keys(stateDistricts).sort().forEach(s => {
    stateSelect.innerHTML += `<option value="${s}">${s}</option>`;
  });
}

function validateModule1() {
  const s = document.getElementById("m1-state").value;
  const d = document.getElementById("m1-district").value.trim();
  const v = document.getElementById("m1-village").value.trim();
  const c = document.querySelector('input[name="climate"]:checked');
  if (!s) { showToast("⚠️ Please select a state."); return false; }
  if (!d) { showToast("⚠️ Please enter your district."); return false; }
  if (!v) { showToast("⚠️ Please enter your village/location."); return false; }
  if (!c) { showToast("⚠️ Please select a climate type."); return false; }
  state.data.state = s; state.data.district = d;
  state.data.village = v; state.data.climate = c.value;
  return true;
}

// MODULE 2
function initModule2() {
  const cropSelect = document.getElementById("m2-crop");
  cropSelect.innerHTML = '<option value="">-- Select Crop --</option>';
  Object.keys(cropSuitability).sort().forEach(c => {
    cropSelect.innerHTML += `<option value="${c}">${c}</option>`;
  });
}

function validateModule2() {
  const crop  = document.getElementById("m2-crop").value;
  const soil  = document.querySelector('input[name="soil"]:checked');
  const month = document.getElementById("m2-month").value;
  if (!crop)  { showToast("⚠️ Please select a crop."); return false; }
  if (!soil)  { showToast("⚠️ Please select a soil type."); return false; }
  if (!month) { showToast("⚠️ Please select a planting month."); return false; }
  state.data.crop = crop; state.data.soil = soil.value; state.data.month = month;
  return true;
}

// MODULE 3 - SUITABILITY
function renderModule3() {
  const {crop, soil, climate} = state.data;
  const info = cropSuitability[crop];
  const soilOk = info && info.soils.includes(soil);
  const climateOk = info && info.climates.includes(climate);
  const suitable = soilOk && climateOk;
  state.data.suitable = suitable;
  let html = "";
  if (suitable) {
    html += `<div class="result-banner success"><div class="banner-icon">✅</div><div class="banner-text"><h3>${crop} is Suitable for Cultivation!</h3><p>The selected soil (${soil}) and climate (${climate}) are both well-suited for growing ${crop}.</p></div></div>`;
  } else {
    const altCrops = (cropAlternatives[soil] || ["Maize","Jowar","Chickpea"]).filter(c => c !== crop).slice(0,3);
    html += `<div class="result-banner fail"><div class="banner-icon">❌</div><div class="banner-text"><h3>${crop} is Not Suitable</h3><p>${!soilOk?`${soil} soil is not ideal for ${crop}. `:""}${!climateOk?`${climate} climate is not optimal for ${crop}.`:""}</p></div></div>
    <div class="result-banner warning"><div class="banner-icon">💡</div><div class="banner-text"><h3>Suggested Alternative Crops</h3><p>For ${soil} soil in ${climate} climate, consider: <strong>${altCrops.join(", ")}</strong></p></div></div>`;
  }
  html += `<div class="info-cards">
    <div class="info-card"><div class="card-label">Selected Crop</div><div class="card-value">🌱 ${crop}</div></div>
    <div class="info-card"><div class="card-label">Soil Type</div><div class="card-value">🪨 ${soil}</div><div class="card-sub">${soilOk?"✅ Compatible":"❌ Not Ideal"}</div></div>
    <div class="info-card"><div class="card-label">Climate</div><div class="card-value">🌤 ${climate}</div><div class="card-sub">${climateOk?"✅ Compatible":"❌ Not Ideal"}</div></div>
    <div class="info-card"><div class="card-label">Best Soils for ${crop}</div><div class="card-value" style="font-size:0.85rem">${info?info.soils.join(", "):"—"}</div></div>
  </div>`;
  document.getElementById("m3-result").innerHTML = html;
}

// MODULE 4 - DISEASE
function renderModule4() {
  const {crop, climate, soil} = state.data;
  const diseases = diseaseData[crop] || diseaseData["default"];
  let html = `<p style="color:var(--text-secondary);margin-bottom:1.2rem;font-size:0.9rem;">Based on <strong style="color:var(--text-primary)">${crop}</strong> in <strong style="color:var(--amber)">${climate}</strong> climate with <strong style="color:var(--amber)">${soil}</strong> soil:</p><div class="disease-list">`;
  diseases.forEach(d => {
    html += `<div class="disease-card"><h4>🦠 ${d.name}</h4><div class="disease-detail"><div class="disease-detail-item"><label>Reason / Cause</label><p>${d.reason}</p></div><div class="disease-detail-item"><label>Preventive Measures</label><p>${d.prevention}</p></div></div></div>`;
  });
  html += "</div>";
  document.getElementById("m4-result").innerHTML = html;
}

// MODULE 5 - FERTILIZER
function renderModule5() {
  const {crop, soil} = state.data;
  const f = fertilizerData[crop] || fertilizerData["default"];
  document.getElementById("m5-result").innerHTML = `
    <p style="color:var(--text-secondary);margin-bottom:1.2rem;font-size:0.9rem;">Fertilizer plan for <strong style="color:var(--text-primary)">${crop}</strong> on <strong style="color:var(--amber)">${soil}</strong> soil:</p>
    <table class="fert-table"><thead><tr><th>Parameter</th><th>Details</th></tr></thead><tbody>
      <tr><td>🧪 Recommended Fertilizer</td><td>${f.name}</td></tr>
      <tr><td>⚖️ Quantity</td><td>${f.qty}</td></tr>
      <tr><td>🚜 Application Method</td><td>${f.method}</td></tr>
      <tr><td>📅 Best Time to Apply</td><td>${f.timing}</td></tr>
    </tbody></table>
    <div class="result-banner warning"><div class="banner-icon">💡</div><div class="banner-text"><h3>Pro Tip</h3><p>Always do a soil test before applying fertilizers. Adjust NPK ratios based on soil report for best results.</p></div></div>`;
}

// MODULE 6 - IRRIGATION
function renderModule6() {
  const {crop, climate} = state.data;
  const irr = irrigationData[crop] || irrigationData["default"];
  const methods = ["Drip","Sprinkler","Flood"];
  const methodsHtml = methods.map(m => `<div class="irr-method ${irr.recommended===m?"recommended":""}"><span class="irr-icon">${m==="Drip"?"💧":m==="Sprinkler"?"🌀":"🌊"}</span><div class="irr-name">${m} Irrigation</div>${irr.recommended===m?'<span class="irr-tag">✅ Recommended</span>':""}</div>`).join("");
  document.getElementById("m6-result").innerHTML = `
    <p style="color:var(--text-secondary);margin-bottom:1.2rem;font-size:0.9rem;">Irrigation advisory for <strong style="color:var(--text-primary)">${crop}</strong> in <strong style="color:var(--amber)">${climate}</strong> climate:</p>
    <div class="info-cards" style="margin-bottom:1.4rem">
      <div class="info-card"><div class="card-label">Irrigation Frequency</div><div class="card-value" style="font-size:0.9rem">💧 ${irr.freq}</div></div>
      <div class="info-card"><div class="card-label">Water Requirement</div><div class="card-value" style="font-size:0.9rem">🌧 ${irr.water}</div></div>
    </div>
    <div class="report-section-title">Suitable Irrigation Methods</div>
    <div class="irrigation-methods">${methodsHtml}</div>`;
}

// MODULE 7 - MARKET
function renderModule7() {
  const {crop} = state.data;
  const m = marketData[crop] || marketData["default"];
  const trendIcon  = m.trend==="up"?"📈":m.trend==="down"?"📉":"➡️";
  const trendClass = m.trend==="up"?"up":m.trend==="down"?"down":"stable";
  const trendLabel = m.trend==="up"?"Increasing":m.trend==="down"?"Decreasing":"Stable";
  state.data.market = m;
  document.getElementById("m7-result").innerHTML = `
    <div class="market-hero"><div class="market-price">${m.price} <span>${m.unit}</span></div><div class="market-crop-name">🌾 ${crop}</div><span class="trend-badge ${trendClass}">${trendIcon} ${trendLabel} ${m.pct}</span></div>
    <div class="info-cards">
      <div class="info-card"><div class="card-label">Nearby Market</div><div class="card-value">🏪 ${m.market}</div></div>
      <div class="info-card"><div class="card-label">Price Trend</div><div class="card-value">${trendIcon} ${trendLabel}</div><div class="card-sub">Change: ${m.pct}</div></div>
      <div class="info-card"><div class="card-label">Unit</div><div class="card-value">📦 ${m.unit}</div></div>
    </div>
    <div class="result-banner warning" style="margin-top:1rem"><div class="banner-icon">ℹ️</div><div class="banner-text"><h3>Market Note</h3><p>Prices shown are indicative based on recent APMC data. Always verify with your local mandi before selling.</p></div></div>`;
}

// MODULE 8 - FINAL REPORT
function renderModule8() {
  const {state:stateName,district,village,climate,crop,soil,month,suitable,market} = state.data;
  const m = market || marketData[crop] || marketData["default"];
  const trendIcon  = m.trend==="up"?"📈":m.trend==="down"?"📉":"➡️";
  const trendLabel = m.trend==="up"?"Increasing":m.trend==="down"?"Decreasing":"Stable";
  const f   = fertilizerData[crop] || fertilizerData["default"];
  const irr = irrigationData[crop] || irrigationData["default"];
  const diseases = (diseaseData[crop] || diseaseData["default"]).map(d => d.name).join(", ");
  const finalRec = suitable
    ? `✅ Proceed with cultivation of <strong>${crop}</strong>. Conditions are favorable. Apply <strong>${f.name}</strong> as fertilizer and use <strong>${irr.recommended} irrigation</strong> for best yield. Sell at <strong>${m.market}</strong> at current price of <strong>${m.price}</strong>.`
    : `⚠️ We recommend choosing an alternative crop better suited to ${soil} soil and ${climate} climate. If you proceed with ${crop}, ensure extra soil amendments and weather protection.`;
  document.getElementById("m8-result").innerHTML = `
    <div class="report-section"><div class="report-section-title">📍 Location Details</div><div class="report-grid">
      <div class="report-item"><div class="ri-label">State</div><div class="ri-value">${stateName}</div></div>
      <div class="report-item"><div class="ri-label">District</div><div class="ri-value">${district}</div></div>
      <div class="report-item"><div class="ri-label">Village</div><div class="ri-value">${village}</div></div>
      <div class="report-item"><div class="ri-label">Climate</div><div class="ri-value">${climate}</div></div>
    </div></div>
    <div class="report-section"><div class="report-section-title">🌱 Crop & Soil Details</div><div class="report-grid">
      <div class="report-item"><div class="ri-label">Crop</div><div class="ri-value">${crop}</div></div>
      <div class="report-item"><div class="ri-label">Soil Type</div><div class="ri-value">${soil}</div></div>
      <div class="report-item"><div class="ri-label">Planting Month</div><div class="ri-value">${month}</div></div>
      <div class="report-item"><div class="ri-label">Suitability</div><div class="ri-value">${suitable?"✅ Suitable":"❌ Not Suitable"}</div></div>
    </div></div>
    <div class="report-section"><div class="report-section-title">🦠 Disease Prediction</div><div class="report-grid">
      <div class="report-item" style="grid-column:1/-1"><div class="ri-label">Possible Diseases</div><div class="ri-value" style="font-size:0.88rem">${diseases}</div></div>
    </div></div>
    <div class="report-section"><div class="report-section-title">🧪 Fertilizer Recommendation</div><div class="report-grid">
      <div class="report-item"><div class="ri-label">Fertilizer</div><div class="ri-value">${f.name}</div></div>
      <div class="report-item"><div class="ri-label">Quantity</div><div class="ri-value" style="font-size:0.82rem">${f.qty}</div></div>
    </div></div>
    <div class="report-section"><div class="report-section-title">💧 Irrigation Advisory</div><div class="report-grid">
      <div class="report-item"><div class="ri-label">Frequency</div><div class="ri-value" style="font-size:0.85rem">${irr.freq}</div></div>
      <div class="report-item"><div class="ri-label">Recommended Method</div><div class="ri-value">${irr.recommended} Irrigation</div></div>
      <div class="report-item"><div class="ri-label">Water Requirement</div><div class="ri-value" style="font-size:0.85rem">${irr.water}</div></div>
    </div></div>
    <div class="report-section"><div class="report-section-title">📊 Market Price</div><div class="report-grid">
      <div class="report-item"><div class="ri-label">Current Price</div><div class="ri-value">${m.price} <small style="font-size:0.75rem;color:var(--text-muted)">${m.unit}</small></div></div>
      <div class="report-item"><div class="ri-label">Market</div><div class="ri-value">${m.market}</div></div>
      <div class="report-item"><div class="ri-label">Price Trend</div><div class="ri-value">${trendIcon} ${trendLabel} ${m.pct}</div></div>
    </div></div>
    <div class="final-recommendation"><h3>🎯 Final Recommendation</h3><p>${finalRec}</p>
      <div style="margin-top:1.5rem">
        <button class="btn-print" onclick="printReport()">🖨️ Print Report</button>
        <button class="btn-restart" onclick="restartApp()">🔄 Start New Analysis</button>
      </div>
    </div>`;
}

function printReport() { window.print(); }

function restartApp() {
  state.data = {}; state.currentStep = 0;
  document.getElementById("app-section").style.display = "none";
  document.getElementById("hero").style.display = "flex";
  initModule2();
  document.getElementById("m1-state").value = "";
  document.getElementById("m1-district").value = "";
  document.getElementById("m1-village").value = "";
  document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
  document.getElementById("m2-month").value = "";
  window.scrollTo({top:0,behavior:"smooth"});
}

// NAVIGATION
function nextStep(from) {
  let valid = true;
  if (from === 0) valid = validateModule1();
  if (from === 1) valid = validateModule2();
  if (!valid) return;
  const next = from + 1;
  if (next === 2) renderModule3();
  if (next === 3) renderModule4();
  if (next === 4) renderModule5();
  if (next === 5) renderModule6();
  if (next === 6) renderModule7();
  if (next === 7) renderModule8();
  switchStep(next);
}

function prevStep(from) { if (from > 0) switchStep(from - 1); }

function startApp() {
  document.getElementById("hero").style.display = "none";
  const appSec = document.getElementById("app-section");
  appSec.style.display = "block";
  switchStep(0);
  appSec.scrollIntoView({behavior:"smooth"});
}

// INIT
document.addEventListener("DOMContentLoaded", function() {
  initModule1();
  initModule2();
  const dotsContainer = document.getElementById("step-dots");
  dotsContainer.innerHTML = "";
  for (let i = 0; i < state.totalSteps; i++) {
    const dot = document.createElement("div");
    dot.className = "step-dot" + (i === 0 ? " active" : "");
    dotsContainer.appendChild(dot);
  }
  updateProgress();
});