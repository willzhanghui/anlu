import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, AreaChart, Area, PieChart, Pie
} from 'recharts';
import { 
  Map as MapIcon, AlertTriangle, BarChart3, LayoutDashboard, 
  Search, Filter, Bell, Settings, CheckCircle2, AlertCircle,
  Maximize2, Layers, Navigation, Info, Download, Calendar
} from 'lucide-react';

interface DashboardPageProps {
  activeItem: string;
  onShowAlert: (id: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ activeItem, onShowAlert }) => {
  
  // --- 1. 综合概览 (Overview) ---
  const OverviewContent = () => {
    const kpis = [
      { label: '高标准农田面积', value: '2.0', unit: '万亩', change: '↑ 覆盖全乡 82.4%', icon: '🌾', color: 'text-accent-main' },
      { label: '本季在种面积', value: '1.86', unit: '万亩', change: '↑ 较上季 +4.2%', icon: '📦', color: 'text-accent-main' },
      { label: '今日累计产量', value: '1,254', unit: '吨', change: '↑ 同比 +8.3%', icon: '🌱', color: 'text-accent-main' },
      { label: '在线农机台数', value: '1', unit: '台', change: '0台作业 · 1台待机', icon: '🚜', color: 'text-accent-main' },
      { label: '传感器在线率', value: '94.7', unit: '%', change: '↓ 3 台离线告警', icon: '📡', color: 'text-accent-main' },
      { label: '今日告警数', value: '7', unit: '条', change: '↑ 较昨日 +2', icon: '⚠️', color: 'text-accent-yellow' },
    ];

    const yieldData = [
      { name: '10月', value: 420 },
      { name: '11月', value: 548 },
      { name: '12月', value: 328 },
      { name: '1月', value: 231 },
      { name: '2月', value: 297 },
      { name: '3月', value: 686 },
      { name: '4月', value: 1254 },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.map((kpi, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="kpi-card"
            >
              <div className="absolute right-3 top-3 text-2xl opacity-20">{kpi.icon}</div>
              <div className="text-[11px] text-text-secondary mb-1.5">{kpi.label}</div>
              <div className={cn("text-2xl font-bold", kpi.color)}>
                {kpi.value}<span className="text-xs ml-1 font-normal text-text-secondary">{kpi.unit}</span>
              </div>
              <div className={cn("text-[10px] mt-1.5", kpi.change.includes('↑') ? 'text-accent-green' : 'text-accent-red')}>
                {kpi.change}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 panel">
            <div className="panel-header">
              <div className="panel-title">地块分布总览地图 · 辛榨乡</div>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded bg-accent-main/20 text-accent-main text-[10px]">卫星图</span>
                <span className="px-2 py-0.5 rounded bg-accent-green/20 text-accent-green text-[10px]">实时</span>
              </div>
            </div>
            <div className="p-2">
              <div className="h-80 bg-bg-deep rounded-md relative overflow-hidden border border-border-main/50">
                <svg className="w-full h-full" viewBox="0 0 500 280">
                  <polygon points="60,80 140,60 180,120 120,150 70,130" fill="rgba(0,212,255,0.08)" stroke="rgba(0,212,255,0.3)" strokeWidth="1.5"/>
                  <polygon points="160,60 260,50 280,100 220,130 170,110" fill="rgba(0,232,122,0.1)" stroke="rgba(0,232,122,0.35)" strokeWidth="1.5"/>
                  <polygon points="290,55 370,60 380,120 310,140 280,105" fill="rgba(0,212,255,0.07)" stroke="rgba(0,212,255,0.25)" strokeWidth="1.5"/>
                  <polygon points="80,150 170,140 190,200 120,220 70,190" fill="rgba(255,184,0,0.06)" stroke="rgba(255,184,0,0.25)" strokeWidth="1.5"/>
                  <path d="M0,200 Q100,185 200,195 Q300,205 400,190 Q450,185 500,188" fill="none" stroke="rgba(0,150,255,0.4)" strokeWidth="3"/>
                  <text x="90" y="110" fill="rgba(200,230,255,0.7)" fontSize="11">西河村</text>
                  <text x="195" y="90" fill="rgba(0,232,122,0.8)" fontSize="11">辛榨社区</text>
                  <text x="300" y="92" fill="rgba(200,230,255,0.7)" fontSize="11">孙汪村</text>
                </svg>
                <div className="absolute left-[18%] top-[35%] w-2.5 h-2.5 bg-accent-green rounded-full shadow-[0_0_8px_#00ff9d] animate-pulse" />
                <div className="absolute left-[45%] top-[28%] w-2.5 h-2.5 bg-accent-green rounded-full shadow-[0_0_8px_#00ff9d] animate-pulse" />
                <div className="absolute left-[22%] top-[62%] w-2.5 h-2.5 bg-accent-yellow rounded-full shadow-[0_0_8px_#ffb800] animate-pulse" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="panel flex-1">
              <div className="panel-header">
                <div className="panel-title">实时告警</div>
                <span className="bg-accent-red text-white text-[10px] px-1.5 py-0.5 rounded-full">7</span>
              </div>
              <div className="p-3 space-y-2">
                {[
                  { id: 'alert1', icon: '🌧️', title: '气象预警：中雨预报', desc: '今日14:00–18:00，降雨量预计8–15mm', time: '14:28', type: 'red' },
                  { id: 'alert2', icon: '🐛', title: '纹枯病风险：孙汪村2号地块', desc: 'NDVI异常下降，识别置信度 87%', time: '13:45', type: 'yellow' },
                  { id: 'alert3', icon: '🔋', title: '传感器低电量：SM-07', desc: '西河村C区土壤墒情传感器电量 14%', time: '12:10', type: 'yellow' },
                ].map((alert, i) => (
                  <div key={i} onClick={() => onShowAlert(alert.id)} className={cn(
                    "flex gap-3 p-2.5 rounded-md border-l-3 cursor-pointer transition-all hover:brightness-110",
                    alert.type === 'red' ? "bg-accent-red/10 border-accent-red" : "bg-accent-yellow/10 border-accent-yellow"
                  )}>
                    <div className="text-base mt-0.5">{alert.icon}</div>
                    <div className="flex-1">
                      <div className="text-xs font-medium">{alert.title}</div>
                      <div className="text-[10px] text-text-secondary mt-1">{alert.desc}</div>
                    </div>
                    <div className="text-[9px] text-text-dim whitespace-nowrap">{alert.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">实时气象</div>
                <span className="px-2 py-0.5 rounded bg-accent-main/20 text-accent-main text-[10px]">辛榨站</span>
              </div>
              <div className="p-4 grid grid-cols-3 gap-2">
                {[
                  { val: '18.4', unit: '°C', label: '气温', color: 'text-accent-main' },
                  { val: '76', unit: '%RH', label: '湿度', color: 'text-accent-green' },
                  { val: '6.8', unit: 'mm', label: '降水量', color: 'text-accent-yellow' },
                  { val: '3.2', unit: 'm/s', label: '风速', color: 'text-text-secondary' },
                  { val: '68', unit: '%', label: '墒情', color: 'text-accent-green' },
                  { val: '6.8', unit: 'pH', label: '土壤pH', color: 'text-text-secondary' },
                ].map((g, i) => (
                  <div key={i} className="text-center p-2 bg-bg-panel/60 rounded border border-border-main">
                    <div className={cn("text-lg font-bold", g.color)}>{g.val}</div>
                    <div className="text-[9px] text-text-dim">{g.unit}</div>
                    <div className="text-[9px] text-text-secondary mt-1">{g.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">种植结构分析</div>
              <span className="px-2 py-0.5 rounded bg-accent-main/20 text-accent-main text-[10px]">2025春季</span>
            </div>
            <div className="p-4 space-y-4">
              {[
                { label: '水稻（早稻）', val: '8,800 亩 · 47%', color: 'bg-accent-main' },
                { label: '小麦', val: '4,600 亩 · 25%', color: 'bg-accent-yellow' },
                { label: '油菜', val: '3,700 亩 · 20%', color: 'bg-accent-green' },
                { label: '其他作物', val: '1,500 亩 · 8%', color: 'bg-text-dim' },
              ].map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-text-secondary">{item.label}</span>
                    <span className="text-accent-main font-semibold">{item.val}</span>
                  </div>
                  <div className="h-1.5 bg-border-main/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: item.val.split('·')[1].trim() }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={cn("h-full rounded-full", item.color)} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">月度产量趋势</div>
            </div>
            <div className="p-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yieldData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a4a7a" vertical={false} />
                  <XAxis dataKey="name" stroke="#3a6a8a" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#081728', border: '1px solid #1a4a7a', borderRadius: '4px' }}
                    itemStyle={{ color: '#00d4ff', fontSize: '10px' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {yieldData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === yieldData.length - 1 ? '#00ff9d' : '#00d4ff'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">近期农事动态</div>
            </div>
            <div className="p-4 space-y-4">
              {[
                { title: '西河村A区早稻播种完成', meta: '2026-03-28 · 西河村 · 1,200亩', color: 'bg-accent-green' },
                { title: '孙汪村油菜收割作业开始', meta: '2026-03-25 · 孙汪村 · 580亩', color: 'bg-accent-yellow' },
                { title: '辛榨社区土壤改良施肥', meta: '2026-03-20 · 辛榨社区 · 920亩', color: 'bg-accent-main' },
                { title: '四报村大型无人机防治', meta: '2026-03-18 · 四报村 · 860亩', color: 'bg-accent-main' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", item.color)} />
                  <div>
                    <div className="text-xs text-text-primary">{item.title}</div>
                    <div className="text-[10px] text-text-dim mt-1">{item.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- 2. 地图总览 (Map Overview) ---
  const MapOverviewContent = () => {
    const [activeLayer, setActiveLayer] = useState('satellite');
    const [showDevices, setShowDevices] = useState(true);
    const [showMachines, setShowMachines] = useState(true);

    return (
      <div className="h-[calc(100vh-160px)] flex gap-6">
        <div className="flex-1 panel relative overflow-hidden flex flex-col">
          <div className="panel-header border-b border-border-main bg-bg-card/50 backdrop-blur-md z-10">
            <div className="panel-title flex items-center gap-2">
              <MapIcon size={16} className="text-accent-main" />
              辛榨乡高标准农田数字化地图
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveLayer('satellite')}
                className={cn("px-3 py-1 rounded text-[10px] transition-all", activeLayer === 'satellite' ? "bg-accent-main text-bg-deep font-bold" : "bg-bg-deep border border-border-main text-text-secondary")}
              >卫星图层</button>
              <button 
                onClick={() => setActiveLayer('vector')}
                className={cn("px-3 py-1 rounded text-[10px] transition-all", activeLayer === 'vector' ? "bg-accent-main text-bg-deep font-bold" : "bg-bg-deep border border-border-main text-text-secondary")}
              >矢量图层</button>
            </div>
          </div>
          
          <div className="flex-1 bg-bg-deep relative">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 opacity-40">
              <svg className="w-full h-full" viewBox="0 0 1000 600">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <path d="M100,100 L300,80 L450,150 L350,250 L150,220 Z" fill="rgba(0,212,255,0.05)" stroke="rgba(0,212,255,0.2)" strokeWidth="2"/>
                <path d="M400,100 L600,90 L700,200 L550,280 L420,220 Z" fill="rgba(0,232,122,0.05)" stroke="rgba(0,232,122,0.2)" strokeWidth="2"/>
                <path d="M200,300 L400,320 L450,450 L250,480 L180,400 Z" fill="rgba(255,184,0,0.05)" stroke="rgba(255,184,0,0.2)" strokeWidth="2"/>
                <path d="M0,300 Q200,280 400,310 Q600,340 800,300 Q1000,260 1000,280" fill="none" stroke="rgba(0,150,255,0.3)" strokeWidth="4"/>
              </svg>
            </div>

            {/* Interactive Markers */}
            {showDevices && (
              <>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute left-[25%] top-[25%] group cursor-pointer">
                  <div className="w-3 h-3 bg-accent-green rounded-full shadow-[0_0_10px_#00ff9d] animate-pulse" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-bg-panel border border-border-main p-2 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <div className="font-bold text-accent-green">SM-01 土壤传感器</div>
                    <div>湿度: 68% | 温度: 18.2°C</div>
                  </div>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute left-[55%] top-[22%] group cursor-pointer">
                  <div className="w-3 h-3 bg-accent-green rounded-full shadow-[0_0_10px_#00ff9d] animate-pulse" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-bg-panel border border-border-main p-2 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <div className="font-bold text-accent-green">AWS-03 气象站</div>
                    <div>风速: 3.2m/s | 降雨: 0mm</div>
                  </div>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute left-[38%] top-[65%] group cursor-pointer">
                  <div className="w-3 h-3 bg-accent-yellow rounded-full shadow-[0_0_10px_#ffb800] animate-pulse" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-bg-panel border border-border-main p-2 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <div className="font-bold text-accent-yellow">SM-07 传感器 (低电量)</div>
                    <div>电量: 14% | 状态: 正常</div>
                  </div>
                </motion.div>
              </>
            )}

            {showMachines && (
              <motion.div 
                animate={{ x: [0, 100, 50, 0], y: [0, 20, -10, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute left-[45%] top-[40%] group cursor-pointer"
              >
                <div className="text-xl">🚜</div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-bg-panel border border-border-main p-2 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <div className="font-bold text-accent-main">XZ-003 无人拖拉机</div>
                  <div>状态: 作业中 | 速度: 5.2km/h</div>
                </div>
              </motion.div>
            )}

            {/* Map Controls */}
            <div className="absolute right-4 top-4 space-y-2">
              <button className="w-8 h-8 bg-bg-panel/80 backdrop-blur border border-border-main rounded flex items-center justify-center text-text-primary hover:bg-accent-main hover:text-bg-deep transition-all shadow-lg"><Maximize2 size={16} /></button>
              <button className="w-8 h-8 bg-bg-panel/80 backdrop-blur border border-border-main rounded flex items-center justify-center text-text-primary hover:bg-accent-main hover:text-bg-deep transition-all shadow-lg"><Layers size={16} /></button>
              <button className="w-8 h-8 bg-bg-panel/80 backdrop-blur border border-border-main rounded flex items-center justify-center text-text-primary hover:bg-accent-main hover:text-bg-deep transition-all shadow-lg"><Navigation size={16} /></button>
            </div>

            <div className="absolute left-4 bottom-4 bg-bg-panel/80 backdrop-blur border border-border-main p-3 rounded-lg shadow-xl space-y-3">
              <div className="text-[11px] font-bold text-text-primary border-b border-border-main pb-1.5 mb-2">图层控制</div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={showDevices} onChange={e => setShowDevices(e.target.checked)} className="w-3 h-3 accent-accent-main" />
                  <span className="text-[10px] text-text-secondary group-hover:text-text-primary">物联网设备</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={showMachines} onChange={e => setShowMachines(e.target.checked)} className="w-3 h-3 accent-accent-main" />
                  <span className="text-[10px] text-text-secondary group-hover:text-text-primary">农机轨迹</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-3 h-3 accent-accent-main" />
                  <span className="text-[10px] text-text-secondary group-hover:text-text-primary">地块边界</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="w-80 space-y-6 overflow-y-auto pr-2">
          <div className="panel">
            <div className="panel-header"><div className="panel-title">地块详情统计</div></div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 bg-bg-deep rounded border border-border-main">
                  <div className="text-[10px] text-text-dim">总地块数</div>
                  <div className="text-lg font-bold text-accent-main">156 <span className="text-[10px] font-normal">个</span></div>
                </div>
                <div className="p-2 bg-bg-deep rounded border border-border-main">
                  <div className="text-[10px] text-text-dim">平均面积</div>
                  <div className="text-lg font-bold text-accent-green">128 <span className="text-[10px] font-normal">亩</span></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-[11px] text-text-secondary">地块状态分布</div>
                <div className="h-4 bg-bg-deep rounded-full overflow-hidden flex">
                  <div className="h-full bg-accent-green" style={{ width: '65%' }} />
                  <div className="h-full bg-accent-yellow" style={{ width: '25%' }} />
                  <div className="h-full bg-accent-red" style={{ width: '10%' }} />
                </div>
                <div className="flex justify-between text-[9px] text-text-dim">
                  <span>正常 (65%)</span>
                  <span>预警 (25%)</span>
                  <span>异常 (10%)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header"><div className="panel-title">设备在线状态</div></div>
            <div className="p-4 space-y-3">
              {[
                { label: '土壤墒情仪', total: 42, online: 38, color: 'text-accent-green' },
                { label: '气象站', total: 6, online: 6, color: 'text-accent-green' },
                { label: '智能摄像头', total: 12, online: 10, color: 'text-accent-yellow' },
                { label: '虫情灯', total: 8, online: 7, color: 'text-accent-green' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-bg-deep rounded border border-border-main">
                  <div className="text-xs text-text-secondary">{item.label}</div>
                  <div className="text-xs font-bold">
                    <span className={item.color}>{item.online}</span>
                    <span className="text-text-dim mx-1">/</span>
                    <span className="text-text-primary">{item.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header"><div className="panel-title">图层信息说明</div></div>
            <div className="p-4 text-[11px] text-text-dim leading-relaxed space-y-2">
              <p>1. 蓝色区域代表已建成的高标准农田示范区。</p>
              <p>2. 绿色点位代表实时在线的物联网监测设备。</p>
              <p>3. 动态图标代表正在作业或待命的无人农机。</p>
              <p>4. 红色高亮区域代表当前存在病虫害风险或气象灾害风险的地块。</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- 3. 告警中心 (Alert Center) ---
  const AlertCenterContent = () => {
    const [filter, setFilter] = useState('all');

    const alertStats = [
      { name: '气象告警', value: 45, color: '#00d4ff' },
      { name: '病虫害告警', value: 25, color: '#ffb800' },
      { name: '设备故障', value: 20, color: '#ff4d4d' },
      { name: '农事违规', value: 10, color: '#00ff9d' },
    ];

    const alerts = [
      { id: '1', type: '气象', level: '高', title: '强降雨预警', time: '2026-04-01 14:28', status: '待处理', desc: '预计未来4小时降雨量超过15mm' },
      { id: '2', type: '病虫害', level: '中', title: '纹枯病风险', time: '2026-04-01 13:45', status: '处理中', desc: '孙汪村2号地块NDVI异常' },
      { id: '3', type: '设备', level: '中', title: '传感器低电量', time: '2026-04-01 12:10', status: '待处理', desc: 'SM-07 传感器电量低于15%' },
      { id: '4', type: '农事', level: '低', title: '作业进度滞后', time: '2026-04-01 10:00', status: '已忽略', desc: '西河村B区播种进度低于计划20%' },
      { id: '5', type: '设备', level: '高', title: '网关离线', time: '2026-04-01 09:30', status: '已处理', desc: 'GW-02 中心网关连接中断' },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="panel p-4 flex flex-col items-center justify-center">
            <div className="text-[11px] text-text-secondary mb-2">今日告警总数</div>
            <div className="text-4xl font-bold text-accent-red">24</div>
            <div className="text-[10px] text-text-dim mt-2">较昨日 ↑ 12%</div>
            <div className="w-full h-32 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={alertStats}
                    innerRadius={35}
                    outerRadius={50}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {alertStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#081728', border: '1px solid #1a4a7a', borderRadius: '4px' }}
                    itemStyle={{ fontSize: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-3 panel">
            <div className="panel-header">
              <div className="panel-title">告警趋势分析 (近7日)</div>
            </div>
            <div className="p-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { day: '03-26', val: 12 },
                  { day: '03-27', val: 18 },
                  { day: '03-28', val: 15 },
                  { day: '03-29', val: 22 },
                  { day: '03-30', val: 30 },
                  { day: '03-31', val: 25 },
                  { day: '04-01', val: 24 },
                ]}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff4d4d" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ff4d4d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a4a7a" vertical={false} />
                  <XAxis dataKey="day" stroke="#3a6a8a" fontSize={10} />
                  <YAxis stroke="#3a6a8a" fontSize={10} />
                  <Tooltip />
                  <Area type="monotone" dataKey="val" stroke="#ff4d4d" fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div className="panel-title flex items-center gap-2">
              <Bell size={16} className="text-accent-red" />
              告警记录列表
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-text-dim" size={14} />
                <input type="text" placeholder="搜索告警内容..." className="bg-bg-deep border border-border-main rounded px-8 py-1 text-xs focus:outline-none focus:border-accent-main w-48" />
              </div>
              <select 
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="bg-bg-deep border border-border-main rounded px-3 py-1 text-xs text-text-secondary outline-none"
              >
                <option value="all">全部级别</option>
                <option value="high">高优先级</option>
                <option value="mid">中优先级</option>
              </select>
              <button className="px-3 py-1 bg-bg-deep border border-border-main rounded text-xs text-text-secondary hover:text-accent-main transition-colors flex items-center gap-1">
                <Download size={14} /> 导出
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-bg-panel/50 border-b border-border-main">
                  <th className="px-6 py-3 text-[11px] font-bold text-text-dim uppercase tracking-wider">类型</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-text-dim uppercase tracking-wider">告警级别</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-text-dim uppercase tracking-wider">告警标题</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-text-dim uppercase tracking-wider">发生时间</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-text-dim uppercase tracking-wider">详细描述</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-text-dim uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-text-dim uppercase tracking-wider text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-main/50">
                {alerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-accent-main/5 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs text-text-primary">{alert.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold",
                        alert.level === '高' ? "bg-accent-red/20 text-accent-red" : 
                        alert.level === '中' ? "bg-accent-yellow/20 text-accent-yellow" : "bg-accent-main/20 text-accent-main"
                      )}>{alert.level}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-medium text-text-primary">{alert.title}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[11px] text-text-dim font-mono">{alert.time}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-text-secondary line-clamp-1">{alert.desc}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          alert.status === '待处理' ? "bg-accent-red animate-pulse" :
                          alert.status === '处理中' ? "bg-accent-yellow" :
                          alert.status === '已处理' ? "bg-accent-green" : "bg-text-dim"
                        )} />
                        <span className="text-xs text-text-secondary">{alert.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-accent-main hover:underline text-xs font-medium">详情</button>
                      <button className="ml-3 text-text-dim hover:text-text-primary text-xs">忽略</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-border-main flex items-center justify-between text-[11px] text-text-dim">
            <div>显示 1 到 5 条，共 24 条记录</div>
            <div className="flex gap-2">
              <button className="px-2 py-1 rounded border border-border-main hover:bg-bg-panel disabled:opacity-50" disabled>上一页</button>
              <button className="px-2 py-1 rounded bg-accent-main text-bg-deep font-bold">1</button>
              <button className="px-2 py-1 rounded border border-border-main hover:bg-bg-panel">2</button>
              <button className="px-2 py-1 rounded border border-border-main hover:bg-bg-panel">下一页</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- 4. 数据统计 (Data Statistics) ---
  const DataStatsContent = () => {
    const stats = [
      { label: '累计农事任务', value: '1,428', unit: '项', change: '+12%', icon: <CheckCircle2 size={16} /> },
      { label: '农资投入总量', value: '85.4', unit: '吨', change: '+5.4%', icon: <Download size={16} /> },
      { label: '农机作业总时长', value: '3,240', unit: '小时', change: '+18%', icon: <Settings size={16} /> },
      { label: '专家咨询人次', value: '524', unit: '次', change: '+24%', icon: <Info size={16} /> },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="kpi-card flex justify-between items-center">
              <div>
                <div className="text-[11px] text-text-secondary mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-text-primary">{stat.value}<span className="text-xs ml-1 font-normal text-text-secondary">{stat.unit}</span></div>
                <div className="text-[10px] text-accent-green mt-1">较上月 {stat.change}</div>
              </div>
              <div className="p-2 bg-bg-panel rounded-lg text-accent-main">{stat.icon}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">各村农田建设进度对比</div>
              <button className="p-1 text-text-dim hover:text-accent-main"><Download size={14} /></button>
            </div>
            <div className="p-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: '西河村', val: 85 },
                  { name: '孙汪村', val: 72 },
                  { name: '辛榨社区', val: 94 },
                  { name: '四报村', val: 68 },
                  { name: '张付村', val: 78 },
                ]} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a4a7a" horizontal={false} />
                  <XAxis type="number" stroke="#3a6a8a" fontSize={10} domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" stroke="#3a6a8a" fontSize={10} width={60} />
                  <Tooltip />
                  <Bar dataKey="val" fill="#00d4ff" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">农机作业效率趋势</div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-[10px] text-text-dim"><div className="w-2 h-2 bg-accent-main rounded-full" /> 拖拉机</span>
                <span className="flex items-center gap-1 text-[10px] text-text-dim"><div className="w-2 h-2 bg-accent-green rounded-full" /> 无人机</span>
              </div>
            </div>
            <div className="p-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { time: '08:00', t: 45, d: 30 },
                  { time: '10:00', t: 85, d: 95 },
                  { time: '12:00', t: 60, d: 40 },
                  { time: '14:00', t: 90, d: 85 },
                  { time: '16:00', t: 75, d: 65 },
                  { time: '18:00', t: 30, d: 20 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a4a7a" vertical={false} />
                  <XAxis dataKey="time" stroke="#3a6a8a" fontSize={10} />
                  <YAxis stroke="#3a6a8a" fontSize={10} />
                  <Tooltip />
                  <Line type="monotone" dataKey="t" stroke="#00d4ff" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="d" stroke="#00ff9d" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">年度综合绩效评分</div>
          </div>
          <div className="p-6 grid grid-cols-4 gap-8">
            {[
              { label: '基础设施完备度', val: 92, color: 'text-accent-main' },
              { label: '数字化覆盖率', val: 84, color: 'text-accent-green' },
              { label: '资源利用效率', val: 78, color: 'text-accent-yellow' },
              { label: '综合管理水平', val: 88, color: 'text-accent-main' },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-3">
                <div className="relative w-24 h-24 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1a4a7a" strokeWidth="2.5" />
                    <motion.path 
                      initial={{ strokeDasharray: "0, 100" }}
                      animate={{ strokeDasharray: `${item.val}, 100` }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeDasharray={`${item.val}, 100`}
                      className={item.color}
                    />
                    <text x="18" y="20.35" className="text-[8px] font-bold fill-text-primary" textAnchor="middle">{item.val}</text>
                  </svg>
                </div>
                <div className="text-xs text-text-secondary font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">
            {activeItem === 'dash-overview' && '综合驾驶舱 · 辛榨乡片区'}
            {activeItem === 'dash-map' && '地图总览 · 辛榨乡数字化农田'}
            {activeItem === 'dash-alert' && '告警中心 · 实时监测预警'}
            {activeItem === 'dash-stats' && '数据统计 · 运行绩效分析'}
          </h1>
          <p className="text-xs text-text-dim mt-1">
            {activeItem === 'dash-overview' && '安陆市 / 辛榨乡 / 西河村 · 孙汪村 · 辛榨社区 | 高标准农田建设总面积 20,000 亩'}
            {activeItem === 'dash-map' && '基于高精度遥感与物联网传感器的全域数字化农田动态地图'}
            {activeItem === 'dash-alert' && '全天候实时监测气象、病虫害、设备状态及农事违规行为'}
            {activeItem === 'dash-stats' && '全乡农田建设、农事作业及资源投入的综合数据统计与绩效评估'}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded border border-border-glow text-accent-main bg-accent-main/10 text-xs hover:bg-accent-main/20 transition-colors">📥 导出报告</button>
          <button className="px-3 py-1.5 rounded bg-accent-main text-bg-deep font-bold text-xs hover:bg-accent-main/80 transition-colors">🔄 刷新数据</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeItem === 'dash-overview' && <OverviewContent />}
          {activeItem === 'dash-map' && <MapOverviewContent />}
          {activeItem === 'dash-alert' && <AlertCenterContent />}
          {activeItem === 'dash-stats' && <DataStatsContent />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
