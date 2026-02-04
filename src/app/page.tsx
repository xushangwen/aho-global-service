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
      {/* 地图背景层 */}
      <div className="absolute inset-0 z-0">
        <GlobalMap activeFilter={activeFilter} />
      </div>

      {/* 内容层 */}
      <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
        {/* 顶部标题区 - 无卡片 */}
        <header className="pt-8 md:pt-12 px-4 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 drop-shadow-sm">
            我们的全球服务
          </h1>
          <p className="text-sm md:text-base text-gray-600 drop-shadow-sm max-w-xl mx-auto">
            澳弘电子与全球领先企业深度合作，推动科技创新与行业发展
          </p>
        </header>

        {/* 底部控制区 */}
        <div className="pb-6 md:pb-10 px-4 pointer-events-auto">
          {/* 图例筛选 */}
          <Legend activeFilter={activeFilter} onFilterChange={setActiveFilter} />

          {/* 统计卡片 - 增强毛玻璃 */}
          <section className="mt-4 md:mt-6 flex justify-center gap-3 md:gap-4">
            <div className="text-center px-5 py-3 md:px-6 md:py-4 bg-white/25 backdrop-blur-xl rounded-xl border border-white/40 shadow-lg hover:bg-white/35 transition-all duration-300">
              <div className="text-lg md:text-2xl font-bold text-[#FF6400]">22+</div>
              <div className="text-xs text-gray-600">服务国家/地区</div>
            </div>
            <div className="text-center px-5 py-3 md:px-6 md:py-4 bg-white/25 backdrop-blur-xl rounded-xl border border-white/40 shadow-lg hover:bg-white/35 transition-all duration-300">
              <div className="text-lg md:text-2xl font-bold text-[#1E3296]">5</div>
              <div className="text-xs text-gray-600">全球业务中心</div>
            </div>
            <div className="text-center px-5 py-3 md:px-6 md:py-4 bg-white/25 backdrop-blur-xl rounded-xl border border-white/40 shadow-lg hover:bg-white/35 transition-all duration-300">
              <div className="text-lg md:text-2xl font-bold text-[#FFB432]">2</div>
              <div className="text-xs text-gray-600">研发制造基地</div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
