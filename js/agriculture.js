/**
 * agriculture.js — Agriculture Sector Data & Layers for Uttarakhand
 * Horticulture, Crop Zones, Mandis, Cold Storage, Organic, Polyhouse,
 * FPO/SHG, PMKSY Irrigation, Medicinal Plants
 */

// ============ HORTICULTURE BELTS ============
const HORTICULTURE_BELTS = [
    { id:"hb1", name_hi:"सेब पट्टी (Apple Belt)", type:"apple", district:"uttarkashi", altitude:"1800-2800m", varieties:"Royal Delicious, Golden, Red Chief", season:"Jul-Oct", coords:[[78.25,31.10],[78.50,31.15],[78.60,31.05],[78.45,30.95],[78.25,31.00],[78.25,31.10]], color:"#ff4757", production:"12,000 MT/yr" },
    { id:"hb2", name_hi:"सेब पट्टी (Apple Belt)", type:"apple", district:"chamoli", altitude:"2000-3000m", varieties:"Royal, Red Delicious", season:"Aug-Oct", coords:[[79.25,30.60],[79.45,30.62],[79.50,30.52],[79.35,30.45],[79.20,30.50],[79.25,30.60]], color:"#ff4757", production:"8,500 MT/yr" },
    { id:"hb3", name_hi:"अखरोट पट्टी (Walnut Belt)", type:"walnut", district:"chamoli", altitude:"1500-2500m", varieties:"Kashmir Budded, Chakrata Thin Shell", season:"Sep-Nov", coords:[[79.35,30.55],[79.50,30.58],[79.60,30.48],[79.45,30.40],[79.32,30.45],[79.35,30.55]], color:"#8B4513", production:"3,200 MT/yr" },
    { id:"hb4", name_hi:"संतरा-माल्टा पट्टी (Citrus Belt)", type:"citrus", district:"almora", altitude:"800-1500m", varieties:"Malta, Kinnu, Lemon", season:"Nov-Feb", coords:[[79.30,29.75],[79.50,29.78],[79.58,29.68],[79.45,29.58],[79.28,29.62],[79.30,29.75]], color:"#ffa502", production:"5,800 MT/yr" },
    { id:"hb5", name_hi:"संतरा-माल्टा पट्टी (Citrus Belt)", type:"citrus", district:"champawat", altitude:"600-1200m", varieties:"Malta, Kinnu", season:"Nov-Feb", coords:[[79.80,29.55],[79.98,29.55],[80.02,29.42],[79.90,29.35],[79.78,29.40],[79.80,29.55]], color:"#ffa502", production:"2,400 MT/yr" },
    { id:"hb6", name_hi:"लीची पट्टी (Litchi Belt)", type:"litchi", district:"dehradun", altitude:"400-800m", varieties:"Shahi, Calcuttia, Rose Scented", season:"Jun-Jul", coords:[[77.75,30.35],[77.95,30.38],[78.05,30.28],[77.90,30.20],[77.72,30.25],[77.75,30.35]], color:"#e84393", production:"4,100 MT/yr" },
    { id:"hb7", name_hi:"कीवी क्षेत्र (Kiwi Zone)", type:"kiwi", district:"pithoragarh", altitude:"1000-2000m", varieties:"Hayward, Bruno, Monty", season:"Oct-Dec", coords:[[79.95,30.10],[80.12,30.08],[80.15,29.95],[80.00,29.90],[79.88,29.98],[79.95,30.10]], color:"#26de81", production:"450 MT/yr" },
    { id:"hb8", name_hi:"ड्रैगन फ्रूट क्षेत्र", type:"dragon_fruit", district:"haridwar", altitude:"250-600m", varieties:"Red Flesh, White Flesh", season:"Jun-Nov", coords:[[77.72,29.95],[77.88,29.98],[77.95,29.88],[77.82,29.80],[77.68,29.85],[77.72,29.95]], color:"#fd79a8", production:"New — Pilot Phase" },
    { id:"hb9", name_hi:"आड़ू-प्लम पट्टी (Peach-Plum)", type:"peach", district:"nainital", altitude:"1200-2000m", varieties:"July Elberta, Red Plum", season:"Jun-Aug", coords:[[79.05,29.45],[79.22,29.48],[79.30,29.38],[79.18,29.28],[79.02,29.32],[79.05,29.45]], color:"#fdcb6e", production:"3,600 MT/yr" },
    { id:"hb10", name_hi:"अखरोट पट्टी (Walnut)", type:"walnut", district:"pithoragarh", altitude:"1800-2500m", varieties:"Govind, Chakrata", season:"Sep-Nov", coords:[[80.05,30.25],[80.20,30.22],[80.25,30.10],[80.12,30.05],[79.98,30.12],[80.05,30.25]], color:"#8B4513", production:"2,100 MT/yr" }
];

// ============ CROP SUITABILITY ZONES ============
const CROP_ZONES = [
    { id:"cz1", name_hi:"तराई क्षेत्र (Plains)", altitude:"200-600m", districts:["haridwar","udhamsingh"], crops:"धान, गेहूं, गन्ना, सब्जियां, ड्रैगन फ्रूट", cropsEn:"Rice, Wheat, Sugarcane, Vegetables, Dragon Fruit", soilType:"Alluvial", irrigation:"Canal + Tubewell", color:"#00b894", coords:[[77.65,30.00],[78.00,30.00],[79.40,29.00],[78.65,28.90],[77.55,29.75],[77.65,30.00]] },
    { id:"cz2", name_hi:"निचली पहाड़ी (Lower Hills)", altitude:"600-1200m", districts:["dehradun","pauri","nainital","champawat"], crops:"गेहूं, मडुआ, बासमती, दालें, सब्जियां", cropsEn:"Wheat, Mandua, Basmati, Pulses, Vegetables", soilType:"Red/Laterite", irrigation:"Spring + Rainfed", color:"#00cec9", coords:[[77.60,30.50],[78.20,30.45],[78.60,30.20],[79.00,29.70],[79.40,29.45],[79.65,29.55],[79.80,29.75],[78.15,29.95],[77.50,30.15],[77.60,30.50]] },
    { id:"cz3", name_hi:"मध्य पहाड़ी (Mid Hills)", altitude:"1200-2000m", districts:["tehri","almora","bageshwar","rudraprayag"], crops:"आलू, राजमा, मटर, अदरक, हल्दी, फल", cropsEn:"Potato, Rajma, Peas, Ginger, Turmeric, Fruits", soilType:"Brown Forest", irrigation:"Spring + Rainfed", color:"#0984e3", coords:[[78.20,30.85],[78.55,30.85],[79.25,30.40],[79.50,30.05],[79.25,29.80],[78.85,30.15],[78.15,30.55],[78.20,30.85]] },
    { id:"cz4", name_hi:"ऊपरी पहाड़ी (Upper Hills)", altitude:"2000-3500m", districts:["uttarkashi","chamoli","pithoragarh"], crops:"सेब, अखरोट, राजमा, आलू, औषधीय पौधे", cropsEn:"Apple, Walnut, Rajma, Potato, Medicinal Herbs", soilType:"Podzolic/Alpine", irrigation:"Snow-melt + Spring", color:"#6c5ce7", coords:[[78.00,31.25],[78.90,31.10],[79.70,30.80],[80.30,30.40],[80.05,30.05],[79.55,30.45],[78.55,30.85],[78.00,31.25]] }
];

// ============ MANDI / MARKET LOCATIONS ============
const MANDI_LOCATIONS = [
    { name_hi:"देहरादून मंडी", name:"Dehradun Mandi", district:"dehradun", lat:30.32, lng:78.03, type:"apmc", mainProduce:"Vegetables, Basmati, Litchi", dailyArrival:"80 MT" },
    { name_hi:"हरिद्वार मंडी", name:"Haridwar Mandi", district:"haridwar", lat:29.95, lng:78.16, type:"apmc", mainProduce:"Sugarcane, Wheat, Rice", dailyArrival:"120 MT" },
    { name_hi:"हल्द्वानी मंडी", name:"Haldwani Mandi", district:"nainital", lat:29.22, lng:79.52, type:"apmc", mainProduce:"Fruits, Vegetables, Grains", dailyArrival:"150 MT" },
    { name_hi:"रुद्रपुर मंडी", name:"Rudrapur Mandi", district:"udhamsingh", lat:28.97, lng:79.40, type:"apmc", mainProduce:"Rice, Wheat, Sugarcane", dailyArrival:"200 MT" },
    { name_hi:"कोटद्वार मंडी", name:"Kotdwar Mandi", district:"pauri", lat:29.75, lng:78.53, type:"apmc", mainProduce:"Grains, Spices, Herbs", dailyArrival:"40 MT" },
    { name_hi:"श्रीनगर मंडी", name:"Srinagar Mandi", district:"pauri", lat:30.22, lng:78.78, type:"secondary", mainProduce:"Rajma, Vegetables", dailyArrival:"25 MT" },
    { name_hi:"अल्मोड़ा मंडी", name:"Almora Mandi", district:"almora", lat:29.60, lng:79.66, type:"secondary", mainProduce:"Fruits, Pulses, Herbs", dailyArrival:"20 MT" },
    { name_hi:"पिथौरागढ़ मंडी", name:"Pithoragarh Mandi", district:"pithoragarh", lat:29.58, lng:80.22, type:"secondary", mainProduce:"Rajma, Potato, Walnut", dailyArrival:"15 MT" },
    { name_hi:"चमोली मंडी", name:"Gopeshwar Mandi", district:"chamoli", lat:30.41, lng:79.32, type:"secondary", mainProduce:"Apple, Rajma, Herbs", dailyArrival:"10 MT" },
    { name_hi:"न्यू टिहरी मंडी", name:"New Tehri Mandi", district:"tehri", lat:30.38, lng:78.43, type:"secondary", mainProduce:"Potato, Peas, Ginger", dailyArrival:"18 MT" },
    { name_hi:"उत्तरकाशी मंडी", name:"Uttarkashi Mandi", district:"uttarkashi", lat:30.73, lng:78.44, type:"secondary", mainProduce:"Apple, Rajma, Potato", dailyArrival:"12 MT" }
];

// ============ COLD STORAGE ============
const COLD_STORAGE = [
    { name_hi:"हल्द्वानी कोल्ड स्टोरेज", district:"nainital", lat:29.23, lng:79.50, capacity:"2000 MT", type:"existing", solarPowered:false, products:"Fruits, Vegetables" },
    { name_hi:"रुद्रपुर कोल्ड स्टोरेज", district:"udhamsingh", lat:28.98, lng:79.42, capacity:"5000 MT", type:"existing", solarPowered:false, products:"Rice, Wheat, Vegetables" },
    { name_hi:"देहरादून कोल्ड स्टोरेज", district:"dehradun", lat:30.30, lng:78.05, capacity:"1500 MT", type:"existing", solarPowered:false, products:"Litchi, Vegetables" },
    { name_hi:"हरिद्वार कोल्ड चेन", district:"haridwar", lat:29.92, lng:78.12, capacity:"3000 MT", type:"existing", solarPowered:false, products:"Sugarcane, Vegetables" },
    { name_hi:"चमोली सौर कोल्ड स्टोरेज", district:"chamoli", lat:30.43, lng:79.30, capacity:"50 MT", type:"proposed_solar", solarPowered:true, products:"Apple, Herbs" },
    { name_hi:"उत्तरकाशी सौर कोल्ड", district:"uttarkashi", lat:30.75, lng:78.45, capacity:"80 MT", type:"proposed_solar", solarPowered:true, products:"Apple, Walnut" },
    { name_hi:"पिथौरागढ़ सौर कोल्ड", district:"pithoragarh", lat:29.60, lng:80.20, capacity:"60 MT", type:"proposed_solar", solarPowered:true, products:"Kiwi, Rajma, Herbs" },
    { name_hi:"अल्मोड़ा सौर कोल्ड", district:"almora", lat:29.62, lng:79.64, capacity:"40 MT", type:"proposed_solar", solarPowered:true, products:"Malta, Herbs" }
];

// ============ ORGANIC FARMING CLUSTERS ============
const ORGANIC_CLUSTERS = [
    { name_hi:"उत्तरकाशी ऑर्गेनिक क्लस्टर", district:"uttarkashi", lat:30.80, lng:78.50, farmers:450, area_ha:280, certified:true, products:"Rajma, Potato, Apple", scheme:"PGS-India / Paramparagat Krishi", color:"#26de81" },
    { name_hi:"चमोली ऑर्गेनिक क्लस्टर", district:"chamoli", lat:30.50, lng:79.35, farmers:380, area_ha:220, certified:true, products:"Rajma, Herbs, Apple", scheme:"Paramparagat Krishi", color:"#26de81" },
    { name_hi:"पिथौरागढ़ ऑर्गेनिक", district:"pithoragarh", lat:30.00, lng:80.15, farmers:320, area_ha:180, certified:true, products:"Rajma, Turmeric, Kiwi", scheme:"PGS-India", color:"#26de81" },
    { name_hi:"टिहरी ऑर्गेनिक क्लस्टर", district:"tehri", lat:30.40, lng:78.50, farmers:290, area_ha:160, certified:true, products:"Ginger, Turmeric, Potato", scheme:"PKVY", color:"#26de81" },
    { name_hi:"अल्मोड़ा ऑर्गेनिक", district:"almora", lat:29.65, lng:79.60, farmers:410, area_ha:250, certified:true, products:"Mandua, Jhangora, Pulses", scheme:"Mission Organic UK", color:"#26de81" },
    { name_hi:"बागेश्वर ऑर्गेनिक", district:"bageshwar", lat:30.00, lng:79.78, farmers:220, area_ha:130, certified:false, products:"Rajma, Herbs", scheme:"In Process (PGS)", color:"#55efc4" },
    { name_hi:"रुद्रप्रयाग ऑर्गेनिक", district:"rudraprayag", lat:30.30, lng:79.02, farmers:180, area_ha:100, certified:false, products:"Potato, Peas", scheme:"In Process", color:"#55efc4" }
];

// ============ PROTECTED AGRICULTURE (Polyhouse/Greenhouse) ============
const PROTECTED_AGRI = [
    { name_hi:"देहरादून पॉलीहाउस क्लस्टर", district:"dehradun", lat:30.35, lng:77.98, units:45, totalArea_sqm:22500, type:"polyhouse", crops:"Capsicum, Tomato, Flowers", scheme:"MIDH / NHM", investment:"₹45L avg per unit" },
    { name_hi:"नैनीताल पॉलीहाउस", district:"nainital", lat:29.40, lng:79.48, units:30, totalArea_sqm:15000, type:"polyhouse", crops:"Off-season Vegetables, Flowers", scheme:"MIDH", investment:"₹35L avg" },
    { name_hi:"हरिद्वार नेट हाउस", district:"haridwar", lat:29.88, lng:78.10, units:60, totalArea_sqm:45000, type:"nethouse", crops:"Vegetables, Nursery", scheme:"NHM / RKVY", investment:"₹15L avg" },
    { name_hi:"ऊधम सिंह नगर ग्रीनहाउस", district:"udhamsingh", lat:28.95, lng:79.38, units:55, totalArea_sqm:35000, type:"greenhouse", crops:"Flowers, Exotic Vegetables", scheme:"MIDH", investment:"₹50L avg" },
    { name_hi:"अल्मोड़ा पॉलीहाउस", district:"almora", lat:29.58, lng:79.68, units:18, totalArea_sqm:7200, type:"polyhouse", crops:"Off-season Veg, Flowers", scheme:"MIDH", investment:"₹30L avg" },
    { name_hi:"चमोली लो-टनल", district:"chamoli", lat:30.45, lng:79.28, units:25, totalArea_sqm:5000, type:"low_tunnel", crops:"Early Vegetables, Nursery", scheme:"RKVY", investment:"₹5L avg" },
    { name_hi:"पिथौरागढ़ पॉलीहाउस", district:"pithoragarh", lat:29.55, lng:80.18, units:12, totalArea_sqm:4800, type:"polyhouse", crops:"Vegetables, Flowers", scheme:"MIDH", investment:"₹28L avg" }
];

// ============ FPO / SHG CLUSTERS ============
const FPO_SHG = [
    { name_hi:"उत्तरकाशी Apple FPO", district:"uttarkashi", lat:30.78, lng:78.48, type:"fpo", members:350, products:"Apple, Walnut", registered:true, turnover:"₹85L/yr" },
    { name_hi:"चमोली Herbs FPO", district:"chamoli", lat:30.48, lng:79.33, type:"fpo", members:280, products:"Medicinal Herbs, Rajma", registered:true, turnover:"₹60L/yr" },
    { name_hi:"अल्मोड़ा Women SHG Cluster", district:"almora", lat:29.63, lng:79.62, type:"shg", members:520, products:"Mandua Products, Spices", registered:true, turnover:"₹45L/yr" },
    { name_hi:"बागेश्वर Rajma FPO", district:"bageshwar", lat:30.02, lng:79.75, type:"fpo", members:180, products:"Organic Rajma, Honey", registered:true, turnover:"₹35L/yr" },
    { name_hi:"पिथौरागढ़ Kiwi FPO", district:"pithoragarh", lat:30.02, lng:80.10, type:"fpo", members:150, products:"Kiwi, Turmeric", registered:true, turnover:"₹28L/yr" },
    { name_hi:"टिहरी SHG Federation", district:"tehri", lat:30.42, lng:78.45, type:"shg", members:680, products:"Ginger, Turmeric, Pickles", registered:true, turnover:"₹55L/yr" },
    { name_hi:"देहरादून Organic FPO", district:"dehradun", lat:30.28, lng:78.00, type:"fpo", members:420, products:"Basmati, Litchi, Vegetables", registered:true, turnover:"₹120L/yr" },
    { name_hi:"नैनीताल Fruit FPO", district:"nainital", lat:29.38, lng:79.52, type:"fpo", members:300, products:"Peach, Plum, Malta", registered:true, turnover:"₹48L/yr" },
    { name_hi:"हरिद्वार Agri SHG", district:"haridwar", lat:29.90, lng:78.08, type:"shg", members:750, products:"Sugarcane, Vegetables", registered:true, turnover:"₹95L/yr" },
    { name_hi:"चम्पावत SHG Cluster", district:"champawat", lat:29.35, lng:80.05, type:"shg", members:240, products:"Malta, Honey, Spices", registered:true, turnover:"₹22L/yr" }
];

// ============ PMKSY IRRIGATION ============
const PMKSY_SITES = [
    { name_hi:"हरिद्वार माइक्रो इरिगेशन", district:"haridwar", lat:29.85, lng:78.08, type:"drip", area_ha:1200, beneficiaries:450, status:"completed", scheme:"PMKSY-MIS" },
    { name_hi:"ऊधम सिंह नगर ड्रिप", district:"udhamsingh", lat:28.95, lng:79.35, type:"drip", area_ha:2000, beneficiaries:680, status:"completed", scheme:"PMKSY-MIS" },
    { name_hi:"देहरादून स्प्रिंकलर", district:"dehradun", lat:30.25, lng:77.95, type:"sprinkler", area_ha:800, beneficiaries:320, status:"completed", scheme:"PMKSY-MIS" },
    { name_hi:"नैनीताल स्प्रिंग रिवाइवल", district:"nainital", lat:29.35, lng:79.50, type:"spring_revival", area_ha:400, beneficiaries:280, status:"ongoing", scheme:"PMKSY + Dhara" },
    { name_hi:"अल्मोड़ा चाल-खाल", district:"almora", lat:29.65, lng:79.58, type:"chaal_khaal", area_ha:350, beneficiaries:220, status:"ongoing", scheme:"MGNREGA + PMKSY" },
    { name_hi:"टिहरी चेक डैम", district:"tehri", lat:30.35, lng:78.50, type:"check_dam", area_ha:500, beneficiaries:300, status:"completed", scheme:"PMKSY-WDC" },
    { name_hi:"पौड़ी स्प्रिंग शेड", district:"pauri", lat:30.15, lng:78.75, type:"spring_revival", area_ha:250, beneficiaries:180, status:"ongoing", scheme:"Dhara Programme" },
    { name_hi:"बागेश्वर लिफ्ट इरिगेशन", district:"bageshwar", lat:30.05, lng:79.80, type:"lift", area_ha:150, beneficiaries:120, status:"ongoing", scheme:"PMKSY-AIBP" }
];

// ============ MEDICINAL & AROMATIC PLANTS (MAPS) ============
const MAPS_ZONES = [
    { id:"m1", name_hi:"चमोली MAPS क्षेत्र", district:"chamoli", lat:30.55, lng:79.40, altitude:"2500-4000m", plants:"Jatamansi, Kutki, Atis, Salam Panja", area_ha:450, collectors:280, revenue:"₹35L/yr", scheme:"NMPB / AYUSH", color:"#a29bfe" },
    { id:"m2", name_hi:"पिथौरागढ़ MAPS", district:"pithoragarh", lat:30.10, lng:80.18, altitude:"2000-3500m", plants:"Kutki, Jatamansi, Van Tulsi", area_ha:320, collectors:200, revenue:"₹25L/yr", scheme:"NMPB", color:"#a29bfe" },
    { id:"m3", name_hi:"उत्तरकाशी MAPS", district:"uttarkashi", lat:30.85, lng:78.55, altitude:"2200-3800m", plants:"Atis, Salam Panja, Chirayata", area_ha:380, collectors:240, revenue:"₹30L/yr", scheme:"NMPB / Forest Dept", color:"#a29bfe" },
    { id:"m4", name_hi:"बागेश्वर MAPS", district:"bageshwar", lat:30.08, lng:79.82, altitude:"1800-3000m", plants:"Tejpat, Jatamansi, Kutki", area_ha:200, collectors:150, revenue:"₹18L/yr", scheme:"NMPB", color:"#a29bfe" },
    { id:"m5", name_hi:"रुद्रप्रयाग MAPS", district:"rudraprayag", lat:30.35, lng:79.05, altitude:"1500-2800m", plants:"Chirayata, Van Tulsi, Kutki", area_ha:150, collectors:100, revenue:"₹12L/yr", scheme:"NMPB", color:"#a29bfe" },
    { id:"m6", name_hi:"देहरादून Lavender Zone", district:"dehradun", lat:30.40, lng:78.10, altitude:"1200-1800m", plants:"Lavender, Rosemary, Lemongrass", area_ha:120, collectors:80, revenue:"₹22L/yr", scheme:"Aroma Mission / CSIR", color:"#fd79a8" },
    { id:"m7", name_hi:"टिहरी Aromatic Zone", district:"tehri", lat:30.45, lng:78.55, altitude:"1000-2000m", plants:"Lemongrass, Citronella, Geranium", area_ha:180, collectors:120, revenue:"₹20L/yr", scheme:"Aroma Mission", color:"#fd79a8" }
];

// ============ CROP CALENDAR ============
const CROP_CALENDAR = {
    rabi: { season:"रबी (Oct-Mar)", crops:[
        { name:"गेहूं (Wheat)", sowing:"Oct-Nov", harvest:"Mar-Apr", zones:["plains","lower_hills","mid_hills"] },
        { name:"जौ (Barley)", sowing:"Oct-Nov", harvest:"Apr-May", zones:["mid_hills","upper_hills"] },
        { name:"मसूर (Lentil)", sowing:"Oct-Nov", harvest:"Mar-Apr", zones:["plains","lower_hills"] },
        { name:"सरसों (Mustard)", sowing:"Oct", harvest:"Feb-Mar", zones:["plains","lower_hills"] },
        { name:"आलू (Potato)", sowing:"Oct-Nov", harvest:"Feb-Mar", zones:["mid_hills","upper_hills"] },
        { name:"मटर (Peas)", sowing:"Oct-Nov", harvest:"Feb-Mar", zones:["mid_hills"] }
    ]},
    kharif: { season:"खरीफ (Jun-Oct)", crops:[
        { name:"धान (Rice)", sowing:"Jun-Jul", harvest:"Oct-Nov", zones:["plains","lower_hills"] },
        { name:"मडुआ (Finger Millet)", sowing:"Jun-Jul", harvest:"Oct-Nov", zones:["lower_hills","mid_hills"] },
        { name:"झंगोरा (Barnyard Millet)", sowing:"Jun-Jul", harvest:"Sep-Oct", zones:["mid_hills","upper_hills"] },
        { name:"राजमा (Kidney Bean)", sowing:"May-Jun", harvest:"Sep-Oct", zones:["mid_hills","upper_hills"] },
        { name:"अदरक (Ginger)", sowing:"Mar-Apr", harvest:"Nov-Dec", zones:["lower_hills","mid_hills"] },
        { name:"हल्दी (Turmeric)", sowing:"Apr-May", harvest:"Dec-Jan", zones:["lower_hills","mid_hills"] }
    ]},
    zaid: { season:"ज़ायद (Mar-Jun)", crops:[
        { name:"खीरा (Cucumber)", sowing:"Mar-Apr", harvest:"May-Jun", zones:["plains","lower_hills"] },
        { name:"तरबूज (Watermelon)", sowing:"Feb-Mar", harvest:"May-Jun", zones:["plains"] },
        { name:"मूंग (Moong)", sowing:"Mar-Apr", harvest:"Jun", zones:["plains"] }
    ]}
};

// ============ LAYER CREATION FUNCTIONS ============

function createHorticultureBeltLayer() {
    const g = L.layerGroup();
    HORTICULTURE_BELTS.forEach(b => {
        const p = L.polygon(b.coords.map(c=>[c[1],c[0]]),{fillColor:b.color,fillOpacity:0.20,color:b.color,weight:2,dashArray:'6,3'});
        p.bindPopup(`<div class="popup-hub"><h4>🍎 ${b.name_hi}</h4><div class="popup-row"><span class="popup-label">ऊंचाई</span><span class="popup-value">${b.altitude}</span></div><div class="popup-row"><span class="popup-label">किस्में</span><span class="popup-value">${b.varieties}</span></div><div class="popup-row"><span class="popup-label">मौसम</span><span class="popup-value">${b.season}</span></div><div class="popup-row"><span class="popup-label">उत्पादन</span><span class="popup-value">${b.production}</span></div></div>`);
        g.addLayer(p);
    });
    return g;
}

function createCropZoneLayer() {
    const g = L.layerGroup();
    CROP_ZONES.forEach(z => {
        const p = L.polygon(z.coords.map(c=>[c[1],c[0]]),{fillColor:z.color,fillOpacity:0.10,color:z.color,weight:2,dashArray:'10,5'});
        p.bindPopup(`<div class="popup-hub"><h4>🌾 ${z.name_hi}</h4><div class="popup-row"><span class="popup-label">ऊंचाई</span><span class="popup-value">${z.altitude}</span></div><div class="popup-row"><span class="popup-label">फसलें</span><span class="popup-value">${z.crops}</span></div><div class="popup-row"><span class="popup-label">मिट्टी</span><span class="popup-value">${z.soilType}</span></div><div class="popup-row"><span class="popup-label">सिंचाई</span><span class="popup-value">${z.irrigation}</span></div></div>`);
        g.addLayer(p);
    });
    return g;
}

function createMandiLayer() {
    const g = L.layerGroup();
    MANDI_LOCATIONS.forEach(m => {
        const color = m.type==='apmc'?'#fdcb6e':'#ffeaa7';
        const icon = L.divIcon({className:'mandi-icon',html:`<div style="background:${color};color:#2d3436;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:bold;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3)">🏪</div>`,iconSize:[28,28],iconAnchor:[14,14]});
        const mk = L.marker([m.lat,m.lng],{icon});
        mk.bindPopup(`<div class="popup-hub"><h4>🏪 ${m.name_hi}</h4><div class="popup-row"><span class="popup-label">Type</span><span class="popup-value">${m.type.toUpperCase()}</span></div><div class="popup-row"><span class="popup-label">मुख्य उपज</span><span class="popup-value">${m.mainProduce}</span></div><div class="popup-row"><span class="popup-label">दैनिक आवक</span><span class="popup-value">${m.dailyArrival}</span></div></div>`);
        g.addLayer(mk);
    });
    return g;
}

function createColdStorageLayer() {
    const g = L.layerGroup();
    COLD_STORAGE.forEach(c => {
        const color = c.type==='existing'?'#74b9ff':'#00d98b';
        const emoji = c.solarPowered?'☀️❄️':'❄️';
        const icon = L.divIcon({className:'cold-icon',html:`<div style="background:rgba(16,22,36,0.9);color:${color};border:2px solid ${color};border-radius:8px;padding:2px 6px;font-size:12px;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3)">${emoji} ${c.capacity}</div>`,iconSize:null});
        const mk = L.marker([c.lat,c.lng],{icon});
        mk.bindPopup(`<div class="popup-hub"><h4>${emoji} ${c.name_hi}</h4><div class="popup-row"><span class="popup-label">क्षमता</span><span class="popup-value">${c.capacity}</span></div><div class="popup-row"><span class="popup-label">Status</span><span class="popup-value" style="color:${color}">${c.type==='existing'?'मौजूद':'प्रस्तावित (Solar)'}</span></div><div class="popup-row"><span class="popup-label">Products</span><span class="popup-value">${c.products}</span></div></div>`);
        g.addLayer(mk);
    });
    return g;
}

function createOrganicLayer() {
    const g = L.layerGroup();
    ORGANIC_CLUSTERS.forEach(o => {
        const mk = L.circleMarker([o.lat,o.lng],{radius:10,fillColor:o.color,fillOpacity:0.6,color:'#fff',weight:2});
        mk.bindPopup(`<div class="popup-hub"><h4>🌱 ${o.name_hi}</h4><div class="popup-row"><span class="popup-label">किसान</span><span class="popup-value">${o.farmers}</span></div><div class="popup-row"><span class="popup-label">क्षेत्र</span><span class="popup-value">${o.area_ha} हेक्टेयर</span></div><div class="popup-row"><span class="popup-label">उत्पाद</span><span class="popup-value">${o.products}</span></div><div class="popup-row"><span class="popup-label">प्रमाणन</span><span class="popup-value">${o.certified?'✅ Certified':'⏳ In Process'}</span></div><div class="popup-row"><span class="popup-label">योजना</span><span class="popup-value">${o.scheme}</span></div></div>`);
        g.addLayer(mk);
    });
    return g;
}

function createProtectedAgriLayer() {
    const g = L.layerGroup();
    const typeEmoji = {polyhouse:'🏗️',nethouse:'🕸️',greenhouse:'🏡',low_tunnel:'◻️'};
    PROTECTED_AGRI.forEach(p => {
        const em = typeEmoji[p.type]||'🏗️';
        const icon = L.divIcon({className:'poly-icon',html:`<div style="background:rgba(108,92,231,0.2);color:#a29bfe;border:1px solid #a29bfe;border-radius:6px;padding:3px 8px;font-size:11px;white-space:nowrap">${em} ${p.units} units</div>`,iconSize:null});
        const mk = L.marker([p.lat,p.lng],{icon});
        mk.bindPopup(`<div class="popup-hub"><h4>${em} ${p.name_hi}</h4><div class="popup-row"><span class="popup-label">Units</span><span class="popup-value">${p.units}</span></div><div class="popup-row"><span class="popup-label">कुल क्षेत्र</span><span class="popup-value">${p.totalArea_sqm.toLocaleString()} m²</span></div><div class="popup-row"><span class="popup-label">फसलें</span><span class="popup-value">${p.crops}</span></div><div class="popup-row"><span class="popup-label">योजना</span><span class="popup-value">${p.scheme}</span></div><div class="popup-row"><span class="popup-label">निवेश</span><span class="popup-value">${p.investment}</span></div></div>`);
        g.addLayer(mk);
    });
    return g;
}

function createFPOSHGLayer() {
    const g = L.layerGroup();
    FPO_SHG.forEach(f => {
        const color = f.type==='fpo'?'#fdcb6e':'#fd79a8';
        const emoji = f.type==='fpo'?'🏢':'👩‍🌾';
        const mk = L.circleMarker([f.lat,f.lng],{radius:8,fillColor:color,fillOpacity:0.7,color:'#fff',weight:2});
        mk.bindPopup(`<div class="popup-hub"><h4>${emoji} ${f.name_hi}</h4><div class="popup-row"><span class="popup-label">सदस्य</span><span class="popup-value">${f.members}</span></div><div class="popup-row"><span class="popup-label">उत्पाद</span><span class="popup-value">${f.products}</span></div><div class="popup-row"><span class="popup-label">टर्नओवर</span><span class="popup-value">${f.turnover}</span></div></div>`);
        g.addLayer(mk);
    });
    return g;
}

function createPMKSYLayer() {
    const g = L.layerGroup();
    const typeEmoji = {drip:'💧',sprinkler:'🌊',spring_revival:'⛲',chaal_khaal:'🏞️',check_dam:'🌊',lift:'⬆️'};
    const statusColor = {completed:'#00d98b',ongoing:'#f7971e'};
    PMKSY_SITES.forEach(s => {
        const em = typeEmoji[s.type]||'💧';
        const c = statusColor[s.status]||'#4facfe';
        const mk = L.circleMarker([s.lat,s.lng],{radius:7,fillColor:c,fillOpacity:0.7,color:'#fff',weight:1.5});
        mk.bindPopup(`<div class="popup-hub"><h4>${em} ${s.name_hi}</h4><div class="popup-row"><span class="popup-label">प्रकार</span><span class="popup-value">${s.type.replace(/_/g,' ')}</span></div><div class="popup-row"><span class="popup-label">क्षेत्र</span><span class="popup-value">${s.area_ha} हेक्टेयर</span></div><div class="popup-row"><span class="popup-label">लाभार्थी</span><span class="popup-value">${s.beneficiaries}</span></div><div class="popup-row"><span class="popup-label">स्थिति</span><span class="popup-value" style="color:${c}">${s.status==='completed'?'पूर्ण':'चालू'}</span></div><div class="popup-row"><span class="popup-label">योजना</span><span class="popup-value">${s.scheme}</span></div></div>`);
        g.addLayer(mk);
    });
    return g;
}

function createMAPSLayer() {
    const g = L.layerGroup();
    MAPS_ZONES.forEach(m => {
        const mk = L.circleMarker([m.lat,m.lng],{radius:12,fillColor:m.color,fillOpacity:0.5,color:'#fff',weight:2});
        mk.bindPopup(`<div class="popup-hub"><h4>🌿 ${m.name_hi}</h4><div class="popup-row"><span class="popup-label">ऊंचाई</span><span class="popup-value">${m.altitude}</span></div><div class="popup-row"><span class="popup-label">पौधे</span><span class="popup-value">${m.plants}</span></div><div class="popup-row"><span class="popup-label">क्षेत्र</span><span class="popup-value">${m.area_ha} हेक्टेयर</span></div><div class="popup-row"><span class="popup-label">संग्रहकर्ता</span><span class="popup-value">${m.collectors}</span></div><div class="popup-row"><span class="popup-label">आय</span><span class="popup-value">${m.revenue}</span></div><div class="popup-row"><span class="popup-label">योजना</span><span class="popup-value">${m.scheme}</span></div></div>`);
        g.addLayer(mk);
    });
    return g;
}

function getAgriStatsByDistrict(districtId) {
    const filter = (arr, key) => districtId==='all' ? arr : arr.filter(a=>a.district===districtId);
    const hb = filter(HORTICULTURE_BELTS,'district');
    const oc = filter(ORGANIC_CLUSTERS,'district');
    const fp = filter(FPO_SHG,'district');
    const pa = filter(PROTECTED_AGRI,'district');
    const cs = filter(COLD_STORAGE,'district');
    const mn = filter(MANDI_LOCATIONS,'district');
    return {
        hortBelts: hb.length, organicFarmers: oc.reduce((s,o)=>s+o.farmers,0),
        organicArea: oc.reduce((s,o)=>s+o.area_ha,0), fpoCount: fp.filter(f=>f.type==='fpo').length,
        shgCount: fp.filter(f=>f.type==='shg').length, totalFPOMembers: fp.reduce((s,f)=>s+f.members,0),
        polyhouseUnits: pa.reduce((s,p)=>s+p.units,0), coldStorageCount: cs.length,
        mandiCount: mn.length
    };
}
