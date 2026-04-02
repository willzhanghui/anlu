import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  BookOpen, MessageSquare, GraduationCap, Search, Plus, 
  Filter, Send, Image as ImageIcon, Paperclip, Phone, 
  Star, CheckCircle2, Clock, AlertCircle, ChevronRight,
  FileText, ThumbsUp, User, Building2, BarChart3,
  ExternalLink, Download, ShieldCheck, Mail
} from 'lucide-react';

interface ConsultationPageProps {
  activeItem: string;
}

export const ConsultationPage: React.FC<ConsultationPageProps> = ({ activeItem }) => {
  
  // --- 1. 知识库 (Knowledge Base) ---
  const KBContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-text-dim" size={14} />
            <input type="text" placeholder="搜索病虫害防治、水肥管理..." className="bg-bg-deep border border-border-main rounded px-8 py-1.5 text-xs focus:outline-none focus:border-accent-main w-64" />
          </div>
          <button className="px-3 py-1.5 rounded border border-border-main text-text-secondary text-xs hover:bg-bg-panel transition-colors flex items-center gap-1">
            <Filter size={14} /> 分类检索
          </button>
        </div>
        <button className="px-3 py-1.5 rounded bg-accent-main text-bg-deep font-bold text-xs hover:bg-accent-main/80 transition-colors flex items-center gap-1">
          <Plus size={14} /> 录入知识条目
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="panel p-4 space-y-4">
          <div className="text-xs font-bold text-text-primary border-b border-border-main pb-2">知识分类</div>
          <div className="space-y-1">
            {['病虫害防治', '水肥管理', '种植技术', '农机操作', '政策法规', '市场行情'].map((cat, i) => (
              <div key={i} className={cn(
                "px-3 py-2 rounded text-xs cursor-pointer transition-colors flex justify-between items-center",
                i === 0 ? "bg-accent-main/10 text-accent-main" : "text-text-secondary hover:bg-bg-panel"
              )}>
                {cat}
                <ChevronRight size={12} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3 space-y-4">
          {[
            { title: '水稻纹枯病综合防治技术指南', cat: '病虫害防治', author: '系统管理员', date: '2026-03-20', views: 1240, status: '已发布' },
            { title: '高标准农田水肥一体化自动控制系统操作手册', cat: '水肥管理', author: '技术部', date: '2026-03-15', views: 856, status: '已发布' },
            { title: '2026年春季早稻育秧关键技术要点', cat: '种植技术', author: '华农专家组', date: '2026-03-10', views: 2100, status: '已发布' },
            { title: '无人驾驶插秧机路径规划常见问题排查', cat: '农机操作', author: '运维团队', date: '2026-03-05', views: 432, status: '审核中' },
          ].map((item, i) => (
            <div key={i} className="panel p-4 group hover:border-accent-main transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-accent-main/10 text-accent-main text-[9px]">{item.cat}</span>
                  <h3 className="text-sm font-bold text-text-primary group-hover:text-accent-main transition-colors">{item.title}</h3>
                </div>
                <span className={cn(
                  "px-1.5 py-0.5 rounded text-[9px]",
                  item.status === '已发布' ? "bg-accent-green/20 text-accent-green" : "bg-accent-yellow/20 text-accent-yellow"
                )}>{item.status}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-text-dim mt-4">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><User size={10} /> {item.author}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {item.date}</span>
                  <span className="flex items-center gap-1"><ThumbsUp size={10} /> {item.views} 查阅</span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-accent-main hover:underline">编辑</button>
                  <button className="text-text-dim hover:text-text-primary">删除</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --- 2. 在线咨询 (Online Consultation) ---
  const QAConsultContent = () => {
    const [selectedChat, setSelectedChat] = useState(0);

    return (
      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        <div className="panel flex flex-col h-full">
          <div className="panel-header">
            <div className="panel-title">咨询记录查询</div>
            <div className="text-[10px] text-accent-main">2条未读</div>
          </div>
          <div className="p-2 space-y-2 overflow-y-auto flex-1">
            {[
              { user: '张大伯 (西河村)', preview: '我家水稻叶子发黄是怎么回事？', time: '10:32', unread: true, type: '病虫害' },
              { user: '李四 (孙汪村)', preview: '无人机喷洒药剂浓度怎么调？', time: '昨天', unread: false, type: '农机' },
              { user: '王五 (张付村)', preview: '最近的补贴政策在哪里看？', time: '2026-03-30', unread: false, type: '政策' },
            ].map((chat, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedChat(i)}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-all border",
                  selectedChat === i ? "bg-accent-main/10 border-accent-main" : "bg-bg-panel/50 border-border-main hover:border-border-glow"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="text-xs font-bold text-text-primary">{chat.user}</div>
                  <span className="text-[9px] text-text-dim">{chat.time}</span>
                </div>
                <div className="text-[10px] text-text-secondary truncate">{chat.preview}</div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="px-1 py-0.5 rounded bg-bg-deep text-[8px] text-text-dim border border-border-main">{chat.type}</span>
                  {chat.unread && <div className="w-1.5 h-1.5 rounded-full bg-accent-red" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 panel flex flex-col h-full relative overflow-hidden">
          <div className="panel-header border-b border-border-main bg-bg-card/50 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-main/20 flex items-center justify-center text-accent-main font-bold text-xs">张</div>
              <div>
                <div className="text-xs font-bold text-text-primary">张大伯 (西河村)</div>
                <div className="text-[9px] text-accent-green flex items-center gap-1">
                  <CheckCircle2 size={8} /> 智能路由：已分配至 华农-李教授
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 rounded border border-border-main text-text-dim hover:text-accent-main transition-colors"><Phone size={14} /></button>
              <button className="p-1.5 rounded border border-border-main text-text-dim hover:text-accent-main transition-colors"><Star size={14} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-deep/30">
            <div className="flex justify-center"><span className="text-[9px] text-text-dim bg-bg-panel px-2 py-0.5 rounded">今天 10:30</span></div>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-main/20 flex-shrink-0 flex items-center justify-center text-accent-main font-bold text-xs">张</div>
              <div className="space-y-2 max-w-[80%]">
                <div className="p-3 rounded-2xl rounded-tl-none bg-bg-panel border border-border-main text-xs text-text-secondary leading-relaxed">
                  李教授您好，我家西河村A区的水稻，最近发现叶尖有点发黄，您帮我看看是怎么回事？
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square bg-bg-panel rounded-lg border border-border-main overflow-hidden group relative">
                    <img src="https://picsum.photos/seed/rice1/200/200" alt="Rice leaf" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><Search size={16} className="text-white" /></div>
                  </div>
                  <div className="aspect-square bg-bg-panel rounded-lg border border-border-main overflow-hidden group relative">
                    <img src="https://picsum.photos/seed/rice2/200/200" alt="Rice leaf" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><Search size={16} className="text-white" /></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-accent-green/20 flex-shrink-0 flex items-center justify-center text-accent-green font-bold text-xs">李</div>
              <div className="space-y-2 max-w-[80%]">
                <div className="p-3 rounded-2xl rounded-tr-none bg-accent-main text-bg-deep text-xs font-medium leading-relaxed">
                  张大伯您好，从照片来看，这可能是由于近期温差过大导致的生理性发黄，也可能是缺钾的表现。建议您先观察一下根部是否有腐烂现象。
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border-main bg-bg-card/50">
            <div className="flex items-center gap-2 mb-3">
              <button className="p-1.5 text-text-dim hover:text-accent-main transition-colors"><ImageIcon size={16} /></button>
              <button className="p-1.5 text-text-dim hover:text-accent-main transition-colors"><Paperclip size={16} /></button>
              <div className="h-4 w-[1px] bg-border-main mx-1" />
              <span className="text-[10px] text-text-dim">快捷回复：</span>
              {['建议施肥', '病害识别', '预约上门'].map((tag, i) => (
                <button key={i} className="px-2 py-0.5 rounded-full border border-border-main text-[9px] text-text-secondary hover:border-accent-main hover:text-accent-main transition-colors">{tag}</button>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="输入回复内容..." className="flex-1 bg-bg-deep border border-border-main rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-accent-main" />
              <button className="px-4 py-2 rounded-lg bg-accent-main text-bg-deep font-bold text-xs flex items-center gap-2 hover:bg-accent-main/80 transition-colors">
                发送 <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- 3. 专家团队 (Expert Team) ---
  const ExpertContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '专家总数', value: '24', unit: '位', icon: <GraduationCap className="text-accent-main" /> },
          { label: '在线咨询', value: '8', unit: '位', icon: <MessageSquare className="text-accent-green" /> },
          { label: '待办问题', value: '12', unit: '个', icon: <AlertCircle className="text-accent-yellow" /> },
          { label: '平均满意度', value: '4.9', unit: '分', icon: <Star className="text-accent-main fill-accent-main" /> },
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
          <div className="panel-title">专家信息注册与资质审核管理</div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-text-dim" size={14} />
              <input type="text" placeholder="搜索专家、领域..." className="bg-bg-deep border border-border-main rounded px-8 py-1 text-xs focus:outline-none focus:border-accent-main w-48" />
            </div>
            <button className="px-3 py-1 bg-accent-main text-bg-deep rounded text-xs font-bold flex items-center gap-1 hover:bg-accent-main/80 transition-colors">
              <Plus size={14} /> 专家入驻
            </button>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: '李明华', title: '教授 / 博士生导师', school: '华中农业大学', field: '水稻遗传育种', score: 5.0, cases: 124, status: '在线', avatar: '李' },
            { name: '王志远', title: '副教授', school: '华中农业大学', field: '植物保护/病虫害', score: 4.9, cases: 86, status: '忙碌', avatar: '王' },
            { name: '陈晓红', title: '高级农艺师', school: '安陆市农技推广中心', field: '土壤肥料/水肥', score: 4.8, cases: 210, status: '离线', avatar: '陈' },
            { name: '赵建国', title: '教授', school: '华中农业大学', field: '智能农机装备', score: 4.9, cases: 54, status: '在线', avatar: '赵' },
            { name: '孙丽娜', title: '研究员', school: '华中农业大学', field: '农业大数据分析', score: 5.0, cases: 42, status: '在线', avatar: '孙' },
            { name: '刘洋', title: '博士', school: '华中农业大学', field: '智慧农业系统', score: 4.7, cases: 38, status: '离线', avatar: '刘' },
          ].map((expert, i) => (
            <div key={i} className="panel p-4 group hover:border-accent-main transition-all cursor-pointer relative overflow-hidden">
              {expert.school.includes('华中农业大学') && (
                <div className="absolute -right-6 -top-6 w-12 h-12 bg-accent-main/10 rotate-45 flex items-end justify-center pb-1">
                  <ShieldCheck size={10} className="text-accent-main" />
                </div>
              )}
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-bg-deep border border-border-main flex items-center justify-center text-lg font-bold text-accent-main group-hover:bg-accent-main group-hover:text-bg-deep transition-colors">
                  {expert.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-text-primary group-hover:text-accent-main transition-colors">{expert.name}</h3>
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      expert.status === '在线' ? "bg-accent-green" : expert.status === '忙碌' ? "bg-accent-yellow" : "bg-text-dim"
                    )} />
                  </div>
                  <div className="text-[10px] text-text-dim">{expert.title}</div>
                  <div className="text-[10px] text-accent-main font-medium">{expert.school}</div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-[10px]">
                  <span className="text-text-dim">擅长领域</span>
                  <span className="text-text-secondary">{expert.field}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-text-dim">服务评价</span>
                  <span className="flex items-center gap-1 text-accent-yellow"><Star size={10} className="fill-accent-yellow" /> {expert.score}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-text-dim">咨询案例</span>
                  <span className="text-text-secondary">{expert.cases} 例</span>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-border-main/50">
                <button className="flex-1 py-1.5 rounded bg-accent-main text-bg-deep font-bold text-[10px] hover:bg-accent-main/80 transition-colors flex items-center justify-center gap-1">
                  <MessageSquare size={12} /> 在线咨询
                </button>
                <button className="px-3 py-1.5 rounded border border-border-main text-text-dim hover:text-text-primary transition-colors">
                  <User size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="panel p-4">
          <div className="panel-header mb-4"><div className="panel-title">专家服务统计报表</div></div>
          <div className="space-y-4">
            {[
              { label: '咨询响应率', value: '98.5%', color: 'bg-accent-green' },
              { label: '问题解决率', value: '94.2%', color: 'bg-accent-main' },
              { label: '好评率', value: '99.1%', color: 'bg-accent-yellow' },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-text-dim">{stat.label}</span>
                  <span className="text-text-primary font-bold">{stat.value}</span>
                </div>
                <div className="h-1.5 bg-bg-deep rounded-full overflow-hidden">
                  <div className={cn("h-full", stat.color)} style={{ width: stat.value }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-4">
          <div className="panel-header mb-4"><div className="panel-title">待办问题与服务评价管理</div></div>
          <div className="space-y-3">
            {[
              { type: '待办', title: '西河村A区水稻叶尖发黄诊断', time: '10分钟前', user: '张大伯' },
              { type: '评价', title: '“李教授讲解非常细致，解决了我的大难题！”', time: '1小时前', user: '李四', score: 5 },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded bg-bg-panel border border-border-main flex justify-between items-start">
                <div className="flex gap-3">
                  <div className={cn(
                    "px-1.5 py-0.5 rounded text-[9px] h-fit",
                    item.type === '待办' ? "bg-accent-yellow/20 text-accent-yellow" : "bg-accent-green/20 text-accent-green"
                  )}>{item.type}</div>
                  <div>
                    <div className="text-[10px] font-bold text-text-primary">{item.title}</div>
                    <div className="text-[9px] text-text-dim mt-1">{item.user} · {item.time}</div>
                  </div>
                </div>
                {item.score && <div className="flex text-accent-yellow"><Star size={10} className="fill-accent-yellow" /></div>}
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
          <h1 className="text-lg font-bold">农业技术咨询服务系统</h1>
          <p className="text-xs text-text-dim mt-1">
            {activeItem === 'cons-kb' && '病虫害防治 · 水肥管理知识条目维护 · 全文检索 · 审核发布流程'}
            {activeItem === 'cons-qa' && '农户在线提问 · 图文上传 · 智能分类自动路由 · 咨询记录查询'}
            {activeItem === 'cons-expert' && '专家注册资质审核 · 待办问题列表 · 图文回复 · 服务评价统计'}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded border border-border-glow text-accent-main bg-accent-main/10 text-xs hover:bg-accent-main/20 transition-colors flex items-center gap-1"><ShieldCheck size={14} /> 资质认证</button>
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
          {activeItem === 'cons-kb' && <KBContent />}
          {activeItem === 'cons-qa' && <QAConsultContent />}
          {activeItem === 'cons-expert' && <ExpertContent />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
