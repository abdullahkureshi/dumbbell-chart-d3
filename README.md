# Dumbbell Chart - Liverpool FC Player Minutes Analysis

## Information Visualization - Individual Assignment 3

### Overview
This D3.js visualization displays the average playing time patterns for Liverpool FC players during the 2015/16 Premier League season using a **Dumbbell Chart**.

### Live Demo
[Add your GitHub Pages / GitLab Pages link here]

### Repository
[Add your repository link here]

---

## Visualization Description

### What is a Dumbbell Chart?
A dumbbell chart shows the range between two related data points for each category. In this visualization:
- **Blue dot** = Average entry minute (when player comes on)
- **Red dot** = Average exit minute (when player goes off)  
- **Connecting line** = Duration of playing time

### Data Variables
| Variable | Type | Description |
|----------|------|-------------|
| player | String | Player name |
| appearances | Number | Total matches played |
| starts | Number | Matches started |
| subs | Number | Matches as substitute |
| avg_entry | Number | Average minute entering the pitch |
| avg_exit | Number | Average minute leaving the pitch |
| avg_minutes | Number | Average minutes played per match |
| position | String | Primary playing position |

### Visual Encodings
| Element | Channel | Encoding |
|---------|---------|----------|
| Entry dot | Position (x), Color (blue) | Time player enters match |
| Exit dot | Position (x), Color (red) | Time player leaves match |
| Line | Length, Position | Duration on pitch |
| Y-axis | Position | Player identity |
| X-axis | Position | Match timeline (0-90 mins) |

---

## Features

### Animations
- **Staggered entry animation**: Elements appear sequentially when chart loads
- **Smooth transitions**: Chart animates when sorting or filtering
- **Hover effects**: Dots enlarge on mouse hover

### Interactions
- **Tooltips**: Hover over any element to see detailed player statistics
- **Sort control**: Sort by appearances, entry time, exit time, minutes played, or name
- **Filter control**: Filter by player role (starters, rotation, substitutes)

---

## Project Structure
```
dumbbell-chart-d3/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Stylesheet
├── js/
│   └── script.js       # D3.js visualization code
├── data/
│   └── player_minutes.json  # Processed dataset
├── screenshot.png      # Visualization screenshot
└── README.md           # This file
```

---

## How to Run Locally

1. Clone or download the project
2. Open `index.html` in a web browser
3. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then open http://localhost:8000
   ```

---

## Data Source
**StatsBomb Open Data** - Liverpool FC matches from Premier League 2015/16 season (20 matches)

---

## Technologies Used
- **D3.js v7** - Data visualization library
- **HTML5** - Structure
- **CSS3** - Styling and animations
- **JavaScript ES6** - Logic and interactivity

---

## Author
Abdullah Nasir

Information Visualization Course  
Tu WIEN

---

## References
- D3.js Documentation: https://d3js.org/
- StatsBomb Open Data: https://github.com/statsbomb/open-data
