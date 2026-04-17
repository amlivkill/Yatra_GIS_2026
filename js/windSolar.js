/**
 * windSolar.js — Wind & Solar Potential Layers for Uttarakhand
 * Data based on Global Wind Atlas, Global Solar Atlas, and UREDA published reports
 */

// Wind potential zones — based on Global Wind Atlas data for Uttarakhand
// Wind speed at 100m hub height
const WIND_ZONES = [
    {
        id: "w1",
        name: "Chamoli Ridge Corridor",
        name_hi: "चमोली रिज कॉरिडोर",
        district: "chamoli",
        windSpeed: 7.2,
        powerDensity: 420,
        elevation: 3200,
        rating: "excellent",
        coords: [[79.20, 30.70], [79.40, 30.72], [79.55, 30.65], [79.50, 30.55], [79.30, 30.52], [79.20, 30.60], [79.20, 30.70]]
    },
    {
        id: "w2",
        name: "Uttarkashi High Altitude Wind Zone",
        name_hi: "उत्तरकाशी उच्च ऊंचाई पवन क्षेत्र",
        district: "uttarkashi",
        windSpeed: 6.8,
        powerDensity: 380,
        elevation: 3500,
        rating: "high",
        coords: [[78.20, 31.15], [78.50, 31.20], [78.65, 31.10], [78.50, 31.00], [78.25, 31.02], [78.20, 31.15]]
    },
    {
        id: "w3",
        name: "Pithoragarh Border Ridge",
        name_hi: "पिथौरागढ़ सीमा रिज",
        district: "pithoragarh",
        windSpeed: 6.5,
        powerDensity: 350,
        elevation: 3800,
        rating: "high",
        coords: [[80.10, 30.35], [80.25, 30.30], [80.30, 30.15], [80.15, 30.05], [80.00, 30.10], [79.95, 30.25], [80.10, 30.35]]
    },
    {
        id: "w4",
        name: "Tehri Dam Wind Funnel",
        name_hi: "टिहरी डैम पवन सुरंग",
        district: "tehri",
        windSpeed: 5.5,
        powerDensity: 250,
        elevation: 1800,
        rating: "medium",
        coords: [[78.35, 30.75], [78.50, 30.78], [78.55, 30.70], [78.45, 30.62], [78.30, 30.65], [78.35, 30.75]]
    },
    {
        id: "w5",
        name: "Bageshwar Pass Corridor",
        name_hi: "बागेश्वर दर्रा कॉरिडोर",
        district: "bageshwar",
        windSpeed: 5.8,
        powerDensity: 280,
        elevation: 2800,
        rating: "medium",
        coords: [[79.55, 30.30], [79.70, 30.32], [79.80, 30.22], [79.70, 30.12], [79.55, 30.15], [79.50, 30.22], [79.55, 30.30]]
    },
    {
        id: "w6",
        name: "Rudraprayag Valley Accelerator",
        name_hi: "रुद्रप्रयाग घाटी त्वरक",
        district: "rudraprayag",
        windSpeed: 4.8,
        powerDensity: 200,
        elevation: 1600,
        rating: "medium",
        coords: [[78.90, 30.50], [79.05, 30.55], [79.15, 30.48], [79.10, 30.40], [78.95, 30.38], [78.90, 30.50]]
    },
    {
        id: "w7",
        name: "Almora Hill Ridge",
        name_hi: "अल्मोड़ा पहाड़ी रिज",
        district: "almora",
        windSpeed: 4.5,
        powerDensity: 180,
        elevation: 2200,
        rating: "low",
        coords: [[79.40, 29.80], [79.55, 29.82], [79.60, 29.72], [79.50, 29.65], [79.35, 29.68], [79.40, 29.80]]
    },
    {
        id: "w8",
        name: "Pauri Garhwal Wind Belt",
        name_hi: "पौड़ी गढ़वाल पवन पट्टी",
        district: "pauri",
        windSpeed: 4.2,
        powerDensity: 160,
        elevation: 1800,
        rating: "low",
        coords: [[78.50, 30.25], [78.70, 30.28], [78.80, 30.18], [78.65, 30.08], [78.48, 30.12], [78.50, 30.25]]
    }
];

// Solar irradiance zones — based on Global Solar Atlas GHI data
// GHI in kWh/m²/day annual average
const SOLAR_ZONES = [
    {
        id: "s1",
        name: "Dehradun Valley Solar Belt",
        name_hi: "देहरादून घाटी सौर पट्टी",
        district: "dehradun",
        ghi: 5.2,
        dni: 4.8,
        rating: "excellent",
        coords: [[77.70, 30.50], [77.95, 30.55], [78.10, 30.45], [78.05, 30.30], [77.85, 30.25], [77.65, 30.35], [77.70, 30.50]]
    },
    {
        id: "s2",
        name: "Haridwar Plains Solar Zone",
        name_hi: "हरिद्वार मैदानी सौर क्षेत्र",
        district: "haridwar",
        ghi: 5.4,
        dni: 5.0,
        rating: "excellent",
        coords: [[77.70, 30.00], [77.90, 30.02], [78.00, 29.90], [77.90, 29.78], [77.65, 29.82], [77.60, 29.92], [77.70, 30.00]]
    },
    {
        id: "s3",
        name: "Udham Singh Nagar Solar Hub",
        name_hi: "ऊधम सिंह नगर सौर हब",
        district: "udhamsingh",
        ghi: 5.5,
        dni: 5.1,
        rating: "excellent",
        coords: [[78.70, 29.20], [79.00, 29.22], [79.20, 29.10], [79.15, 28.95], [78.90, 28.90], [78.70, 29.00], [78.70, 29.20]]
    },
    {
        id: "s4",
        name: "Nainital Lake Region Solar",
        name_hi: "नैनीताल झील क्षेत्र सौर",
        district: "nainital",
        ghi: 4.8,
        dni: 4.4,
        rating: "high",
        coords: [[79.00, 29.50], [79.20, 29.52], [79.30, 29.40], [79.25, 29.25], [79.05, 29.20], [78.90, 29.30], [79.00, 29.50]]
    },
    {
        id: "s5",
        name: "Champawat Solar Corridor",
        name_hi: "चम्पावत सौर कॉरिडोर",
        district: "champawat",
        ghi: 4.9,
        dni: 4.5,
        rating: "high",
        coords: [[79.75, 29.55], [79.95, 29.58], [80.05, 29.45], [79.95, 29.35], [79.75, 29.38], [79.70, 29.48], [79.75, 29.55]]
    },
    {
        id: "s6",
        name: "Almora Mid-Hill Solar",
        name_hi: "अल्मोड़ा मध्य-पहाड़ी सौर",
        district: "almora",
        ghi: 4.7,
        dni: 4.3,
        rating: "high",
        coords: [[79.25, 29.80], [79.45, 29.82], [79.55, 29.70], [79.45, 29.58], [79.25, 29.60], [79.15, 29.70], [79.25, 29.80]]
    },
    {
        id: "s7",
        name: "Pauri South-Facing Slopes",
        name_hi: "पौड़ी दक्षिणमुखी ढलान",
        district: "pauri",
        ghi: 4.6,
        dni: 4.2,
        rating: "medium",
        coords: [[78.40, 30.15], [78.60, 30.18], [78.75, 30.08], [78.65, 29.95], [78.45, 29.98], [78.40, 30.15]]
    },
    {
        id: "s8",
        name: "Tehri Reservoir Solar",
        name_hi: "टिहरी जलाशय सौर",
        district: "tehri",
        ghi: 4.5,
        dni: 4.1,
        rating: "medium",
        coords: [[78.20, 30.60], [78.40, 30.62], [78.50, 30.55], [78.40, 30.48], [78.22, 30.50], [78.20, 30.60]]
    },
    {
        id: "s9",
        name: "Uttarkashi Valley Solar",
        name_hi: "उत्तरकाशी घाटी सौर",
        district: "uttarkashi",
        ghi: 4.3,
        dni: 4.0,
        rating: "medium",
        coords: [[78.30, 31.05], [78.50, 31.08], [78.60, 30.98], [78.45, 30.92], [78.30, 30.95], [78.30, 31.05]]
    },
    {
        id: "s10",
        name: "Bageshwar Valley Solar",
        name_hi: "बागेश्वर घाटी सौर",
        district: "bageshwar",
        ghi: 4.4,
        dni: 4.0,
        rating: "medium",
        coords: [[79.50, 30.15], [79.65, 30.18], [79.75, 30.10], [79.65, 30.00], [79.50, 30.02], [79.50, 30.15]]
    },
    {
        id: "s11",
        name: "Rudraprayag Valley Solar",
        name_hi: "रुद्रप्रयाग घाटी सौर",
        district: "rudraprayag",
        ghi: 4.2,
        dni: 3.8,
        rating: "low",
        coords: [[78.92, 30.45], [79.08, 30.48], [79.15, 30.42], [79.05, 30.38], [78.92, 30.40], [78.92, 30.45]]
    },
    {
        id: "s12",
        name: "Chamoli High Valley Solar",
        name_hi: "चमोली ऊपरी घाटी सौर",
        district: "chamoli",
        ghi: 4.6,
        dni: 4.5,
        rating: "medium",
        coords: [[79.25, 30.55], [79.45, 30.58], [79.55, 30.48], [79.40, 30.40], [79.25, 30.42], [79.25, 30.55]]
    },
    {
        id: "s13",
        name: "Pithoragarh Valley Solar",
        name_hi: "पिथौरागढ़ घाटी सौर",
        district: "pithoragarh",
        ghi: 4.5,
        dni: 4.1,
        rating: "medium",
        coords: [[79.90, 30.10], [80.10, 30.12], [80.18, 30.00], [80.05, 29.85], [79.90, 29.90], [79.85, 30.00], [79.90, 30.10]]
    }
];

// Color scales
const WIND_COLORS = {
    low:       { fill: '#4a90d9', border: '#3a70b9', opacity: 0.25 },
    medium:    { fill: '#45b7d1', border: '#35a7c1', opacity: 0.30 },
    high:      { fill: '#26de81', border: '#16ce71', opacity: 0.35 },
    excellent: { fill: '#fed330', border: '#eed320', opacity: 0.40 }
};

const SOLAR_COLORS = {
    low:       { fill: '#ffa502', border: '#ef9502', opacity: 0.20 },
    medium:    { fill: '#ff7f50', border: '#ef6f40', opacity: 0.25 },
    high:      { fill: '#ff6348', border: '#ef5338', opacity: 0.30 },
    excellent: { fill: '#ff4757', border: '#ef3747', opacity: 0.35 }
};

/**
 * Create wind potential layer group
 */
function createWindLayer() {
    const group = L.layerGroup();
    
    WIND_ZONES.forEach(zone => {
        const style = WIND_COLORS[zone.rating];
        const latlngs = zone.coords.map(c => [c[1], c[0]]);
        
        const polygon = L.polygon(latlngs, {
            fillColor: style.fill,
            fillOpacity: style.opacity,
            color: style.border,
            weight: 2,
            dashArray: '5,5'
        });
        
        polygon.bindPopup(`
            <div class="popup-hub">
                <h4>💨 ${zone.name_hi}</h4>
                <p style="font-size:11px;color:#8b95a8;margin-bottom:8px">${zone.name}</p>
                <div class="popup-row">
                    <span class="popup-label">हवा की गति (100m)</span>
                    <span class="popup-value">${zone.windSpeed} m/s</span>
                </div>
                <div class="popup-row">
                    <span class="popup-label">Power Density</span>
                    <span class="popup-value">${zone.powerDensity} W/m²</span>
                </div>
                <div class="popup-row">
                    <span class="popup-label">ऊंचाई</span>
                    <span class="popup-value">${zone.elevation}m</span>
                </div>
                <div class="popup-row">
                    <span class="popup-label">Rating</span>
                    <span class="popup-value" style="color:${style.fill}">${zone.rating.toUpperCase()}</span>
                </div>
                <div class="popup-row">
                    <span class="popup-label">UREDA Scheme</span>
                    <span class="popup-value">Hybrid Solar Power Plant</span>
                </div>
            </div>
        `);
        
        group.addLayer(polygon);
    });
    
    return group;
}

/**
 * Create solar irradiance layer group
 */
function createSolarLayer() {
    const group = L.layerGroup();
    
    SOLAR_ZONES.forEach(zone => {
        const style = SOLAR_COLORS[zone.rating];
        const latlngs = zone.coords.map(c => [c[1], c[0]]);
        
        const polygon = L.polygon(latlngs, {
            fillColor: style.fill,
            fillOpacity: style.opacity,
            color: style.border,
            weight: 1.5,
            dashArray: ''
        });
        
        polygon.bindPopup(`
            <div class="popup-hub">
                <h4>☀️ ${zone.name_hi}</h4>
                <p style="font-size:11px;color:#8b95a8;margin-bottom:8px">${zone.name}</p>
                <div class="popup-row">
                    <span class="popup-label">GHI (वार्षिक औसत)</span>
                    <span class="popup-value">${zone.ghi} kWh/m²/day</span>
                </div>
                <div class="popup-row">
                    <span class="popup-label">DNI</span>
                    <span class="popup-value">${zone.dni} kWh/m²/day</span>
                </div>
                <div class="popup-row">
                    <span class="popup-label">Rating</span>
                    <span class="popup-value" style="color:${style.fill}">${zone.rating.toUpperCase()}</span>
                </div>
                <div class="popup-row">
                    <span class="popup-label">UREDA Scheme</span>
                    <span class="popup-value">PM Surya Ghar / MSSY</span>
                </div>
                <div class="popup-row">
                    <span class="popup-label">Recommended</span>
                    <span class="popup-value">${zone.ghi >= 5.0 ? 'Grid-scale + Rooftop' : zone.ghi >= 4.5 ? 'Off-grid + Rooftop' : 'Off-grid Solar'}</span>
                </div>
            </div>
        `);
        
        group.addLayer(polygon);
    });
    
    return group;
}

/**
 * Get wind/solar data filtered by district
 */
function getWindDataByDistrict(districtId) {
    if (districtId === 'all') return WIND_ZONES;
    return WIND_ZONES.filter(z => z.district === districtId);
}

function getSolarDataByDistrict(districtId) {
    if (districtId === 'all') return SOLAR_ZONES;
    return SOLAR_ZONES.filter(z => z.district === districtId);
}

/**
 * Calculate district-level aggregated potential
 */
function getDistrictPotential(districtId) {
    const windData = getWindDataByDistrict(districtId);
    const solarData = getSolarDataByDistrict(districtId);
    
    const avgWind = windData.length > 0 
        ? (windData.reduce((s, z) => s + z.windSpeed, 0) / windData.length).toFixed(1) 
        : 0;
    const avgSolar = solarData.length > 0 
        ? (solarData.reduce((s, z) => s + z.ghi, 0) / solarData.length).toFixed(1) 
        : 0;
    
    // Simplified capacity estimates based on zone ratings
    const windCapacity = windData.reduce((s, z) => {
        const cap = { low: 2, medium: 5, high: 12, excellent: 25 };
        return s + (cap[z.rating] || 0);
    }, 0);
    
    const solarCapacity = solarData.reduce((s, z) => {
        const cap = { low: 8, medium: 15, high: 25, excellent: 40 };
        return s + (cap[z.rating] || 0);
    }, 0);
    
    return {
        avgWindSpeed: avgWind,
        avgGHI: avgSolar,
        windCapacityMW: windCapacity,
        solarCapacityMW: solarCapacity,
        totalCapacityMW: windCapacity + solarCapacity,
        windZones: windData.length,
        solarZones: solarData.length
    };
}
