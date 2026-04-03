import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, AreaChart, Area
} from 'recharts';
import { Map as MapIcon, Grid3X3, Sprout, CloudSun, Bug, Droplets, Satellite, Info, AlertTriangle } from 'lucide-react';

interface ParkManagementPageProps {
  activeItem: string;
}

export const ParkManagementPage: React.FC<ParkManagementPageProps> = ({ activeItem }) => {
  
  // --- 1. 园区概览 (Overview) ---
  const OverviewContent = () => {
    const kpis = [
      { label: '智慧农田核心区', value: '500', unit: '亩', icon: <MapIcon className="text-accent-main" /> },
      { label: '辐射带动区', value: '2000', unit: '亩', icon: <Sprout className="text-accent-green" /> },
      { label: '物联网监测站', value: '25', unit: '套', icon: <Grid3X3 className="text-accent-yellow" /> },
      { label: '智能控制水闸', value: '25', unit: '套', icon: <Info className="text-accent-main" /> },
    ];

    const yieldTrend = [
      { year: '2021', yield: 4200, value: 3800 },
      { year: '2022', yield: 4500, value: 4100 },
      { year: '2023', yield: 4800, value: 4400 },
      { year: '2024', yield: 5200, value: 4820 },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <div key={i} className="kpi-card">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[11px] text-text-secondary mb-1">{kpi.label}</div>
                  <div className="text-2xl font-bold text-accent-main">{kpi.value}<span className="text-xs ml-1 font-normal text-text-secondary">{kpi.unit}</span></div>
                </div>
                <div className="p-2 bg-bg-panel rounded-lg">{kpi.icon}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="panel p-4">
            <div className="panel-header mb-4"><div className="panel-title">园区产值/产量趋势</div></div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yieldTrend}>
                  <defs>
                    <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a4a7a" vertical={false} />
                  <XAxis dataKey="year" stroke="#3a6a8a" fontSize={10} />
                  <YAxis stroke="#3a6a8a" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#081728', border: '1px solid #1a4a7a' }} />
                  <Area type="monotone" dataKey="value" name="产值(万元)" stroke="#00d4ff" fillOpacity={1} fill="url(#colorYield)" />
                  <Area type="monotone" dataKey="yield" name="产量(吨)" stroke="#00ff9d" fill="transparent" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="panel p-4">
            <div className="panel-header mb-4"><div className="panel-title">基础设施建设概况</div></div>
            <div className="space-y-4">
              {['坑塘整治 (11口)', '渠道硬化 (300m)', '塘堤加固 (579m)', '新建泵站 (1座)'].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">{item}</span>
                    <span className="text-accent-main">建设完成 100%</span>
                  </div>
                  <div className="h-1.5 bg-border-main rounded-full overflow-hidden">
                    <div className="h-full bg-accent-main" style={{ width: '100%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- 2. 地块分布 (Map) ---
  const MapContent = () => (
    <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      <div className="col-span-2 panel relative overflow-hidden">
        <div className="panel-header absolute top-0 left-0 right-0 z-10 bg-bg-card/80 backdrop-blur-md">
          <div className="panel-title">地块分布与空间分析</div>
          <div className="flex gap-2">
            <button className="px-2 py-1 rounded bg-accent-main text-bg-deep text-[10px] font-bold">卫星影像</button>
            <button className="px-2 py-1 rounded border border-border-main text-text-secondary text-[10px]">矢量地块</button>
          </div>
        </div>
        <div className="w-full h-full bg-bg-deep flex items-center justify-center">
          <svg className="w-full h-full max-h-[500px]" viewBox="0 0 500 300">
              {[
                { p: "50,50 150,40 180,100 120,130 40,120", id: "下陈塆-01", area: "120亩", crop: "水稻" },
                { p: "160,45 280,35 300,90 220,120 170,100", id: "下陈塆-02", area: "240亩", crop: "水稻" },
                { p: "290,40 400,50 420,110 330,130 290,100", id: "下陈塆-05", area: "180亩", crop: "小麦" },
                { p: "60,140 160,135 180,200 110,220 50,190", id: "辐射区-03", area: "150亩", crop: "油菜" },
                { p: "190,130 300,125 320,210 210,230 175,200", id: "辐射区-01", area: "310亩", crop: "水稻" },
              ].map((field, i) => (
              <motion.polygon 
                key={i}
                points={field.p}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="fill-accent-main/10 stroke-accent-main/40 hover:fill-accent-main/30 hover:stroke-accent-main transition-all cursor-pointer"
                onClick={() => alert(`地块详情\n编号: ${field.id}\n面积: ${field.area}\n作物: ${field.crop}`)}
              />
            ))}
          </svg>
          <div className="absolute bottom-4 right-4 bg-bg-panel/90 p-3 rounded border border-border-main text-[10px] space-y-2">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-accent-main/30 border border-accent-main" /> 水稻种植区</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-accent-yellow/30 border border-accent-yellow" /> 小麦种植区</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-accent-green/30 border border-accent-green" /> 油菜种植区</div>
          </div>
        </div>
      </div>
      <div className="panel flex flex-col">
        <div className="panel-header"><div className="panel-title">地块详情列表</div></div>
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-[11px] text-left">
            <thead className="sticky top-0 bg-bg-card border-b border-border-main">
              <tr className="text-text-dim">
                <th className="p-3">编号</th>
                <th className="p-3">面积</th>
                <th className="p-3">作物</th>
                <th className="p-3">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main/20">
              {Array.from({ length: 15 }).map((_, i) => (
                <tr key={i} className="hover:bg-accent-main/5 text-text-secondary cursor-pointer">
                  <td className="p-3">XZ-F-{100 + i}</td>
                  <td className="p-3">{Math.floor(Math.random() * 200 + 50)}亩</td>
                  <td className="p-3">{['水稻', '小麦', '油菜'][i % 3]}</td>
                  <td className="p-3"><span className="text-accent-green">正常</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // --- 3. 种植结构 (Crop Structure) ---
  const CropContent = () => {
    const pieData = [
      { name: '水稻', value: 8800, color: '#00d4ff' },
      { name: '小麦', value: 4600, color: '#ffb800' },
      { name: '油菜', value: 3700, color: '#00ff9d' },
      { name: '其他', value: 1500, color: '#3a6a8a' },
    ];

    return (
      <div className="grid grid-cols-3 gap-6">
        <div className="panel p-4">
          <div className="panel-header mb-4"><div className="panel-title">种植品种占比</div></div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#081728', border: '1px solid #1a4a7a' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-text-secondary">{item.name}:</span>
                <span className="text-text-primary font-bold">{((item.value / 18600) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 panel p-4">
          <div className="panel-header mb-4"><div className="panel-title">分村种植面积统计 (亩)</div></div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: '西河村', rice: 2800, wheat: 800, rape: 600 },
                { name: '孙汪村', rice: 1200, wheat: 1000, rape: 900 },
                { name: '辛榨社区', rice: 1500, wheat: 1200, rape: 900 },
                { name: '张付村', rice: 1800, wheat: 500, rape: 500 },
                { name: '四报村', rice: 1500, wheat: 1100, rape: 800 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a4a7a" vertical={false} />
                <XAxis dataKey="name" stroke="#3a6a8a" fontSize={10} />
                <YAxis stroke="#3a6a8a" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#081728', border: '1px solid #1a4a7a' }} />
                <Bar dataKey="rice" name="水稻" fill="#00d4ff" stackId="a" />
                <Bar dataKey="wheat" name="小麦" fill="#ffb800" stackId="a" />
                <Bar dataKey="rape" name="油菜" fill="#00ff9d" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  // --- 4. 气象监测 (Weather) ---
  const WeatherContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '风速 (Wind)', value: '3.2', unit: 'm/s', sub: '东北风 NE', color: 'text-accent-main' },
          { label: '温湿度 (Temp/Hum)', value: '18.4', unit: '°C / 76%', sub: '适宜生长', color: 'text-accent-green' },
          { label: '降水量 (Rain)', value: '6.8', unit: 'mm', sub: '今日累计', color: 'text-accent-yellow' },
          { label: '光照强度 (Lux)', value: '42', unit: 'klux', sub: '晴天', color: 'text-accent-main' },
        ].map((item, i) => (
          <div key={i} className="panel p-4 text-center">
            <div className="text-[10px] text-text-dim mb-2 uppercase tracking-wider">{item.label}</div>
            <div className={cn("text-3xl font-bold", item.color)}>{item.value}<span className="text-sm ml-1 font-normal text-text-secondary">{item.unit}</span></div>
            <div className="text-[10px] text-text-dim mt-2">{item.sub}</div>
          </div>
        ))}
      </div>
      <div className="panel p-4">
        <div className="panel-header mb-4"><div className="panel-title">24小时气象趋势监测</div></div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={Array.from({ length: 24 }).map((_, i) => ({
              time: `${i}:00`,
              temp: 15 + Math.sin(i / 4) * 5 + Math.random() * 2,
              rain: Math.random() > 0.8 ? Math.random() * 5 : 0
            }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a4a7a" vertical={false} />
              <XAxis dataKey="time" stroke="#3a6a8a" fontSize={10} interval={3} />
              <YAxis yAxisId="left" stroke="#3a6a8a" fontSize={10} />
              <YAxis yAxisId="right" orientation="right" stroke="#3a6a8a" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#081728', border: '1px solid #1a4a7a' }} />
              <Line yAxisId="left" type="monotone" dataKey="temp" name="气温(°C)" stroke="#ffb800" dot={false} strokeWidth={2} />
              <Bar yAxisId="right" dataKey="rain" name="降雨(mm)" fill="#00d4ff" opacity={0.5} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  // --- 5. 虫情监测 (Pest) ---
  const PestContent = () => (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 panel">
        <div className="panel-header">
          <div className="panel-title">虫情图像采集与智能识别</div>
          <span className="px-2 py-0.5 rounded bg-accent-green/20 text-accent-green text-[10px]">AI 引擎在线</span>
        </div>
        <div className="p-4 grid grid-cols-2 gap-4">
          {[
            { id: 'IC-001', time: '14:32', result: '纹枯病', conf: '92%', img: 'https://picsum.photos/seed/pest1/400/300' },
            { id: 'IC-002', time: '14:28', result: '稻飞虱', conf: '88%', img: 'https://picsum.photos/seed/pest2/400/300' },
            { id: 'IC-003', time: '14:15', result: '正常', conf: '99%', img: 'https://picsum.photos/seed/pest3/400/300' },
            { id: 'IC-004', time: '13:50', result: '稻纵卷叶螟', conf: '85%', img: 'https://picsum.photos/seed/pest4/400/300' },
          ].map((item, i) => (
            <div key={i} className="bg-bg-panel rounded-lg border border-border-main overflow-hidden group cursor-pointer">
              <div className="aspect-video relative">
                <img src={item.img} alt="pest" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 rounded text-[9px] text-white">设备: {item.id}</div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-accent-main/80 rounded text-[9px] text-bg-deep font-bold">置信度: {item.conf}</div>
              </div>
              <div className="p-3 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-text-primary">{item.result}</div>
                  <div className="text-[10px] text-text-dim mt-1">抓拍时间: {item.time}</div>
                </div>
                <button className="px-2 py-1 rounded bg-accent-main/10 border border-accent-main text-accent-main text-[10px]">查看详情</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="panel">
        <div className="panel-header"><div className="panel-title">病虫害预警推送</div></div>
        <div className="p-4 space-y-4">
          {[
            { title: '纹枯病风险预警', level: '橙色', loc: '孙汪村2号地块', time: '10分钟前' },
            { title: '稻飞虱局部爆发', level: '红色', loc: '西河村4号地块', time: '1小时前' },
            { title: '螟虫迁飞预警', level: '黄色', loc: '全乡范围', time: '3小时前' },
          ].map((alert, i) => (
            <div key={i} className={cn(
              "p-3 rounded-md border-l-3",
              alert.level === '红色' ? "bg-accent-red/10 border-accent-red" : 
              alert.level === '橙色' ? "bg-accent-yellow/10 border-accent-yellow" : "bg-accent-main/10 border-accent-main"
            )}>
              <div className="flex justify-between">
                <span className="text-xs font-bold text-text-primary">{alert.title}</span>
                <span className="text-[9px] text-text-dim">{alert.time}</span>
              </div>
              <div className="text-[10px] text-text-secondary mt-1">位置: {alert.loc}</div>
              <button className="mt-2 text-[10px] text-accent-main underline">派发防治任务</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --- 6. 土壤墒情 (Soil) ---
  const SoilContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 panel p-4">
          <div className="panel-header mb-4"><div className="panel-title">土壤水分多层监测曲线 (%)</div></div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={Array.from({ length: 12 }).map((_, i) => ({
                time: `${i*2}h`,
                v10: 65 + Math.random() * 5,
                v20: 70 + Math.random() * 3,
                v40: 75 + Math.random() * 2,
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a4a7a" vertical={false} />
                <XAxis dataKey="time" stroke="#3a6a8a" fontSize={10} />
                <YAxis stroke="#3a6a8a" fontSize={10} domain={[50, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#081728', border: '1px solid #1a4a7a' }} />
                <Line type="monotone" dataKey="v10" name="10cm水分" stroke="#00d4ff" strokeWidth={2} />
                <Line type="monotone" dataKey="v20" name="20cm水分" stroke="#00ff9d" strokeWidth={2} />
                <Line type="monotone" dataKey="v40" name="40cm水分" stroke="#ffb800" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="panel p-4">
          <div className="panel-header mb-4"><div className="panel-title">墒情阈值预警设置</div></div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-text-secondary">低限预警 (灌溉阈值)</span>
                <span className="text-accent-yellow">60%</span>
              </div>
              <input type="range" className="w-full h-1 bg-border-main rounded-lg appearance-none cursor-pointer accent-accent-yellow" defaultValue={60} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-text-secondary">高限预警 (排水阈值)</span>
                <span className="text-accent-red">85%</span>
              </div>
              <input type="range" className="w-full h-1 bg-border-main rounded-lg appearance-none cursor-pointer accent-accent-red" defaultValue={85} />
            </div>
            <div className="h-px bg-border-main opacity-30 my-4" />
            <div className="p-3 bg-accent-main/5 rounded-md border border-accent-main/20">
              <div className="text-[11px] text-accent-main font-bold flex items-center gap-2">
                <AlertTriangle size={14} /> 当前状态: 孙汪村B区偏低
              </div>
              <div className="text-[10px] text-text-secondary mt-1">当前值 52%，已触发自动灌溉建议。</div>
              <button className="mt-3 w-full py-1.5 rounded bg-accent-main text-bg-deep font-bold text-[10px]">开启远程灌溉</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- 7. 长势监测 (NDVI) ---
  const NDVIContent = () => (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 panel p-4">
        <div className="panel-header mb-4">
          <div className="panel-title">NDVI 植被指数分级色斑图</div>
          <div className="flex gap-2">
            <span className="text-[10px] text-text-dim">影像日期: 2026-03-28</span>
          </div>
        </div>
        <div className="grid grid-cols-10 gap-1 aspect-[2/1] bg-bg-deep rounded overflow-hidden p-2">
          {Array.from({ length: 50 }).map((_, i) => {
            const colors = ['#b22222', '#ff8c00', '#ffd700', '#00aa44', '#006400'];
            const color = colors[Math.floor((Math.sin(i/2) + 1) * 2)];
            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.01 }}
                className="rounded-sm cursor-pointer hover:brightness-125 transition-all" 
                style={{ backgroundColor: color }} 
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-4 px-2">
          <div className="flex gap-4 text-[9px] text-text-dim">
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#b22222]" /> 极差</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#ff8c00]" /> 较差</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#ffd700]" /> 一般</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#00aa44]" /> 良好</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#006400]" /> 极佳</div>
          </div>
          <div className="text-[10px] text-accent-main">平均 NDVI: 0.68 (良好)</div>
        </div>
      </div>
      <div className="panel p-4">
        <div className="panel-header mb-4"><div className="panel-title">作物物候历自动生成</div></div>
        <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-border-main">
          {[
            { label: '播种期', date: '03-20 ~ 03-28', status: 'done' },
            { label: '秧苗期', date: '03-29 ~ 04-20', status: 'active' },
            { label: '分蘖期', date: '04-21 ~ 05-25', status: 'todo' },
            { label: '孕穗期', date: '05-26 ~ 06-20', status: 'todo' },
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className={cn(
                "absolute -left-[23px] top-1 w-4 h-4 rounded-full border-2 bg-bg-card",
                item.status === 'done' ? "border-accent-green bg-accent-green" : 
                item.status === 'active' ? "border-accent-main animate-pulse" : "border-border-main"
              )} />
              <div className="flex justify-between items-center">
                <span className={cn("text-xs font-bold", item.status === 'active' ? "text-accent-main" : "text-text-secondary")}>{item.label}</span>
                <span className="text-[10px] text-text-dim">{item.date}</span>
              </div>
              {item.status === 'active' && (
                <div className="mt-2 p-2 bg-accent-main/5 rounded text-[10px] text-text-secondary">
                  当前长势正常，建议加强水分管理。
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --- Render Logic ---
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">现代农业园区管理系统</h1>
          <p className="text-xs text-text-dim mt-1">
            {activeItem === 'park-overview' && '园区概览驾驶舱 · 数据汇聚展示'}
            {activeItem === 'park-map' && '地块分布与空间分析 · 矢量化管理'}
            {activeItem === 'park-crop' && '种植结构统计分析 · 品种分布统计'}
            {activeItem === 'park-weather' && '气象监测数据接入 · 实时环境展示'}
            {activeItem === 'park-pest' && '虫情监测图像采集 · 智能 AI 识别'}
            {activeItem === 'park-soil' && '土壤墒情监测可视化 · 阈值预警'}
            {activeItem === 'park-ndvi' && '农作物长势监测 · NDVI 遥感分析'}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded border border-border-glow text-accent-main bg-accent-main/10 text-xs hover:bg-accent-main/20 transition-colors">📥 导出数据</button>
          <button className="px-3 py-1.5 rounded bg-accent-main text-bg-deep font-bold text-xs hover:bg-accent-main/80 transition-colors">🔄 刷新</button>
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
          {activeItem === 'park-overview' && <OverviewContent />}
          {activeItem === 'park-map' && <MapContent />}
          {activeItem === 'park-crop' && <CropContent />}
          {activeItem === 'park-weather' && <WeatherContent />}
          {activeItem === 'park-pest' && <PestContent />}
          {activeItem === 'park-soil' && <SoilContent />}
          {activeItem === 'park-ndvi' && <NDVIContent />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
