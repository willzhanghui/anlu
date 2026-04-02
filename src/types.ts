export type ModuleType = 'dashboard' | 'park' | 'farming' | 'machine' | 'bigdata' | 'consult';

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
}

export interface ModuleConfig {
  id: ModuleType;
  label: string;
  icon: string;
  sidebarItems: SidebarItem[];
}

export const MODULES: ModuleConfig[] = [
  {
    id: 'dashboard',
    label: '驾驶舱',
    icon: '📊',
    sidebarItems: [
      { id: 'dash-overview', label: '综合概览', icon: 'LayoutDashboard' },
      { id: 'dash-map', label: '地图总览', icon: 'Map' },
      { id: 'dash-alert', label: '告警中心', icon: 'AlertTriangle', badge: '7' },
      { id: 'dash-stats', label: '数据统计', icon: 'BarChart3' },
    ],
  },
  {
    id: 'park',
    label: '园区管理',
    icon: '🏞️',
    sidebarItems: [
      { id: 'park-overview', label: '园区概览', icon: 'Info' },
      { id: 'park-map', label: '地块分布', icon: 'Grid3X3' },
      { id: 'park-crop', label: '种植结构', icon: 'Sprout' },
      { id: 'park-weather', label: '气象监测', icon: 'CloudSun' },
      { id: 'park-pest', label: '虫情监测', icon: 'Bug' },
      { id: 'park-soil', label: '土壤墒情', icon: 'Droplets' },
      { id: 'park-ndvi', label: '长势监测', icon: 'Satellite' },
    ],
  },
  {
    id: 'farming',
    label: '农事管理',
    icon: '🌱',
    sidebarItems: [
      { id: 'farm-tasks', label: '作业任务', icon: 'CheckSquare' },
      { id: 'farm-batch', label: '批次管理', icon: 'Package' },
      { id: 'farm-agri', label: '农资经营', icon: 'Store' },
      { id: 'farm-device', label: '设备管理', icon: 'Radio' },
      { id: 'farm-alert', label: '监测告警', icon: 'Zap', badge: '3' },
      { id: 'farm-people', label: '人员管理', icon: 'Users' },
      { id: 'farm-subject', label: '主体信息', icon: 'Building2' },
    ],
  },
  {
    id: 'machine',
    label: '无人农机',
    icon: '🚜',
    sidebarItems: [
      { id: 'mach-map', label: '实时轨迹', icon: 'Navigation' },
      { id: 'mach-list', label: '农机台账', icon: 'Truck' },
      { id: 'mach-tasks', label: '作业任务', icon: 'ClipboardList' },
      { id: 'mach-stats', label: '作业统计', icon: 'PieChart' },
      { id: 'mach-maintain', label: '维修保养', icon: 'Wrench' },
    ],
  },
  {
    id: 'bigdata',
    label: '大数据分析',
    icon: '📈',
    sidebarItems: [
      { id: 'data-soil', label: '土壤环境', icon: 'FlaskConical' },
      { id: 'data-weather', label: '气象分析', icon: 'SunMedium' },
      { id: 'data-variety', label: '品种档案', icon: 'FileText' },
      { id: 'data-yield', label: '产量分析', icon: 'TrendingUp' },
      { id: 'data-report', label: '分析报表', icon: 'FileBarChart' },
    ],
  },
  {
    id: 'consult',
    label: '技术咨询',
    icon: '💬',
    sidebarItems: [
      { id: 'cons-kb', label: '知识库', icon: 'BookOpen' },
      { id: 'cons-qa', label: '在线咨询', icon: 'MessageSquare', badge: '2' },
      { id: 'cons-expert', label: '专家团队', icon: 'GraduationCap' },
    ],
  },
];
