import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, AreaChart, Area, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { 
  Navigation, Truck, ClipboardList, PieChart as ChartIcon, Wrench, 
  Plus, Search, Filter, MoreVertical, AlertCircle, CheckCircle2, 
  Clock, ArrowRight, ShieldCheck, FileText, MapPin, Activity,
  TrendingUp, Settings, Zap, Fuel, Gauge, Power, ShieldAlert,
  Target, MousePointer2, Layers, Play, Square, RotateCcw
} from 'lucide-react';

interface MachineManagementPageProps {
  activeItem: string;
}

export const MachineManagementPage: React.FC<MachineManagementPageProps> = ({ activeItem }) => {
  
  // --- 1. 实时轨迹 (Real-time Trajectory) ---
  const MapContent = () => (
    <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      <div className="col-span-2 panel relative overflow-hidden bg-bg-deep/30">
        <div className="panel-header absolute top-0 left-0 right-0 z-10 bg-bg-card/80 backdrop-blur-md">
          <div className="panel-title flex items-center gap-2">
            <Navigation size={16} className="text-accent-main" />
            北斗/GPS 实时轨迹渲染
          </div>
          <div className="flex gap-2">
            <button className="px-2 py-1 rounded bg-accent-main text-bg-deep text-[10px] font-bold">实时追踪</button>
            <button className="px-2 py-1 rounded border border-border-main text-text-secondary text-[10px]">历史回放</button>
          </div>
        </div>
        
        <div className="w-full h-full flex items-center justify-center relative">
          {/* Mock Map Background */}
          <svg className="w-full h-full opacity-40" viewBox="0 0 800 500">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a4a7a" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Field Outlines */}
            <path d="M 100,100 L 300,80 L 350,250 L 120,280 Z" fill="rgba(0,212,255,0.05)" stroke="#1a4a7a" strokeWidth="1" />
            <path d="M 400,50 L 650,70 L 680,220 L 420,240 Z" fill="rgba(0,212,255,0.05)" stroke="#1a4a7a" strokeWidth="1" />
            
            {/* Trajectory 1 */}
            <motion.path 
              d="M 120,110 L 280,95 L 285,110 L 125,125 L 130,140 L 290,125 L 295,140 L 135,155" 
              fill="none" 
              stroke="#00ff9d" 
              strokeWidth="2" 
              strokeDasharray="1000"
              initial={{ strokeDashoffset: 1000 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Machine Icon 1 */}
            <motion.g
              initial={{ x: 120, y: 110 }}
              animate={{ 
                x: [120, 280, 285, 125, 130, 290, 295, 135],
                y: [110, 95, 110, 125, 140, 125, 140, 155],
                rotate: [-5, -5, 90, 175, 90, -5, 90, 175]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <circle r="8" fill="#00ff9d" className="animate-pulse" />
              <path d="M -5,-5 L 10,0 L -5,5 Z" fill="#00ff9d" />
            </motion.g>

            {/* Trajectory 2 (Drone) */}
            <motion.path 
              d="M 450,80 C 550,60 600,150 500,200 S 400,100 450,80" 
              fill="none" 
              stroke="#00d4ff" 
              strokeWidth="1.5" 
              strokeDasharray="5,5"
            />
            <motion.circle 
              r="4" 
              fill="#00d4ff"
              animate={{ 
                offsetDistance: ["0%", "100%"] 
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ offsetPath: "path('M 450,80 C 550,60 600,150 500,200 S 400,100 450,80')" }}
            />
          </svg>

          {/* Floating Controls */}
          <div className="absolute bottom-6 left-6 space-y-3">
            <div className="bg-bg-card/90 backdrop-blur-md p-4 rounded-lg border border-border-main shadow-xl w-64">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-bold text-text-primary">XZ-001 远程控制</div>
                <span className="px-1.5 py-0.5 rounded bg-accent-green/20 text-accent-green text-[9px]">在线</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 py-2 rounded bg-accent-green/20 border border-accent-green/40 text-accent-green text-[10px] font-bold hover:bg-accent-green/30 transition-colors">
                  <Power size={12} /> 远程点火
                </button>
                <button className="flex items-center justify-center gap-2 py-2 rounded bg-accent-red/20 border border-accent-red/40 text-accent-red text-[10px] font-bold hover:bg-accent-red/30 transition-colors">
                  <Power size={12} /> 远程熄火
                </button>
                <button className="col-span-2 flex items-center justify-center gap-2 py-2 rounded bg-accent-yellow/20 border border-accent-yellow/40 text-accent-yellow text-[10px] font-bold hover:bg-accent-yellow/30 transition-colors">
                  <ShieldAlert size={12} /> 紧急安全制动
                </button>
              </div>
            </div>
          </div>

          {/* Floating Stats */}
          <div className="absolute top-20 right-6 space-y-3">
            {[
              { label: '实时速度', value: '3.8', unit: 'km/h', icon: <Gauge size={14} /> },
              { label: '当前姿态', value: 'Pitch: 2.1°', unit: 'Roll: 0.5°', icon: <Activity size={14} /> },
              { label: '卫星颗数', value: '18', unit: '颗', icon: <Target size={14} /> },
            ].map((stat, i) => (
              <div key={i} className="bg-bg-card/80 backdrop-blur-sm p-3 rounded border border-border-main flex items-center gap-3 w-40">
                <div className="p-1.5 bg-accent-main/10 rounded text-accent-main">{stat.icon}</div>
                <div>
                  <div className="text-[9px] text-text-dim uppercase">{stat.label}</div>
                  <div className="text-xs font-bold text-text-primary">{stat.value} <span className="text-[9px] font-normal text-text-dim">{stat.unit}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel flex flex-col">
        <div className="panel-header">
          <div className="panel-title">实时作业看板</div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[
            { name: 'XZ-001 无人插秧机', status: '作业中', area: '124.5亩', fuel: '68%', speed: '3.8km/h', loc: '下陈塆村A区' },
            { name: 'XZ-007 无人植保机', status: '作业中', area: '86.2亩', fuel: '42%', speed: '8.2m/s', loc: '下陈塆村2号地' },
            { name: 'XZ-003 无人收割机', status: '待机', area: '0.0亩', fuel: '92%', speed: '0.0km/h', loc: '机库' },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg border border-border-main bg-bg-panel/50 hover:border-accent-main transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <div className="text-xs font-bold text-text-primary group-hover:text-accent-main transition-colors">{item.name}</div>
                <span className={cn(
                  "px-1.5 py-0.5 rounded text-[9px]",
                  item.status === '作业中' ? "bg-accent-green/20 text-accent-green" : "bg-text-dim/20 text-text-dim"
                )}>{item.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-[10px]">
                <div className="text-text-secondary flex items-center gap-1"><MapPin size={10} /> {item.loc}</div>
                <div className="text-text-secondary flex items-center gap-1"><TrendingUp size={10} /> {item.area}</div>
                <div className="text-text-secondary flex items-center gap-1"><Fuel size={10} /> {item.fuel}</div>
                <div className="text-text-secondary flex items-center gap-1"><Gauge size={10} /> {item.speed}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --- 2. 农机台账 (Machine Ledger) ---
  const LedgerContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '农机总数', value: '6', unit: '台', icon: <Truck className="text-accent-main" /> },
          { label: '巡检/植保无人机', value: '2', unit: '台', icon: <Activity className="text-accent-green" /> },
          { label: '无人收割机', value: '1', unit: '台', icon: <Clock className="text-accent-yellow" /> },
          { label: '调播机', value: '3', unit: '台', icon: <AlertCircle className="text-accent-red" /> },
        ].map((item, i) => (
          <div key={i} className="kpi-card flex justify-between items-center">
            <div>
              <div className="text-[11px] text-text-secondary mb-1">{item.label}</div>
              <div className="text-2xl font-bold text-text-primary">{item.value}<span className="text-xs ml-1 font-normal text-text-secondary">{item.unit}</span></div>
            </div>
            <div className="p-2 bg-bg-panel rounded-lg">{item.icon}</div>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">农机档案与基础信息维护</div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-text-dim" size={14} />
              <input type="text" placeholder="搜索农机..." className="bg-bg-deep border border-border-main rounded px-8 py-1 text-xs focus:outline-none focus:border-accent-main w-48" />
            </div>
            <button className="px-3 py-1 bg-accent-main text-bg-deep rounded text-xs font-bold flex items-center gap-1 hover:bg-accent-main/80 transition-colors">
              <Plus size={14} /> 新增农机
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left">
            <thead className="bg-bg-card border-b border-border-main">
              <tr className="text-text-dim">
                <th className="p-3">农机编号</th>
                <th className="p-3">名称/型号</th>
                <th className="p-3">类型</th>
                <th className="p-3">绑定操作员</th>
                <th className="p-3">资质状态</th>
                <th className="p-3">最后作业日期</th>
                <th className="p-3">状态</th>
                <th className="p-3 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main/20">
              {[
                { id: 'XZ-001', name: '无人插秧机 XZ-PRO', type: '插秧机', operator: '张建国', cert: '已认证', date: '2026-04-02', status: '作业中' },
                { id: 'XZ-007', name: '无人植保机 Fly-X', type: '植保机', operator: '李明', cert: '已认证', date: '2026-04-02', status: '作业中' },
                { id: 'XZ-003', name: '无人收割机 Harvest-V', type: '收割机', operator: '王芳', cert: '已认证', date: '2026-03-28', status: '待机' },
                { id: 'XZ-005', name: '智能旋耕机 Tiller-S', type: '旋耕机', operator: '赵勇', cert: '审核中', date: '2026-03-25', status: '保养中' },
              ].map((mach, i) => (
                <tr key={i} className="hover:bg-accent-main/5 text-text-secondary group transition-colors">
                  <td className="p-3 font-mono">{mach.id}</td>
                  <td className="p-3 font-bold text-text-primary group-hover:text-accent-main transition-colors">{mach.name}</td>
                  <td className="p-3">{mach.type}</td>
                  <td className="p-3">{mach.operator}</td>
                  <td className="p-3">
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-[9px]",
                      mach.cert === '已认证' ? "bg-accent-green/20 text-accent-green" : "bg-accent-yellow/20 text-accent-yellow"
                    )}>{mach.cert}</span>
                  </td>
                  <td className="p-3">{mach.date}</td>
                  <td className="p-3">
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-[9px]",
                      mach.status === '作业中' ? "bg-accent-green/20 text-accent-green" : 
                      mach.status === '保养中' ? "bg-accent-yellow/20 text-accent-yellow" : "bg-text-dim/20 text-text-dim"
                    )}>{mach.status}</span>
                  </td>
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
    </div>
  );

  // --- 3. 作业任务 (Operation Tasks) ---
  const TasksContent = () => (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 panel">
        <div className="panel-header">
          <div className="panel-title">农机作业路径规划与任务编排</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-accent-main text-bg-deep rounded text-xs font-bold hover:bg-accent-main/80 transition-colors flex items-center gap-1">
              <Plus size={14} /> 新建任务
            </button>
          </div>
        </div>
        <div className="p-0">
          <table className="w-full text-[11px] text-left">
            <thead className="bg-bg-card border-b border-border-main">
              <tr className="text-text-dim">
                <th className="p-3">任务编号</th>
                <th className="p-3">任务名称</th>
                <th className="p-3">执行农机</th>
                <th className="p-3">路径模式</th>
                <th className="p-3">进度</th>
                <th className="p-3">状态</th>
                <th className="p-3 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main/20">
              {[
                { id: 'MT-20260402-01', name: '下陈塆村A区插秧作业', mach: 'XZ-001', mode: '往复式', progress: 82, status: '执行中' },
                { id: 'MT-20260402-02', name: '下陈塆村2号地植保喷洒', mach: 'XZ-007', mode: '全覆盖', progress: 60, status: '执行中' },
                { id: 'MT-20260401-05', name: '下陈塆村小麦收割', mach: 'XZ-003', mode: '螺旋式', progress: 100, status: '已完成' },
                { id: 'MT-20260403-01', name: '下陈塆村土地平整', mach: 'XZ-005', mode: '对角线', progress: 0, status: '待下发' },
              ].map((task, i) => (
                <tr key={i} className="hover:bg-accent-main/5 text-text-secondary group transition-colors">
                  <td className="p-3 font-mono">{task.id}</td>
                  <td className="p-3 font-bold text-text-primary group-hover:text-accent-main transition-colors">{task.name}</td>
                  <td className="p-3">{task.mach}</td>
                  <td className="p-3">{task.mode}</td>
                  <td className="p-3 w-32">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-border-main rounded-full overflow-hidden">
                        <div className="h-full bg-accent-main" style={{ width: `${task.progress}%` }} />
                      </div>
                      <span className="text-[9px]">{task.progress}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-[9px]",
                      task.status === '执行中' ? "bg-accent-green/20 text-accent-green" : 
                      task.status === '已完成' ? "bg-accent-main/20 text-accent-main" : "bg-text-dim/20 text-text-dim"
                    )}>{task.status}</span>
                  </td>
                  <td className="p-3 text-right">
                    {task.status === '待下发' ? (
                      <button className="text-accent-main hover:underline flex items-center gap-1 ml-auto"><Play size={10} /> 下发指令</button>
                    ) : (
                      <button className="text-text-dim hover:text-text-primary">查看详情</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="panel p-4 flex flex-col">
        <div className="panel-header mb-4"><div className="panel-title">路径规划引擎预览</div></div>
        <div className="flex-1 bg-bg-deep/50 rounded-lg border border-border-main relative overflow-hidden flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <rect x="20" y="20" width="160" height="160" fill="none" stroke="#1a4a7a" strokeWidth="1" strokeDasharray="4,2" />
            {/* Planned Path */}
            <motion.path 
              d="M 30,30 L 170,30 L 170,50 L 30,50 L 30,70 L 170,70 L 170,90 L 30,90 L 30,110 L 170,110 L 170,130 L 30,130 L 30,150 L 170,150 L 170,170 L 30,170" 
              fill="none" 
              stroke="#00d4ff" 
              strokeWidth="1.5" 
              strokeOpacity="0.3"
            />
            {/* Completed Path */}
            <motion.path 
              d="M 30,30 L 170,30 L 170,50 L 30,50 L 30,70 L 170,70 L 170,90 L 30,90 L 30,110 L 170,110" 
              fill="none" 
              stroke="#00ff9d" 
              strokeWidth="2" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            <circle cx="170" cy="110" r="4" fill="#00ff9d" className="animate-pulse" />
          </svg>
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            <div className="flex items-center gap-1 text-[8px] text-text-dim"><div className="w-2 h-0.5 bg-accent-main/30" /> 规划路径</div>
            <div className="flex items-center gap-1 text-[8px] text-accent-green"><div className="w-2 h-0.5 bg-accent-green" /> 已执行路径</div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="text-[10px] text-text-dim uppercase tracking-wider">执行状态回传日志</div>
          <div className="bg-bg-deep p-2 rounded text-[9px] font-mono text-text-secondary h-24 overflow-y-auto space-y-1">
            <div>[14:32:10] XZ-001: 抵达航点 WP-12, 转向 180°</div>
            <div>[14:32:15] XZ-001: 姿态校准完成, 偏差 0.02m</div>
            <div className="text-accent-green">[14:32:20] XZ-001: 开始第 12 航道作业</div>
            <div>[14:32:25] XZ-007: 药量剩余 42%, 预计作业 15min</div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- 4. 作业统计 (Operation Statistics) ---
  const StatsContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="panel p-4">
          <div className="panel-header mb-4"><div className="panel-title">作业效率评估分析</div></div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: '插秧', efficiency: 42, avg: 35 },
                { name: '植保', efficiency: 120, avg: 100 },
                { name: '收割', efficiency: 38, avg: 40 },
                { name: '耕整', efficiency: 25, avg: 22 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a4a7a" vertical={false} />
                <XAxis dataKey="name" stroke="#3a6a8a" fontSize={10} />
                <YAxis stroke="#3a6a8a" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#081728', border: '1px solid #1a4a7a' }} />
                <Bar dataKey="efficiency" name="当前效率" fill="#00d4ff" radius={[2, 2, 0, 0]} />
                <Bar dataKey="avg" name="全乡平均" fill="#3a6a8a" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-accent-main/5 rounded border border-accent-main/20">
            <div className="text-[10px] text-accent-main font-bold flex items-center gap-1">
              <TrendingUp size={12} /> 效率提升建议
            </div>
            <p className="text-[9px] text-text-secondary mt-1">当前植保作业效率高于平均水平 20%，建议优化收割作业路径编排以降低空转率。</p>
          </div>
        </div>

        <div className="col-span-2 panel p-4">
          <div className="panel-header mb-4">
            <div className="panel-title">作业面积自动计算与覆盖热力图</div>
            <div className="flex gap-2">
              <span className="text-[10px] text-text-dim">累计作业: 4,820 亩</span>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-1 aspect-[3/1] bg-bg-deep rounded overflow-hidden p-2">
            {Array.from({ length: 60 }).map((_, i) => {
              const intensity = Math.random();
              const color = intensity > 0.8 ? '#00ff9d' : intensity > 0.5 ? '#00d4ff' : intensity > 0.2 ? '#1a4a7a' : '#081728';
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.005 }}
                  className="rounded-sm hover:brightness-150 transition-all cursor-pointer" 
                  style={{ backgroundColor: color }} 
                  title={`覆盖率: ${(intensity * 100).toFixed(1)}%`}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex gap-4 text-[9px] text-text-dim">
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#081728] border border-border-main" /> 未覆盖</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#1a4a7a]" /> 低密度</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#00d4ff]" /> 中密度</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#00ff9d]" /> 高密度</div>
            </div>
            <button className="text-[10px] text-accent-main hover:underline">生成详细作业报表</button>
          </div>
        </div>
      </div>
    </div>
  );

  // --- 5. 维修保养 (Maintenance) ---
  const MaintainContent = () => (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 panel">
        <div className="panel-header">
          <div className="panel-title">保养计划提醒与维修工单管理</div>
          <button className="px-3 py-1 bg-accent-main text-bg-deep rounded text-xs font-bold hover:bg-accent-main/80 transition-colors">+ 创建工单</button>
        </div>
        <div className="p-0">
          <table className="w-full text-[11px] text-left">
            <thead className="bg-bg-card border-b border-border-main">
              <tr className="text-text-dim">
                <th className="p-3">工单编号</th>
                <th className="p-3">农机/型号</th>
                <th className="p-3">类型</th>
                <th className="p-3">触发原因</th>
                <th className="p-3">计划日期</th>
                <th className="p-3">状态</th>
                <th className="p-3 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main/20">
              {[
                { id: 'WO-20260402-01', mach: 'XZ-005', type: '定期保养', reason: '作业时长达 500h', date: '2026-04-03', status: '待执行' },
                { id: 'WO-20260401-03', mach: 'XZ-001', type: '故障维修', reason: '液压系统压力异常', date: '2026-04-01', status: '维修中' },
                { id: 'WO-20260328-02', mach: 'XZ-007', type: '定期保养', reason: '季节性入库保养', date: '2026-03-28', status: '已完成' },
              ].map((wo, i) => (
                <tr key={i} className="hover:bg-accent-main/5 text-text-secondary group transition-colors">
                  <td className="p-3 font-mono">{wo.id}</td>
                  <td className="p-3 font-bold text-text-primary group-hover:text-accent-main transition-colors">{wo.mach}</td>
                  <td className="p-3">{wo.type}</td>
                  <td className="p-3 text-text-dim">{wo.reason}</td>
                  <td className="p-3">{wo.date}</td>
                  <td className="p-3">
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-[9px]",
                      wo.status === '维修中' ? "bg-accent-red/20 text-accent-red" : 
                      wo.status === '已完成' ? "bg-accent-green/20 text-accent-green" : "bg-accent-yellow/20 text-accent-yellow"
                    )}>{wo.status}</span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-accent-main hover:underline">详情</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="panel p-4">
        <div className="panel-header mb-4"><div className="panel-title">农机工况参数实时监测</div></div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-bg-panel rounded border border-border-main">
              <div className="text-[9px] text-text-dim mb-1 uppercase">油量/电量</div>
              <div className="flex items-end gap-2">
                <div className="text-lg font-bold text-accent-main">68%</div>
                <div className="flex-1 h-1.5 bg-border-main rounded-full mb-1.5 overflow-hidden">
                  <div className="h-full bg-accent-main" style={{ width: '68%' }} />
                </div>
              </div>
            </div>
            <div className="p-3 bg-bg-panel rounded border border-border-main">
              <div className="text-[9px] text-text-dim mb-1 uppercase">发动机转速</div>
              <div className="flex items-end gap-2">
                <div className="text-lg font-bold text-accent-green">2100</div>
                <span className="text-[9px] text-text-dim mb-1">RPM</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="text-[10px] text-text-dim uppercase tracking-wider">作业告警处理模块</div>
            {[
              { type: '偏航告警', msg: 'XZ-001 偏离预定航线 0.5m', time: '2分钟前', level: 'yellow' },
              { type: '障碍物告警', msg: 'XZ-007 前方 5m 发现不明障碍', time: '10分钟前', level: 'red' },
            ].map((alert, i) => (
              <div key={i} className={cn(
                "p-3 rounded border-l-2 text-[10px]",
                alert.level === 'red' ? "bg-accent-red/10 border-accent-red" : "bg-accent-yellow/10 border-accent-yellow"
              )}>
                <div className="flex justify-between mb-1">
                  <span className={cn("font-bold", alert.level === 'red' ? "text-accent-red" : "text-accent-yellow")}>{alert.type}</span>
                  <span className="text-text-dim">{alert.time}</span>
                </div>
                <div className="text-text-secondary">{alert.msg}</div>
                <div className="mt-2 flex gap-2">
                  <button className="px-2 py-0.5 rounded bg-bg-card border border-border-main hover:border-accent-main transition-colors">忽略</button>
                  <button className={cn(
                    "px-2 py-0.5 rounded text-white font-bold",
                    alert.level === 'red' ? "bg-accent-red" : "bg-accent-yellow text-bg-deep"
                  )}>立即介入</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // --- Render Logic ---
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">智能无人农机管理系统</h1>
          <p className="text-xs text-text-dim mt-1">
            {activeItem === 'mach-map' && '北斗实时轨迹 · 远程驾驶控制 · 姿态监测'}
            {activeItem === 'mach-list' && '农机档案管理 · 基础信息维护 · 资质管理'}
            {activeItem === 'mach-tasks' && '作业路径规划 · 任务编排引擎 · 指令下发'}
            {activeItem === 'mach-stats' && '作业统计报表 · 效率评估分析 · 热力图'}
            {activeItem === 'mach-maintain' && '保养计划提醒 · 维修工单管理 · 工况监测'}
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
          {activeItem === 'mach-map' && <MapContent />}
          {activeItem === 'mach-list' && <LedgerContent />}
          {activeItem === 'mach-tasks' && <TasksContent />}
          {activeItem === 'mach-stats' && <StatsContent />}
          {activeItem === 'mach-maintain' && <MaintainContent />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
