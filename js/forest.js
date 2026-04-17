/**
 * forest.js — Forest & Tree Cover Data for Uttarakhand
 * Pine Forests, Tree Species, Reserved Forests, Fire Risk,
 * Van Panchayat, CAMPA, Pine Needle Bioenergy
 */

// ============ FOREST COVER ZONES (FSI data-based) ============
const FOREST_COVER = [
    { id:"fc1", name_hi:"देहरादून वन क्षेत्र", district:"dehradun", type:"moderate_dense", area_km2:1242, treeCover_pct:42, mainSpecies:"Sal, Teak, Shisham", coords:[[77.55,30.55],[78.10,30.55],[78.15,30.25],[77.95,30.15],[77.50,30.25],[77.55,30.55]], color:"#27ae60" },
    { id:"fc2", name_hi:"नैनीताल वन क्षेत्र", district:"nainital", type:"very_dense", area_km2:2312, treeCover_pct:55, mainSpecies:"Oak, Pine, Deodar", coords:[[79.00,29.55],[79.55,29.55],[79.60,29.25],[79.15,29.15],[78.95,29.30],[79.00,29.55]], color:"#1e8449" },
    { id:"fc3", name_hi:"चमोली वन क्षेत्र", district:"chamoli", type:"very_dense", area_km2:5648, treeCover_pct:62, mainSpecies:"Oak, Birch, Rhododendron, Deodar", coords:[[79.15,30.70],[79.65,30.65],[79.70,30.35],[79.30,30.30],[79.10,30.45],[79.15,30.70]], color:"#1e8449" },
    { id:"fc4", name_hi:"उत्तरकाशी वन क्षेत्र", district:"uttarkashi", type:"dense", area_km2:4880, treeCover_pct:58, mainSpecies:"Deodar, Blue Pine, Birch", coords:[[78.00,31.20],[78.70,31.15],[78.80,30.85],[78.30,30.75],[77.95,30.90],[78.00,31.20]], color:"#229954" },
    { id:"fc5", name_hi:"पौड़ी गढ़वाल वन", district:"pauri", type:"moderate_dense", area_km2:3680, treeCover_pct:45, mainSpecies:"Chir Pine, Oak, Sal", coords:[[78.25,30.35],[78.80,30.30],[78.90,29.85],[78.55,29.75],[78.20,29.95],[78.25,30.35]], color:"#27ae60" },
    { id:"fc6", name_hi:"टिहरी वन क्षेत्र", district:"tehri", type:"dense", area_km2:2580, treeCover_pct:52, mainSpecies:"Chir Pine, Oak, Deodar", coords:[[78.10,30.65],[78.55,30.60],[78.60,30.30],[78.25,30.25],[78.05,30.40],[78.10,30.65]], color:"#229954" },
    { id:"fc7", name_hi:"अल्मोड़ा वन क्षेत्र", district:"almora", type:"moderate_dense", area_km2:1820, treeCover_pct:40, mainSpecies:"Chir Pine, Oak, Rhododendron", coords:[[79.25,29.80],[79.65,29.75],[79.70,29.50],[79.40,29.45],[79.20,29.55],[79.25,29.80]], color:"#27ae60" },
    { id:"fc8", name_hi:"पिथौरागढ़ वन क्षेत्र", district:"pithoragarh", type:"dense", area_km2:4520, treeCover_pct:56, mainSpecies:"Deodar, Oak, Birch, Pine", coords:[[79.85,30.30],[80.30,30.25],[80.35,29.95],[80.00,29.85],[79.80,30.00],[79.85,30.30]], color:"#229954" }
];

// ============ PINE FORESTS (Chir Pine — Pinus roxburghii) ============
const PINE_FORESTS = [
    { id:"pf1", name_hi:"पौड़ी चीड़ वन", district:"pauri", lat:30.10, lng:78.55, area_ha:18500, pineType:"Chir Pine", altitude:"800-1800m", needleYield_MT:4200, bioenergyPotential:"3.2 MW", fireProne:true, collectionActive:true, shgInvolved:8, description:"Pauri Garhwal ka sabse bada Chir Pine cluster — pine needle collection se bioenergy aur livelihood" },
    { id:"pf2", name_hi:"नैनीताल चीड़ वन", district:"nainital", lat:29.40, lng:79.30, area_ha:14200, pineType:"Chir Pine", altitude:"1000-2000m", needleYield_MT:3400, bioenergyPotential:"2.5 MW", fireProne:true, collectionActive:true, shgInvolved:6, description:"Nainital range mein dense Chir Pine — fire risk high but collection active" },
    { id:"pf3", name_hi:"अल्मोड़ा चीड़ वन", district:"almora", lat:29.62, lng:79.55, area_ha:12000, pineType:"Chir Pine", altitude:"900-1800m", needleYield_MT:2800, bioenergyPotential:"2.1 MW", fireProne:true, collectionActive:true, shgInvolved:5, description:"Almora ke slopes mein pine forest — MGNREGA linked collection" },
    { id:"pf4", name_hi:"टिहरी चीड़ क्षेत्र", district:"tehri", lat:30.38, lng:78.40, area_ha:9500, pineType:"Chir Pine", altitude:"800-1600m", needleYield_MT:2200, bioenergyPotential:"1.6 MW", fireProne:true, collectionActive:false, shgInvolved:3, description:"Tehri dam catchment mein pine — collection pilot phase mein" },
    { id:"pf5", name_hi:"चम्पावत चीड़ वन", district:"champawat", lat:29.38, lng:80.00, area_ha:7800, pineType:"Chir Pine", altitude:"700-1500m", needleYield_MT:1800, bioenergyPotential:"1.3 MW", fireProne:true, collectionActive:false, shgInvolved:2, description:"Champawat lower hills mein Chir Pine patches" },
    { id:"pf6", name_hi:"देहरादून चीड़ वन", district:"dehradun", lat:30.35, lng:78.12, area_ha:6500, pineType:"Chir Pine", altitude:"600-1400m", needleYield_MT:1500, bioenergyPotential:"1.1 MW", fireProne:true, collectionActive:true, shgInvolved:4, description:"Mussoorie-Dehradun road ke along pine forests" },
    { id:"pf7", name_hi:"रुद्रप्रयाग चीड़ वन", district:"rudraprayag", lat:30.28, lng:79.00, area_ha:5200, pineType:"Chir Pine", altitude:"900-1700m", needleYield_MT:1200, bioenergyPotential:"0.9 MW", fireProne:true, collectionActive:false, shgInvolved:1, description:"Rudraprayag ke lower slopes par pine patches" },
    { id:"pf8", name_hi:"बागेश्वर चीड़ वन", district:"bageshwar", lat:29.95, lng:79.72, area_ha:4800, pineType:"Chir Pine", altitude:"1000-1800m", needleYield_MT:1100, bioenergyPotential:"0.8 MW", fireProne:true, collectionActive:false, shgInvolved:1, description:"Bageshwar valley mein scattered pine clusters" }
];

// ============ MAJOR TREE SPECIES ZONES ============
const TREE_SPECIES = [
    { id:"ts1", name_hi:"बांज/ओक क्षेत्र (Oak Belt)", species:"Quercus leucotrichophora", localName:"Banj Oak", altitude:"1500-2500m", districts:["chamoli","almora","pithoragarh","tehri","bageshwar"], importance:"Water retention, fodder, fuel — Uttarakhand ki lifeline", lat:30.00, lng:79.40, area_ha:85000, color:"#2ecc71", status:"declining", threat:"Pine encroachment, climate change" },
    { id:"ts2", name_hi:"देवदार क्षेत्र (Deodar Belt)", species:"Cedrus deodara", localName:"Deodar", altitude:"1800-3000m", districts:["uttarkashi","chamoli","pithoragarh"], importance:"Sacred tree, premium timber, carbon sink", lat:30.75, lng:78.50, area_ha:42000, color:"#16a085", status:"stable", threat:"Illegal logging, habitat fragmentation" },
    { id:"ts3", name_hi:"साल वन (Sal Forest)", species:"Shorea robusta", localName:"Sal", altitude:"200-1000m", districts:["dehradun","haridwar","udhamsingh","nainital"], importance:"Timber, NTFP, sal leaf plates, biodiversity", lat:29.50, lng:78.50, area_ha:38000, color:"#27ae60", status:"stable", threat:"Urbanization, encroachment" },
    { id:"ts4", name_hi:"बुरांश/रोडोडेंड्रॉन (Buransh)", species:"Rhododendron arboreum", localName:"Buransh", altitude:"1500-3500m", districts:["chamoli","uttarkashi","pithoragarh","rudraprayag"], importance:"State tree flower, juice/squash, honey, medicine", lat:30.45, lng:79.35, area_ha:28000, color:"#e74c3c", status:"vulnerable", threat:"Climate change, over-harvesting" },
    { id:"ts5", name_hi:"भोजपत्र (Birch) क्षेत्र", species:"Betula utilis", localName:"Bhojpatra", altitude:"2800-4000m", districts:["chamoli","uttarkashi","pithoragarh"], importance:"Sacred bark, high-altitude timber, treeline species", lat:30.70, lng:79.50, area_ha:12000, color:"#f39c12", status:"vulnerable", threat:"Global warming, over-collection" },
    { id:"ts6", name_hi:"बांस क्षेत्र (Bamboo)", species:"Dendrocalamus spp.", localName:"Bamboo/Ringal", altitude:"500-2500m", districts:["dehradun","pauri","nainital","champawat","almora"], importance:"Construction, handicraft, NTFP, livelihood", lat:29.65, lng:79.00, area_ha:22000, color:"#2ecc71", status:"stable", threat:"Gregarious flowering, unsustainable harvest" }
];

// ============ RESERVED / PROTECTED FORESTS ============
const PROTECTED_FORESTS = [
    { name_hi:"राजाजी राष्ट्रीय उद्यान", name:"Rajaji National Park", type:"national_park", district:"dehradun", lat:30.08, lng:78.18, area_km2:820, established:1983, wildlife:"Elephant, Tiger, Leopard, King Cobra", iucnCategory:"II" },
    { name_hi:"कॉर्बेट राष्ट्रीय उद्यान", name:"Jim Corbett National Park", type:"national_park", district:"nainital", lat:29.53, lng:78.78, area_km2:1318, established:1936, wildlife:"Bengal Tiger, Elephant, Gharial", iucnCategory:"II" },
    { name_hi:"नंदा देवी राष्ट्रीय उद्यान", name:"Nanda Devi National Park", type:"national_park", district:"chamoli", lat:30.42, lng:79.92, area_km2:630, established:1982, wildlife:"Snow Leopard, Himalayan Musk Deer, Bharal", iucnCategory:"II" },
    { name_hi:"गंगोत्री राष्ट्रीय उद्यान", name:"Gangotri National Park", type:"national_park", district:"uttarkashi", lat:31.00, lng:78.95, area_km2:2390, established:1989, wildlife:"Snow Leopard, Bharal, Monal", iucnCategory:"II" },
    { name_hi:"गोविन्द पशु विहार", name:"Govind Pashu Vihar", type:"wildlife_sanctuary", district:"uttarkashi", lat:31.10, lng:78.35, area_km2:958, established:1955, wildlife:"Snow Leopard, Musk Deer, Brown Bear", iucnCategory:"IV" },
    { name_hi:"केदारनाथ वन्यजीव अभयारण्य", name:"Kedarnath WLS", type:"wildlife_sanctuary", district:"rudraprayag", lat:30.60, lng:79.15, area_km2:975, established:1972, wildlife:"Musk Deer, Serow, Monal", iucnCategory:"IV" },
    { name_hi:"अस्कोट कस्तूरी मृग अभयारण्य", name:"Askot Musk Deer Sanctuary", type:"wildlife_sanctuary", district:"pithoragarh", lat:29.85, lng:80.28, area_km2:600, established:1986, wildlife:"Himalayan Musk Deer, Snow Leopard", iucnCategory:"IV" },
    { name_hi:"बिनसर वन्यजीव अभयारण्य", name:"Binsar WLS", type:"wildlife_sanctuary", district:"almora", lat:29.68, lng:79.72, area_km2:47, established:1988, wildlife:"Leopard, Barking Deer, 200+ bird species", iucnCategory:"IV" }
];

// ============ FOREST FIRE RISK ZONES ============
const FIRE_RISK_ZONES = [
    { id:"fr1", name_hi:"पौड़ी-चीड़ अग्नि क्षेत्र", district:"pauri", severity:"very_high", lat:30.12, lng:78.60, area_ha:15000, peakMonths:"Mar-Jun", cause:"Pine needles + dry conditions", incidents_yr:85, color:"#e74c3c" },
    { id:"fr2", name_hi:"नैनीताल अग्नि क्षेत्र", district:"nainital", severity:"high", lat:29.42, lng:79.35, area_ha:12000, peakMonths:"Apr-Jun", cause:"Pine forest, human negligence", incidents_yr:65, color:"#e67e22" },
    { id:"fr3", name_hi:"अल्मोड़ा अग्नि क्षेत्र", district:"almora", severity:"high", lat:29.60, lng:79.50, area_ha:10000, peakMonths:"Mar-Jun", cause:"Pine + oak mixed, slash & burn", incidents_yr:55, color:"#e67e22" },
    { id:"fr4", name_hi:"देहरादून अग्नि क्षेत्र", district:"dehradun", severity:"moderate", lat:30.32, lng:78.10, area_ha:8000, peakMonths:"Apr-May", cause:"Sal + pine litter", incidents_yr:35, color:"#f39c12" },
    { id:"fr5", name_hi:"टिहरी अग्नि क्षेत्र", district:"tehri", severity:"high", lat:30.35, lng:78.45, area_ha:9000, peakMonths:"Mar-Jun", cause:"Chir Pine needles", incidents_yr:48, color:"#e67e22" },
    { id:"fr6", name_hi:"चम्पावत अग्नि क्षेत्र", district:"champawat", severity:"moderate", lat:29.35, lng:79.98, area_ha:6000, peakMonths:"Apr-Jun", cause:"Pine + dry grass", incidents_yr:28, color:"#f39c12" }
];

// ============ VAN PANCHAYAT (Community Forests) ============
const VAN_PANCHAYATS = [
    { name_hi:"अल्मोड़ा वन पंचायत संगठन", district:"almora", lat:29.65, lng:79.62, count:1850, area_ha:68000, members:42000, activities:"Fodder, fuelwood, NTFP, water source protection", model:"Traditional" },
    { name_hi:"नैनीताल वन पंचायत", district:"nainital", lat:29.38, lng:79.48, count:1420, area_ha:52000, members:35000, activities:"Pine needle collection, eco-tourism, fodder", model:"JICA supported" },
    { name_hi:"पिथौरागढ़ वन पंचायत", district:"pithoragarh", lat:30.00, lng:80.15, count:1100, area_ha:45000, members:28000, activities:"Herb collection, forest protection, NTFP", model:"Traditional" },
    { name_hi:"पौड़ी वन पंचायत", district:"pauri", lat:30.12, lng:78.70, count:1650, area_ha:58000, members:38000, activities:"Pine needle bioenergy, fodder, resin", model:"CAMPA linked" },
    { name_hi:"चमोली वन पंचायत", district:"chamoli", lat:30.48, lng:79.30, count:980, area_ha:42000, members:22000, activities:"MAPs collection, forest fire prevention, eco-tourism", model:"Chipko legacy" },
    { name_hi:"बागेश्वर वन पंचायत", district:"bageshwar", lat:30.02, lng:79.78, count:680, area_ha:28000, members:16000, activities:"Ringal/bamboo, medicinal herbs, water source", model:"Traditional" },
    { name_hi:"टिहरी वन पंचायत", district:"tehri", lat:30.40, lng:78.48, count:920, area_ha:35000, members:20000, activities:"Pine needle, fodder, minor forest produce", model:"JICA supported" }
];

// ============ PINE NEEDLE BIOENERGY PROJECTS ============
const PINE_ENERGY_PROJECTS = [
    { name_hi:"पौड़ी Pine Needle Power Plant", district:"pauri", lat:30.15, lng:78.55, capacity_kW:250, type:"gasification", feedstock:"Pine needles", annual_MT:800, status:"operational", shgWorkers:120, annualIncome:"₹18L", operator:"Van Panchayat + UREDA" },
    { name_hi:"नैनीताल Pine Briquette Unit", district:"nainital", lat:29.45, lng:79.35, capacity_kW:100, type:"briquette", feedstock:"Pine needles + agri waste", annual_MT:500, status:"operational", shgWorkers:80, annualIncome:"₹12L", operator:"SHG Federation" },
    { name_hi:"अल्मोड़ा Pine Energy Pilot", district:"almora", lat:29.58, lng:79.55, capacity_kW:50, type:"gasification", feedstock:"Pine needles", annual_MT:200, status:"pilot", shgWorkers:35, annualIncome:"₹5L", operator:"UREDA + Forest Dept" },
    { name_hi:"टिहरी Pine Pellet Project", district:"tehri", lat:30.35, lng:78.42, capacity_kW:75, type:"pellet", feedstock:"Pine needles", annual_MT:300, status:"proposed", shgWorkers:0, annualIncome:"Projected ₹8L", operator:"CAMPA + SHG" },
    { name_hi:"देहरादून Biomass Hub", district:"dehradun", lat:30.30, lng:78.08, capacity_kW:150, type:"gasification", feedstock:"Pine + Lantana", annual_MT:600, status:"operational", shgWorkers:65, annualIncome:"₹10L", operator:"IIT-Roorkee + UREDA" }
];

// ============ LAYER CREATION FUNCTIONS ============

function createForestCoverLayer() {
    const g = L.layerGroup();
    const typeLabel = { very_dense:'अति सघन (Very Dense)', dense:'सघन (Dense)', moderate_dense:'मध्यम सघन (Moderate)' };
    FOREST_COVER.forEach(f => {
        const p = L.polygon(f.coords.map(c=>[c[1],c[0]]),{fillColor:f.color,fillOpacity:0.15,color:f.color,weight:2,dashArray:'5,5'});
        p.bindPopup(`<div class="popup-hub"><h4>🌲 ${f.name_hi}</h4><div class="popup-row"><span class="popup-label">प्रकार</span><span class="popup-value">${typeLabel[f.type]||f.type}</span></div><div class="popup-row"><span class="popup-label">क्षेत्रफल</span><span class="popup-value">${f.area_km2.toLocaleString()} km²</span></div><div class="popup-row"><span class="popup-label">वन आवरण</span><span class="popup-value">${f.treeCover_pct}%</span></div><div class="popup-row"><span class="popup-label">मुख्य प्रजातियां</span><span class="popup-value">${f.mainSpecies}</span></div></div>`);
        g.addLayer(p);
    });
    return g;
}

function createPineForestLayer() {
    const g = L.layerGroup();
    PINE_FORESTS.forEach(pf => {
        const color = pf.collectionActive ? '#27ae60' : '#e67e22';
        const icon = L.divIcon({className:'pine-icon',html:`<div style="background:rgba(10,14,23,0.9);border:2px solid ${color};border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 10px rgba(0,0,0,0.4)">🌲</div>`,iconSize:[32,32],iconAnchor:[16,16]});
        const mk = L.marker([pf.lat,pf.lng],{icon});
        mk.bindPopup(`<div class="popup-hub"><h4>🌲 ${pf.name_hi}</h4><div class="popup-row"><span class="popup-label">क्षेत्र</span><span class="popup-value">${pf.area_ha.toLocaleString()} ha</span></div><div class="popup-row"><span class="popup-label">ऊंचाई</span><span class="popup-value">${pf.altitude}</span></div><div class="popup-row"><span class="popup-label">पत्ती उपज</span><span class="popup-value">${pf.needleYield_MT.toLocaleString()} MT/yr</span></div><div class="popup-row"><span class="popup-label">बायोएनर्जी</span><span class="popup-value" style="color:#26de81">${pf.bioenergyPotential}</span></div><div class="popup-row"><span class="popup-label">Collection</span><span class="popup-value" style="color:${color}">${pf.collectionActive?'✅ Active':'⏳ Not Active'}</span></div><div class="popup-row"><span class="popup-label">SHGs</span><span class="popup-value">${pf.shgInvolved} groups</span></div><p style="font-size:11px;color:var(--text-secondary);margin-top:8px;line-height:1.5">📝 ${pf.description}</p></div>`);
        // Coverage circle
        L.circle([pf.lat,pf.lng],{radius:Math.sqrt(pf.area_ha)*80,fillColor:color,fillOpacity:0.08,color:color,weight:1,dashArray:'4,4'}).addTo(g);
        g.addLayer(mk);
    });
    return g;
}

function createTreeSpeciesLayer() {
    const g = L.layerGroup();
    const statusColor = {stable:'#2ecc71',declining:'#e67e22',vulnerable:'#e74c3c'};
    TREE_SPECIES.forEach(ts => {
        const c = statusColor[ts.status]||'#2ecc71';
        const mk = L.circleMarker([ts.lat,ts.lng],{radius:14,fillColor:ts.color,fillOpacity:0.4,color:'#fff',weight:2});
        mk.bindPopup(`<div class="popup-hub"><h4>🌳 ${ts.name_hi}</h4><div class="popup-row"><span class="popup-label">वैज्ञानिक नाम</span><span class="popup-value" style="font-style:italic">${ts.species}</span></div><div class="popup-row"><span class="popup-label">ऊंचाई</span><span class="popup-value">${ts.altitude}</span></div><div class="popup-row"><span class="popup-label">क्षेत्र</span><span class="popup-value">${ts.area_ha.toLocaleString()} ha</span></div><div class="popup-row"><span class="popup-label">स्थिति</span><span class="popup-value" style="color:${c}">${ts.status}</span></div><div class="popup-row"><span class="popup-label">महत्व</span><span class="popup-value">${ts.importance}</span></div><div class="popup-row"><span class="popup-label">खतरा</span><span class="popup-value" style="color:#e74c3c">${ts.threat}</span></div></div>`);
        g.addLayer(mk);
    });
    return g;
}

function createProtectedForestLayer() {
    const g = L.layerGroup();
    PROTECTED_FORESTS.forEach(pf => {
        const emoji = pf.type==='national_park'?'🏛️':'🦌';
        const c = pf.type==='national_park'?'#f39c12':'#e74c3c';
        const icon = L.divIcon({className:'park-icon',html:`<div style="background:rgba(10,14,23,0.9);border:2px solid ${c};border-radius:8px;padding:3px 8px;font-size:11px;color:${c};white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3)">${emoji} ${pf.name.split(' ').slice(0,2).join(' ')}</div>`,iconSize:null});
        const mk = L.marker([pf.lat,pf.lng],{icon});
        mk.bindPopup(`<div class="popup-hub"><h4>${emoji} ${pf.name_hi}</h4><div class="popup-row"><span class="popup-label">Type</span><span class="popup-value">${pf.type==='national_park'?'राष्ट्रीय उद्यान':'वन्यजीव अभयारण्य'}</span></div><div class="popup-row"><span class="popup-label">क्षेत्रफल</span><span class="popup-value">${pf.area_km2.toLocaleString()} km²</span></div><div class="popup-row"><span class="popup-label">स्थापित</span><span class="popup-value">${pf.established}</span></div><div class="popup-row"><span class="popup-label">वन्यजीव</span><span class="popup-value">${pf.wildlife}</span></div></div>`);
        // Park boundary circle
        L.circle([pf.lat,pf.lng],{radius:Math.sqrt(pf.area_km2)*500,fillColor:c,fillOpacity:0.05,color:c,weight:1.5,dashArray:'8,4'}).addTo(g);
        g.addLayer(mk);
    });
    return g;
}

function createFireRiskLayer() {
    const g = L.layerGroup();
    FIRE_RISK_ZONES.forEach(fr => {
        const mk = L.circleMarker([fr.lat,fr.lng],{radius:Math.min(fr.incidents_yr/5,15),fillColor:fr.color,fillOpacity:0.5,color:'#fff',weight:1.5});
        mk.bindPopup(`<div class="popup-hub"><h4>🔥 ${fr.name_hi}</h4><div class="popup-row"><span class="popup-label">गंभीरता</span><span class="popup-value" style="color:${fr.color}">${fr.severity.replace('_',' ').toUpperCase()}</span></div><div class="popup-row"><span class="popup-label">क्षेत्र</span><span class="popup-value">${fr.area_ha.toLocaleString()} ha</span></div><div class="popup-row"><span class="popup-label">पीक महीने</span><span class="popup-value">${fr.peakMonths}</span></div><div class="popup-row"><span class="popup-label">कारण</span><span class="popup-value">${fr.cause}</span></div><div class="popup-row"><span class="popup-label">दुर्घटनाएं/वर्ष</span><span class="popup-value">${fr.incidents_yr}</span></div></div>`);
        g.addLayer(mk);
    });
    return g;
}

function createVanPanchayatLayer() {
    const g = L.layerGroup();
    VAN_PANCHAYATS.forEach(vp => {
        const mk = L.circleMarker([vp.lat,vp.lng],{radius:9,fillColor:'#16a085',fillOpacity:0.6,color:'#fff',weight:2});
        mk.bindPopup(`<div class="popup-hub"><h4>🏘️ ${vp.name_hi}</h4><div class="popup-row"><span class="popup-label">वन पंचायतें</span><span class="popup-value">${vp.count.toLocaleString()}</span></div><div class="popup-row"><span class="popup-label">क्षेत्र</span><span class="popup-value">${vp.area_ha.toLocaleString()} ha</span></div><div class="popup-row"><span class="popup-label">सदस्य</span><span class="popup-value">${vp.members.toLocaleString()}</span></div><div class="popup-row"><span class="popup-label">गतिविधियां</span><span class="popup-value">${vp.activities}</span></div><div class="popup-row"><span class="popup-label">मॉडल</span><span class="popup-value">${vp.model}</span></div></div>`);
        g.addLayer(mk);
    });
    return g;
}

function createPineEnergyLayer() {
    const g = L.layerGroup();
    const statusColor = {operational:'#26de81',pilot:'#f7971e',proposed:'#74b9ff'};
    PINE_ENERGY_PROJECTS.forEach(pe => {
        const c = statusColor[pe.status]||'#4facfe';
        const icon = L.divIcon({className:'pine-energy-icon',html:`<div style="background:rgba(10,14,23,0.9);border:2px solid ${c};border-radius:8px;padding:3px 8px;font-size:11px;color:${c};white-space:nowrap;box-shadow:0 2px 10px rgba(0,0,0,0.4)">⚡🌲 ${pe.capacity_kW}kW</div>`,iconSize:null});
        const mk = L.marker([pe.lat,pe.lng],{icon});
        mk.bindPopup(`<div class="popup-hub"><h4>⚡🌲 ${pe.name_hi}</h4><div class="popup-row"><span class="popup-label">क्षमता</span><span class="popup-value">${pe.capacity_kW} kW</span></div><div class="popup-row"><span class="popup-label">प्रकार</span><span class="popup-value">${pe.type}</span></div><div class="popup-row"><span class="popup-label">फीडस्टॉक</span><span class="popup-value">${pe.feedstock}</span></div><div class="popup-row"><span class="popup-label">वार्षिक उपयोग</span><span class="popup-value">${pe.annual_MT} MT</span></div><div class="popup-row"><span class="popup-label">स्थिति</span><span class="popup-value" style="color:${c}">${pe.status}</span></div><div class="popup-row"><span class="popup-label">SHG Workers</span><span class="popup-value">${pe.shgWorkers}</span></div><div class="popup-row"><span class="popup-label">वार्षिक आय</span><span class="popup-value" style="color:#26de81">${pe.annualIncome}</span></div><div class="popup-row"><span class="popup-label">संचालक</span><span class="popup-value">${pe.operator}</span></div></div>`);
        g.addLayer(mk);
    });
    return g;
}

function getForestStatsByDistrict(districtId) {
    const filter = (arr) => districtId==='all' ? arr : arr.filter(a=>a.district===districtId);
    const fc = filter(FOREST_COVER);
    const pf = filter(PINE_FORESTS);
    const prf = filter(PROTECTED_FORESTS);
    const vp = filter(VAN_PANCHAYATS);
    const pe = filter(PINE_ENERGY_PROJECTS);
    return {
        forestArea: fc.reduce((s,f)=>s+f.area_km2,0),
        pineArea: pf.reduce((s,p)=>s+p.area_ha,0),
        needleYield: pf.reduce((s,p)=>s+p.needleYield_MT,0),
        bioenergyMW: pf.reduce((s,p)=>s+parseFloat(p.bioenergyPotential),0).toFixed(1),
        protectedAreas: prf.length,
        vanPanchayats: vp.reduce((s,v)=>s+v.count,0),
        pineEnergyProjects: pe.length,
        pineEnergyCapacity: pe.reduce((s,p)=>s+p.capacity_kW,0)
    };
}
