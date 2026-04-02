import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, AreaChart, Area
} from 'recharts';
import { 
  CheckSquare, Package, Store, Radio, Zap, Users, Building2, 
  Plus, Search, Filter, MoreVertical, AlertCircle, CheckCircle2, 
  Clock, ArrowRight, ShieldCheck, FileText, MapPin, Activity,
  TrendingUp, Wrench, Settings, Smartphone, Mail, MessageSquare
} from 'lucide-react';

interface FarmingManagementPageProps {
  activeItem: string;
}

export const FarmingManagementPage: React.FC<FarmingManagementPageProps> = ({ activeItem }) => {
  
  // --- 1. 作业任务 (Tasks) ---
  const TasksContent = () => {
    const tasks = [
      { id: 'T20260402-01', title: '西河村A区机械插秧', type: '播种', person: '张建国', time: '2026-04-02 08:00', status: '进行中', priority: '高' },
      { id: 'T20260402-02', title: '孙汪村2号地块纹枯病防治', type: '植保', person: '李明', time: '2026-04-02 09:30', status: '待执行', priority: '紧急' },
      { id: 'T20260402-03', title: '全乡土壤墒情巡检', type: '巡检', person: '王芳', time: '2026-04-02 10:00', status: '待执行', priority: '中' },
      { id: 'T20260401-05', title: '四报村灌溉系统维护', type: '维护', person: '赵勇', time: '2026-04-01 14:00', status: '已完成', priority: '低' },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '今日待办', value: '12', color: 'text-accent-main', icon: <CheckSquare size={16} /> },
            { label: '进行中', value: '5', color: 'text-accent-yellow', icon: <Activity size={16} /> },
            { label: '已完成', value: '28', color: 'text-accent-green', icon: <CheckCircle2 size={16} /> },
            { label: '逾期未完', value: '2', color: 'text-accent-red', icon: <Clock size={16} /> },
          ].map((item, i) => (
            <div key={i} className="kpi-card flex justify-between items-center">
              <div>
                <div className="text-[11px] text-text-secondary mb-1">{item.label}</div>
                <div className={cn("text-2xl font-bold", item.color)}>{item.value}</div>
              </div>
              <div className="p-2 bg-bg-panel rounded-lg opacity-60">{item.icon}</div>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">农事作业任务列表</div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-text-dim" size={14} />
                <input type="text" placeholder="搜索任务..." className="bg-bg-deep border border-border-main rounded px-8 py-1 text-xs focus:outline-none focus:border-accent-main w-48" />
              </div>
              <button className="px-3 py-1 bg-accent-main text-bg-deep rounded text-xs font-bold flex items-center gap-1 hover:bg-accent-main/80 transition-colors">
                <Plus size={14} /> 新增任务
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left">
              <thead className="bg-bg-card border-b border-border-main">
                <tr className="text-text-dim">
                  <th className="p-3">任务编号</th>
                  <th className="p-3">任务名称</th>
                  <th className="p-3">类型</th>
                  <th className="p-3">负责人</th>
                  <th className="p-3">计划时间</th>
                  <th className="p-3">优先级</th>
                  <th className="p-3">状态</th>
                  <th className="p-3 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-main/20">
                {tasks.map((task, i) => (
                  <tr key={i} className="hover:bg-accent-main/5 text-text-secondary group transition-colors">
                    <td className="p-3 font-mono">{task.id}</td>
                    <td className="p-3 font-bold text-text-primary group-hover:text-accent-main transition-colors">{task.title}</td>
                    <td className="p-3">{task.type}</td>
                    <td className="p-3">{task.person}</td>
                    <td className="p-3">{task.time}</td>
                    <td className="p-3">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[9px]",
                        task.priority === '紧急' ? "bg-accent-red/20 text-accent-red" : 
                        task.priority === '高' ? "bg-accent-yellow/20 text-accent-yellow" : "bg-accent-main/20 text-accent-main"
                      )}>{task.priority}</span>
                    </td>
                    <td className="p-3">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[9px]",
                        task.status === '已完成' ? "bg-accent-green/20 text-accent-green" : 
                        task.status === '进行中' ? "bg-accent-main/20 text-accent-main" : "bg-text-dim/20 text-text-dim"
                      )}>{task.status}</span>
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
      </div>
    );
  };

  // --- 2. 批次管理 (Batch) ---
  const BatchContent = () => {
    const batches = [
      { id: 'B2026-008', crop: '早稻(鄂中5号)', field: '西河村A区', date: '2026-03-20', area: '1,200', status: '在种', progress: 15, yield: 0 },
      { id: 'B2026-007', crop: '油菜(华油杂62)', field: '孙汪村全部', date: '2025-10-08', area: '580', status: '收割中', progress: 90, yield: 124 },
      { id: 'B2026-006', crop: '小麦(郑麦379)', field: '辛榨社区', date: '2025-11-02', area: '920', status: '在种', progress: 65, yield: 0 },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          {batches.map((batch, i) => (
            <div key={i} className="panel p-4 group cursor-pointer hover:border-accent-main/50 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent-main/5 -rotate-45 translate-x-8 -translate-y-8 group-hover:bg-accent-main/10 transition-colors" />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <div className="text-[10px] text-text-dim mb-1">批次编号: {batch.id}</div>
                  <div className="text-sm font-bold text-text-primary group-hover:text-accent-main transition-colors">{batch.crop}</div>
                </div>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px]",
                  batch.status === '在种' ? "bg-accent-main/20 text-accent-main" : "bg-accent-yellow/20 text-accent-yellow"
                )}>{batch.status}</span>
              </div>
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-secondary">种植地块</span>
                  <span className="text-text-primary">{batch.field}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-secondary">种植面积</span>
                  <span className="text-text-primary">{batch.area} 亩</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-secondary">预计产量</span>
                  <span className="text-text-primary">{batch.yield > 0 ? `${batch.yield} 吨` : '待估算'}</span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-text-dim">生长进度</span>
                    <span className="text-accent-main">{batch.progress}%</span>
                  </div>
                  <div className="h-1 bg-border-main rounded-full overflow-hidden">
                    <div className="h-full bg-accent-main transition-all duration-500" style={{ width: `${batch.progress}%` }} />
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border-main/30 flex justify-between relative z-10">
                <button className="text-[10px] text-accent-main hover:underline flex items-center gap-1"><Package size={10} /> 农资投入</button>
                <button className="text-[10px] text-accent-main hover:underline flex items-center gap-1"><ShieldCheck size={10} /> 质量追溯</button>
              </div>
            </div>
          ))}
          <div className="panel p-4 border-dashed border-2 border-border-main flex flex-col items-center justify-center text-text-dim hover:text-accent-main hover:border-accent-main transition-all cursor-pointer group">
            <Plus size={32} className="mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm">新建种植批次</span>
          </div>
        </div>

        <div className="panel p-4">
          <div className="panel-header mb-4">
            <div className="panel-title">批次产量汇总统计</div>
            <div className="text-[10px] text-text-dim">单位: 吨 (Tons)</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { name: '2025-Q1', yield: 420 },
                { name: '2025-Q2', yield: 850 },
                { name: '2025-Q3', yield: 1240 },
                { name: '2025-Q4', yield: 980 },
                { name: '2026-Q1', yield: 560 },
              ]}>
                <defs>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a4a7a" vertical={false} />
                <XAxis dataKey="name" stroke="#3a6a8a" fontSize={10} />
                <YAxis stroke="#3a6a8a" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#081728', border: '1px solid #1a4a7a' }} />
                <Area type="monotone" dataKey="yield" stroke="#00d4ff" fillOpacity={1} fill="url(#colorYield)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  // --- 3. 农资经营 (Agri Input) ---
  const AgriContent = () => (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 panel">
        <div className="panel-header">
          <div className="panel-title">农资经营主体与资质管理</div>
          <div className="flex gap-2">
            <button className="px-2 py-1 rounded bg-accent-main/10 border border-accent-main text-accent-main text-[10px] hover:bg-accent-main/20 transition-colors">主体注册</button>
          </div>
        </div>
        <div className="p-0">
          <table className="w-full text-[11px] text-left">
            <thead className="bg-bg-card border-b border-border-main">
              <tr className="text-text-dim">
                <th className="p-3">经营主体</th>
                <th className="p-3">资质编号</th>
                <th className="p-3">主要产品</th>
                <th className="p-3">信用评级</th>
                <th className="p-3">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main/20">
              {[
                { name: '辛榨乡供销合作社', code: 'XZ-AG-001', products: '复合肥、尿素', credit: 'AAA', status: '正常' },
                { name: '安陆市丰产农资部', code: 'XZ-AG-002', products: '除草剂、杀虫剂', credit: 'AA', status: '正常' },
                { name: '绿野农业科技公司', code: 'XZ-AG-003', products: '优质稻种、化肥', credit: 'AAA', status: '正常' },
                { name: '个体经营户-张三', code: 'XZ-AG-004', products: '农药、化肥', credit: 'B', status: '黑名单', color: 'text-accent-red' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-accent-main/5 text-text-secondary group transition-colors">
                  <td className="p-3 font-bold text-text-primary group-hover:text-accent-main transition-colors">{item.name}</td>
                  <td className="p-3 font-mono">{item.code}</td>
                  <td className="p-3">{item.products}</td>
                  <td className="p-3">
                    <span className={cn(
                      "px-1.5 py-0.5 rounded",
                      item.credit.startsWith('A') ? "bg-accent-green/20 text-accent-green" : "bg-accent-yellow/20 text-accent-yellow"
                    )}>{item.credit}</span>
                  </td>
                  <td className="p-3">
                    <span className={cn(
                      "px-1.5 py-0.5 rounded",
                      item.status === '正常' ? "bg-accent-main/20 text-accent-main" : "bg-accent-red/20 text-accent-red"
                    )}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border-main/30">
          <div className="panel-title text-xs mb-3">农资销售流水追溯</div>
          <div className="space-y-2">
            {[
              { id: 'S20260402-102', buyer: '西河村合作社', item: '尿素 (40kg)', qty: '50袋', time: '10:15' },
              { id: 'S20260402-101', buyer: '孙汪村种植大户', item: '复合肥 (50kg)', qty: '120袋', time: '09:45' },
            ].map((sale, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-bg-panel rounded border border-border-main text-[10px] hover:border-accent-main transition-colors cursor-pointer">
                <div className="flex gap-4">
                  <span className="text-text-dim font-mono">{sale.id}</span>
                  <span className="text-text-primary font-bold">{sale.buyer}</span>
                  <span className="text-text-secondary">{sale.item} x {sale.qty}</span>
                </div>
                <span className="text-text-dim">{sale.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="panel p-4">
        <div className="panel-header mb-4"><div className="panel-title">合规性校验统计</div></div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: '已备案', value: 85, color: '#00ff9d' },
                  { name: '待审核', value: 12, color: '#ffb800' },
                  { name: '违规下架', value: 3, color: '#ff4d4d' },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#00ff9d" />
                <Cell fill="#ffb800" />
                <Cell fill="#ff4d4d" />
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#081728', border: '1px solid #1a4a7a' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3 mt-4">
          <div className="flex justify-between text-xs">
            <span className="text-text-secondary">经营主体信用 AAA 级</span>
            <span className="text-accent-green">12 家</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-text-secondary">黑名单主体</span>
            <span className="text-accent-red">1 家</span>
          </div>
          <div className="h-px bg-border-main opacity-30" />
          <button className="w-full py-2 rounded bg-accent-main/10 border border-accent-main text-accent-main text-[10px] font-bold hover:bg-accent-main/20 transition-colors">查看详细信用报告</button>
        </div>
      </div>
    </div>
  );

  // --- 4. 设备管理 (Device) ---
  const DeviceContent = () => (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 panel">
        <div className="panel-header">
          <div className="panel-title">物联网设备台账与实时监控</div>
          <div className="flex gap-2">
            <button className="px-2 py-1 rounded bg-accent-main/10 border border-accent-main text-accent-main text-[10px] hover:bg-accent-main/20 transition-colors flex items-center gap-1"><Activity size={12} /> 心跳检测</button>
            <button className="px-2 py-1 rounded bg-accent-main text-bg-deep font-bold text-[10px] hover:bg-accent-main/80 transition-colors flex items-center gap-1"><Settings size={12} /> 配置下发</button>
          </div>
        </div>
        <div className="p-0">
          <table className="w-full text-[11px] text-left">
            <thead className="bg-bg-card border-b border-border-main">
              <tr className="text-text-dim">
                <th className="p-3">设备名称</th>
                <th className="p-3">型号/编号</th>
                <th className="p-3">安装位置</th>
                <th className="p-3">最后心跳</th>
                <th className="p-3">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main/20">
              {[
                { name: '气象监测主站', model: 'WS-PRO-V3', loc: '西河村委', time: '1分钟前', status: '在线', color: 'text-accent-green' },
                { name: '土壤墒情传感器', model: 'SM-100', loc: '孙汪村2号地块', time: '5分钟前', status: '在线', color: 'text-accent-green' },
                { name: '虫情识别仪', model: 'IC-AI-01', loc: '辛榨社区', time: '12分钟前', status: '离线', color: 'text-accent-red' },
                { name: '水位监测计', model: 'WL-80', loc: '张付村水渠', time: '2小时前', status: '故障', color: 'text-accent-yellow' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-accent-main/5 text-text-secondary group transition-colors">
                  <td className="p-3 font-bold text-text-primary group-hover:text-accent-main transition-colors">{item.name}</td>
                  <td className="p-3 font-mono">{item.model}</td>
                  <td className="p-3">{item.loc}</td>
                  <td className="p-3">{item.time}</td>
                  <td className="p-3">
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-[9px]",
                      item.status === '在线' ? "bg-accent-green/20 text-accent-green" : 
                      item.status === '离线' ? "bg-accent-red/20 text-accent-red" : "bg-accent-yellow/20 text-accent-yellow"
                    )}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="panel p-4">
        <div className="panel-header mb-4"><div className="panel-title">设备故障诊断与工单</div></div>
        <div className="space-y-4">
          <div className="p-3 bg-accent-red/5 border border-accent-red/20 rounded-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 bg-accent-red/20 text-accent-red"><AlertCircle size={12} /></div>
            <div className="text-accent-red text-xs font-bold mb-1">IC-AI-01 离线告警</div>
            <p className="text-[10px] text-text-secondary mb-3">诊断结论：通信模块异常，建议检查 SIM 卡欠费或信号覆盖。</p>
            <button className="w-full py-1.5 bg-accent-red text-white rounded text-[10px] font-bold hover:bg-accent-red/80 transition-colors flex items-center justify-center gap-1">
              <Wrench size={12} /> 派发维修工单
            </button>
          </div>
          <div className="h-px bg-border-main opacity-30" />
          <div className="space-y-3">
            <div className="text-[10px] text-text-dim uppercase tracking-wider">采集频率配置</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-bg-panel rounded border border-border-main group hover:border-accent-main transition-colors">
                <span className="text-xs text-text-secondary">气象数据频率</span>
                <select className="bg-transparent text-accent-main text-[10px] focus:outline-none cursor-pointer">
                  <option>5分钟/次</option>
                  <option>15分钟/次</option>
                  <option>1小时/次</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-2 bg-bg-panel rounded border border-border-main group hover:border-accent-main transition-colors">
                <span className="text-xs text-text-secondary">通信协议</span>
                <span className="text-accent-main text-[10px] font-mono">MQTT / LoraWAN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- 5. 监测告警 (Alert) ---
  const AlertContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 panel">
          <div className="panel-header">
            <div className="panel-title">告警历史记录与统计</div>
            <div className="flex gap-2">
              <button className="px-2 py-1 rounded border border-border-main text-text-secondary text-[10px] hover:text-text-primary transition-colors">导出历史</button>
              <button className="px-2 py-1 rounded border border-border-main text-accent-red text-[10px] hover:bg-accent-red/10 transition-colors">全部清除</button>
            </div>
          </div>
          <div className="p-0">
            <table className="w-full text-[11px] text-left">
              <thead className="bg-bg-card border-b border-border-main">
                <tr className="text-text-dim">
                  <th className="p-3">告警时间</th>
                  <th className="p-3">告警内容</th>
                  <th className="p-3">级别</th>
                  <th className="p-3">触发规则</th>
                  <th className="p-3">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-main/20">
                {[
                  { time: '14:32:10', content: '土壤水分低于 60%', level: '红色', rule: '墒情低限预警', status: '未处理' },
                  { time: '12:15:45', content: '纹枯病风险等级极高', level: '橙色', rule: '病虫害模型预警', status: '已处理' },
                  { time: '09:00:00', content: '设备 SM-07 电量低', level: '黄色', rule: '设备电量预警', status: '处理中' },
                  { time: '昨天 18:20', content: '环境温度超过 38°C', level: '橙色', rule: '高温预警', status: '已处理' },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-accent-main/5 text-text-secondary group transition-colors">
                    <td className="p-3">{item.time}</td>
                    <td className="p-3 font-bold text-text-primary group-hover:text-accent-main transition-colors">{item.content}</td>
                    <td className="p-3">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[9px]",
                        item.level === '红色' ? "bg-accent-red/20 text-accent-red" : 
                        item.level === '橙色' ? "bg-accent-yellow/20 text-accent-yellow" : "bg-accent-main/20 text-accent-main"
                      )}>{item.level}</span>
                    </td>
                    <td className="p-3">{item.rule}</td>
                    <td className="p-3">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="panel p-4">
          <div className="panel-header mb-4"><div className="panel-title">告警规则配置中心</div></div>
          <div className="space-y-4">
            {[
              { label: '温度上限预警', val: '38°C', active: true },
              { label: '湿度下限预警', val: '40%', active: true },
              { label: '病虫害爆发指数', val: '0.75', active: false },
              { label: '设备离线时长', val: '30min', active: true },
            ].map((rule, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-bg-panel rounded border border-border-main group hover:border-accent-main transition-colors">
                <div>
                  <div className="text-xs text-text-primary font-bold">{rule.label}</div>
                  <div className="text-[10px] text-text-dim">当前阈值: {rule.val}</div>
                </div>
                <div className={cn(
                  "w-8 h-4 rounded-full relative cursor-pointer transition-all duration-200",
                  rule.active ? "bg-accent-main shadow-[0_0_8px_rgba(0,212,255,0.3)]" : "bg-border-main"
                )}>
                  <div className={cn(
                    "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-200",
                    rule.active ? "right-0.5" : "left-0.5"
                  )} />
                </div>
              </div>
            ))}
            <div className="h-px bg-border-main opacity-30 my-2" />
            <div className="text-[10px] text-text-dim uppercase tracking-wider mb-2">多渠道推送设置</div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <Smartphone size={14} />, label: 'App', active: true },
                { icon: <MessageSquare size={14} />, label: '短信', active: true },
                { icon: <Mail size={14} />, label: '邮件', active: false },
              ].map((channel, i) => (
                <div key={i} className={cn(
                  "flex flex-col items-center justify-center p-2 rounded border transition-all cursor-pointer",
                  channel.active ? "bg-accent-main/10 border-accent-main text-accent-main" : "bg-bg-panel border-border-main text-text-dim"
                )}>
                  {channel.icon}
                  <span className="text-[9px] mt-1">{channel.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- 6. 人员管理 (People) ---
  const PeopleContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '总人数', value: '156', icon: <Users className="text-accent-main" /> },
          { label: '今日出勤', value: '42', icon: <CheckCircle2 className="text-accent-green" /> },
          { label: '作业中', value: '18', icon: <Activity className="text-accent-yellow" /> },
          { label: '待岗', value: '24', icon: <Clock className="text-text-dim" /> },
        ].map((item, i) => (
          <div key={i} className="kpi-card flex justify-between items-center group hover:border-accent-main transition-colors cursor-pointer">
            <div>
              <div className="text-[11px] text-text-secondary mb-1">{item.label}</div>
              <div className="text-2xl font-bold text-text-primary group-hover:text-accent-main transition-colors">{item.value}</div>
            </div>
            <div className="p-2 bg-bg-panel rounded-lg group-hover:bg-accent-main/10 transition-colors">{item.icon}</div>
          </div>
        ))}
      </div>
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">工作人员名册与考勤管理</div>
          <div className="flex gap-2">
             <button className="px-3 py-1 bg-accent-main/10 border border-accent-main text-accent-main rounded text-xs font-bold hover:bg-accent-main/20 transition-colors">出勤报表</button>
             <button className="px-3 py-1 bg-accent-main text-bg-deep rounded text-xs font-bold hover:bg-accent-main/80 transition-colors">+ 人员注册</button>
          </div>
        </div>
        <div className="p-0">
          <table className="w-full text-[11px] text-left">
            <thead className="bg-bg-card border-b border-border-main">
              <tr className="text-text-dim">
                <th className="p-3">姓名</th>
                <th className="p-3">岗位</th>
                <th className="p-3">联系方式</th>
                <th className="p-3">今日打卡</th>
                <th className="p-3">绩效评分</th>
                <th className="p-3">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main/20">
              {[
                { name: '张建国', role: '农机手', phone: '138****5678', time: '07:30', score: '4.8', status: '在岗' },
                { name: '李明', role: '植保员', phone: '139****1234', time: '08:15', score: '4.5', status: '在岗' },
                { name: '王芳', role: '巡检员', phone: '135****8888', time: '08:00', score: '4.9', status: '在岗' },
                { name: '赵勇', role: '维修工', phone: '137****4444', time: '-', score: '4.2', status: '休假' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-accent-main/5 text-text-secondary group transition-colors">
                  <td className="p-3 font-bold text-text-primary group-hover:text-accent-main transition-colors">{item.name}</td>
                  <td className="p-3">{item.role}</td>
                  <td className="p-3 font-mono">{item.phone}</td>
                  <td className="p-3">{item.time}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <span className="text-accent-yellow">★</span>
                      <span className="font-bold">{item.score}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <button className="text-accent-main hover:underline">查看日志</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // --- 7. 主体信息 (Subject) ---
  const SubjectContent = () => (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 panel">
        <div className="panel-header">
          <div className="panel-title">种植主体信息管理与地块关联</div>
          <button className="px-3 py-1 bg-accent-main text-bg-deep rounded text-xs font-bold hover:bg-accent-main/80 transition-colors">+ 主体注册</button>
        </div>
        <div className="p-0">
          <table className="w-full text-[11px] text-left">
            <thead className="bg-bg-card border-b border-border-main">
              <tr className="text-text-dim">
                <th className="p-3">主体名称</th>
                <th className="p-3">类型</th>
                <th className="p-3">负责人</th>
                <th className="p-3">关联地块</th>
                <th className="p-3">资质状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main/20">
              {[
                { name: '安陆市金穗农机专业合作社', type: '合作社', person: '刘金穗', fields: '西河村、孙汪村', status: '已审核' },
                { name: '辛榨乡现代农业示范场', type: '农场', person: '陈示范', fields: '辛榨社区', status: '已审核' },
                { name: '张付村种粮大户-老王', type: '种植户', person: '王大户', fields: '张付村', status: '审核中' },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-accent-main/5 text-text-secondary group transition-colors">
                  <td className="p-3 font-bold text-text-primary group-hover:text-accent-main transition-colors">{item.name}</td>
                  <td className="p-3">{item.type}</td>
                  <td className="p-3">{item.person}</td>
                  <td className="p-3 flex items-center gap-1"><MapPin size={10} className="text-text-dim" /> {item.fields}</td>
                  <td className="p-3">
                    <span className={cn(
                      "px-1.5 py-0.5 rounded text-[9px]",
                      item.status === '已审核' ? "bg-accent-green/20 text-accent-green" : "bg-accent-yellow/20 text-accent-yellow"
                    )}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border-main/30">
          <div className="flex justify-between items-center mb-3">
            <div className="panel-title text-xs">主体种植面积统计 (亩)</div>
            <TrendingUp size={14} className="text-accent-main" />
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={[
                { name: '金穗合作社', area: 4200 },
                { name: '示范场', area: 3600 },
                { name: '王大户', area: 1200 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a4a7a" horizontal={false} />
                <XAxis type="number" stroke="#3a6a8a" fontSize={10} />
                <YAxis dataKey="name" type="category" stroke="#3a6a8a" fontSize={10} width={80} />
                <Tooltip contentStyle={{ backgroundColor: '#081728', border: '1px solid #1a4a7a' }} />
                <Bar dataKey="area" fill="#00d4ff" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="panel p-4">
        <div className="panel-header mb-4"><div className="panel-title">资质文件与权限控制</div></div>
        <div className="space-y-4">
          <div className="p-4 border-2 border-dashed border-border-main rounded-lg flex flex-col items-center justify-center text-text-dim hover:border-accent-main hover:text-accent-main transition-all cursor-pointer group">
            <Plus size={24} className="mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs">上传资质文件 (PDF/JPG)</span>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] text-text-dim uppercase tracking-wider">已上传文件列表</div>
            {[
              { name: '营业执照_金穗.pdf', size: '1.2MB', status: '已审核' },
              { name: '土地承包合同_示范场.pdf', size: '4.5MB', status: '已审核' },
              { name: '农药经营许可证.jpg', size: '800KB', status: '审核中' },
            ].map((file, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-bg-panel rounded border border-border-main hover:border-accent-main transition-colors cursor-pointer group">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-accent-main" />
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary truncate max-w-[120px] group-hover:text-text-primary">{file.name}</span>
                    <span className="text-[8px] text-text-dim">{file.size}</span>
                  </div>
                </div>
                <span className={cn(
                  "text-[8px] px-1 rounded",
                  file.status === '已审核' ? "text-accent-green bg-accent-green/10" : "text-accent-yellow bg-accent-yellow/10"
                )}>{file.status}</span>
              </div>
            ))}
          </div>
          <div className="h-px bg-border-main opacity-30" />
          <div className="p-3 bg-accent-main/5 rounded border border-accent-main/20">
            <div className="text-[10px] text-accent-main font-bold flex items-center gap-1 mb-1">
              <ShieldCheck size={12} /> 数据权限隔离已开启
            </div>
            <p className="text-[9px] text-text-secondary leading-relaxed">当前主体仅可查看其关联地块及作业数据，分级查看控制已生效。</p>
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
          <h1 className="text-lg font-bold">农事生产管理系统</h1>
          <p className="text-xs text-text-dim mt-1">
            {activeItem === 'farm-tasks' && '作业任务下达 · 执行与闭环管理'}
            {activeItem === 'farm-batch' && '种植批次建立 · 批次信息全程记录'}
            {activeItem === 'farm-agri' && '农资经营主体 · 资质管理与销售台账'}
            {activeItem === 'farm-device' && '物联网设备台账 · 实时监控与诊断'}
            {activeItem === 'farm-alert' && '监测告警规则 · 多渠道推送与分析'}
            {activeItem === 'farm-people' && '工作人员管理 · 考勤与绩效统计'}
            {activeItem === 'farm-subject' && '种植主体信息 · 资质审核与地块关联'}
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
          {activeItem === 'farm-tasks' && <TasksContent />}
          {activeItem === 'farm-batch' && <BatchContent />}
          {activeItem === 'farm-agri' && <AgriContent />}
          {activeItem === 'farm-device' && <DeviceContent />}
          {activeItem === 'farm-alert' && <AlertContent />}
          {activeItem === 'farm-people' && <PeopleContent />}
          {activeItem === 'farm-subject' && <SubjectContent />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
