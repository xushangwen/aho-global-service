'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [scale, setScale] = useState(160);
  const containerRef = useRef<HTMLDivElement>(null);

  // 响应式缩放：根据容器宽度调整地图缩放比例
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // 基础 scale 为 160 (对应 800px 宽度)
        // 小屏幕上增大 scale，让地图内容更大
        if (width < 640) {
          // 小屏幕：显著放大
          setScale(220);
        } else if (width < 768) {
          // 中等屏幕
          setScale(200);
        } else if (width < 1024) {
          // 平板
          setScale(180);
        } else {
          // 桌面
          setScale(160);
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // 根据类型和屏幕尺寸获取标注点大小
  const getMarkerSize = (type: Location['type']) => {
    // 小屏幕上使用更大的标记点
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const baseMultiplier = isMobile ? 1.8 : 1;
    
    switch (type) {
      case 'rd':
        return 5 * baseMultiplier;
      case 'business':
        return 4.5 * baseMultiplier;
      default:
        return 4 * baseMultiplier;
    }
  };

  // 根据筛选条件过滤位置
  const filteredLocations = activeFilter === 'all'
    ? allLocations
    : allLocations.filter(loc => loc.type === activeFilter);

  return (
    <div ref={containerRef} className="w-full h-full bg-gradient-to-b from-slate-100 to-slate-200">
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{
          scale: scale,
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
        {filteredLocations.map((location) => {
          const size = getMarkerSize(location.type);
          const color = colors[location.type];
          const key = `${location.name}-${location.type}`;
          const isHovered = hoveredKey === key;

          return (
            <Marker
              key={key}
              coordinates={location.coordinates}
              onMouseEnter={() => {
                setTooltipContent(location.name);
                setHoveredKey(key);
              }}
              onMouseLeave={() => {
                setTooltipContent('');
                setHoveredKey(null);
              }}
              data-tooltip-id="map-tooltip"
            >
              {/* 脉冲光晕 - 悬停时显示 */}
              {isHovered && (
                <circle
                  r={size}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  className="pulse-circle"
                />
              )}
              {/* 主标注点 */}
              <circle
                r={isHovered ? size * 1.4 : size}
                fill={color}
                stroke="#fff"
                strokeWidth={1.5}
                className="cursor-pointer"
                style={{
                  filter: isHovered
                    ? `drop-shadow(0 0 6px ${color})`
                    : 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))',
                  transition: 'r 0.15s ease-out, filter 0.15s ease-out',
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
