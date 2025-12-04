/**
 * Dumbbell Chart Visualization - D3.js Implementation
 * Liverpool FC Player Minutes Analysis
 * Premier League 2015/16 Season
 * 
 * Author: [Your Name]
 * Course: Information Visualization
 * Data Source: StatsBomb Open Data
 */

// =============================================
// 1. EMBEDDED DATA
// =============================================
const playerData = [
  {"player": "Nathaniel Edwin Clyne", "appearances": 18, "starts": 18, "subs": 0, "avg_entry": 0.0, "avg_exit": 90.0, "avg_minutes": 90.0, "position": "Right Back"},
  {"player": "Simon Mignolet", "appearances": 17, "starts": 17, "subs": 0, "avg_entry": 0.0, "avg_exit": 90.0, "avg_minutes": 90.0, "position": "Goalkeeper"},
  {"player": "Martin Škrtel", "appearances": 16, "starts": 15, "subs": 1, "avg_entry": 2.8, "avg_exit": 86.9, "avg_minutes": 84.1, "position": "Center Back"},
  {"player": "James Philip Milner", "appearances": 16, "starts": 16, "subs": 0, "avg_entry": 0.0, "avg_exit": 87.2, "avg_minutes": 87.2, "position": "Midfield"},
  {"player": "Emre Can", "appearances": 15, "starts": 13, "subs": 2, "avg_entry": 7.5, "avg_exit": 87.0, "avg_minutes": 79.5, "position": "Midfield"},
  {"player": "Christian Benteke", "appearances": 15, "starts": 9, "subs": 6, "avg_entry": 26.1, "avg_exit": 83.7, "avg_minutes": 57.6, "position": "Forward"},
  {"player": "Alberto Moreno", "appearances": 15, "starts": 11, "subs": 4, "avg_entry": 19.9, "avg_exit": 90.0, "avg_minutes": 70.1, "position": "Left Back"},
  {"player": "Adam Lallana", "appearances": 15, "starts": 11, "subs": 4, "avg_entry": 17.3, "avg_exit": 84.1, "avg_minutes": 66.7, "position": "Midfield"},
  {"player": "Dejan Lovren", "appearances": 14, "starts": 13, "subs": 1, "avg_entry": 6.4, "avg_exit": 86.8, "avg_minutes": 80.4, "position": "Center Back"},
  {"player": "Roberto Firmino", "appearances": 14, "starts": 11, "subs": 3, "avg_entry": 15.5, "avg_exit": 74.8, "avg_minutes": 59.3, "position": "Forward"},
  {"player": "Philippe Coutinho", "appearances": 14, "starts": 13, "subs": 1, "avg_entry": 5.0, "avg_exit": 85.6, "avg_minutes": 80.6, "position": "Midfield"},
  {"player": "Jordon Ibe", "appearances": 14, "starts": 6, "subs": 8, "avg_entry": 44.2, "avg_exit": 84.0, "avg_minutes": 39.8, "position": "Winger"},
  {"player": "Lucas Leiva", "appearances": 13, "starts": 10, "subs": 3, "avg_entry": 14.8, "avg_exit": 86.2, "avg_minutes": 71.3, "position": "Midfield"},
  {"player": "Joe Allen", "appearances": 10, "starts": 5, "subs": 5, "avg_entry": 38.7, "avg_exit": 83.7, "avg_minutes": 45.0, "position": "Midfield"},
  {"player": "Daniel Sturridge", "appearances": 10, "starts": 8, "subs": 2, "avg_entry": 13.1, "avg_exit": 83.2, "avg_minutes": 70.1, "position": "Forward"},
  {"player": "Divock Origi", "appearances": 8, "starts": 3, "subs": 5, "avg_entry": 37.9, "avg_exit": 87.2, "avg_minutes": 49.4, "position": "Forward"},
  {"player": "Jordan Henderson", "appearances": 7, "starts": 5, "subs": 2, "avg_entry": 18.0, "avg_exit": 84.4, "avg_minutes": 66.4, "position": "Midfield"},
  {"player": "Mamadou Sakho", "appearances": 7, "starts": 7, "subs": 0, "avg_entry": 0.0, "avg_exit": 90.0, "avg_minutes": 90.0, "position": "Center Back"},
  {"player": "Sheyi Ojo", "appearances": 6, "starts": 3, "subs": 3, "avg_entry": 42.5, "avg_exit": 80.8, "avg_minutes": 38.3, "position": "Winger"},
  {"player": "Joe Gomez", "appearances": 5, "starts": 5, "subs": 0, "avg_entry": 0.0, "avg_exit": 87.4, "avg_minutes": 87.4, "position": "Defender"},
  {"player": "Danny Ings", "appearances": 5, "starts": 2, "subs": 3, "avg_entry": 33.6, "avg_exit": 83.6, "avg_minutes": 50.0, "position": "Forward"},
  {"player": "Kolo Touré", "appearances": 5, "starts": 4, "subs": 1, "avg_entry": 18.8, "avg_exit": 89.4, "avg_minutes": 70.6, "position": "Center Back"},
  {"player": "Kevin Stewart", "appearances": 4, "starts": 4, "subs": 0, "avg_entry": 0.0, "avg_exit": 90.0, "avg_minutes": 90.0, "position": "Midfield"},
  {"player": "Jon Flanagan", "appearances": 3, "starts": 3, "subs": 0, "avg_entry": 0.0, "avg_exit": 90.0, "avg_minutes": 90.0, "position": "Defender"}
];

// =============================================
// 2. CONFIGURATION
// =============================================
const margin = { top: 60, right: 50, bottom: 60, left: 200 };
const width = 900 - margin.left - margin.right;
const height = 750 - margin.top - margin.bottom;

// Global variables
let data = [...playerData];
let svg, xScale, yScale;

// =============================================
// 3. INITIALIZE CHART
// =============================================
function initChart() {
    // Clear any existing SVG
    d3.select('#chart').selectAll('*').remove();
    
    // Create SVG
    svg = d3.select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Create scales
    xScale = d3.scaleLinear()
        .domain([0, 90])
        .range([0, width]);

    yScale = d3.scaleBand()
        .domain(data.map(d => d.player))
        .range([0, height])
        .padding(0.4);

    // Add X axis
    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale).tickValues([0, 15, 30, 45, 60, 75, 90]).tickFormat(d => d + "'"))
        .selectAll('text')
        .style('fill', '#94a3b8');

    // Add Y axis
    svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(yScale))
        .selectAll('text')
        .style('fill', '#f1f5f9')
        .style('font-size', '11px');

    // Style axis lines
    svg.selectAll('.domain').style('stroke', '#475569');
    svg.selectAll('.tick line').style('stroke', '#475569');

    // Add X axis label
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + 45)
        .attr('text-anchor', 'middle')
        .style('fill', '#94a3b8')
        .style('font-size', '13px')
        .text('Match Minutes');

    // Add chart title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', -30)
        .attr('text-anchor', 'middle')
        .style('fill', '#f1f5f9')
        .style('font-size', '18px')
        .style('font-weight', 'bold')
        .text('Average Playing Time per Player');

    // Add vertical grid lines
    svg.append('g')
        .attr('class', 'grid')
        .selectAll('line')
        .data([0, 15, 30, 45, 60, 75, 90])
        .enter()
        .append('line')
        .attr('x1', d => xScale(d))
        .attr('x2', d => xScale(d))
        .attr('y1', 0)
        .attr('y2', height)
        .style('stroke', '#334155')
        .style('stroke-dasharray', '3,3')
        .style('opacity', 0.5);

    // Draw the dumbbell chart
    drawDumbbells(data);
}

// =============================================
// 4. DRAW DUMBBELLS
// =============================================
function drawDumbbells(chartData) {
    // Remove existing elements
    svg.selectAll('.dumbbell-group').remove();

    // Create a group for each player
    const dumbbells = svg.selectAll('.dumbbell-group')
        .data(chartData, d => d.player)
        .enter()
        .append('g')
        .attr('class', 'dumbbell-group');

    // Add connecting lines
    dumbbells.append('line')
        .attr('class', 'dumbbell-line')
        .attr('x1', d => xScale(d.avg_entry))
        .attr('x2', d => xScale(d.avg_entry)) // Start at entry for animation
        .attr('y1', d => yScale(d.player) + yScale.bandwidth() / 2)
        .attr('y2', d => yScale(d.player) + yScale.bandwidth() / 2)
        .style('stroke', '#6366f1')
        .style('stroke-width', 4)
        .style('stroke-linecap', 'round')
        .on('mouseover', function(event, d) {
            d3.select(this).style('stroke', '#818cf8').style('stroke-width', 6);
            showTooltip(event, d);
        })
        .on('mouseout', function() {
            d3.select(this).style('stroke', '#6366f1').style('stroke-width', 4);
            hideTooltip();
        })
        .transition()
        .duration(800)
        .delay((d, i) => i * 40)
        .attr('x2', d => xScale(d.avg_exit));

    // Add entry circles (blue)
    dumbbells.append('circle')
        .attr('class', 'entry-circle')
        .attr('cx', d => xScale(d.avg_entry))
        .attr('cy', d => yScale(d.player) + yScale.bandwidth() / 2)
        .attr('r', 0)
        .style('fill', '#3b82f6')
        .style('stroke', '#ffffff')
        .style('stroke-width', 2)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            d3.select(this).transition().duration(150).attr('r', 10);
            showTooltip(event, d);
        })
        .on('mouseout', function() {
            d3.select(this).transition().duration(150).attr('r', 7);
            hideTooltip();
        })
        .transition()
        .duration(500)
        .delay((d, i) => i * 40 + 300)
        .attr('r', 7);

    // Add exit circles (red)
    dumbbells.append('circle')
        .attr('class', 'exit-circle')
        .attr('cx', d => xScale(d.avg_exit))
        .attr('cy', d => yScale(d.player) + yScale.bandwidth() / 2)
        .attr('r', 0)
        .style('fill', '#ef4444')
        .style('stroke', '#ffffff')
        .style('stroke-width', 2)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            d3.select(this).transition().duration(150).attr('r', 10);
            showTooltip(event, d);
        })
        .on('mouseout', function() {
            d3.select(this).transition().duration(150).attr('r', 7);
            hideTooltip();
        })
        .transition()
        .duration(500)
        .delay((d, i) => i * 40 + 500)
        .attr('r', 7);
}

// =============================================
// 5. TOOLTIP FUNCTIONS
// =============================================
function showTooltip(event, d) {
    const startPercent = ((d.starts / d.appearances) * 100).toFixed(0);
    let role = 'Rotation Player';
    if (startPercent >= 70) role = 'Regular Starter';
    else if (startPercent < 30) role = 'Impact Substitute';

    const content = `
        <h4>${d.player}</h4>
        <p><strong>Position:</strong> ${d.position}</p>
        <p><strong>Appearances:</strong> <span class="highlight">${d.appearances}</span></p>
        <p><strong>Started:</strong> ${d.starts} (${startPercent}%)</p>
        <p><strong>Role:</strong> ${role}</p>
        <hr style="border-color: #334155; margin: 8px 0;">
        <p><strong>Avg Entry:</strong> <span class="entry-text">${d.avg_entry}'</span></p>
        <p><strong>Avg Exit:</strong> <span class="exit-text">${d.avg_exit}'</span></p>
        <p><strong>Avg Minutes:</strong> <span class="highlight">${d.avg_minutes}'</span></p>
    `;

    d3.select('#tooltip')
        .html(content)
        .style('left', (event.pageX + 15) + 'px')
        .style('top', (event.pageY - 10) + 'px')
        .classed('visible', true);
}

function hideTooltip() {
    d3.select('#tooltip').classed('visible', false);
}

// =============================================
// 6. SORTING AND FILTERING
// =============================================
function sortData(sortBy) {
    let sortedData = [...data];
    switch(sortBy) {
        case 'appearances':
            sortedData.sort((a, b) => b.appearances - a.appearances);
            break;
        case 'entry':
            sortedData.sort((a, b) => a.avg_entry - b.avg_entry);
            break;
        case 'exit':
            sortedData.sort((a, b) => a.avg_exit - b.avg_exit);
            break;
        case 'minutes':
            sortedData.sort((a, b) => b.avg_minutes - a.avg_minutes);
            break;
        case 'name':
            sortedData.sort((a, b) => a.player.localeCompare(b.player));
            break;
    }
    return sortedData;
}

function filterData(filterBy) {
    if (filterBy === 'all') return [...playerData];
    
    return playerData.filter(d => {
        const startPercent = (d.starts / d.appearances) * 100;
        switch(filterBy) {
            case 'starters': return startPercent >= 70;
            case 'rotation': return startPercent >= 30 && startPercent < 70;
            case 'subs': return startPercent < 30;
            default: return true;
        }
    });
}

function updateChart() {
    const filterValue = document.getElementById('filterSelect').value;
    const sortValue = document.getElementById('sortSelect').value;
    
    data = filterData(filterValue);
    data = sortData(sortValue);
    
    // Update Y scale
    yScale.domain(data.map(d => d.player));
    
    // Update Y axis with transition
    svg.select('.y-axis')
        .transition()
        .duration(500)
        .call(d3.axisLeft(yScale))
        .selectAll('text')
        .style('fill', '#f1f5f9')
        .style('font-size', '11px');
    
    // Redraw dumbbells
    drawDumbbells(data);
}

// =============================================
// 7. EVENT LISTENERS
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Dumbbell Chart...');
    console.log('D3 Version:', d3.version);
    console.log('Players:', playerData.length);
    
    // Initialize chart
    initChart();
    
    // Setup event listeners
    document.getElementById('sortSelect').addEventListener('change', updateChart);
    document.getElementById('filterSelect').addEventListener('change', updateChart);
    
    console.log('Chart initialized successfully!');
});
