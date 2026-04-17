/**
 * economic.js — Economic Impact Dashboard & Charts
 * UREDA Schemes, Charts, and District Stats
 */

const UREDA_SCHEMES = [
    { name:"PM Surya Ghar Muft Bijli Yojana", name_hi:"पीएम सूर्य घर मुफ्त बिजली", type:"solar", desc:"Rooftop solar 1-10 kW — ₹30,000-₹78,000 subsidy", eligible:"Residential households" },
    { name:"Mukhyamantri Saur Swarojgar Yojana", name_hi:"मुख्यमंत्री सौर स्वरोजगार", type:"solar", desc:"25 kW solar plant setup — youth self-employment scheme", eligible:"Unemployed youth, SHGs" },
    { name:"Off-Grid Solar Power Plants", name_hi:"ऑफ-ग्रिड सौर ऊर्जा संयंत्र", type:"micro", desc:"1-4 kWp hybrid solar for Anganwadi, schools in remote areas", eligible:"Remote institutions" },
    { name:"Micro Hydro Projects (MHP)", name_hi:"माइक्रो हाइड्रो प्रोजेक्ट", type:"micro", desc:"Small hydro for villages beyond grid reach — 5-100 kW", eligible:"Remote hill villages" },
    { name:"Solar Street Lighting", name_hi:"सौर स्ट्रीट लाइटिंग", type:"solar", desc:"Solar LED street lights for rural Uttarakhand gram panchayats", eligible:"All gram panchayats" },
    { name:"BESS + Local Grid Tariff", name_hi:"बैटरी स्टोरेज + स्थानीय ग्रिड", type:"wind", desc:"UERC regulated battery storage for local rural grids", eligible:"Microgrid operators" }
];

// Monthly generation estimates (normalized, kWh per kW installed)
const MONTHLY_WIND = [85, 90, 110, 130, 145, 120, 75, 70, 95, 115, 100, 80];
const MONTHLY_SOLAR = [110, 120, 140, 155, 165, 130, 90, 95, 125, 145, 130, 105];
const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

let generationChart = null;
let economicChart = null;

function renderSchemeCards() {
    const container = document.getElementById('scheme-cards');
    if (!container) return;
    const tagClass = { solar:'solar-tag', wind:'wind-tag', micro:'micro-tag' };
    const tagLabel = { solar:'☀️ Solar', wind:'💨 Wind', micro:'🔋 Microgrid' };
    container.innerHTML = UREDA_SCHEMES.map(s => `
        <div class="scheme-card">
            <h4>${s.name_hi}</h4>
            <p>${s.desc}</p>
            <p style="color:#4facfe;font-size:10px;margin-top:4px">पात्रता: ${s.eligible}</p>
            <span class="scheme-tag ${tagClass[s.type]}">${tagLabel[s.type]}</span>
        </div>
    `).join('');
}

function updateDashboardStats(districtId) {
    const hubs = getHubsByDistrict(districtId);
    const potential = getDistrictPotential(districtId);
    
    document.getElementById('stat-wind').textContent = potential.windCapacityMW;
    document.getElementById('stat-solar').textContent = potential.solarCapacityMW;
    document.getElementById('stat-hubs').textContent = hubs.length;
    
    const jobs = hubs.reduce((s, h) => {
        return s + Math.round(h.householdsServed * 0.15) + h.services.length * 3;
    }, 0);
    document.getElementById('stat-jobs').textContent = jobs;
    
    updateGenerationChart(hubs);
    updateEconomicChart(hubs);
}

function updateGenerationChart(hubs) {
    const canvas = document.getElementById('chart-generation');
    if (!canvas) return;
    
    const totalWind = hubs.reduce((s, h) => s + h.windCapacity, 0);
    const totalSolar = hubs.reduce((s, h) => s + h.solarCapacity, 0);
    
    const windData = MONTHLY_WIND.map(v => Math.round(v * totalWind / 1000));
    const solarData = MONTHLY_SOLAR.map(v => Math.round(v * totalSolar / 1000));
    
    if (generationChart) generationChart.destroy();
    
    generationChart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: MONTH_LABELS,
            datasets: [
                { label: '💨 Wind (MWh)', data: windData, backgroundColor: 'rgba(79,172,254,0.6)', borderColor: '#4facfe', borderWidth: 1, borderRadius: 3 },
                { label: '☀️ Solar (MWh)', data: solarData, backgroundColor: 'rgba(247,151,30,0.6)', borderColor: '#f7971e', borderWidth: 1, borderRadius: 3 }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#8b95a8', font: { size: 10 } } } },
            scales: {
                x: { ticks: { color: '#5a6478', font: { size: 9 } }, grid: { color: 'rgba(255,255,255,0.03)' } },
                y: { ticks: { color: '#5a6478', font: { size: 9 } }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });
}

function updateEconomicChart(hubs) {
    const canvas = document.getElementById('chart-economic');
    if (!canvas) return;
    
    const sectors = { 'Installation': 0, 'Maintenance': 0, 'Food Processing': 0, 'Digital Services': 0, 'Healthcare': 0, 'Tourism': 0 };
    hubs.forEach(h => {
        sectors['Installation'] += Math.round(h.householdsServed * 0.05);
        sectors['Maintenance'] += Math.round(h.householdsServed * 0.03);
        h.services.forEach(s => {
            if (s === 'food_processing' || s === 'cold_chain') sectors['Food Processing'] += 5;
            if (s === 'digital_hub' || s === 'school') sectors['Digital Services'] += 3;
            if (s === 'phc') sectors['Healthcare'] += 4;
            if (s === 'eco_tourism') sectors['Tourism'] += 6;
        });
    });
    
    if (economicChart) economicChart.destroy();
    
    economicChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: Object.keys(sectors),
            datasets: [{
                data: Object.values(sectors),
                backgroundColor: ['#4facfe','#00f2fe','#f7971e','#a855f7','#ff6b6b','#26de81'],
                borderColor: 'rgba(10,14,23,0.8)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            cutout: '55%',
            plugins: {
                legend: { position: 'bottom', labels: { color: '#8b95a8', font: { size: 10 }, padding: 8, usePointStyle: true } }
            }
        }
    });
}

function generateKML() {
    let kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
<name>Uttarakhand RE Hub — Microgrid Sites</name>
<description>Decentralized Renewable Energy Hub by CHANGE TechLab</description>`;
    
    // Hub styles
    kml += `<Style id="proposed"><IconStyle><color>ff8bd900</color><scale>1.2</scale></IconStyle></Style>`;
    kml += `<Style id="assessment"><IconStyle><color>ff1e97f7</color><scale>1.0</scale></IconStyle></Style>`;
    kml += `<Style id="risk"><IconStyle><color>ff6b6bff</color><scale>1.0</scale></IconStyle></Style>`;
    
    MICROGRID_HUBS.forEach(h => {
        const svc = h.services.map(s => SERVICE_TYPES[s] ? SERVICE_TYPES[s].label : s).join(', ');
        kml += `
<Placemark>
  <name>${h.name_hi} — ${h.name}</name>
  <description>Wind: ${h.windCapacity}kW | Solar: ${h.solarCapacity}kW | Battery: ${h.batteryStorage}kWh
Households: ${h.householdsServed} | Savings: ₹${(h.annualSavings/100000).toFixed(1)}L/yr
Services: ${svc}
Status: ${h.status}</description>
  <styleUrl>#${h.status}</styleUrl>
  <Point><coordinates>${h.lng},${h.lat},${h.elevation}</coordinates></Point>
</Placemark>`;
    });
    
    kml += `\n</Document>\n</kml>`;
    
    const blob = new Blob([kml], { type: 'application/vnd.google-earth.kml+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uttarakhand_re_hub.kml';
    a.click();
    URL.revokeObjectURL(url);
}
