/**
 * districts.js — Uttarakhand 13 District GeoJSON Boundaries (Simplified)
 * Each polygon is a simplified representation for GIS visualization.
 * Properties include Hindi name, English name, elevation, area, population.
 */

const UTTARAKHAND_DISTRICTS = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: {
                id: "dehradun",
                name_hi: "देहरादून",
                name_en: "Dehradun",
                area_km2: 3088,
                population: 1696694,
                elevation_range: "400-3700m",
                hq: "Dehradun",
                color: "#4facfe"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [77.55, 30.85], [77.75, 30.90], [78.05, 30.85],
                    [78.20, 30.65], [78.25, 30.45], [78.15, 30.20],
                    [77.90, 30.15], [77.65, 30.20], [77.50, 30.35],
                    [77.45, 30.55], [77.50, 30.70], [77.55, 30.85]
                ]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "haridwar",
                name_hi: "हरिद्वार",
                name_en: "Haridwar",
                area_km2: 2360,
                population: 1890422,
                elevation_range: "250-900m",
                hq: "Haridwar",
                color: "#00f2fe"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [77.65, 30.20], [77.90, 30.15], [78.05, 30.05],
                    [78.10, 29.85], [78.00, 29.75], [77.80, 29.70],
                    [77.60, 29.75], [77.50, 29.90], [77.55, 30.05],
                    [77.65, 30.20]
                ]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "pauri",
                name_hi: "पौड़ी गढ़वाल",
                name_en: "Pauri Garhwal",
                area_km2: 5329,
                population: 687271,
                elevation_range: "300-3100m",
                hq: "Pauri",
                color: "#26de81"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [78.25, 30.45], [78.55, 30.55], [78.85, 30.50],
                    [79.00, 30.35], [78.95, 30.10], [78.70, 29.90],
                    [78.40, 29.85], [78.15, 29.95], [78.10, 30.15],
                    [78.15, 30.30], [78.25, 30.45]
                ]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "tehri",
                name_hi: "टिहरी गढ़वाल",
                name_en: "Tehri Garhwal",
                area_km2: 3642,
                population: 618931,
                elevation_range: "550-6300m",
                hq: "New Tehri",
                color: "#a855f7"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [78.05, 30.85], [78.25, 30.90], [78.55, 30.85],
                    [78.65, 30.65], [78.55, 30.55], [78.25, 30.45],
                    [78.15, 30.55], [78.00, 30.65], [78.05, 30.85]
                ]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "uttarkashi",
                name_hi: "उत्तरकाशी",
                name_en: "Uttarkashi",
                area_km2: 8016,
                population: 330086,
                elevation_range: "1100-7083m",
                hq: "Uttarkashi",
                color: "#fed330"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [77.75, 30.90], [78.05, 30.85], [78.25, 30.90],
                    [78.55, 30.85], [78.75, 31.00], [78.90, 31.10],
                    [78.95, 31.25], [78.70, 31.35], [78.35, 31.30],
                    [78.00, 31.25], [77.70, 31.15], [77.55, 30.95],
                    [77.75, 30.90]
                ]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "chamoli",
                name_hi: "चमोली",
                name_en: "Chamoli",
                area_km2: 8030,
                population: 391605,
                elevation_range: "800-7816m",
                hq: "Gopeshwar",
                color: "#ff6348"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [78.90, 31.10], [79.15, 31.05], [79.45, 30.95],
                    [79.70, 30.80], [79.75, 30.60], [79.55, 30.45],
                    [79.25, 30.40], [79.00, 30.35], [78.85, 30.50],
                    [78.65, 30.65], [78.55, 30.85], [78.75, 31.00],
                    [78.90, 31.10]
                ]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "rudraprayag",
                name_hi: "रुद्रप्रयाग",
                name_en: "Rudraprayag",
                area_km2: 1984,
                population: 242285,
                elevation_range: "600-6940m",
                hq: "Rudraprayag",
                color: "#ff7f50"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [78.85, 30.50], [79.00, 30.60], [79.25, 30.55],
                    [79.25, 30.40], [79.00, 30.35], [78.85, 30.50]
                ]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "almora",
                name_hi: "अल्मोड़ा",
                name_en: "Almora",
                area_km2: 3139,
                population: 622506,
                elevation_range: "500-2700m",
                hq: "Almora",
                color: "#00d98b"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [79.25, 30.00], [79.50, 30.05], [79.75, 29.95],
                    [79.80, 29.75], [79.65, 29.55], [79.40, 29.50],
                    [79.15, 29.55], [79.00, 29.70], [79.05, 29.85],
                    [79.25, 30.00]
                ]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "nainital",
                name_hi: "नैनीताल",
                name_en: "Nainital",
                area_km2: 4251,
                population: 954605,
                elevation_range: "250-2700m",
                hq: "Nainital",
                color: "#45b7d1"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [79.00, 29.70], [79.15, 29.55], [79.40, 29.45],
                    [79.45, 29.25], [79.35, 29.10], [79.10, 29.05],
                    [78.85, 29.15], [78.75, 29.35], [78.85, 29.55],
                    [79.00, 29.70]
                ]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "champawat",
                name_hi: "चम्पावत",
                name_en: "Champawat",
                area_km2: 1766,
                population: 259648,
                elevation_range: "300-2500m",
                hq: "Champawat",
                color: "#ffa502"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [79.80, 29.75], [80.05, 29.70], [80.15, 29.50],
                    [80.05, 29.30], [79.85, 29.25], [79.65, 29.35],
                    [79.65, 29.55], [79.80, 29.75]
                ]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "bageshwar",
                name_hi: "बागेश्वर",
                name_en: "Bageshwar",
                area_km2: 2246,
                population: 259898,
                elevation_range: "950-5500m",
                hq: "Bageshwar",
                color: "#e056a0"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [79.55, 30.45], [79.75, 30.40], [79.90, 30.25],
                    [79.85, 30.05], [79.60, 29.95], [79.50, 30.05],
                    [79.35, 30.15], [79.40, 30.35], [79.55, 30.45]
                ]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "pithoragarh",
                name_hi: "पिथौरागढ़",
                name_en: "Pithoragarh",
                area_km2: 7090,
                population: 483439,
                elevation_range: "500-7068m",
                hq: "Pithoragarh",
                color: "#ff6b6b"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [79.75, 30.60], [80.05, 30.55], [80.30, 30.40],
                    [80.35, 30.15], [80.20, 29.90], [80.05, 29.70],
                    [79.80, 29.75], [79.65, 29.95], [79.75, 30.15],
                    [79.90, 30.25], [79.75, 30.40], [79.75, 30.60]
                ]]
            }
        },
        {
            type: "Feature",
            properties: {
                id: "udhamsingh",
                name_hi: "ऊधम सिंह नगर",
                name_en: "Udham Singh Nagar",
                area_km2: 2542,
                population: 1648367,
                elevation_range: "200-500m",
                hq: "Rudrapur",
                color: "#66d9ef"
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [78.75, 29.35], [78.85, 29.15], [79.10, 29.05],
                    [79.35, 29.10], [79.45, 29.00], [79.40, 28.85],
                    [79.15, 28.80], [78.85, 28.85], [78.65, 28.95],
                    [78.55, 29.10], [78.65, 29.25], [78.75, 29.35]
                ]]
            }
        }
    ]
};

// District centers for zoom/focus
const DISTRICT_CENTERS = {
    all:        { lat: 30.0668, lng: 79.0193, zoom: 7 },
    dehradun:   { lat: 30.3165, lng: 78.0322, zoom: 9 },
    haridwar:   { lat: 29.9457, lng: 78.1642, zoom: 10 },
    pauri:      { lat: 30.1500, lng: 78.7800, zoom: 9 },
    tehri:      { lat: 30.3800, lng: 78.4800, zoom: 10 },
    uttarkashi: { lat: 31.1000, lng: 78.4500, zoom: 9 },
    chamoli:    { lat: 30.5000, lng: 79.3200, zoom: 9 },
    rudraprayag:{ lat: 30.2800, lng: 79.0000, zoom: 10 },
    almora:     { lat: 29.5900, lng: 79.6500, zoom: 10 },
    nainital:   { lat: 29.3800, lng: 79.4600, zoom: 10 },
    champawat:  { lat: 29.3300, lng: 80.0900, zoom: 10 },
    bageshwar:  { lat: 30.0500, lng: 79.7700, zoom: 10 },
    pithoragarh:{ lat: 29.5800, lng: 80.2100, zoom: 9 },
    udhamsingh: { lat: 28.9800, lng: 79.4000, zoom: 10 }
};

// Color palette for district boundaries
const DISTRICT_STYLES = {
    default: {
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.08,
        dashArray: ''
    },
    hover: {
        weight: 3,
        fillOpacity: 0.18,
    },
    selected: {
        weight: 3,
        fillOpacity: 0.22,
        dashArray: ''
    }
};
