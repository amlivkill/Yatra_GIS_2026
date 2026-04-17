/**
 * app.js — Main Application Controller
 * Uttarakhand Decentralized RE Hub GIS
 * Built by CHANGE TechLab
 */

(function() {
    'use strict';

    // --- Map Initialization ---
    const map = L.map('map', {
        center: [30.0668, 79.0193],
        zoom: 7,
        zoomControl: true,
        attributionControl: true,
        minZoom: 6,
        maxZoom: 16
    });

    // Base Layers
    const osmDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap · CartoDB Dark',
        subdomains: 'abcd', maxZoom: 19
    });

    const osmStandard = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    });

    const topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenTopoMap (CC-BY-SA)',
        maxZoom: 17
    });

    // Set dark as default
    osmDark.addTo(map);

    // Base layer control
    const baseLayers = {
        '🌑 Dark Map': osmDark,
        '🗺️ Standard Map': osmStandard,
        '⛰️ Topo Map': topoMap
    };

    L.control.layers(baseLayers, null, { position: 'topright', collapsed: true }).addTo(map);

    // --- District Boundaries Layer ---
    let districtLayer = null;
    let selectedDistrict = 'all';

    function renderDistricts(filterDistrictId) {
        if (districtLayer) map.removeLayer(districtLayer);

        districtLayer = L.geoJSON(UTTARAKHAND_DISTRICTS, {
            filter: function(feature) {
                if (filterDistrictId === 'all') return true;
                return feature.properties.id === filterDistrictId;
            },
            style: function(feature) {
                const isSelected = filterDistrictId !== 'all' && feature.properties.id === filterDistrictId;
                return {
                    color: feature.properties.color,
                    weight: isSelected ? DISTRICT_STYLES.selected.weight : DISTRICT_STYLES.default.weight,
                    opacity: DISTRICT_STYLES.default.opacity,
                    fillColor: feature.properties.color,
                    fillOpacity: isSelected ? DISTRICT_STYLES.selected.fillOpacity : DISTRICT_STYLES.default.fillOpacity,
                    dashArray: DISTRICT_STYLES.default.dashArray
                };
            },
            onEachFeature: function(feature, layer) {
                const p = feature.properties;
                layer.bindTooltip(`<strong>${p.name_hi}</strong><br>${p.name_en}`, {
                    permanent: false, direction: 'center',
                    className: 'district-tooltip'
                });

                layer.on('mouseover', function(e) {
                    if (selectedDistrict === 'all') {
                        e.target.setStyle({ fillOpacity: DISTRICT_STYLES.hover.fillOpacity, weight: DISTRICT_STYLES.hover.weight });
                    }
                });
                layer.on('mouseout', function(e) {
                    if (selectedDistrict === 'all') {
                        districtLayer.resetStyle(e.target);
                    }
                });
                layer.on('click', function() {
                    document.getElementById('district-select').value = p.id;
                    selectDistrict(p.id);
                });

                layer.bindPopup(`
                    <div class="popup-hub">
                        <h4>${p.name_hi} — ${p.name_en}</h4>
                        <div class="popup-row"><span class="popup-label">मुख्यालय</span><span class="popup-value">${p.hq}</span></div>
                        <div class="popup-row"><span class="popup-label">क्षेत्रफल</span><span class="popup-value">${p.area_km2.toLocaleString()} km²</span></div>
                        <div class="popup-row"><span class="popup-label">जनसंख्या</span><span class="popup-value">${p.population.toLocaleString()}</span></div>
                        <div class="popup-row"><span class="popup-label">ऊंचाई</span><span class="popup-value">${p.elevation_range}</span></div>
                    </div>
                `);
            }
        }).addTo(map);
    }

    // --- Overlay Layers ---
    let windLayer, solarLayer, microgridLayer, servicesLayer;
    let floodLayer, landslideLayer, pmgsyLayer, jjmLayer;
    // Agriculture layers
    let horticultureLayer, cropZoneLayer, mandiLayer, coldStorageLayer;
    let organicLayer, polyhouseLayer, fpoLayer, pmksyLayer, mapsLayer;
    // Forest layers
    let forestCoverLayer, pineForestLayer, treeSpeciesLayer, protectedForestLayer;
    let fireRiskLayer, vanPanchayatLayer, pineEnergyLayer;

    function initLayers() {
        windLayer = createWindLayer();
        solarLayer = createSolarLayer();
        microgridLayer = createMicrogridLayer();
        servicesLayer = createServicesLayer();
        floodLayer = createFloodRiskLayer();
        landslideLayer = createLandslideRiskLayer();
        pmgsyLayer = createPMGSYLayer();
        jjmLayer = createJJMLayer();
        // Agriculture layers
        horticultureLayer = createHorticultureBeltLayer();
        cropZoneLayer = createCropZoneLayer();
        mandiLayer = createMandiLayer();
        coldStorageLayer = createColdStorageLayer();
        organicLayer = createOrganicLayer();
        polyhouseLayer = createProtectedAgriLayer();
        fpoLayer = createFPOSHGLayer();
        pmksyLayer = createPMKSYLayer();
        mapsLayer = createMAPSLayer();
        // Forest layers
        forestCoverLayer = createForestCoverLayer();
        pineForestLayer = createPineForestLayer();
        treeSpeciesLayer = createTreeSpeciesLayer();
        protectedForestLayer = createProtectedForestLayer();
        fireRiskLayer = createFireRiskLayer();
        vanPanchayatLayer = createVanPanchayatLayer();
        pineEnergyLayer = createPineEnergyLayer();

        // Default visible layers
        windLayer.addTo(map);
        solarLayer.addTo(map);
        microgridLayer.addTo(map);
    }

    // --- Layer Toggle Controls ---
    function setupLayerToggles() {
        const toggles = {
            'layer-wind': () => toggleLayer(windLayer, 'layer-wind'),
            'layer-solar': () => toggleLayer(solarLayer, 'layer-solar'),
            'layer-microgrid': () => toggleLayer(microgridLayer, 'layer-microgrid'),
            'layer-services': () => toggleLayer(servicesLayer, 'layer-services'),
            'layer-flood': () => toggleLayer(floodLayer, 'layer-flood'),
            'layer-landslide': () => toggleLayer(landslideLayer, 'layer-landslide'),
            'layer-pmgsy': () => toggleLayer(pmgsyLayer, 'layer-pmgsy'),
            'layer-jjm': () => toggleLayer(jjmLayer, 'layer-jjm'),
            // Agriculture
            'layer-horticulture': () => toggleLayer(horticultureLayer, 'layer-horticulture'),
            'layer-cropzone': () => toggleLayer(cropZoneLayer, 'layer-cropzone'),
            'layer-mandi': () => toggleLayer(mandiLayer, 'layer-mandi'),
            'layer-coldstorage': () => toggleLayer(coldStorageLayer, 'layer-coldstorage'),
            'layer-organic': () => toggleLayer(organicLayer, 'layer-organic'),
            'layer-polyhouse': () => toggleLayer(polyhouseLayer, 'layer-polyhouse'),
            'layer-fpo': () => toggleLayer(fpoLayer, 'layer-fpo'),
            'layer-pmksy': () => toggleLayer(pmksyLayer, 'layer-pmksy'),
            'layer-maps': () => toggleLayer(mapsLayer, 'layer-maps'),
            // Forest
            'layer-forestcover': () => toggleLayer(forestCoverLayer, 'layer-forestcover'),
            'layer-pine': () => toggleLayer(pineForestLayer, 'layer-pine'),
            'layer-treespecies': () => toggleLayer(treeSpeciesLayer, 'layer-treespecies'),
            'layer-protected': () => toggleLayer(protectedForestLayer, 'layer-protected'),
            'layer-firerisk': () => toggleLayer(fireRiskLayer, 'layer-firerisk'),
            'layer-vanpanchayat': () => toggleLayer(vanPanchayatLayer, 'layer-vanpanchayat'),
            'layer-pineenergy': () => toggleLayer(pineEnergyLayer, 'layer-pineenergy')
        };

        Object.keys(toggles).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', toggles[id]);
        });
    }

    function toggleLayer(layer, checkboxId) {
        const cb = document.getElementById(checkboxId);
        if (!layer || !cb) return;
        if (cb.checked) { map.addLayer(layer); }
        else { map.removeLayer(layer); }
    }

    // --- District Selection ---
    function selectDistrict(districtId) {
        selectedDistrict = districtId;
        const center = DISTRICT_CENTERS[districtId];
        if (center) {
            map.flyTo([center.lat, center.lng], center.zoom, { duration: 1.2 });
        }
        renderDistricts(districtId);
        updateDashboardStats(districtId);
        updateAgriStats(districtId);
        updateForestStats(districtId);
    }

    // --- Agriculture Stats & Crop Calendar ---
    function updateAgriStats(districtId) {
        if (typeof getAgriStatsByDistrict !== 'function') return;
        const s = getAgriStatsByDistrict(districtId);
        document.getElementById('stat-organic-farmers').textContent = s.organicFarmers.toLocaleString();
        document.getElementById('stat-fpo-count').textContent = s.fpoCount + s.shgCount;
        document.getElementById('stat-polyhouse').textContent = s.polyhouseUnits;
        document.getElementById('stat-cold').textContent = s.coldStorageCount;
    }

    function renderCropCalendar() {
        if (typeof CROP_CALENDAR === 'undefined') return;
        const container = document.getElementById('crop-calendar');
        if (!container) return;
        const seasons = [CROP_CALENDAR.kharif, CROP_CALENDAR.rabi, CROP_CALENDAR.zaid];
        container.innerHTML = seasons.map(s => `
            <div class="crop-season">
                <div class="crop-season-header">${s.season}</div>
                ${s.crops.map(c => `
                    <div class="crop-row">
                        <span class="crop-name">${c.name}</span>
                        <span class="crop-time">${c.sowing} → ${c.harvest}</span>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }

    // --- Forest Stats ---
    function updateForestStats(districtId) {
        if (typeof getForestStatsByDistrict !== 'function') return;
        const s = getForestStatsByDistrict(districtId);
        document.getElementById('stat-forest-area').textContent = s.forestArea.toLocaleString();
        document.getElementById('stat-pine-yield').textContent = s.needleYield.toLocaleString();
        document.getElementById('stat-protected').textContent = s.protectedAreas;
        document.getElementById('stat-pine-energy').textContent = s.pineEnergyCapacity;
    }

    // --- Hub Detail Modal ---
    window.showHubDetail = function(hubId) {
        const hub = getHubById(hubId);
        if (!hub) return;

        const modal = document.getElementById('hub-modal');
        const body = document.getElementById('modal-body');

        const statusClass = { proposed:'active', assessment:'assessment', risk:'risk' };
        const statusLabel = { proposed:'✅ Active/Proposed', assessment:'🔍 Under Assessment', risk:'⚠️ Risk-Constrained' };
        const svcTags = hub.services.map(s => {
            const svc = SERVICE_TYPES[s];
            return svc ? `<span class="service-tag">${svc.label_hi}</span>` : '';
        }).join('');

        const totalCap = hub.windCapacity + hub.solarCapacity;
        const windPct = Math.round((hub.windCapacity / totalCap) * 100);
        const solarPct = 100 - windPct;

        body.innerHTML = `
            <div class="hub-detail-header">
                <div>
                    <h2 style="font-family:var(--font-display);font-size:20px;font-weight:700;color:var(--text-primary)">${hub.name_hi}</h2>
                    <p style="font-size:13px;color:var(--text-secondary);margin-top:2px">${hub.name}</p>
                </div>
                <span class="hub-status-badge ${statusClass[hub.status]}">${statusLabel[hub.status]}</span>
            </div>
            <div class="hub-detail-grid">
                <div class="hub-detail-item"><div class="label">WIND CAPACITY</div><div class="value">${hub.windCapacity} <span class="unit">kW</span></div></div>
                <div class="hub-detail-item"><div class="label">SOLAR CAPACITY</div><div class="value">${hub.solarCapacity} <span class="unit">kW</span></div></div>
                <div class="hub-detail-item"><div class="label">BATTERY STORAGE</div><div class="value">${hub.batteryStorage} <span class="unit">kWh</span></div></div>
                <div class="hub-detail-item"><div class="label">HOUSEHOLDS</div><div class="value">${hub.householdsServed}</div></div>
                <div class="hub-detail-item"><div class="label">ELEVATION</div><div class="value">${hub.elevation} <span class="unit">m</span></div></div>
                <div class="hub-detail-item"><div class="label">ANNUAL SAVINGS</div><div class="value">₹${(hub.annualSavings/100000).toFixed(1)} <span class="unit">Lakh</span></div></div>
            </div>
            <div style="margin-bottom:16px">
                <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">ENERGY MIX</div>
                <div style="display:flex;height:8px;border-radius:4px;overflow:hidden;background:rgba(255,255,255,0.05)">
                    <div style="width:${windPct}%;background:var(--accent-primary)"></div>
                    <div style="width:${solarPct}%;background:var(--accent-warm)"></div>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-secondary);margin-top:4px">
                    <span>💨 Wind ${windPct}%</span><span>☀️ Solar ${solarPct}%</span>
                </div>
            </div>
            <div class="hub-services"><h4>Connected Services</h4><div class="service-tags">${svcTags}</div></div>
            <div style="background:var(--bg-glass);border:1px solid var(--border-glass);border-radius:var(--radius-sm);padding:12px;margin-top:12px">
                <p style="font-size:12px;color:var(--text-secondary);line-height:1.6">📝 ${hub.description}</p>
                <p style="font-size:11px;color:var(--accent-primary);margin-top:8px">🔌 Grid Connected: ${hub.gridConnected ? 'हां (Yes)' : 'नहीं (Off-Grid)'}</p>
            </div>
        `;

        modal.classList.remove('hidden');
    };

    // --- Chat System ---
    function setupChat() {
        const chatBtn = document.getElementById('btn-chat');
        const chatClose = document.getElementById('chat-close');
        const chatPanel = document.getElementById('chat-panel');
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');
        const chatMessages = document.getElementById('chat-messages');

        chatBtn.addEventListener('click', () => chatPanel.classList.toggle('hidden'));
        chatClose.addEventListener('click', () => chatPanel.classList.add('hidden'));

        function sendMessage() {
            const text = chatInput.value.trim();
            if (!text) return;

            addChatMsg('user', text);
            chatInput.value = '';

            setTimeout(() => {
                const response = processQuery(text);
                addChatMsg('bot', response);
            }, 500);
        }

        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

        function addChatMsg(type, content) {
            const div = document.createElement('div');
            div.className = `chat-msg ${type}`;
            div.innerHTML = `<div class="msg-content">${content}</div>`;
            chatMessages.appendChild(div);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function processQuery(query) {
        const q = query.toLowerCase();

        // District detection
        const districts = {
            'dehradun':'dehradun','देहरादून':'dehradun','haridwar':'haridwar','हरिद्वार':'haridwar',
            'pauri':'pauri','पौड़ी':'pauri','tehri':'tehri','टिहरी':'tehri',
            'uttarkashi':'uttarkashi','उत्तरकाशी':'uttarkashi','chamoli':'chamoli','चमोली':'chamoli',
            'rudraprayag':'rudraprayag','रुद्रप्रयाग':'rudraprayag','almora':'almora','अल्मोड़ा':'almora',
            'nainital':'nainital','नैनीताल':'nainital','champawat':'champawat','चम्पावत':'champawat',
            'bageshwar':'bageshwar','बागेश्वर':'bageshwar','pithoragarh':'pithoragarh','पिथौरागढ़':'pithoragarh',
            'udham':'udhamsingh','ऊधम':'udhamsingh'
        };

        let detectedDistrict = null;
        for (const [key, val] of Object.entries(districts)) {
            if (q.includes(key)) { detectedDistrict = val; break; }
        }

        if (detectedDistrict) {
            document.getElementById('district-select').value = detectedDistrict;
            selectDistrict(detectedDistrict);
            const p = getDistrictPotential(detectedDistrict);
            const hubs = getHubsByDistrict(detectedDistrict);
            const dName = DISTRICT_CENTERS[detectedDistrict] ? detectedDistrict : 'all';
            return `🏔️ <strong>${detectedDistrict.charAt(0).toUpperCase()+detectedDistrict.slice(1)}</strong> जिले का map filter कर दिया है!<br><br>` +
                `💨 Wind Potential: <strong>${p.windCapacityMW} MW</strong><br>` +
                `☀️ Solar Potential: <strong>${p.solarCapacityMW} MW</strong><br>` +
                `🔋 Microgrid Hubs: <strong>${hubs.length}</strong><br><br>` +
                `👉 Hub markers पर click करके details देखें।`;
        }

        // Topic detection
        if (q.includes('wind') || q.includes('हवा') || q.includes('पवन')) {
            return `💨 <strong>Wind Energy — Uttarakhand</strong><br><br>` +
                `Uttarakhand mein high-altitude ridgelines (3000m+) par best wind potential hai:<br>` +
                `• Chamoli Ridge: 7.2 m/s (Excellent)<br>• Uttarkashi: 6.8 m/s (High)<br>• Pithoragarh: 6.5 m/s (High)<br><br>` +
                `🌐 Global Wind Atlas (free tool) se apne area ka data check karein: globalwindatlas.info<br><br>` +
                `👉 Map par 💨 Wind Potential layer ON karein detailed zones dekhne ke liye।`;
        }

        if (q.includes('solar') || q.includes('सौर') || q.includes('dhoop') || q.includes('सूरज')) {
            return `☀️ <strong>Solar Energy — Uttarakhand</strong><br><br>` +
                `Plains aur south-facing slopes par best solar potential:<br>` +
                `• Udham Singh Nagar: 5.5 kWh/m²/day (Excellent)<br>• Haridwar: 5.4 (Excellent)<br>• Dehradun: 5.2 (Excellent)<br><br>` +
                `UREDA Schemes: PM Surya Ghar (₹30K-78K subsidy), Mukhyamantri Saur Swarojgar Yojana<br><br>` +
                `👉 Sidebar mein UREDA Schemes panel check karein!`;
        }

        if (q.includes('mgnrega') || q.includes('मनरेगा') || q.includes('nrega')) {
            return `👷 <strong>MGNREGA + Renewable Energy</strong><br><br>` +
                `Microgrid hub construction mein MGNREGA labour use ho sakta hai:<br>` +
                `• Solar panel mounting structure<br>• Road/path construction to hub sites<br>• Trenching for cables<br><br>` +
                `Har hub lagbhag 15-30 MGNREGA person-days create karta hai installation mein।<br><br>` +
                `👉 Kisi specific hub par click karein details ke liye!`;
        }

        if (q.includes('flood') || q.includes('बाढ़') || q.includes('landslide') || q.includes('भूस्खलन')) {
            return `⚠️ <strong>Risk Zones — Uttarakhand</strong><br><br>` +
                `🌊 Flood Risk: Alaknanda, Bhagirathi, Kali river corridors<br>` +
                `⛰️ Landslide: Joshimath, Uttarkashi, Chamoli steep slopes<br><br>` +
                `In zones mein microgrid installation mein special foundation design zaruri hai।<br><br>` +
                `👉 Map par 🌊 Flood Risk aur ⛰️ Landslide layers ON karein!`;
        }

        if (q.includes('road') || q.includes('सड़क') || q.includes('pmgsy')) {
            return `🛣️ <strong>PMGSY Roads</strong><br><br>` +
                `Rural roads microgrid site access ke liye important hain.<br>Map par PMGSY layer ON karein:<br>` +
                `• 🟢 Completed roads<br>• 🟡 Ongoing construction<br>• 🔵 Sanctioned<br><br>` +
                `👉 Road layer ON karein sidebar mein!`;
        }

        if (q.includes('water') || q.includes('पानी') || q.includes('jal') || q.includes('जल')) {
            return `💧 <strong>Jal Jeevan Mission</strong><br><br>` +
                `Har Ghar Jal — piped water supply schemes.<br>` +
                `Microgrid hubs JJM pumping stations ko bhi power de sakte hain!<br><br>` +
                `Map par 💧 JJM layer ON karein sites dekhne ke liye।`;
        }

        if (q.includes('kml') || q.includes('google earth') || q.includes('export')) {
            return `📥 <strong>KML Export</strong><br><br>` +
                `Top bar mein "KML Export" button dabayein — sabhi microgrid hub sites ka KML file download ho jayega.<br>` +
                `Ise Google Earth mein open karein 3D view ke liye!<br><br>` +
                `👉 Top bar → KML Export button`;
        }

        // --- Agriculture Queries ---
        if (q.includes('apple') || q.includes('seb') || q.includes('सेब') || q.includes('fruit') || q.includes('फल') || q.includes('horticulture') || q.includes('kiwi') || q.includes('litchi') || q.includes('malta')) {
            return `🍎 <strong>Horticulture — Uttarakhand</strong><br><br>` +
                `Uttarakhand ke major fruit belts:<br>` +
                `• 🍎 Apple: Uttarkashi, Chamoli (1800-3000m)<br>` +
                `• 🥝 Kiwi: Pithoragarh (1000-2000m)<br>` +
                `• 🍊 Malta/Citrus: Almora, Champawat (800-1500m)<br>` +
                `• 🍑 Peach/Plum: Nainital (1200-2000m)<br>` +
                `• 🐉 Dragon Fruit: Haridwar (Pilot Phase)<br><br>` +
                `👉 Agriculture Layers mein 🍎 Horticulture Belts ON karein!`;
        }

        if (q.includes('organic') || q.includes('ऑर्गेनिक') || q.includes('जैविक')) {
            return `🌱 <strong>Organic Farming — Uttarakhand</strong><br><br>` +
                `Uttarakhand India ka organic farming leader hai!<br>` +
                `• 7 certified organic clusters<br>` +
                `• 2000+ registered farmers<br>` +
                `• Products: Rajma, Mandua, Jhangora, Herbs<br><br>` +
                `Schemes: Paramparagat Krishi, PGS-India, Mission Organic UK<br><br>` +
                `👉 🌱 Organic Farming layer ON karein!`;
        }

        if (q.includes('mandi') || q.includes('मंडी') || q.includes('market') || q.includes('बाजार')) {
            return `🏪 <strong>Mandi / Markets</strong><br><br>` +
                `Uttarakhand mein 11 major mandis mapped hain:<br>` +
                `• 4 APMC Mandis (Haldwani, Rudrapur, Dehradun, Haridwar)<br>` +
                `• 7 Secondary Markets<br><br>` +
                `Cold storage + solar cold chain se farm-to-market gap kam hoga!<br><br>` +
                `👉 🏪 Mandi layer aur ❄️ Cold Storage layer ON karein!`;
        }

        if (q.includes('polyhouse') || q.includes('पॉलीहाउस') || q.includes('greenhouse') || q.includes('protected') || q.includes('nethouse')) {
            return `🏗️ <strong>Protected Agriculture</strong><br><br>` +
                `Uttarakhand mein 245+ polyhouse/greenhouse/nethouse units:<br>` +
                `• Capsicum, Tomato, Flowers, Exotic Veggies<br>` +
                `• MIDH / NHM / RKVY scheme se subsidy<br>` +
                `• Investment: ₹15L-50L per unit<br><br>` +
                `Solar microgrid se polyhouse ko 24/7 power!<br><br>` +
                `👉 🏗️ Protected Agriculture layer ON karein!`;
        }

        if (q.includes('herb') || q.includes('जड़ी') || q.includes('औषधि') || q.includes('medicinal') || q.includes('aromatic') || q.includes('lavender') || q.includes('tejpat')) {
            return `🌿 <strong>Medicinal & Aromatic Plants</strong><br><br>` +
                `Uttarakhand ke MAPS zones:<br>` +
                `• High altitude (2500m+): Jatamansi, Kutki, Atis<br>` +
                `• Mid hills: Lavender, Lemongrass, Rosemary<br>` +
                `• NMPB / AYUSH / Aroma Mission se support<br><br>` +
                `Solar dryers + processing units se value addition!<br><br>` +
                `👉 🌿 Medicinal Plants layer ON karein!`;
        }

        if (q.includes('crop') || q.includes('fasal') || q.includes('फसल') || q.includes('kheti') || q.includes('खेती') || q.includes('agriculture') || q.includes('कृषि') || q.includes('fpo') || q.includes('shg')) {
            return `🌾 <strong>Agriculture — Uttarakhand</strong><br><br>` +
                `Crop Zones by Altitude:<br>` +
                `• तराई (200-600m): Rice, Wheat, Sugarcane<br>` +
                `• निचली पहाड़ी (600-1200m): Basmati, Mandua, Vegetables<br>` +
                `• मध्य पहाड़ी (1200-2000m): Potato, Rajma, Ginger<br>` +
                `• ऊपरी पहाड़ी (2000-3500m): Apple, Walnut, Herbs<br><br>` +
                `FPO/SHG: 10 clusters, 3000+ members<br><br>` +
                `👉 🌾 Crop Suitability + 👩‍🌾 FPO layers ON karein!`;
        }

        if (q.includes('irrigation') || q.includes('सिंचाई') || q.includes('pmksy') || q.includes('sinchai') || q.includes('dhara')) {
            return `💧 <strong>PMKSY Irrigation — Uttarakhand</strong><br><br>` +
                `Pahadon mein sinchai ke special tarike:<br>` +
                `• Drip/Sprinkler: Haridwar, US Nagar, Dehradun<br>` +
                `• Spring Revival (Dhara): Nainital, Almora, Pauri<br>` +
                `• Chaal-Khaal: Traditional water harvesting<br>` +
                `• Check Dams: MGNREGA + PMKSY<br><br>` +
                `👉 💧 PMKSY Irrigation layer ON karein!`;
        }

        if (q.includes('cold') || q.includes('कोल्ड') || q.includes('storage') || q.includes('भंडारण')) {
            return `❄️ <strong>Cold Storage Infrastructure</strong><br><br>` +
                `• 4 existing large cold storages (plains)<br>` +
                `• 4 proposed solar-powered cold storages (hills)<br>` +
                `Solar microgrid + cold chain = farm income doubled!<br><br>` +
                `👉 ❄️ Cold Storage layer ON karein!`;
        }

        // --- Forest Queries ---
        if (q.includes('pine') || q.includes('चीर') || q.includes('chir') || q.includes('चीड़') || q.includes('needle')) {
            return `🌲 <strong>Chir Pine (Chīr) — Uttarakhand</strong><br><br>` +
                `Uttarakhand mein 78,000+ ha Chir Pine forests hain!<br>` +
                `• Pine needle se bioenergy: 13.5 MW potential<br>` +
                `• 18,200 MT annual pine needle yield<br>` +
                `• 5 bioenergy projects (3 operational)<br>` +
                `• Fire risk reduction + SHG livelihood!<br><br>` +
                `Aapke Pine Energy project se link: Women SHG collection + gasification<br><br>` +
                `👉 🌲 Pine Forests + ⚡🌲 Pine Energy layers ON karein!`;
        }

        if (q.includes('forest') || q.includes('वन') || q.includes('jungle') || q.includes('जंगल')) {
            return `🌳 <strong>Forest Cover — Uttarakhand</strong><br><br>` +
                `Uttarakhand ka 45%+ area forest se covered hai!<br>` +
                `• Very Dense: Chamoli, Uttarkashi, Pithoragarh<br>` +
                `• Dense: Tehri, Nainital<br>` +
                `• Moderate: Pauri, Almora, Dehradun<br><br>` +
                `8 National Parks + Wildlife Sanctuaries<br>` +
                `7,600+ Van Panchayats (community forests)<br><br>` +
                `👉 Forest & Tree Cover section mein layers ON karein!`;
        }

        if (q.includes('oak') || q.includes('बांज') || q.includes('deodar') || q.includes('देवदार') || q.includes('sal') || q.includes('साल') || q.includes('buransh') || q.includes('बुरांश') || q.includes('tree')) {
            return `🌳 <strong>Tree Species — Uttarakhand</strong><br><br>` +
                `Major tree species:<br>` +
                `• 🌿 Banj Oak (1500-2500m): Water ki lifeline — DECLINING<br>` +
                `• 🌲 Deodar (1800-3000m): Sacred timber<br>` +
                `• 🌲 Chir Pine (800-1800m): Bioenergy source<br>` +
                `• 🌳 Sal (200-1000m): NTFP + biodiversity<br>` +
                `• 🌺 Buransh (1500-3500m): State flower, juice<br>` +
                `• 🎋 Bamboo/Ringal: Handicraft + construction<br><br>` +
                `👉 🌳 Tree Species layer ON karein!`;
        }

        if (q.includes('fire') || q.includes('आग') || q.includes('aag') || q.includes('आग्नि')) {
            return `🔥 <strong>Forest Fire Risk</strong><br><br>` +
                `Peak season: March-June<br>` +
                `• Very High: Pauri (85 incidents/yr)<br>` +
                `• High: Nainital, Almora, Tehri<br>` +
                `• Main cause: Pine needles + dry conditions<br><br>` +
                `Solution: Pine needle collection = fire risk ⬇️ + income ⬆️<br><br>` +
                `👉 🔥 Fire Risk + 🌲 Pine Forest layers ON karein!`;
        }

        if (q.includes('van panchayat') || q.includes('वन पंचायत') || q.includes('community forest')) {
            return `🏠 <strong>Van Panchayat (Community Forests)</strong><br><br>` +
                `Uttarakhand ka unique system — 7,600+ Van Panchayats!<br>` +
                `• 2L+ hectare community-managed forests<br>` +
                `• 2L+ members across 7 major clusters<br>` +
                `• Activities: Fodder, NTFP, pine collection, eco-tourism<br><br>` +
                `Chipko movement ki legacy!<br><br>` +
                `👉 🏠 Van Panchayat layer ON karein!`;
        }

        if (q.includes('corbett') || q.includes('कॉर्बेट') || q.includes('rajaji') || q.includes('राजाजी') || q.includes('nanda devi') || q.includes('national park') || q.includes('wildlife') || q.includes('tiger') || q.includes('elephant')) {
            return `🏛️ <strong>Protected Areas — Uttarakhand</strong><br><br>` +
                `• 🐅 Corbett NP: India\'s first, Bengal Tiger<br>` +
                `• 🐘 Rajaji NP: Elephant corridor, King Cobra<br>` +
                `• 🏔️ Nanda Devi NP: UNESCO, Snow Leopard<br>` +
                `• ⛰️ Gangotri NP: Glacier, Bharal<br>` +
                `• + Kedarnath, Askot, Binsar sanctuaries<br><br>` +
                `👉 🏛️ Protected Areas layer ON karein!`;
        }

        // Default
        return `🙏 Main samajh nahi paya. Aap mujhse pooch sakte hain:<br><br>` +
            `<strong>⚡ Energy:</strong> Wind, Solar, MGNREGA, Microgrid<br>` +
            `<strong>🌾 Agriculture:</strong> Crops, Horticulture, Organic, Polyhouse<br>` +
            `<strong>🏪 Market:</strong> Mandi, Cold Storage, FPO/SHG<br>` +
            `<strong>🌿 MAPS:</strong> Medicinal herbs, Aromatic plants<br>` +
            `<strong>🌲 Forest:</strong> Pine, Oak, Deodar, Fire risk, Van Panchayat<br>` +
            `<strong>🏛️ Protected:</strong> Corbett, Rajaji, Nanda Devi<br>` +
            `<strong>🗺️ Maps:</strong> Flood risk, Landslide, PMGSY, JJM<br>` +
            `<strong>💧 Irrigation:</strong> PMKSY, Dhara, Chaal-Khaal<br><br>` +
            `Kisi bhi <strong>jile ka naam</strong> likhein — map filter ho jayega!<br>` +
            `Hindi ya English — dono mein poochiye! 😊`;
    }

    // --- Event Listeners ---
    function setupEvents() {
        // District selector
        document.getElementById('district-select').addEventListener('change', function() {
            selectDistrict(this.value);
        });

        // Sidebar toggle
        document.getElementById('sidebar-toggle').addEventListener('click', function() {
            document.getElementById('sidebar').classList.toggle('open');
            setTimeout(() => map.invalidateSize(), 400);
        });

        // KML export
        document.getElementById('btn-export-kml').addEventListener('click', generateKML);

        // Modal close
        document.getElementById('modal-close').addEventListener('click', function() {
            document.getElementById('hub-modal').classList.add('hidden');
        });
        document.getElementById('hub-modal').addEventListener('click', function(e) {
            if (e.target === this) this.classList.add('hidden');
        });
    }

    // --- Initialize Application ---
    function init() {
        renderDistricts('all');
        initLayers();
        setupLayerToggles();
        setupEvents();
        setupChat();
        renderSchemeCards();
        updateDashboardStats('all');
        updateAgriStats('all');
        updateForestStats('all');
        renderCropCalendar();
    }

    // Start when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
