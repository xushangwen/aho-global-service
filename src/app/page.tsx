'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Legend from '@/components/Legend';

type FilterType = 'all' | 'customer' | 'business' | 'rd';

// 动态导入地图组件
const GlobalMap = dynamic(() => import('@/components/GlobalMap'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-gray-300 border-t-[#FF6400] rounded-full animate-spin" />
        <span className="text-gray-500 text-sm">加载地图中...</span>
      </div>
    </div>
  ),
});

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  return (
    <main className="relative h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
      {/* 地图背景层 - 全屏显示，需要能接收鼠标事件 */}
      <div className="absolute inset-0">
        <GlobalMap activeFilter={activeFilter} />
      </div>

      {/* 顶部标题区 - 绝对定位在顶部 */}
      <header className="absolute top-0 left-0 right-0 z-10 pt-8 md:pt-12 px-4 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 drop-shadow-sm" style={{ fontWeight: 700 }}>
          我们的全球服务
        </h1>
        <p className="text-sm md:text-base text-gray-600 drop-shadow-sm max-w-xl mx-auto">
          澳弘电子与全球领先企业深度合作，推动科技创新与行业发展
        </p>
      </header>

      {/* 底部控制区 - 绝对定位在底部，宽度自适应不遮挡地图 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pb-4 sm:pb-6 md:pb-10 px-2 sm:px-4 pointer-events-none w-auto max-w-full">
        {/* 图例筛选 */}
        <div className="pointer-events-auto">
          <Legend activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        {/* 统计卡片 - 增强毛玻璃 */}
        <section className="mt-3 sm:mt-4 md:mt-6 flex justify-center gap-2 sm:gap-3 md:gap-4">
          <div className="pointer-events-auto text-center px-3 sm:px-6 py-2 sm:py-4 md:px-8 md:py-6 bg-white/40 rounded-xl sm:rounded-2xl border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:bg-white/50 transition-all duration-300" style={{backdropFilter: 'blur(4px) saturate(180%)', WebkitBackdropFilter: 'blur(4px) saturate(180%)'}}>
            <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold font-number text-[#FF6400]">26+</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-0.5 sm:mt-1">服务国家/地区</div>
          </div>
          <div className="pointer-events-auto text-center px-3 sm:px-6 py-2 sm:py-4 md:px-8 md:py-6 bg-white/40 rounded-xl sm:rounded-2xl border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:bg-white/50 transition-all duration-300" style={{backdropFilter: 'blur(4px) saturate(180%)', WebkitBackdropFilter: 'blur(4px) saturate(180%)'}}>
            <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold font-number text-[#1E3296]">5</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-0.5 sm:mt-1">全球业务中心</div>
          </div>
          <div className="pointer-events-auto text-center px-3 sm:px-6 py-2 sm:py-4 md:px-8 md:py-6 bg-white/40 rounded-xl sm:rounded-2xl border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:bg-white/50 transition-all duration-300" style={{backdropFilter: 'blur(4px) saturate(180%)', WebkitBackdropFilter: 'blur(4px) saturate(180%)'}}>
            <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold font-number text-[#FFB432]">3</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-0.5 sm:mt-1">研发制造基地</div>
          </div>
        </section>
      </div>
    </main>
  );
}
