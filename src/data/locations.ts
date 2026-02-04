// 位置数据类型定义
export interface Location {
  name: string;
  coordinates: [number, number]; // [经度, 纬度]
  type: 'customer' | 'business' | 'rd';
}

// 全球客户 - 橙色 #FF6400 (23个)
export const customers: Location[] = [
  // 欧洲
  { name: '英国', coordinates: [-1.5, 52.5], type: 'customer' },
  { name: '法国', coordinates: [2.3, 46.6], type: 'customer' },
  { name: '德国', coordinates: [10.5, 51.2], type: 'customer' },
  { name: '奥地利', coordinates: [14.5, 47.5], type: 'customer' },
  { name: '波兰', coordinates: [19.4, 52.0], type: 'customer' },
  { name: '西班牙', coordinates: [-3.7, 40.4], type: 'customer' },
  { name: '斯洛文尼亚', coordinates: [14.8, 46.1], type: 'customer' },
  { name: '斯洛伐克', coordinates: [19.7, 48.7], type: 'customer' },
  { name: '意大利', coordinates: [12.5, 42.5], type: 'customer' },
  // 中东/非洲
  { name: '土耳其', coordinates: [32.9, 39.9], type: 'customer' },
  { name: '突尼斯', coordinates: [9.5, 34.0], type: 'customer' },
  { name: '埃及', coordinates: [30.8, 26.8], type: 'customer' },
  { name: '迪拜', coordinates: [55.3, 25.3], type: 'customer' },
  // 亚太
  { name: '印度', coordinates: [78.9, 22.0], type: 'customer' },
  { name: '中国', coordinates: [104.0, 35.0], type: 'customer' },
  { name: '日本', coordinates: [138.3, 36.2], type: 'customer' },
  { name: '韩国', coordinates: [128.0, 36.5], type: 'customer' },
  { name: '越南', coordinates: [108.3, 16.0], type: 'customer' },
  { name: '马来西亚', coordinates: [101.7, 3.1], type: 'customer' },
  { name: '印度尼西亚', coordinates: [117.0, -2.5], type: 'customer' },
  // 美洲
  { name: '美国', coordinates: [-95.7, 37.1], type: 'customer' },
  { name: '墨西哥', coordinates: [-102.5, 23.6], type: 'customer' },
  // 大洋洲
  { name: '澳大利亚', coordinates: [145.0, -37.8], type: 'customer' }, // 墨尔本
];

// 全球业务中心 - 蓝色 #1E3296 (5个)
export const businessCenters: Location[] = [
  { name: '匈牙利', coordinates: [19.0, 47.5], type: 'business' }, // 布达佩斯
  { name: '新加坡', coordinates: [103.8, 1.35], type: 'business' },
  { name: '墨西哥', coordinates: [-99.1, 19.4], type: 'business' }, // 墨西哥城
  { name: '韩国', coordinates: [127.0, 37.5], type: 'business' }, // 首尔
  { name: '香港', coordinates: [114.2, 22.3], type: 'business' },
];

// 研发制造基地 - 黄色 #FFB432 (2个)
export const rdBases: Location[] = [
  { name: '中国', coordinates: [116.4, 31.2], type: 'rd' }, // 中国中部
  { name: '泰国', coordinates: [100.5, 13.8], type: 'rd' }, // 曼谷
];

// 所有位置合并
export const allLocations: Location[] = [
  ...customers,
  ...businessCenters,
  ...rdBases,
];

// 颜色配置
export const colors = {
  customer: '#FF6400',  // 橙色 - 全球客户
  business: '#1E3296', // 蓝色 - 全球业务中心
  rd: '#FFB432',       // 黄色 - 研发制造基地
} as const;
