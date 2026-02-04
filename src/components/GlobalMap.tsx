'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
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
  const [clickedKey, setClickedKey] = useState<string | null>(null);
  const [scale, setScale] = useState(160);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // 响应式缩放：根据容器宽度调整地图缩放比例
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // 基础 scale 为 160 (对应 800px 宽度)
        // 小屏幕上增大 scale 和 zoom，让地图内容更大
        if (width < 640) {
          // 小屏幕：显著放大
          setScale(220);
          setZoom(1.3); // 手机端额外放大 30%
        } else if (width < 768) {
          // 中等屏幕
          setScale(200);
          setZoom(1);
        } else if (width < 1024) {
          // 平板
          setScale(180);
          setZoom(1);
        } else {
          // 桌面
          setScale(160);
          setZoom(1);
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
        {/* ZoomableGroup 启用拖拽平移和缩放 */}
        <ZoomableGroup
          center={[10, 10]}
          zoom={zoom}
          minZoom={1}
          maxZoom={4}
          translateExtent={[[0, 0], [800, 450]]}
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
                    pressed: { outline: 'none', fill: '#CBD5E1' },
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
            const isClicked = clickedKey === key;
            const isActive = isHovered || isClicked;

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
                onClick={() => {
                  setClickedKey(key);
                  setTooltipContent(location.name);
                  // 300ms 后清除点击状态
                  setTimeout(() => setClickedKey(null), 300);
                }}
                data-tooltip-id="map-tooltip"
              >
                {/* 脉冲光晕 - 悬停或点击时显示 */}
                {isActive && (
                  <circle
                    r={size * 1.8}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                    className="pulse-circle"
                    style={{ opacity: 0.4 }}
                  />
                )}
                {/* 次光晕 */}
                {isActive && (
                  <circle
                    r={size * 1.4}
                    fill="none"
                    stroke={color}
                    strokeWidth={1.5}
                    style={{ opacity: 0.6 }}
                  />
                )}
                {/* 主标注点 */}
                <circle
                  r={isActive ? size * 1.4 : size}
                  fill={color}
                  stroke="#fff"
                  strokeWidth={isActive ? 2 : 1.5}
                  className="cursor-pointer"
                  style={{
                    filter: isActive
                      ? `drop-shadow(0 0 8px ${color})`
                      : 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))',
                    transition: 'r 0.15s ease-out, filter 0.15s ease-out, stroke-width 0.15s ease-out',
                  }}
                />
              </Marker>
            );
          })}
        </ZoomableGroup>
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
