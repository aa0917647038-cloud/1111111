import React, { useState } from "react";
import { Play, Eye, Heart, X, Award, Flame, Download, CheckCircle, Calculator, Sparkles, HelpCircle } from "lucide-react";
import { Course } from "../types";

interface VideoListProps {
  onAddCourseByRole: (role: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function VideoList({ onAddCourseByRole, onNavigateSection }: VideoListProps) {
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  
  // Interactive calculators/tool states for Free Tools section
  const [toolModal, setToolModal] = useState<string | null>(null);
  const [studyMonths, setStudyMonths] = useState<number>(4);
  const [studyHours, setStudyHours] = useState<number>(3);
  
  // Exactly 3 curated video lessons with simplified, clean look
  const videos = [
    {
      id: "video-1",
      tag: "考照族",
      title: "土地法規複雜條文 3 分鐘圖像記憶法",
      speaker: "詹坤林 地政特考名師",
      duration: "12:45",
      views: "1,420",
      likes: 384,
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
      targetCourse: "考照族",
      points: [
        "土地法第 34 條之 1「雙過半數決」處分神邏輯對比圖像",
        "土地法第 104 條優先購買權債物權衝突引、申、結論說法",
        "掌握高標申論題的黃金結構開標公式"
      ]
    },
    {
      id: "video-2",
      tag: "一般人",
      title: "家人過世後，房子繼承第一步怎麼做？",
      speaker: "廖學姐 (112年地政士上榜過戶達人)",
      duration: "15:20",
      views: "2,380",
      likes: 512,
      thumbnail: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
      targetCourse: "一般人",
      points: [
        "離世後 30 天內辦理死亡登記與各家財產清查要領",
        "遺產稅申報流程、免稅申報應繼分與特留分實際算法",
        "遺產協議分割書寫作及事務所與國稅局表格開箱"
      ]
    },
    {
      id: "video-3",
      tag: "從業者",
      title: "土地謄本怎麼看？3 個欄位最重要",
      speaker: "謝豪 執業地政士/公會講師",
      duration: "18:10",
      views: "3,110",
      likes: 645,
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
      targetCourse: "從業族",
      points: [
        "電子謄本「標示部、所有權部、他項權利部」關鍵速看標記",
        "限制登記、流押權、私人設定等嚴重交易阻礙地雷破解",
        "代書工作與不動產銷售經紀人交屋前的核心對案流程"
      ]
    }
  ];

  return (
    <section id="demo-classroom" className="scroll-mt-20">
      
      {/* ==================== 5. 影音區 ==================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-200">
        
        {/* 區塊標題 */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold text-[#e11d48] bg-rose-50 border border-rose-200 px-3 py-1 rounded-xs uppercase tracking-wider inline-block">
            免費精選課堂
          </span>
          <h2 className="text-2.5xl md:text-3xl font-display font-medium text-slate-950 font-bold tracking-tight mt-3">
            先看 3 分鐘，找到適合你的學習方式
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed font-light">
            不需購買，立即開箱 3 堂名師與學長姐錄製的高頻重點精華。先聽懂、好用、再前進。
          </p>
        </div>

        {/* 3支試聽影片卡片網格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setSelectedVideo(vid)}
              className="bg-[#fdfcf9] rounded-xs overflow-hidden border-2 border-slate-900 shadow-sm hover:translate-y-[-2px] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              {/* 圖片封面與標籤 */}
              <div className="relative aspect-video overflow-hidden border-b border-slate-900">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* 漸變蓋板 */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] bg-[#e11d48] text-white font-mono font-bold px-2 py-0.5 rounded-sm flex items-center">
                    <Flame className="w-2.5 h-2.5 mr-1 animate-pulse" />
                    試聽中
                  </span>
                  <span className="text-[10px] bg-slate-950/90 text-white font-mono rounded-xs px-1.5 ml-auto">
                    {vid.duration}
                  </span>
                </div>

                {/* 播放蓋板 icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white text-[#e11d48] p-3 rounded-xs border-2 border-slate-900 shadow-md group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-[#e11d48]" />
                  </div>
                </div>
              </div>

              {/* 卡片詳情 */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#fdfcf9]">
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 font-mono tracking-wider">{vid.tag}精修課堂</span>
                    <span className="text-[10px] text-slate-950 font-bold bg-[#f59e0b] px-1.5 py-0.5 border border-slate-900 font-mono rounded-xs">
                      {vid.speaker.split(" ")[0]}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-display font-bold text-slate-950 group-hover:text-[#e11d48] transition-colors line-clamp-2 leading-snug">
                    {vid.title}
                  </h3>
                </div>

                {/* 人氣數據，小字化 */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200 pt-3 font-mono">
                  <span>累計試聽：<strong>{vid.views}</strong> 次</span>
                  <span>點讚：{vid.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ==================== 6. 免費應援工具 ==================== */}
      <div id="free-tools" className="bg-[#f0ece3] border-b border-slate-300 py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-slate-700 bg-white border border-slate-400 px-3.5 py-1 rounded-xs uppercase tracking-wider inline-block">
              TOOLBOX
            </span>
            <h2 className="text-2.5xl md:text-3xl font-display font-medium text-slate-950 font-bold tracking-tight mt-3">
              應援備考與房地實務免費工具組
            </h2>
            <p className="text-slate-700 text-sm mt-3 leading-relaxed font-light">
              不需登入即可當場試算、閱覽、下載！提供您地政士金榜學姐與資深事務所地產專家一致推崇的金鑰工具。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 1. 地政士讀書計畫表 */}
            <div className="bg-[#fdfcf9] border-2 border-slate-900 p-6 rounded-xs flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-slate-950">
                  <Calculator className="w-5 h-5 text-[#e11d48]" />
                  <h3 className="text-base font-display font-bold">地政士 30 天讀書計畫表</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed text-left">
                  利用「時數精算公式」，拖動下方拉條，秒算目前剩餘月數所需的每日黃金高頻讀書計劃。
                </p>

                {/* 時數滑條模擬 */}
                <div className="bg-slate-50 border border-slate-300 p-4 rounded-xs text-left space-y-3 font-mono">
                  <div>
                    <label className="text-[10px] text-slate-500 block">距離考試 (月)： <strong>{studyMonths} 個月</strong></label>
                    <input 
                      type="range" 
                      min="1" 
                      max="12" 
                      value={studyMonths} 
                      onChange={(e) => setStudyMonths(parseInt(e.target.value))} 
                      className="w-full accent-slate-900" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block">每日自修學時： <strong>{studyHours} 小時</strong></label>
                    <input 
                      type="range" 
                      min="1" 
                      max="8" 
                      value={studyHours} 
                      onChange={(e) => setStudyHours(parseInt(e.target.value))} 
                      className="w-full accent-slate-900" 
                    />
                  </div>
                  <div className="border-t border-dashed border-slate-300 pt-2 text-xs">
                    總預期學習學時：<span className="text-[#e11d48] font-bold">{studyMonths * 30 * studyHours} 小時</span>
                    <span className="block text-[10px] text-[#f59e0b] font-medium mt-1">
                      {studyMonths * 30 * studyHours >= 180 ? "🎉 充足！適合購買【地政全科班】穩拿金榜" : "⚠️ 稍緊！建議專攻最新【修法大補帖】短時拉分"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  (window as any).showToast?.("📥 地政士讀書計畫大綱、每週時間拼圖分配 PDF 講義下載已完成！學姐強力備忘：晨讀 1 小時民法最清晰！", "success");
                }}
                className="w-full bg-slate-950 hover:bg-[#e11d48] text-white font-mono font-bold text-xs py-2.5 px-4 rounded-xs mt-6 transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>免費下載 PDF 計畫書</span>
              </button>
            </div>

            {/* 2. 房產繼承流程表 */}
            <div className="bg-[#fdfcf9] border-2 border-slate-900 p-6 rounded-xs flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-slate-950">
                  <Play className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-display font-bold">房產繼承與過戶關係流程表</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed text-left">
                  家人突然離世無所適從？這張白話流程表列出從「戶政死亡登記、國稅局查產、到地政所有權過戶」完整時效與備忘。
                </p>

                {/* 簡單步驟預覽 */}
                <div className="space-y-2 text-left font-mono text-[11px] p-2.5 bg-slate-50 border border-slate-200 rounded-xs">
                  <div className="flex items-center space-x-1.5 text-slate-800">
                    <span className="w-4 h-4 rounded-full bg-slate-950 text-white font-bold flex items-center justify-center text-[9px]">1</span>
                    <span>30日內辦理戶政死亡登記與除戶戶籍</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-800">
                    <span className="w-4 h-4 rounded-full bg-slate-950 text-white font-bold flex items-center justify-center text-[9px]">2</span>
                    <span>6個月內向國稅局辦理申報遺產稅</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-800">
                    <span className="w-4 h-4 rounded-full bg-slate-950 text-white font-bold flex items-center justify-center text-[9px]">3</span>
                    <span>繳稅完後到地政事務所辦理所有權移轉</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setToolModal("inherit-process");
                }}
                className="w-full bg-slate-950 hover:bg-[#e11d48] text-white font-mono font-bold text-xs py-2.5 px-4 rounded-xs mt-6 transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <span>🔍 在線展開完整大圖</span>
              </button>
            </div>

            {/* 3. 謄本判讀表 */}
            <div className="bg-[#fdfcf9] border-2 border-slate-900 p-6 rounded-xs flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-slate-950">
                  <Sparkles className="w-5 h-5 text-[#f59e0b]" />
                  <h3 className="text-base font-display font-bold">土地登記建物謄本判讀表</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed text-left">
                  不動產三大部「標示部、所有權部、他項權利部」怎麼看？31處關鍵代書與買賣合約陷阱警底全公開。
                </p>

                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xs text-left">
                  <span className="text-[10px] text-red-700 font-bold block mb-1">🚨 曾教授重點謄本指南：</span>
                  <p className="text-[11px] text-slate-800 leading-relaxed font-sans font-normal">
                    看他項權利部時，「最高限額抵押權、限制登記、流押特約」若出現代表產權極端危險，必須優先由代書辦理塗銷！
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setToolModal("register-checklist");
                }}
                className="w-full bg-slate-950 hover:bg-[#e11d48] text-white font-mono font-bold text-xs py-2.5 px-4 rounded-xs mt-6 transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <span>📋 在線查看 4 大判讀欄</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 影音上課詳情 Overlay / Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#fdfcf9] rounded-xs max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border-2 border-slate-900 p-6 flex flex-col justify-between">
            
            {/* 關閉按鈕 */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-slate-705 hover:text-black bg-white border border-slate-200 p-2 rounded-xs"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-5 text-left">
              <span className="inline-block bg-rose-50 border border-rose-200 text-[#e11d48] text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm">
                課堂精華點播播放中 (試聽版本)
              </span>
              <h3 className="text-lg font-display font-bold text-slate-950 pr-6 leading-snug">
                {selectedVideo.title}
              </h3>

              {/* 虛擬播放器介面 */}
              <div className="aspect-video bg-slate-950 border border-slate-800 rounded-xs p-6 flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden text-white">
                <div className="absolute top-2 left-2 bg-slate-900/60 p-1 text-[9px] text-[#f59e0b] font-mono rounded-xs">
                  浮水印: 考生應援局專屬影音
                </div>
                <Play className="w-10 h-10 text-[#e11d48] animate-pulse" />
                <div className="space-y-1">
                  <p className="text-xs font-mono font-bold">一試雙效！【金榜應援課】包含詹名師此段 15 分鐘完整解析</p>
                  <p className="text-[10px] text-slate-400">目前為限時免費觀看片段。完整教材與一對一 Line 助教批改可透過對應學習路線解鎖！</p>
                </div>
                <button
                  onClick={() => {
                    onAddCourseByRole(selectedVideo.targetCourse);
                    setSelectedVideo(null);
                  }}
                  className="bg-[#e11d48] hover:bg-rose-700 text-white font-mono text-xs font-bold py-2.5 px-5 rounded-xs mt-3 shadow-md"
                >
                  前往本學習路線 (加購物車/了解更多)
                </button>
              </div>

              {/* 導師提分重點 */}
              <div className="bg-amber-50 border border-amber-250 p-4 rounded-xs space-y-2">
                <span className="text-[11px] font-mono font-bold text-amber-900 block uppercase">💡 本堂試聽三大得分點：</span>
                <ul className="text-xs text-slate-850 space-y-1.5 text-left pl-4 list-disc">
                  {selectedVideo.points.map((pt, idx) => (
                    <li key={idx} className="leading-relaxed font-light">{pt}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-4 flex justify-end">
              <button
                onClick={() => setSelectedVideo(null)}
                className="bg-slate-950 text-white font-mono text-xs font-bold px-4 py-2 hover:bg-slate-900 rounded-xs"
              >
                關閉影片教室
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 免費工具彈窗說明 */}
      {toolModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#fdfcf9] rounded-xs max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 relative border-2 border-slate-900 text-left">
            <button
              onClick={() => setToolModal(null)}
              className="absolute top-4 right-4 text-slate-700 hover:text-black bg-white border p-1 rounded-xs"
            >
              <X className="w-4 h-4" />
            </button>

            {toolModal === "inherit-process" && (
              <div className="space-y-4">
                <h3 className="text-base font-display font-medium font-bold text-slate-950">房產繼承與過戶完整大圖表</h3>
                <p className="text-xs text-slate-500 font-mono">2026 最新一站式流程：自己申辦省下萬元費用要目</p>

                <div className="space-y-3 font-mono text-xs bg-slate-50 p-4 border border-slate-350 rounded-xs">
                  <div className="border-l-4 border-slate-900 pl-3 py-1 space-y-1">
                    <span className="font-bold text-slate-950">第 1 階段：戶政除戶 (除戶登記)</span>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-light">於死亡之日起 30 日內，攜帶死亡證明書與身分證到戶籍所在地戶政。超時將罰鍰！</p>
                  </div>
                  <div className="border-l-4 border-[#e11d48] pl-3 py-1 space-y-1">
                    <span className="font-bold text-slate-950">第 2 階段：產權申報 (國稅局辦清查)</span>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-light">辦理財產所得清單，在 6 個月內向戶籍所在地國稅局申報遺產稅。取得完稅或免稅證明書。</p>
                  </div>
                  <div className="border-l-4 border-emerald-600 pl-3 py-1 space-y-1">
                    <span className="font-bold text-slate-950">第 3 階段：协议分割 (代書遺產分割協議)</span>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-light">如全體繼承人同意，應繕寫紙本遺產協議分割書，加蓋所有印鑑證明並黏貼印花稅票。</p>
                  </div>
                  <div className="border-l-4 border-[#f59e0b] pl-3 py-1 space-y-1">
                    <span className="font-bold text-slate-950">第 4 階段：地政過戶 (產權地政登記)</span>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-light">至不動產所在地地政事務所辦理所有權移轉登記。恭喜您產權全部交收完成！</p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-300 p-3.5 rounded-xs text-[11px] text-amber-900 font-sans leading-relaxed flex items-start">
                  <span className="mr-1.5 font-bold">⚠️ 大師提醒：</span>
                  <span>自己辦理並非難事，我們【房產繼承與過戶入門課】附贈了全套範本表件，在線 1對1 引導。</span>
                </div>

                <button
                  onClick={() => {
                    (window as any).showToast?.("📥 房產繼承完整步驟表格及申辦印花稅防雷備忘 PDF 已送至下載對列！", "success");
                    setToolModal(null);
                  }}
                  className="w-full bg-[#e11d48] text-white font-mono font-bold text-xs py-2.5 rounded-xs mt-4 flex items-center justify-center space-x-1 hover:bg-rose-700 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>下載 PDF 實務指南大圖</span>
                </button>
              </div>
            )}

            {toolModal === "register-checklist" && (
              <div className="space-y-4">
                <h3 className="text-base font-display font-medium font-bold text-slate-950">謄本安全檢查判讀手記</h3>
                <p className="text-xs text-slate-500 font-mono">不動產交易前：必看的 4 大謄本重點精要</p>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-white border border-slate-300 rounded-xs">
                    <strong className="text-slate-950 font-mono block">1. 標示部：看清公共設施、共有持分比例</strong>
                    <p className="text-[11px] text-slate-600 mt-1 font-sans font-light leading-relaxed">查驗土地主體面積、公設停車位編號與建物實際主體面積。嚴格防範登記虛坪！</p>
                  </div>
                  <div className="p-3 bg-white border border-slate-300 rounded-xs">
                    <strong className="text-slate-950 font-mono block">2. 所有權部：是否有「限制登記」鎖死</strong>
                    <p className="text-[11px] text-slate-600 mt-1 font-sans font-light leading-relaxed">如果有法院「假扣押、假處分、司法扣押」或地政機關「預告登記」，此時買賣絕對違法！</p>
                  </div>
                  <div className="p-3 bg-white border border-slate-300 rounded-xs">
                    <strong className="text-[#e11d48] font-mono block">3. 他項權利部：有無「私人債務設定、高額借貸」</strong>
                    <p className="text-[11px] text-slate-600 mt-1 font-sans font-light leading-relaxed">看清楚抵押債權額。如果銀行外有其他自然人的高利設定，將在過戶時發生強拆糾紛！</p>
                  </div>
                  <div className="p-3 bg-white border border-slate-300 rounded-xs">
                    <strong className="text-slate-900 font-mono block">4. 地籍圖：看地上建物是否佔用他人土地</strong>
                    <p className="text-[11px] text-slate-600 mt-1 font-sans font-light leading-relaxed">交叉比對界址編號、道路退縮計畫與重測標線。避免購買後產生拆屋還地官司。</p>
                  </div>
                </div>

                <div className="border-t border-slate-300 pt-4 flex justify-end">
                  <button
                    onClick={() => setToolModal(null)}
                    className="bg-slate-950 text-white font-mono text-xs px-4 py-2 hover:bg-slate-900 rounded-xs"
                  >
                    關閉謄本檢查指南
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
