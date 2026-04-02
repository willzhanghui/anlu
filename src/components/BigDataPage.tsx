import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  FlaskConical, SunMedium, FileText, TrendingUp, FileBarChart, 
  Download, Plus, Search, Filter, AlertTriangle, CheckCircle2, 
  Thermometer, Droplets, Wind, CloudRain, Info, ArrowUpRight, 
  ArrowDownRight, Calendar, Map as MapIcon, Lightbulb
} from 'lucide-react';

interface BigDataPageProps {
  activeItem: string;
}

export const BigDataPage: React.FC<BigDataPageProps> = ({ activeItem }) => {
  
  // --- 1. 土壤环境 (Soil Environment) ---
  const SoilContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '平均 pH 值', value: '6.8', unit: '', status: '适宜', color: 'text-accent-main' },
          { label: '有机质含量', value: '28.4', unit: 'g/kg', status: '中等', color: 'text-accent-green' },
          { label: '有效磷', value: '68', unit: 'mg/kg', status: '充足', color: 'text-accent-green' },
          { label: '速效钾', value: '142', unit: 'mg/kg', status: '较丰富', color: 'text-accent-yellow' },
        ].map((item, i) => (
          <div key={i} className="kpi-card">
            <div className="text-[11px] text-text-secondary mb-1">{item.label}</div>
            <div className="flex items-baseline gap-1">
              <div className={cn("text-2xl font-bold", item.color)}>{item.value}</div>
              <div className="text-[10px] text-text-dim">{item.unit}</div>
            </div>
            <div className="text-[10px] text-text-dim mt-1 flex items-center gap-1">
              <CheckCircle2 size={10} className="text-accent-green" /> {item.status}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 panel p-4">
          <div className="panel-header mb-4">
            <div className="panel-title">土壤肥力空间插值色斑图</div>
            <div className="flex gap-2">
              <select className="bg-bg-deep border border-border-main rounded px-2 py-0.5 text-[10px] text-text-secondary focus:outline-none">
                <option>有机质</option>
                <option>pH值</option>
                <option>全氮</option>
              </select>
            </div>
          </div>
          <div className="h-64 bg-bg-deep/50 rounded border border-border-main relative overflow-hidden flex items-center justify-center">
            {/* Mock Interpolation Map */}
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <defs>
                <radialGradient id="grad1" cx="30%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="rgba(0,255,157,0.4)" />
                  <stop offset="100%" stopColor="rgba(0,255,157,0)" />
                </radialGradient>
                <radialGradient id="grad2" cx="70%" cy="60%" r="40%">
                  <stop offset="0%" stopColor="rgba(255,184,0,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,184,0,0)" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="rgba(0,212,255,0.02)" />
              <circle cx="120" cy="80" r="60" fill="url(#grad1)" />
              <circle cx="280" cy="120" r="50" fill="url(#grad2)" />
              <path d="M 50,50 L 350,30 L 380,150 L 20,170 Z" fill="none" stroke="rgba(26,74,122,0.5)" strokeWidth="1" strokeDasharray="5,3" />
              {/* Data Points */}
              {[
                { x: 100, y: 60, v: '28.2' }, { x: 200, y: 40, v: '26.8' }, { x: 300, y: 80, v: '29.1' },
                { x: 150, y: 140, v: '27.5' }, { x: 250, y: 110, v: '25.4' }, { x: 80, y: 120, v: '28.8' }
              ].map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="2" fill="#00d4ff" />
                  <text x={p.x + 4} y={p.y + 3} fill="rgba(255,255,255,0.4)" fontSize="6">{p.v}</text>
                </g>
              ))}
            </svg>
            <div className="absolute bottom-2 right-2 flex flex-col gap-1">
              <div className="flex items-center gap-1 text-[8px] text-text-dim"><div className="w-2 h-2 bg-accent-green/40 rounded-full" /> 高含量区</div>
              <div className="flex items-center gap-1 text-[8px] text-text-dim"><div className="w-2 h-2 bg-accent-yellow/30 rounded-full" /> 低含量区</div>
            </div>
          </div>
        </div>

        <div className="panel p-4 flex flex-col">
          <div className="panel-header mb-4"><div className="panel-title">土壤改良建议</div></div>
          <div className="flex-1 space-y-4">
            <div className="p-3 bg-accent-main/5 rounded border border-accent-main/20">
              <div className="flex items-center gap-2 text-accent-main mb-2">
                <Lightbulb size={14} />
                <span className="text-[11px] font-bold">知识推理输出</span>
              </div>
              <p className="text-[10px] text-text-secondary leading-relaxed">
                检测到西河村3号地块有机质含量偏低（22.4g/kg），建议在下个播种季前增加绿肥种植或增施腐熟有机肥 500kg/亩。
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] text-text-dim uppercase tracking-wider">改良方案库</div>
              {[
                { title: '酸性土壤调理', desc: '施用生石灰或碱性肥料', tag: 'pH < 5.5' },
                { title: '盐碱地改良', desc: '深耕晒垡，增施石膏', tag: 'pH > 8.5' },
                { title: '培肥地力', desc: '秸秆还田，测土配方', tag: '通用' },
              ].map((item, i) => (
                <div key={i} className="p-2 rounded bg-bg-panel border border-border-main flex justify-between items-center">
                  <div>
                    <div className="text-[10px] font-bold text-text-primary">{item.title}</div>
                    <div className="text-[9px] text-text-dim">{item.desc}</div>
                  </div>
                  <span className="text-[8px] px-1 py-0.5 rounded bg-bg-deep text-text-dim border border-border-main">{item.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- 2. 气象分析 (Meteorological Analysis) ---
  const WeatherContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '实时气温', value: '18.5', unit: '°C', icon: <Thermometer size={16} />, color: 'text-accent-yellow' },
          { label: '相对湿度', value: '62', unit: '%', icon: <Droplets size={16} />, color: 'text-blue-400' },
          { label: '当前风速', value: '2.4', unit: 'm/s', icon: <Wind size={16} />, color: 'text-accent-main' },
          { label: '今日降水', value: '12.5', unit: 'mm', icon: <CloudRain size={16} />, color: 'text-accent-green' },
        ].map((item, i) => (
          <div key={i} className="kpi-card flex items-center gap-4">
            <div className={cn("p-2 rounded-lg bg-opacity-10", item.color.replace('text-', 'bg-'))}>
              <div className={item.color}>{item.icon}</div>
            </div>
            <div>
              <div className="text-[11px] text-text-secondary mb-0.5">{item.label}</div>
              <div className="text-xl font-bold text-text-primary">{item.value}<span className="text-xs ml-1 font-normal text-text-dim">{item.unit}</span></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 panel p-4">
          <div className="panel-header mb-4">
            <div className="panel-title">气象历史趋势分析与同比环比</div>
            <div className="flex gap-2">
              <button className="px-2 py-1 rounded bg-accent-main/10 border border-accent-main text-accent-main text-[10px]">气温</button>
              <button className="px-2 py-1 rounded border border-border-main text-text-secondary text-[10px]">降水</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { date: '03-26', current: 12, lastYear: 10 },
                { date: '03-27', current: 14, lastYear: 11 },
                { date: '03-28', current: 18, lastYear: 13 },
                { date: '03-29', current: 15, lastYear: 14 },
                { date: '03-30', current: 16, lastYear: 12 },
                { date: '03-31', current: 19, lastYear: 15 },
                { date: '04-01', current: 21, lastYear: 16 },
                { date: '04-02', current: 18, lastYear: 17 },
              ]}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a4a7a" vertical={false} />
                <XAxis dataKey="date" stroke="#3a6a8a" fontSize={10} />
                <YAxis stroke="#3a6a8a" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#081728', border: '1px solid #1a4a7a' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="current" name="2026年 (当前)" stroke="#00d4ff" fillOpacity={1} fill="url(#colorCurrent)" />
                <Line type="monotone" dataKey="lastYear" name="2025年 (同比)" stroke="#3a6a8a" strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-4 flex flex-col">
          <div className="panel-header mb-4"><div className="panel-title">极端天气预警模型</div></div>
          <div className="space-y-4 flex-1">
            <div className="p-3 bg-accent-red/10 border border-accent-red/30 rounded-lg">
              <div className="flex items-center gap-2 text-accent-red mb-2">
                <AlertTriangle size={16} />
                <span className="text-xs font-bold">倒春寒预警</span>
              </div>
              <p className="text-[10px] text-text-secondary leading-relaxed">
                模型预测未来48小时内气温将骤降 8-10°C，伴有 4-5 级北风。建议对处于分蘖期的早稻加强深水护苗。
              </p>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 py-1 rounded bg-accent-red text-white text-[10px] font-bold">一键推送告警</button>
                <button className="px-2 py-1 rounded border border-accent-red/30 text-accent-red text-[10px]">查看详情</button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-[10px] text-text-dim uppercase tracking-wider">作物生育期关联分析</div>
              <div className="p-3 bg-bg-panel rounded border border-border-main">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-text-primary">当前阶段：分蘖期</span>
                  <span className="text-[9px] text-accent-green">气象匹配度：高</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px]">
                    <span className="text-text-dim">有效积温需求</span>
                    <span className="text-text-secondary">450 / 600 °C</span>
                  </div>
                  <div className="h-1.5 bg-bg-deep rounded-full overflow-hidden">
                    <div className="h-full bg-accent-main" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- 3. 品种档案 (Variety Archives) ---
  const VarietyContent = () => (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">水稻品种档案人工录入与查询</div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-text-dim" size={14} />
            <input type="text" placeholder="搜索品种..." className="bg-bg-deep border border-border-main rounded px-8 py-1 text-xs focus:outline-none focus:border-accent-main w-48" />
          </div>
          <button className="px-3 py-1 bg-accent-main text-bg-deep rounded text-xs font-bold flex items-center gap-1 hover:bg-accent-main/80 transition-colors">
            <Plus size={14} /> 录入新品种
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] text-left">
          <thead className="bg-bg-card border-b border-border-main">
            <tr className="text-text-dim">
              <th className="p-3">品种名称</th>
              <th className="p-3">审定编号</th>
              <th className="p-3">类型</th>
              <th className="p-3">生育期 (天)</th>
              <th className="p-3">亩产 (kg)</th>
              <th className="p-3">抗性特征</th>
              <th className="p-3">主栽区域</th>
              <th className="p-3">当前种植面积</th>
              <th className="p-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-main/20">
            {[
              { name: '鄂中5号', id: '鄂审稻2019006', type: '早稻', period: 112, yield: 520, res: '抗稻瘟', area: '西河村', total: '1,200亩' },
              { name: '武运粳27', id: '国审稻2019022', type: '晚稻', period: 128, yield: 580, res: '高抗白叶枯', area: '孙汪村', total: '6,800亩' },
              { name: '郑麦379', id: '国审麦2018005', type: '冬小麦', period: 220, yield: 520, res: '中抗赤霉', area: '张付村', total: '920亩' },
              { name: '华油杂62', id: '鄂审油2016002', type: '油菜', period: 188, yield: 192, res: '强抗倒伏', area: '辛榨社区', total: '580亩' },
              { name: '两优688', id: '国审稻2020015', type: '中稻', period: 135, yield: 650, res: '耐高温', area: '全乡推广', total: '2,400亩' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-accent-main/5 text-text-secondary group transition-colors">
                <td className="p-3 font-bold text-text-primary group-hover:text-accent-main transition-colors">{row.name}</td>
                <td className="p-3">{row.id}</td>
                <td className="p-3">{row.type}</td>
                <td className="p-3">{row.period}</td>
                <td className="p-3 font-mono">{row.yield}</td>
                <td className="p-3">
                  <span className="px-1.5 py-0.5 rounded bg-accent-green/20 text-accent-green text-[9px]">{row.res}</span>
                </td>
                <td className="p-3">{row.area}</td>
                <td className="p-3 font-bold">{row.total}</td>
                <td className="p-3 text-right space-x-2">
                  <button className="text-accent-main hover:underline">编辑</button>
                  <button className="text-text-dim hover:text-text-primary">详情</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // --- 4. 产量分析 (Yield Analysis) ---
  const YieldContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="panel p-4">
          <div className="panel-header mb-4"><div className="panel-title">主栽品种产量占比</div></div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: '武运粳27', value: 45 },
                    { name: '两优688', value: 25 },
                    { name: '鄂中5号', value: 20 },
                    { name: '其他', value: 10 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {[
                    { color: '#00d4ff' }, { color: '#00ff9d' }, { color: '#ffb800' }, { color: '#3a6a8a' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#081728', border: '1px solid #1a4a7a' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-2 panel p-4">
          <div className="panel-header mb-4">
            <div className="panel-title">近五年全乡粮食总产量趋势</div>
            <div className="flex gap-2">
              <span className="text-[10px] text-accent-green">↑ 较去年增长 4.2%</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { year: '2021', yield: 4200 },
                { year: '2022', yield: 4500 },
                { year: '2023', yield: 4350 },
                { year: '2024', yield: 4800 },
                { year: '2025', yield: 5120 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a4a7a" vertical={false} />
                <XAxis dataKey="year" stroke="#3a6a8a" fontSize={10} />
                <YAxis stroke="#3a6a8a" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#081728', border: '1px solid #1a4a7a' }} />
                <Bar dataKey="yield" name="产量 (吨)" fill="#00d4ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="panel p-4">
        <div className="panel-header mb-4"><div className="panel-title">地块产量热力分布 (预测)</div></div>
        <div className="grid grid-cols-10 gap-1 h-32">
          {Array.from({ length: 50 }).map((_, i) => {
            const val = Math.random();
            const color = val > 0.8 ? 'bg-accent-green' : val > 0.5 ? 'bg-accent-main' : val > 0.3 ? 'bg-accent-yellow' : 'bg-bg-deep';
            return <div key={i} className={cn("rounded-sm", color)} title={`预测产量: ${(val * 800).toFixed(0)} kg/亩`} />;
          })}
        </div>
        <div className="flex justify-between mt-4 text-[9px] text-text-dim">
          <div className="flex gap-3">
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-bg-deep" /> &lt; 400kg</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-accent-yellow" /> 400-600kg</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-accent-main" /> 600-750kg</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-accent-green" /> &gt; 750kg</div>
          </div>
          <div>数据来源：长势监测模型推算</div>
        </div>
      </div>
    </div>
  );

  // --- 5. 分析报表 (Analysis Reports) ---
  const ReportContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded bg-accent-main text-bg-deep font-bold text-xs hover:bg-accent-main/80 transition-colors flex items-center gap-1">
            <Plus size={14} /> 生成新报表
          </button>
          <button className="px-3 py-1.5 rounded border border-border-main text-text-secondary text-xs hover:bg-bg-panel transition-colors">批量下载</button>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-dim">
          <Calendar size={14} /> 2026年3月 - 2026年4月
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: '2026年春季土壤肥力分析报告', date: '2026-03-25', type: '土壤分析', size: '2.4MB', status: '已生成' },
          { title: '辛榨乡3月气象月报', date: '2026-04-01', type: '气象监测', size: '1.8MB', status: '已生成' },
          { title: '早稻分蘖期长势评估报告', date: '2026-04-02', type: '长势监测', size: '3.2MB', status: '处理中' },
          { title: '2025年度全乡粮食产量统计', date: '2026-01-15', type: '产量统计', size: '5.6MB', status: '已生成' },
          { title: '病虫害发生趋势预测周报 (W14)', date: '2026-04-02', type: '预警分析', size: '1.2MB', status: '已生成' },
        ].map((report, i) => (
          <div key={i} className="panel p-4 group hover:border-accent-main transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded bg-accent-main/10 text-accent-main group-hover:bg-accent-main group-hover:text-bg-deep transition-colors">
                <FileText size={20} />
              </div>
              <span className={cn(
                "px-1.5 py-0.5 rounded text-[9px]",
                report.status === '已生成' ? "bg-accent-green/20 text-accent-green" : "bg-accent-yellow/20 text-accent-yellow"
              )}>{report.status}</span>
            </div>
            <h3 className="text-xs font-bold text-text-primary mb-1 group-hover:text-accent-main transition-colors">{report.title}</h3>
            <div className="flex justify-between text-[10px] text-text-dim mt-4">
              <div className="flex gap-3">
                <span>{report.type}</span>
                <span>{report.size}</span>
              </div>
              <span>{report.date}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-border-main/50 flex justify-between">
              <button className="text-[10px] text-text-dim hover:text-accent-main flex items-center gap-1">
                <Info size={12} /> 预览
              </button>
              <button className="text-[10px] text-accent-main hover:underline flex items-center gap-1">
                <Download size={12} /> 下载 PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Render Logic ---
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">农业大数据分析系统</h1>
          <p className="text-xs text-text-dim mt-1">
            {activeItem === 'data-soil' && '土壤 pH/有机质/氮磷钾传感器数据接入解析 · 肥力分级 · 改良建议'}
            {activeItem === 'data-weather' && '田间小气候站实时监测 · 历史趋势对比 · 极端天气预警模型'}
            {activeItem === 'data-variety' && '水稻品种档案库 · 审定编号 · 生育期与亩产查询'}
            {activeItem === 'data-yield' && '粮食产量趋势分析 · 品种产量占比 · 地块产量预测热力图'}
            {activeItem === 'data-report' && '多维度分析报表 · 自动化生成 · 导出与下载中心'}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded border border-border-glow text-accent-main bg-accent-main/10 text-xs hover:bg-accent-main/20 transition-colors">📊 全局数据概览</button>
          <button className="px-3 py-1.5 rounded bg-accent-main text-bg-deep font-bold text-xs hover:bg-accent-main/80 transition-colors">🔄 实时同步</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeItem === 'data-soil' && <SoilContent />}
          {activeItem === 'data-weather' && <WeatherContent />}
          {activeItem === 'data-variety' && <VarietyContent />}
          {activeItem === 'data-yield' && <YieldContent />}
          {activeItem === 'data-report' && <ReportContent />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
