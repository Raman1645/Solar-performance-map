# Solar Asset Observability

A premium, futuristic web application for real-time monitoring and analysis of solar plant performance. Built for the SuperPower "Operating System for Energy".

## 🎯 Project Overview

This application solves a critical challenge in energy monitoring: correlating **physical spatial data** (where assets are located) with **time-series performance data** (how they're performing). Operators can visualize the entire solar plant, identify underperforming assets, and receive AI-powered insights—all in real-time.

### Key Features

- 🗺️ **Interactive Spatial Visualization** - Click-to-explore map with real-time color-coded performance
- 📊 **Time-Series Navigation** - Scrub through historical data with auto-playback mode
- 🤖 **AI-Powered Insights** - Automatic detection of performance anomalies and actionable recommendations
- 📈 **Performance Analytics** - Plant-wide statistics and individual asset tracking
- 🎨 **Premium Dark UI** - Futuristic design with glassmorphism and smooth animations
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile viewing


## 🏗️ Architecture

### Project Structure

```
solar-performance-map/
├── src/
│   ├── components/
│   │   ├── MapCanvas.jsx        # Interactive SVG-based solar map
│   │   ├── DateSelector.jsx     # Time navigation with playback controls
│   │   ├── Legend.jsx           # Performance color scale indicator
│   │   ├── PlantStats.jsx       # Plant-wide performance statistics
│   │   ├── AssetPanel.jsx       # Detailed asset performance view
│   │   └── AIInsights.jsx       # AI-driven alerts and recommendations
│   ├── utils/
│   │   └── colorScale.js        # Color mapping utilities
│   ├── data/
|   |   ├── index.js             # For intergarting with future data
│   │   ├── map_ICR17.js         # Asset geometry (polygons)
│   │   └── pr_ICR17.js          # Performance ratio time-series data
│   ├── App.jsx
│   ├── Main.jsx
│   └── index.css                # Tailwind directives
├── package.json
├── vite.config.js
└── README.md
```

### Component Architecture

```
App (State Container)
├── Header
│   └── DateSelector (Time Navigation)
├── Main Content
│   ├── PlantStats (Left Sidebar)
│   ├── MapCanvas (Center - Interactive Map)
│   │   └── Legend (Centered at Bottom)
│   └── Right Sidebar
│       ├── AIInsights (Conditional)
│       └── AssetPanel (Asset Details)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16.x or higher
- **npm** 7.x or higher (or **yarn** 1.22.x)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd solar-performance-map
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

In `App.jsx`, modify the underperformance threshold:

```javascript
const UNDERPERFORMANCE_THRESHOLD = 0.008; // Adjust as needed
```

### Change Sudden Drop Detection Sensitivity

```javascript
const DROP_THRESHOLD = 0.10; // 10% = significant drop
```

### Adjust Auto-Playback Speed

In `DateSelector.jsx`, change the interval:

```javascript
intervalRef.current = setInterval(() => {
  // ... playback logic
}, 800); // milliseconds between frames
```

---

## 🎯 Key Functionalities

### 1. Interactive Map Navigation

- **Click** any asset to view detailed performance data
- **Hover** to see quick asset info tooltip
- **Color-coded** visualization based on relative performance ranking
- **Selected asset** highlighted with blue glow effect

### 2. Time-Series Navigation

- **Slider** to scrub through dates
- **Previous/Next** buttons for single-day navigation
- **Play/Pause** button for automatic time-lapse animation
- **Progress indicator** showing current position in timeline

### 3. AI Insights Panel

**Automatic Detection:**
- Sudden performance drops (>10% decrease)
- Chronically underperforming assets
- Plant-wide performance trends

**Actionable Recommendations:**
- Maintenance suggestions
- Inspection priorities
- Performance optimization tips

### 4. Plant Statistics

**Real-time Metrics:**
- Total asset count
- Average performance ratio
- Underperforming asset count
- Worst performing asset identification
- Global PR range visualization

### 5. Asset Detail Panel

**Per-Asset View:**
- Current performance value
- Trend indicator (up/down/stable)
- Complete historical time-series
- Visual highlighting of selected date

---

## 🔄 Data Scalability (Challenge C1)

### Dynamic Data Ingestion

The system is designed to handle new data without code changes:

1. **Add new dates file** : e.g. pr_ICR18.js to src/data and add import to index.js
   ```javascript
   import pr_2024 from "./pr_ICR17";
    // later: import pr_2025 from "./pr_ICR18";

    export function loadPRData() {
        return {
            pr_data: {
                ...pr_2024.pr_data
                // ...pr_2025.pr_data   // auto-expands when added
            }
        };
    }

   ```

2. **System automatically:**
   - Detects new date range
   - Updates slider max value
   - Recalculates global PR min/max
   - Adjusts all visualizations

3. **No hardcoded limits** - All ranges are computed from data

### Future Enhancements for Production

```javascript
// Example: Load data from API
useEffect(() => {
  fetch('/api/performance-data')
    .then(res => res.json())
    .then(data => setPRData(data));
}, []);
```

---

## 🤖 AI Agent Integration (Challenge C2)

### Current Implementation

The `AIInsights.jsx` component demonstrates AI assistant integration:

1. **Data Analysis Layer**
   - Detects sudden performance drops
   - Identifies chronic underperformance
   - Calculates plant-wide metrics

2. **Insight Generation**
   - Formats findings into human-readable alerts
   - Provides actionable recommendations
   - Prioritizes critical issues

3. **UI Integration**
   - Collapsible panel design
   - Real-time updates on date change
   - Visual hierarchy for alert severity


---

## 🧪 Testing & Validation

### Manual Testing Checklist

- [ ] Click on multiple assets and verify panel updates
- [ ] Use date slider and verify map color changes
- [ ] Test auto-playback functionality
- [ ] Check AI insights for sudden drops
- [ ] Verify responsive design on different screen sizes
- [ ] Test with missing/null data values
- [ ] Confirm color scale accuracy (red=low, green=high)

### Edge Cases Handled

- **Missing PR data:** Displays "No data" instead of crashing
- **Null values:** Filtered out from calculations
- **Empty date ranges:** Graceful fallback to default state
- **First/last date:** Previous/Next buttons disabled appropriately
- **Division by zero:** Protected in average calculations

---

## 📈 Performance Optimization

### Current Optimizations

1. **React.useMemo** for expensive calculations
   - Global PR range (computed once)
   - Statistics calculations
   - Sudden drop detection

2. **Efficient Re-renders**
   - State lifted to App level
   - Props passed down efficiently
   - No unnecessary re-calculations

3. **SVG Rendering**
   - Hardware-accelerated polygons
   - CSS transitions for smooth animations
   - Minimal DOM manipulation

### Future Improvements

- Implement virtualization for large datasets (1000+ assets)
- Add debouncing for slider interactions
- Cache color calculations
- Use Web Workers for heavy computations
- Implement progressive loading for time-series data

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 🛠️ Technology Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| Framework | React | UI library |
| Styling | Tailwind CSS | Utility-first CSS |
| Icons | Lucide React | Icon components |
| Build Tool | Vite | Fast development server |
| Language | JavaScript | Application logic |
| Graphics | SVG | Map rendering |

---

## 🔮 Future Enhancements

### Phase 1: Core Features
- [ ] Export report as PDF
- [ ] Download CSV of performance data
- [ ] Email alerts for critical issues
- [ ] User preferences persistence

### Phase 2: Advanced Analytics
- [ ] Weather data overlay
- [ ] Predictive maintenance ML models
- [ ] Multi-plant comparison view
- [ ] Custom date range selection

### Phase 3: Collaboration
- [ ] Real-time multi-user support
- [ ] Commenting on assets
- [ ] Work order creation
- [ ] Team notifications

---

## 👥 Contributing

For educational purposes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is part of the SuperPower Software Engineering Internship Case Study.

**Case Study:** Solar Asset Observability Platform  
**Company:** SuperPower  
**Challenge:** "The Performance Map"

---

**Built with ❤️ for the SuperPower Operating System for Energy**

*Last Updated: January 2025*