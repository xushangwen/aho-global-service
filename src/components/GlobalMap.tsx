'use client';

import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { allLocations, colors, type Location } from '@/data/locations';

// 世界地图 TopoJSON 数据源
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface GlobalMapProps {
  activeFilter: 'all' | 'customer' | 'business' | 'rd';
}

export default function GlobalMap({ activeFilter }: GlobalMapProps) {
  const [tooltipContent, setTooltipContent] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 根据类型获取标注点大小
  const getMarkerSize = (type: Location['type']) => {
    switch (type) {
      case 'rd':
        return 5;
      case 'business':
        return 4.5;
      default:
        return 4;
    }
  };

  // 根据筛选条件过滤位置
  const filteredLocations = activeFilter === 'all'
    ? allLocations
    : allLocations.filter(loc => loc.type === activeFilter);

  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-slate-100">
      {/* 脉冲动画样式 */}
      <style jsx global>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        .pulse-ring {
          animation: pulse-ring 1.5s ease-out infinite;
        }
      `}</style>

      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{
          scale: 160,
          center: [10, 10],
        }}
        width={800}
        height={450}
        style={{ width: '100%', height: '100%' }}
        data-tooltip-id="map-tooltip"
      >
        {/* 渲染世界地图 */}
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#E2E8F0"
                stroke="#CBD5E1"
                strokeWidth={0.5}
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none', fill: '#CBD5E1' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {/* 渲染标注点 */}
        {filteredLocations.map((location, index) => {
          const size = getMarkerSize(location.type);
          const isHovered = hoveredIndex === index;
          const color = colors[location.type];

          return (
            <Marker
              key={`${location.type}-${index}`}
              coordinates={location.coordinates}
              onMouseEnter={() => {
                setTooltipContent(location.name);
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                setTooltipContent('');
                setHoveredIndex(null);
              }}
              data-tooltip-id="map-tooltip"
            >
              {/* 脉冲光晕 - 悬停时显示 */}
              {isHovered && (
                <circle
                  r={size}
                  fill={color}
                  opacity={0.6}
                  className="pulse-ring"
                  style={{ transformOrigin: 'center' }}
                />
              )}
              {/* 主标注点 */}
              <circle
                r={isHovered ? size * 1.3 : size}
                fill={color}
                stroke="#fff"
                strokeWidth={1.5}
                className="cursor-pointer"
                style={{
                  filter: isHovered
                    ? `drop-shadow(0 0 8px ${color})`
                    : 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
                  transition: 'all 0.2s ease-out',
                }}
              />
            </Marker>
          );
        })}
      </ComposableMap>

      {/* 提示框 - 毛玻璃效果 */}
      <Tooltip
        id="map-tooltip"
        content={tooltipContent}
        className="!bg-white/70 !backdrop-blur-md !text-gray-800 !px-4 !py-2 !rounded-xl !text-sm !font-medium !shadow-lg !border !border-white/50 !z-50"
      />
    </div>
  );
}
