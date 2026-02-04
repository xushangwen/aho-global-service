'use client';

import { colors } from '@/data/locations';

// 毛玻璃效果样式
const glassStyle = {
  backdropFilter: 'blur(8px) saturate(180%)',
  WebkitBackdropFilter: 'blur(8px) saturate(180%)',
} as const;

type FilterType = 'all' | 'customer' | 'business' | 'rd';

interface LegendItem {
  type: FilterType;
  color: string;
  label: string;
  count: number;
}

const legendItems: LegendItem[] = [
  { type: 'customer', color: colors.customer, label: '全球客户', count: 26 },
  { type: 'business', color: colors.business, label: '全球业务中心', count: 5 },
  { type: 'rd', color: colors.rd, label: '研发制造基地', count: 3 },
];

// 总数: 26 + 5 + 3 = 34

interface LegendProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function Legend({ activeFilter, onFilterChange }: LegendProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
      {/* 全部按钮 */}
      <button
        onClick={() => onFilterChange('all')}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl
          border transition-all duration-300
          ${activeFilter === 'all'
            ? 'bg-white/[0.04] border-white/50 shadow-xl scale-105'
            : 'bg-white/[0.02] border-white/40 hover:bg-white/[0.04] hover:shadow-lg'
          }
        `}
        style={glassStyle}
      >
        {/* 使用 grid icon 代替渐变色点 */}
        <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
        </svg>
        <span className="text-xs md:text-sm text-gray-700 font-medium">全部</span>
        <span className="text-xs text-gray-500 font-normal">33</span>
      </button>

      {/* 分类按钮 */}
      {legendItems.map((item) => (
        <button
          key={item.type}
          onClick={() => onFilterChange(item.type)}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-xl
            border transition-all duration-300
            ${activeFilter === item.type
              ? 'bg-white/[0.04] border-white/50 shadow-xl scale-105'
              : 'bg-white/[0.02] border-white/40 hover:bg-white/[0.04] hover:shadow-lg'
            }
          `}
          style={glassStyle}
        >
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{
              backgroundColor: item.color,
              boxShadow: `0 0 8px ${item.color}50`
            }}
          />
          <span className="text-xs md:text-sm text-gray-700 font-medium">
            {item.label}
          </span>
          <span className="text-xs text-gray-500 font-normal">{item.count}</span>
        </button>
      ))}
    </div>
  );
}
