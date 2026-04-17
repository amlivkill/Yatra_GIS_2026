/**
 * microgrid.js — Hybrid Microgrid Hub Data & Visualization
 */

const MICROGRID_HUBS = [
    { id:"hub-1", name:"Mana Village Energy Hub", name_hi:"माणा गाँव ऊर्जा हब", district:"chamoli", lat:30.77, lng:79.50, status:"proposed", windCapacity:25, solarCapacity:50, batteryStorage:100, householdsServed:120, gridConnected:false, elevation:3200, services:["food_processing","digital_hub"], annualSavings:850000, description:"India ke aakhri gaon ke paas hybrid microgrid", riskLevel:"low" },
    { id:"hub-2", name:"Harsil Valley Hub", name_hi:"हर्षिल घाटी हब", district:"uttarkashi", lat:31.03, lng:78.74, status:"proposed", windCapacity:20, solarCapacity:40, batteryStorage:80, householdsServed:85, gridConnected:false, elevation:2620, services:["food_processing","phc","digital_hub"], annualSavings:720000, description:"Harsil ke apple processing ke liye clean energy", riskLevel:"low" },
    { id:"hub-3", name:"Munsyari Mountain Hub", name_hi:"मुनस्यारी पर्वत हब", district:"pithoragarh", lat:30.07, lng:80.24, status:"proposed", windCapacity:30, solarCapacity:45, batteryStorage:120, householdsServed:150, gridConnected:false, elevation:2200, services:["food_processing","digital_hub","school"], annualSavings:980000, description:"Border area energy hub for herbs processing", riskLevel:"medium" },
    { id:"hub-4", name:"Kapkot Valley Hub", name_hi:"कपकोट घाटी हब", district:"bageshwar", lat:30.05, lng:79.92, status:"assessment", windCapacity:15, solarCapacity:35, batteryStorage:60, householdsServed:70, gridConnected:false, elevation:1800, services:["food_processing","school"], annualSavings:520000, description:"Mini-grid assessment chal raha hai", riskLevel:"low" },
    { id:"hub-5", name:"Augustmuni Hub", name_hi:"अगस्त्यमुनि हब", district:"rudraprayag", lat:30.40, lng:79.05, status:"risk", windCapacity:10, solarCapacity:30, batteryStorage:50, householdsServed:60, gridConnected:true, elevation:1100, services:["phc","digital_hub"], annualSavings:380000, description:"Flood risk zone mein PHC backup", riskLevel:"high" },
    { id:"hub-6", name:"New Tehri Lake Hub", name_hi:"न्यू टिहरी लेक हब", district:"tehri", lat:30.38, lng:78.48, status:"proposed", windCapacity:18, solarCapacity:55, batteryStorage:90, householdsServed:200, gridConnected:true, elevation:1550, services:["food_processing","digital_hub","school","phc"], annualSavings:1200000, description:"Floating solar + wind smart village hub", riskLevel:"low" },
    { id:"hub-7", name:"Dwarahat Heritage Hub", name_hi:"द्वाराहाट हेरिटेज हब", district:"almora", lat:29.77, lng:79.43, status:"assessment", windCapacity:8, solarCapacity:40, batteryStorage:55, householdsServed:90, gridConnected:true, elevation:1600, services:["food_processing","digital_hub","school"], annualSavings:580000, description:"Solar-primary microgrid historic town", riskLevel:"low" },
    { id:"hub-8", name:"Khatima Agri-Energy Hub", name_hi:"खटीमा कृषि-ऊर्जा हब", district:"udhamsingh", lat:28.92, lng:79.97, status:"proposed", windCapacity:5, solarCapacity:100, batteryStorage:150, householdsServed:350, gridConnected:true, elevation:240, services:["food_processing","digital_hub","cold_chain"], annualSavings:2100000, description:"Terai farming belt solar + cold chain", riskLevel:"low" },
    { id:"hub-9", name:"Kotdwar Green Hub", name_hi:"कोटद्वार ग्रीन हब", district:"pauri", lat:29.75, lng:78.53, status:"proposed", windCapacity:10, solarCapacity:60, batteryStorage:80, householdsServed:180, gridConnected:true, elevation:450, services:["food_processing","digital_hub","school"], annualSavings:900000, description:"Herbs/spice processing green energy", riskLevel:"low" },
    { id:"hub-10", name:"Lohaghat Border Hub", name_hi:"लोहाघाट सीमा हब", district:"champawat", lat:29.42, lng:80.10, status:"assessment", windCapacity:12, solarCapacity:35, batteryStorage:65, householdsServed:75, gridConnected:false, elevation:1700, services:["digital_hub","phc"], annualSavings:480000, description:"Nepal border telemedicine hub", riskLevel:"medium" },
    { id:"hub-11", name:"Bhimtal Solar Hub", name_hi:"भीमताल सौर हब", district:"nainital", lat:29.35, lng:79.55, status:"proposed", windCapacity:5, solarCapacity:75, batteryStorage:100, householdsServed:200, gridConnected:true, elevation:1370, services:["food_processing","digital_hub","eco_tourism"], annualSavings:1100000, description:"Eco-tourism + fruit juice processing hub", riskLevel:"low" },
    { id:"hub-12", name:"Laksar Agri Hub", name_hi:"लक्सर कृषि हब", district:"haridwar", lat:29.75, lng:78.04, status:"proposed", windCapacity:3, solarCapacity:80, batteryStorage:120, householdsServed:280, gridConnected:true, elevation:260, services:["food_processing","cold_chain","digital_hub"], annualSavings:1500000, description:"Solar-powered cold chain hub", riskLevel:"low" },
    { id:"hub-13", name:"Joshimath Resilience Hub", name_hi:"जोशीमठ लचीलापन हब", district:"chamoli", lat:30.55, lng:79.57, status:"risk", windCapacity:15, solarCapacity:25, batteryStorage:60, householdsServed:50, gridConnected:true, elevation:1890, services:["phc","digital_hub"], annualSavings:350000, description:"Emergency backup + telemedicine", riskLevel:"high" }
];

const SERVICE_TYPES = {
    food_processing: { label:"🏭 Food Processing", label_hi:"🏭 खाद्य प्रसंस्करण", powerReq:"5-15 kW", products:"Herbs, Spices, Juice", revenue:"₹3-8L/yr" },
    digital_hub: { label:"💻 Digital Hub", label_hi:"💻 डिजिटल हब", powerReq:"2-5 kW", products:"e-Governance, Training", revenue:"₹1-3L/yr" },
    phc: { label:"🏥 PHC Backup", label_hi:"🏥 स्वास्थ्य केंद्र", powerReq:"3-8 kW", products:"Cold Chain, Telemedicine", revenue:"Essential" },
    school: { label:"🏫 School Power", label_hi:"🏫 स्कूल बिजली", powerReq:"2-5 kW", products:"Smart Class, Computer Lab", revenue:"Education" },
    cold_chain: { label:"❄️ Cold Chain", label_hi:"❄️ कोल्ड चेन", powerReq:"10-25 kW", products:"Fruit/Veg Storage", revenue:"₹5-15L/yr" },
    eco_tourism: { label:"🏕️ Eco Tourism", label_hi:"🏕️ इको टूरिज्म", powerReq:"5-10 kW", products:"Homestay, Camping", revenue:"₹2-6L/yr" }
};

const FLOOD_RISK_ZONES = [
    { name_hi:"अलकनंदा नदी गलियारा", name:"Alaknanda Corridor", coords:[[79.20,30.75],[79.35,30.70],[79.55,30.50],[79.15,30.30],[78.95,30.40],[79.00,30.55],[79.10,30.65],[79.20,30.75]] },
    { name_hi:"भागीरथी नदी गलियारा", name:"Bhagirathi Corridor", coords:[[78.30,31.10],[78.50,31.05],[78.55,30.85],[78.45,30.70],[78.30,30.72],[78.20,30.85],[78.25,31.00],[78.30,31.10]] },
    { name_hi:"काली नदी सीमा क्षेत्र", name:"Kali River Zone", coords:[[80.15,30.20],[80.30,30.10],[80.25,29.85],[80.10,29.75],[79.95,29.85],[80.00,30.05],[80.15,30.20]] }
];

const LANDSLIDE_RISK_ZONES = [
    { name_hi:"जोशीमठ भूधंसाव", name:"Joshimath Subsidence", coords:[[79.48,30.60],[79.62,30.58],[79.65,30.50],[79.55,30.45],[79.45,30.50],[79.48,30.60]] },
    { name_hi:"उत्तरकाशी भूस्खलन", name:"Uttarkashi Landslide Belt", coords:[[78.35,31.15],[78.55,31.18],[78.60,31.08],[78.50,31.00],[78.35,31.03],[78.35,31.15]] },
    { name_hi:"चमोली तीव्र ढलान", name:"Chamoli Steep Zone", coords:[[79.30,30.65],[79.50,30.68],[79.55,30.58],[79.40,30.50],[79.25,30.55],[79.30,30.65]] },
    { name_hi:"पिथौरागढ़ भूस्खलन", name:"Pithoragarh Slides", coords:[[80.15,30.30],[80.28,30.25],[80.25,30.12],[80.12,30.10],[80.05,30.20],[80.15,30.30]] }
];

const PMGSY_ROADS = [
    { name_hi:"गोपेश्वर-चोपता", district:"chamoli", coords:[[79.32,30.42],[79.28,30.48],[79.22,30.55]], length:28, status:"completed" },
    { name_hi:"मुनस्यारी-लीलम", district:"pithoragarh", coords:[[80.24,30.07],[80.18,30.12],[80.12,30.18]], length:22, status:"ongoing" },
    { name_hi:"हर्षिल-धराली", district:"uttarkashi", coords:[[78.74,31.03],[78.68,31.08],[78.62,31.12]], length:15, status:"completed" },
    { name_hi:"द्वाराहाट-दूनागिरी", district:"almora", coords:[[79.43,29.77],[79.48,29.82],[79.52,29.88]], length:18, status:"ongoing" },
    { name_hi:"कपकोट-सुंदरढूंगा", district:"bageshwar", coords:[[79.92,30.05],[79.88,30.10],[79.82,30.15]], length:20, status:"sanctioned" },
    { name_hi:"कोटद्वार-लैंसडाउन", district:"pauri", coords:[[78.53,29.75],[78.58,29.82],[78.63,29.88]], length:35, status:"completed" },
    { name_hi:"लोहाघाट-देवीधुरा", district:"champawat", coords:[[80.10,29.42],[80.05,29.48],[79.98,29.52]], length:25, status:"ongoing" }
];

const JJM_SITES = [
    { name_hi:"माणा जल आपूर्ति", district:"chamoli", lat:30.75, lng:79.48, households:95, status:"functional" },
    { name_hi:"हर्षिल जल योजना", district:"uttarkashi", lat:31.05, lng:78.72, households:145, status:"functional" },
    { name_hi:"मुनस्यारी PWS", district:"pithoragarh", lat:30.05, lng:80.22, households:220, status:"under_construction" },
    { name_hi:"कपकोट PWS", district:"bageshwar", lat:30.03, lng:79.90, households:130, status:"functional" },
    { name_hi:"द्वाराहाट PWS", district:"almora", lat:29.79, lng:79.41, households:160, status:"functional" },
    { name_hi:"भीमताल जल योजना", district:"nainital", lat:29.37, lng:79.53, households:300, status:"functional" },
    { name_hi:"लोहाघाट PWS", district:"champawat", lat:29.40, lng:80.08, households:110, status:"under_construction" }
];

function getHubsByDistrict(d) { return d==='all' ? MICROGRID_HUBS : MICROGRID_HUBS.filter(h=>h.district===d); }
function getHubById(id) { return MICROGRID_HUBS.find(h=>h.id===id); }

function createMicrogridLayer() {
    const g = L.layerGroup();
    const sc = { proposed:'#00d98b', assessment:'#f7971e', risk:'#ff6b6b' };
    const sl = { proposed:'Active/Proposed', assessment:'Under Assessment', risk:'Risk-Constrained' };
    MICROGRID_HUBS.forEach(h => {
        const c = sc[h.status], r = Math.max(6, Math.min(14, (h.windCapacity+h.solarCapacity)/10));
        const m = L.circleMarker([h.lat,h.lng],{radius:r,fillColor:c,fillOpacity:0.8,color:'#fff',weight:2});
        const si = h.services.map(s=>SERVICE_TYPES[s]?SERVICE_TYPES[s].label:s).join(' · ');
        m.bindPopup(`<div class="popup-hub"><h4>🔋 ${h.name_hi}</h4><p style="font-size:11px;color:#8b95a8;margin-bottom:4px">${h.name}</p><p style="font-size:11px;color:${c};font-weight:600;margin-bottom:8px">${sl[h.status]}</p><div class="popup-row"><span class="popup-label">💨 Wind</span><span class="popup-value">${h.windCapacity} kW</span></div><div class="popup-row"><span class="popup-label">☀️ Solar</span><span class="popup-value">${h.solarCapacity} kW</span></div><div class="popup-row"><span class="popup-label">🔋 Battery</span><span class="popup-value">${h.batteryStorage} kWh</span></div><div class="popup-row"><span class="popup-label">🏠 Households</span><span class="popup-value">${h.householdsServed}</span></div><div class="popup-row"><span class="popup-label">💰 Savings</span><span class="popup-value">₹${(h.annualSavings/100000).toFixed(1)}L/yr</span></div><p style="font-size:11px;color:#8b95a8;margin-top:8px">${si}</p><button class="popup-btn" onclick="window.showHubDetail('${h.id}')">विस्तृत जानकारी →</button></div>`,{maxWidth:300});
        g.addLayer(L.circle([h.lat,h.lng],{radius:5000,fillColor:c,fillOpacity:0.05,color:c,weight:1,dashArray:'4,4',interactive:false}));
        g.addLayer(m);
    });
    return g;
}

function createServicesLayer() {
    const g = L.layerGroup();
    MICROGRID_HUBS.forEach(h => {
        h.services.forEach((sk,i) => {
            const s = SERVICE_TYPES[sk]; if(!s) return;
            const m = L.marker([h.lat+(i-h.services.length/2)*0.015, h.lng+0.03], {
                icon: L.divIcon({className:'service-marker',html:`<div style="background:rgba(16,22,36,0.9);border:1px solid rgba(100,140,255,0.2);border-radius:8px;padding:4px 8px;font-size:12px;white-space:nowrap;color:#e8edf5">${s.label_hi}</div>`,iconSize:null})
            });
            m.bindPopup(`<div class="popup-hub"><h4>${s.label_hi}</h4><div class="popup-row"><span class="popup-label">Power</span><span class="popup-value">${s.powerReq}</span></div><div class="popup-row"><span class="popup-label">Products</span><span class="popup-value">${s.products}</span></div><div class="popup-row"><span class="popup-label">Revenue</span><span class="popup-value">${s.revenue}</span></div></div>`);
            g.addLayer(m);
        });
    });
    return g;
}

function createFloodRiskLayer() {
    const g = L.layerGroup();
    FLOOD_RISK_ZONES.forEach(z => {
        const p = L.polygon(z.coords.map(c=>[c[1],c[0]]),{fillColor:'#ff6b6b',fillOpacity:0.15,color:'#ff6b6b',weight:2,dashArray:'8,4'});
        p.bindPopup(`<div class="popup-hub"><h4>🌊 ${z.name_hi}</h4><p style="color:#ff6b6b;font-size:12px;font-weight:500">Flood Risk Zone</p><p style="font-size:11px;color:#8b95a8;margin-top:4px">⚠️ Special precaution zaruri</p></div>`);
        g.addLayer(p);
    });
    return g;
}

function createLandslideRiskLayer() {
    const g = L.layerGroup();
    LANDSLIDE_RISK_ZONES.forEach(z => {
        const p = L.polygon(z.coords.map(c=>[c[1],c[0]]),{fillColor:'#ffa502',fillOpacity:0.15,color:'#ffa502',weight:2,dashArray:'4,8,4'});
        p.bindPopup(`<div class="popup-hub"><h4>⛰️ ${z.name_hi}</h4><p style="color:#ffa502;font-size:12px;font-weight:500">Landslide Risk</p><p style="font-size:11px;color:#8b95a8;margin-top:4px">⚠️ Steep slope — extra care zaruri</p></div>`);
        g.addLayer(p);
    });
    return g;
}

function createPMGSYLayer() {
    const g = L.layerGroup();
    const sc = {completed:'#00d98b',ongoing:'#f7971e',sanctioned:'#4facfe'};
    PMGSY_ROADS.forEach(r => {
        const c = sc[r.status]||'#66d9ef';
        const pl = L.polyline(r.coords.map(c=>[c[1],c[0]]),{color:c,weight:3,opacity:0.8,dashArray:r.status==='sanctioned'?'6,6':''});
        pl.bindPopup(`<div class="popup-hub"><h4>🛣️ ${r.name_hi}</h4><div class="popup-row"><span class="popup-label">लंबाई</span><span class="popup-value">${r.length} km</span></div><div class="popup-row"><span class="popup-label">स्थिति</span><span class="popup-value" style="color:${c}">${r.status.toUpperCase()}</span></div></div>`);
        g.addLayer(pl);
    });
    return g;
}

function createJJMLayer() {
    const g = L.layerGroup();
    JJM_SITES.forEach(s => {
        const c = s.status==='functional'?'#00f2fe':'#ffa502';
        const m = L.circleMarker([s.lat,s.lng],{radius:6,fillColor:c,fillOpacity:0.7,color:'#fff',weight:1.5});
        m.bindPopup(`<div class="popup-hub"><h4>💧 ${s.name_hi}</h4><div class="popup-row"><span class="popup-label">Households</span><span class="popup-value">${s.households}</span></div><div class="popup-row"><span class="popup-label">स्थिति</span><span class="popup-value" style="color:${c}">${s.status==='functional'?'चालू':'निर्माणाधीन'}</span></div></div>`);
        g.addLayer(m);
    });
    return g;
}
