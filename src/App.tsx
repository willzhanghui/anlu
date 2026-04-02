import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { MODULES, ModuleType } from './types';
import { cn } from './lib/utils';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

import { ParkManagementPage } from './components/ParkManagementPage';
import { FarmingManagementPage } from './components/FarmingManagementPage';
import { MachineManagementPage } from './components/MachineManagementPage';
import { BigDataPage } from './components/BigDataPage';
import { ConsultationPage } from './components/ConsultationPage';
import { DashboardPage } from './components/DashboardPage';

// --- Components ---

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const LucideIcon = (Icons as any)[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={className} size={18} />;
};

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg bg-bg-panel border border-border-glow rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-main">
          <h3 className="text-base font-bold text-text-primary">{title}</h3>
          <button onClick={onClose} className="text-text-dim hover:text-text-primary transition-colors">
            <Icons.X size={20} />
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const TopNav = ({ activeModule, onModuleChange }: { activeModule: ModuleType, onModuleChange: (mod: ModuleType) => void }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 h-14 bg-bg-deep/95 border-b border-border-main sticky top-0 z-50 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-linear-to-br from-accent-main to-blue-600 rounded-lg flex items-center justify-center text-lg shadow-[0_0_15px_rgba(0,212,255,0.3)]">🌾</div>
        <div>
          <div className="text-base font-bold text-accent-main tracking-wider">安陆市高标准农田信息化综合管理平台</div>
          <div className="text-[10px] text-text-secondary">辛榨乡智慧农业数字化管理系统 · 孝感市农业农村局</div>
        </div>
      </div>
      
      <div className="flex gap-1">
        {MODULES.map((mod) => (
          <button
            key={mod.id}
            onClick={() => onModuleChange(mod.id)}
            className={cn(
              "px-4 py-1.5 rounded text-xs transition-all duration-200 flex items-center gap-2",
              activeModule === mod.id 
                ? "bg-accent-main/10 border border-accent-main text-accent-main shadow-[0_0_10px_rgba(0,212,255,0.1)]" 
                : "text-text-secondary hover:bg-accent-main/5 hover:text-accent-main border border-transparent"
            )}
          >
            <span>{mod.icon}</span>
            {mod.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-text-secondary">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-green shadow-[0_0_6px_#00ff9d] animate-pulse" />
          <span>系统在线</span>
        </div>
        <span className="font-mono">{time.toLocaleString('zh-CN', { hour12: false })}</span>
        <span className="flex items-center gap-1.5">
          <Icons.User size={14} />
          管理员
        </span>
      </div>
    </nav>
  );
};

const Sidebar = ({ activeModule, activeItem, onSelectItem }: { 
  activeModule: ModuleType, 
  activeItem: string, 
  onSelectItem: (id: string) => void 
}) => {
  const config = MODULES.find(m => m.id === activeModule);
  if (!config) return null;

  return (
    <aside className="w-56 flex-shrink-0 bg-bg-panel/90 border-r border-border-main overflow-y-auto py-3">
      <div className="px-4 py-1.5 text-[10px] text-text-dim tracking-widest uppercase mb-2">
        {config.label}
      </div>
      {config.sidebarItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelectItem(item.id)}
          className={cn(
            "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-all duration-150 border-l-2",
            activeItem === item.id
              ? "bg-accent-main/10 text-accent-main border-accent-main"
              : "text-text-secondary hover:bg-accent-main/5 hover:text-text-primary border-transparent"
          )}
        >
          <Icon name={item.icon} className="w-4.5 h-4.5" />
          <span>{item.label}</span>
          {item.badge && (
            <span className="ml-auto bg-accent-red text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </aside>
  );
};

const Ticker = () => (
  <div className="bg-accent-main/5 border-b border-border-main px-6 py-1 text-[11px] text-text-secondary overflow-hidden whitespace-nowrap">
    <motion.div
      animate={{ x: [0, -1000] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="inline-block"
    >
      📡 实时推送：&nbsp;&nbsp;
      【气象预警】辛榨乡今日14:00-18:00预计有中雨，当前降雨量6.8mm &nbsp;|&nbsp;
      【农机状态】无人插秧机 XZ-003 已完成西河村B区作业，累计面积112亩 &nbsp;|&nbsp;
      【病虫害】孙汪村2号地块纹枯病风险等级升至橙色，建议喷施井冈霉素 &nbsp;|&nbsp;
      【设备告警】土壤墒情传感器 SM-07 (西河村C区) 电量低于15%，请及时更换 &nbsp;|&nbsp;
      【产量更新】2025年春季批次累计产量 1,254 吨，较去年同期增长 8.3% &nbsp;|&nbsp;
      【系统公告】平台数据更新完成，本次同步 23 项遥感影像数据
    </motion.div>
  </div>
);

// --- Page Components ---

// DashboardPage has been moved to ./components/DashboardPage.tsx

// --- Main App ---

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('dashboard');
  const [activeSidebarItem, setActiveSidebarItem] = useState('dash-overview');
  const [modal, setModal] = useState<{ isOpen: boolean, title: string, content: React.ReactNode }>({
    isOpen: false,
    title: '',
    content: null
  });

  const handleModuleChange = (mod: ModuleType) => {
    setActiveModule(mod);
    const config = MODULES.find(m => m.id === mod);
    if (config) {
      setActiveSidebarItem(config.sidebarItems[0].id);
    }
  };

  const showAlert = (id: string) => {
    let title = '详情';
    let content = null;

    if (id === 'alert1') {
      title = '⚠️ 气象预警详情';
      content = (
        <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
          <div className="flex gap-2 items-center">
            <span className="px-2 py-0.5 rounded bg-accent-red/20 text-accent-red text-[10px]">红色预警</span>
            <span className="text-[11px]">发布时间：2026-04-01 14:28</span>
          </div>
          <p><strong className="text-text-primary">预警类型：</strong> 强降雨</p>
          <p><strong className="text-text-primary">影响范围：</strong> 辛榨乡全域，重点西河村、孙汪村</p>
          <p><strong className="text-text-primary">预计降雨：</strong> 14:00–18:00，累计 8–15 mm</p>
          <div className="h-px bg-border-main opacity-40 my-4" />
          <p><strong className="text-accent-main">建议措施：</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>张付村D区墒情已达88%，立即开启排水阀</li>
            <li>暂停今日无人机作业任务 XZ-007</li>
            <li>提醒农机操作人员注意安全</li>
          </ul>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setModal({ ...modal, isOpen: false })} className="flex-1 px-4 py-2 rounded bg-accent-main text-bg-deep font-bold text-xs">✅ 已知晓并处理</button>
            <button onClick={() => setModal({ ...modal, isOpen: false })} className="flex-1 px-4 py-2 rounded border border-border-main text-text-primary text-xs">📤 转发人员</button>
          </div>
        </div>
      );
    } else if (id === 'alert2') {
      title = '🐛 病虫害预警详情';
      content = (
        <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
          <div className="flex gap-2 items-center">
            <span className="px-2 py-0.5 rounded bg-accent-yellow/20 text-accent-yellow text-[10px]">橙色预警</span>
            <span className="text-[11px]">识别时间：2026-04-01 13:45</span>
          </div>
          <p><strong className="text-text-primary">病害类型：</strong> 纹枯病 (Rhizoctonia solani)</p>
          <p><strong className="text-text-primary">发生地块：</strong> 孙汪村2号地块（面积约420亩）</p>
          <p><strong className="text-text-primary">AI置信度：</strong> 87%</p>
          <div className="h-px bg-border-main opacity-40 my-4" />
          <p><strong className="text-accent-main">防治建议：</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>施药：井冈霉素 5% 水剂，每亩 50mL，兑水 45L</li>
            <li>时机：上午露水干后喷施，重点喷施茎基部</li>
          </ul>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setModal({ ...modal, isOpen: false })} className="flex-1 px-4 py-2 rounded bg-accent-main text-bg-deep font-bold text-xs">🚜 派发任务</button>
            <button onClick={() => setModal({ ...modal, isOpen: false })} className="flex-1 px-4 py-2 rounded border border-border-main text-text-primary text-xs">📞 联系专家</button>
          </div>
        </div>
      );
    }

    setModal({ isOpen: true, title, content });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav activeModule={activeModule} onModuleChange={handleModuleChange} />
      <Ticker />
      
      <div className="flex flex-1 h-[calc(100vh-84px)] overflow-hidden">
        <Sidebar 
          activeModule={activeModule} 
          activeItem={activeSidebarItem} 
          onSelectItem={setActiveSidebarItem} 
        />
        
        <main className="flex-1 overflow-y-auto bg-bg-deep/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeModule === 'dashboard' && <DashboardPage activeItem={activeSidebarItem} onShowAlert={showAlert} />}
              {activeModule === 'park' && <ParkManagementPage activeItem={activeSidebarItem} />}
              {activeModule === 'farming' && <FarmingManagementPage activeItem={activeSidebarItem} />}
              {activeModule === 'machine' && <MachineManagementPage activeItem={activeSidebarItem} />}
              {activeModule === 'bigdata' && <BigDataPage activeItem={activeSidebarItem} />}
              {activeModule === 'consult' && <ConsultationPage activeItem={activeSidebarItem} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Modal 
        isOpen={modal.isOpen} 
        onClose={() => setModal({ ...modal, isOpen: false })} 
        title={modal.title}
      >
        {modal.content}
      </Modal>
    </div>
  );
}
