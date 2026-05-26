import React, { useState, useEffect } from "react";
import { Clock, Download, HardHat, Sparkles, BookOpen, ChevronRight, UserCheck, Flame, Calendar } from "lucide-react";

interface HeroSectionProps {
  onNavigateSection: (sectionId: string) => void;
}

export default function HeroSection({ onNavigateSection }: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 5,
    minutes: 42,
    seconds: 18
  });

  const [downloadedMock, setDownloadedMock] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  // Countdown clock effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      alert("請輸入正確的電子郵件信箱以接收講義！");
      return;
    }
    setDownloadedMock(true);
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-slate-950 text-white py-16 md:py-24 border-b-4 border-slate-900">
      {/* Background Graphic elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute -top-12 -left-12 w-96 h-96 rounded-full bg-rose-600 blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 w-[450px] h-[450px] rounded-full bg-amber-500 blur-3xl"></div>
        {/* Decorative Grid Patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* 左側：精美標題與考衝白皮書下載 */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          
          <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-700 px-3.5 py-1.5 rounded-xs text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b] animate-pulse" />
            <span className="text-slate-300 font-bold tracking-wider font-mono">115年度地政士國家考試特修研習會及課程大改版</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight leading-tight">
            地政士考照與不動產實務<br />
            <span className="text-[#f59e0b] italic">
              一站式雲端學習平台
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-sans font-light">
            不論你是準備考照、從事不動產工作，或只是想搞懂繼承、買賣、過戶問題，都能在此找到最適合你的專屬學習路線。
          </p>

          {/* 三個特色指標 */}
          <div className="grid grid-cols-3 gap-4 border-t border-b border-slate-800 py-6">
            <div>
              <span className="block text-2.5xl md:text-3xl font-display font-bold text-white">2,845 +</span>
              <span className="text-[11px] text-slate-400">歷年輔導學員</span>
            </div>
            <div>
              <span className="block text-2.5xl md:text-3xl font-display font-bold text-[#e11d48]">89.4 %</span>
              <span className="text-[11px] text-slate-400">學員好評推薦</span>
            </div>
            <div>
              <span className="block text-2.5xl md:text-3xl font-display font-bold text-[#f59e0b]">5.8 倍</span>
              <span className="text-[11px] text-slate-400">高於全國考取率</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => onNavigateSection("identity-split")}
              className="bg-[#e11d48] hover:bg-rose-700 text-white font-bold px-8 py-3.5 rounded-xs shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer text-sm font-mono tracking-wider"
            >
              <span>🎯 我要考地政士</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => onNavigateSection("identity-split")}
              className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-8 py-3.5 rounded-xs flex items-center justify-center space-x-2 transition-all cursor-pointer text-sm font-mono"
            >
              <span>🏠 我想解決房地問題</span>
            </button>
          </div>
        </div>

        {/* 右側：倒數計時卡與免費講義索取 (E-commerce Style Call-out Box) */}
        <div className="lg:col-span-5 bg-slate-900 rounded-xs border-2 border-slate-800 p-6 md:p-8 shadow-2xl relative">
          
          <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-[#f59e0b] text-slate-950 font-bold text-xs py-1 px-3.5 rounded-xs shadow-md flex items-center tracking-wider">
            <Flame className="w-3 h-3 mr-1 animate-pulse" />
            <span>修法爭霸班限時特惠中</span>
          </div>

          <div className="space-y-6">
            
            {/* 倒數計時器 */}
            <div className="text-center pb-4 border-b border-slate-800">
              <span className="text-xs text-slate-400 font-medium tracking-wider flex items-center justify-center mb-1.5 uppercase font-mono">
                <Clock className="w-3.5 h-3.5 mr-1 text-[#e11d48]" />
                距離本屆精準衝刺考試截止 倒數
              </span>
              <div className="flex items-center justify-center gap-2.5 mt-2">
                <div className="bg-slate-950 p-2 text-center rounded-xs border border-slate-800 w-16">
                  <span className="block text-2xl font-mono font-bold text-[#e11d48]">{timeLeft.days}</span>
                  <span className="text-[9px] text-slate-500 font-medium">DAYS 天</span>
                </div>
                <span className="text-xl font-bold text-slate-800">:</span>
                <div className="bg-slate-950 p-2 text-center rounded-xs border border-slate-800 w-16">
                  <span className="block text-2xl font-mono font-bold text-white">{timeLeft.hours}</span>
                  <span className="text-[9px] text-slate-500 font-medium font-mono">HOURS 時</span>
                </div>
                <span className="text-xl font-bold text-slate-800">:</span>
                <div className="bg-slate-950 p-2 text-center rounded-xs border border-slate-800 w-16">
                  <span className="block text-2xl font-mono font-bold text-white">{timeLeft.minutes}</span>
                  <span className="text-[9px] text-slate-500 font-medium">MINS 分</span>
                </div>
                <span className="text-xl font-bold text-slate-800">:</span>
                <div className="bg-slate-950 p-2 text-center rounded-xs border border-slate-800 w-16">
                  <span className="block text-[#f59e0b] text-2xl font-mono font-bold">{timeLeft.seconds}</span>
                  <span className="text-[9px] text-slate-500 font-medium">SECS 秒</span>
                </div>
              </div>
            </div>

            {/* 白皮書免費下載 */}
            <div>
              <div className="flex items-center space-x-2 text-[#e11d48] text-xs font-semibold mb-2 font-mono">
                <Calendar className="w-4 h-4" />
                <span>免費應援資源：115 年申論考前衝刺白皮書</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                包含今年三部最核心土地等法學新制考預估、模擬配分剖析（共 12 頁精編 PDF）。已有 <strong className="text-amber-400">9,482 人</strong>成功下載！
              </p>

              {downloadedMock ? (
                <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xs p-4 text-emerald-200 text-xs text-center space-y-2">
                  <p className="font-bold">🎉 下載連結已寄送至您的電子信箱！</p>
                  <p className="text-[11px] text-emerald-400">同時贈送試聽專屬 $500 購物金已存入，直接在選課結帳時使用代碼 PASS2026 折扣！</p>
                </div>
              ) : (
                <form onSubmit={handleDownload} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="請輸入您的 Email 地址"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xs px-4 py-3 placeholder:text-slate-500 text-slate-100 focus:outline-hidden focus:border-[#e11d48] focus:ring-1 focus:ring-[#e11d48] transition-all font-mono"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#f59e0b] hover:bg-amber-500 text-slate-950 font-bold text-xs py-3 rounded-xs flex items-center justify-center space-x-2 cursor-pointer shadow-md transition-all active:translate-y-px font-mono uppercase tracking-wider"
                  >
                    <Download className="w-4 h-4" />
                    <span>免費領取 PDF 白皮書 & 開箱大講義</span>
                  </button>
                </form>
              )}
            </div>

            {/* 保證標章 */}
            <div className="flex items-center space-x-2.5 text-[10px] text-slate-400 border-t border-slate-800 pt-4">
              <UserCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>通過 256 位地政考生與地政士公會會員專業校對，無廢話、純精華。</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
