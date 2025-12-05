import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Estuary, GeoJSON } from '../types';
import { GEOJSON_URL } from '../constants';

interface MapProps {
  estuaries: Estuary[];
  onSelectEstuary: (estuary: Estuary) => void;
  selectedEstuaryId?: string;
  hoveredEstuaryId?: string | null;
}

const MapVisualization: React.FC<MapProps> = ({ estuaries, onSelectEstuary, selectedEstuaryId, hoveredEstuaryId }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [geoData, setGeoData] = useState<GeoJSON | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  useEffect(() => {
    // Fetch generic world geojson
    fetch(GEOJSON_URL)
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Failed to load map data", err));

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!geoData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const { width, height } = dimensions;

    // Projection
    const projection = d3.geoMercator()
      .scale(width / 6.5)
      .center([0, 20])
      .translate([width / 2, height / 2]);

    const pathGenerator = d3.geoPath().projection(projection);

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    const g = svg.append("g");

    // Draw Map
    g.selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", (d: any) => pathGenerator(d))
      .attr("fill", "#e2e8f0")
      .attr("stroke", "#94a3b8")
      .attr("stroke-width", 0.5);

    // Helper to determine radius based on scale
    const getRadius = (scale: string | undefined, isSelected: boolean, isHovered: boolean) => {
        let r = 4; // Default/Small
        if (scale === 'Medium') r = 6;
        if (scale === 'Large') r = 9;
        if (scale === 'Massive') r = 12;
        
        if (isSelected) return r + 3;
        if (isHovered) return r + 2;
        return r;
    };

    const getFillColor = (isSelected: boolean, isHovered: boolean) => {
        if (isSelected) return "#ef4444"; // Red
        if (isHovered) return "#f59e0b"; // Orange (Amber-500)
        return "#0ea5e9"; // Blue
    };

    // Draw Estuaries Points
    g.selectAll("circle")
      .data(estuaries)
      .enter()
      .append("circle")
      .attr("cx", (d) => projection([d.coordinates.lng, d.coordinates.lat])?.[0] || 0)
      .attr("cy", (d) => projection([d.coordinates.lng, d.coordinates.lat])?.[1] || 0)
      .attr("r", (d) => getRadius(d.scale, d.id === selectedEstuaryId, d.id === hoveredEstuaryId))
      .attr("fill", (d) => getFillColor(d.id === selectedEstuaryId, d.id === hoveredEstuaryId))
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .attr("opacity", (d) => (d.id === hoveredEstuaryId || d.id === selectedEstuaryId) ? 1 : 0.8)
      .attr("cursor", "pointer")
      .on("click", (event, d) => {
        event.stopPropagation();
        onSelectEstuary(d);
      })
      .on("mouseover", function(event, d) {
        const currentR = getRadius(d.scale, d.id === selectedEstuaryId, true);
        d3.select(this)
          .transition().duration(200)
          .attr("r", currentR)
          .attr("fill", getFillColor(d.id === selectedEstuaryId, true))
          .attr("opacity", 1);
      })
      .on("mouseout", function(event, d) {
        const currentR = getRadius(d.scale, d.id === selectedEstuaryId, false);
        d3.select(this)
          .transition().duration(200)
          .attr("r", currentR)
          .attr("fill", getFillColor(d.id === selectedEstuaryId, false))
          .attr("opacity", 0.8);
      })
      .append("title")
      .text((d) => `${d.name} (${d.scale || 'Unknown'})`);
      
     // Bring hovered element to front
     if (hoveredEstuaryId) {
         g.selectAll("circle")
           .filter((d: any) => d.id === hoveredEstuaryId)
           .raise();
     }

  }, [geoData, dimensions, estuaries, selectedEstuaryId, hoveredEstuaryId, onSelectEstuary]);

  return (
    <div ref={containerRef} className="w-full h-full bg-blue-50 overflow-hidden relative shadow-inner rounded-xl">
      {!geoData && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-500">
          Loading Map Data...
        </div>
      )}
      <svg ref={svgRef} width="100%" height="100%" className="w-full h-full"></svg>
      <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded shadow text-xs text-slate-600">
        <p>Scroll to Zoom • Drag to Pan</p>
      </div>
    </div>
  );
};

export default MapVisualization;
