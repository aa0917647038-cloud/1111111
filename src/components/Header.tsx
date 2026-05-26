import React, { useState } from "react";
import { Search, ShoppingCart, Menu, X, BookOpen, GraduationCap, Award, Flame, Bell, Trash2, ShieldCheck } from "lucide-react";
import { Course } from "../types";

interface HeaderProps {
  onSearch: (term: string) => void;
  cartCount: number;
  cartItems: { course: Course; quantity: number }[];
  onRemoveItem: (id: string) => void;
  onOpenCartDrawer: () => void;
  onNavigateSection: (sectionId: string) => void;
  currentSearchTerm: string;
}

export default function Header({
  onSearch,
  cartCount,
  cartItems,
  onRemoveItem,
  onOpenCartDrawer,
  onNavigateSection,
  currentSearchTerm
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fdfcf9] border-b-4 border-double border-slate-900">
      {/* 應援公告欄 */}
      <div id="announcement-bar" className="w-full bg-[#e11d48] py-2.5 px-4 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs md:text-sm font-medium">
          <div className="flex items-center space-x-2">
            <span className="bg-slate-950 text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded-xs tracking-wider uppercase">最新公告</span>
            <span className="font-display">🔥 最新修法衝刺班限時開放中｜平均地權條例、土地登記規則重點更新</span>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-xs font-mono">
            <span className="bg-slate-950/40 px-2.5 py-0.5 rounded-sm font-semibold text-rose-50 border border-white/20">
              輸入代碼『PASS2026』再扣 $500
            </span>
          </div>
        </div>
      </div>

      {/* 主導航 */}
      <nav id="main-navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* 左側選單按鈕 (Mobile Only) & Logo */}
        <div className="flex items-center space-x-4">
          <button
            id="mobile-drawer-toggle"
            onClick={() => setIsMenuOpen(true)}
            className="p-2 -ml-2 text-slate-800 hover:text-black focus:outline-hidden transition-colors border border-slate-300 bg-white shadow-xs rounded-sm hover:border-slate-900 lg:hidden"
            title="開啟功能選單"
            aria-label="開啟選單"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* 品牌 Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigateSection("hero")}>
            <GraduationCap className="w-6.5 h-6.5 text-[#e11d48]" />
            <div className="flex flex-col">
              <span className="block text-lg md:text-xl font-display font-medium font-bold tracking-tight text-slate-950 leading-none">
                地政士備考應援局
              </span>
              <span className="block text-[8px] text-slate-500 font-mono tracking-widest uppercase mt-0.5">
                LAND E-LEARNING HUB
              </span>
            </div>
          </div>
        </div>

        {/* 中間簡潔導覽列 - 先分流、再推薦、建立信任首頁架構 */}
        <div className="hidden lg:flex items-center space-x-6 text-xs font-mono font-bold text-slate-700 tracking-wider">
          <button onClick={() => onNavigateSection("course-selector")} className="hover:text-[#e11d48] transition-colors cursor-pointer uppercase">🎓 考照課程</button>
          <button onClick={() => onNavigateSection("course-selector")} className="hover:text-[#e11d48] transition-colors cursor-pointer uppercase">💼 實務進修</button>
          <button onClick={() => onNavigateSection("course-selector")} className="hover:text-[#e11d48] transition-colors cursor-pointer uppercase">🏠 生活房地知識</button>
          <button onClick={() => onNavigateSection("free-tools")} className="hover:text-[#e11d48] transition-colors cursor-pointer uppercase">🎁 免費資源</button>
          <button onClick={() => {
            (window as any).showToast?.("✨ 地政士備考應援局是由資深代書事務所團隊與地政名師攜手創立，專精最新共有分流、平均地權與囤房稅 2.0 系統化教學解答。", "info");
          }} className="hover:text-[#e11d48] transition-colors cursor-pointer uppercase">ℹ️ 關於我們</button>
        </div>

        {/* 右側：搜尋與購物車 */}
        <div className="flex items-center space-x-2 md:space-x-4">
          
          {/* 搜尋列 */}
          <div className="relative block w-28 sm:w-36 md:w-36 lg:w-44">
            <input
              type="text"
              placeholder="搜尋課程/法規..."
              value={currentSearchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-7 pr-5 py-1 text-xs bg-white border border-slate-300 focus:outline-hidden font-mono"
            />
            <Search className="absolute left-2 top-1.5 w-3 h-3 text-slate-500 pointer-events-none" />
            {currentSearchTerm && (
              <button 
                onClick={() => onSearch("")}
                className="absolute right-1.5 top-1 text-slate-400 hover:text-slate-650 text-[10px] font-bold cursor-pointer"
                title="清除"
              >
                ✕
              </button>
            )}
          </div>

          {/* 購物車區塊 */}
          <div className="relative">
            <button
              id="shopping-cart-button"
              onClick={onOpenCartDrawer}
              onMouseEnter={() => setShowCartDropdown(true)}
              onMouseLeave={() => setShowCartDropdown(false)}
              className="p-2 text-slate-700 hover:text-[#e11d48] relative transition-colors cursor-pointer"
              title="檢視我的應援課程包"
            >
              <ShoppingCart className="w-5.5 h-5.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-xs border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* 購物車懸浮預覽面板 */}
            {showCartDropdown && cartCount > 0 && (
              <div
                onMouseEnter={() => setShowCartDropdown(true)}
                onMouseLeave={() => setShowCartDropdown(false)}
                className="absolute right-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-slate-100 py-3 px-4 z-50 text-slate-800"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                  <span className="text-xs font-bold text-slate-900">學員購物車 ({cartCount})</span>
                  <button onClick={onOpenCartDrawer} className="text-[11px] font-bold text-rose-600 hover:text-rose-700">
                    展開滿額優惠 →
                  </button>
                </div>
                <div className="max-h-56 overflow-y-auto space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.course.id} className="flex items-start justify-between py-1 border-b border-dashed border-slate-50 last:border-0 pb-1.5 text-xs">
                      <div className="flex-1 pr-2">
                        <span className="font-semibold text-slate-800 line-clamp-1">{item.course.title}</span>
                        <span className="text-[10px] text-slate-400 block">{item.course.category} | 共 {item.course.hours} 小時</span>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="font-bold text-rose-600 block">NT$ {item.course.price.toLocaleString()}</span>
                        <button
                          onClick={() => onRemoveItem(item.course.id)}
                          className="text-[10px] text-slate-400 hover:text-rose-600 transition-colors cursor-pointer mt-0.5"
                        >
                          刪除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 pt-2.5 mt-2 flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                  <div>
                    <span className="text-[10px] text-slate-500 block">不含稅及折扣折扣前</span>
                    <span className="text-sm font-extrabold text-slate-900">
                      NT$ {cartItems.reduce((acc, current) => acc + current.course.price, 0).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={onOpenCartDrawer}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-1.5 px-3 rounded-md transition-all cursor-pointer"
                  >
                    立即結帳
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* 側邊抽屜抽屜式菜單 (Mobile & Side Overview) */}
      <div
        id="sidebar-drawer-overlay"
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity z-50 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          id="sidebar-drawer-body"
          className={`fixed left-0 top-0 bottom-0 max-w-xs w-full bg-slate-900 text-white p-6 shadow-2xl transition-transform duration-300 ease-out flex flex-col justify-between ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-6 h-6 text-amber-400" />
                <span className="font-extrabold text-lg text-rose-100 tracking-wide">應援備考總理局</span>
              </div>
              <button
                id="sidebar-drawer-close"
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
                title="關閉選單"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-8 space-y-5">
              <span className="text-[10px] tracking-widest text-slate-500 font-bold block uppercase">備考資源導尋</span>
              <button
                onClick={() => { onNavigateSection("hero"); setIsMenuOpen(false); }}
                className="flex items-center space-x-3 text-slate-300 hover:text-amber-400 font-medium transition-colors w-full text-left"
              >
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                <span>🏆 應援局首頁與申論白皮書</span>
              </button>
              <button
                onClick={() => { onNavigateSection("demo-classroom"); setIsMenuOpen(false); }}
                className="flex items-center space-x-3 text-slate-300 hover:text-amber-400 font-medium transition-colors w-full text-left"
              >
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                <span>📺 好課播放中 (試聽 4 大名師影音)</span>
              </button>
              <button
                onClick={() => { onNavigateSection("course-selector"); setIsMenuOpen(false); }}
                className="flex items-center space-x-3 text-slate-300 hover:text-amber-400 font-medium transition-colors w-full text-left"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                <span>🎓 應援選課中心 (課程精選考卷)</span>
              </button>
              <button
                onClick={() => { onNavigateSection("study-helper"); setIsMenuOpen(false); }}
                className="flex items-center space-x-3 text-slate-300 hover:text-amber-400 font-medium transition-colors w-full text-left"
              >
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span>📝 備考工具 (隨堂測驗 / 複習時數計算)</span>
              </button>
            </div>

            <div className="mt-10 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <span className="text-[11px] font-bold text-rose-400 flex items-center mb-1">
                <Bell className="w-3.5 h-3.5 mr-1" />
                考情修法提醒
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                最新【平均地權條例】及房屋稅新制（囤房稅 2.0）已全數納入全科金榜保證班教材，學員不需補交任何修法大補帖差額！
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>2026 國家考試地政士專屬應援</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Sparkle helper icon
function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
    </svg>
  );
}
