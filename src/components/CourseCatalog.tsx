import React, { useState } from "react";
import { BookOpen, Star, ShoppingCart, Award, Calendar, CheckCircle2, ChevronRight, Bookmark } from "lucide-react";
import { Course } from "../types";

interface CourseCatalogProps {
  onAddCourse: (course: Course) => void;
  selectedRoleFilter?: string; // Auto Highlight / filtering support
}

export default function CourseCatalog({ onAddCourse, selectedRoleFilter }: CourseCatalogProps) {
  const [selectedCourseSyllabus, setSelectedCourseSyllabus] = useState<any | null>(null);

  const recommendedCourses = [
    {
      id: "course-all-pass",
      role: "考照族",
      roleBadge: "考照族專屬",
      tagColor: "bg-blue-100 text-blue-800 border-blue-200",
      title: "2026 地政士全科精修班",
      targetWho: "適合誰：從零基礎到考前衝刺",
      price: 18800,
      originalPrice: 28800,
      hours: 180,
      lectures: 120,
      rating: 4.9,
      reviewsCount: 384,
      points: [
        "雙名師全科金榜授課，系統化建立申論三段論框架",
        "宅配全套實體必背講義與獨家歷屆大套書 (免運費)",
        "加贈最新囤房稅、平均地權修法大補帖與全科批改服務"
      ],
      syllabus: [
        { title: "民法篇：物權編、債編與繼承編核心重點剖析", duration: "45 小時" },
        { title: "土地法規篇：土地徵收、計畫與利用法學大躍進", duration: "45 小時" },
        { title: "土地稅法規：增值稅、房地合一與契稅算題實戰", duration: "35 小時" },
        { title: "土地登記規則：登記實務、程序與救濟完全攻略", duration: "35 小時" },
        { title: "總複習與申論寫作突破考前衝刺", duration: "20 小時" }
      ]
    },
    {
      id: "course-industry-register",
      role: "從業族",
      roleBadge: "從業族專屬",
      tagColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      title: "土地登記與謄本判讀實務課",
      targetWho: "適合誰：房仲、助理、法務都適合",
      price: 4980,
      originalPrice: 8000,
      hours: 24,
      lectures: 16,
      rating: 4.8,
      reviewsCount: 196,
      points: [
        "3 步驟看透異動、謄本、土地地籍圖交叉比對細節",
        "不動產他項權利設定登記、共有繼承與信託辦理精髓",
        "掌握常見產權交易糾紛盲點，快速規避數百萬交易陷阱"
      ],
      syllabus: [
        { title: "土地建物登記權狀格式與防偽判讀指標", duration: "6 小時" },
        { title: "土地登記程序八大步驟與權利異動實例", duration: "8 小時" },
        { title: "共同委託與信託登記申辦防身守則", duration: "6 小時" },
        { title: "地籍糾紛案例探討與調處流程解讀", duration: "4 小時" }
      ]
    },
    {
      id: "course-peeps-inherit",
      role: "一般人",
      roleBadge: "一般人首選",
      tagColor: "bg-orange-100 text-orange-850 border-orange-200",
      title: "房產繼承與過戶入門課",
      targetWho: "適合誰：家人過世後，第一步怎麼做",
      price: 3600,
      originalPrice: 6000,
      hours: 18,
      lectures: 12,
      rating: 4.7,
      reviewsCount: 215,
      points: [
        "遺產稅申報流程與過戶贈與免稅免稅扣除額白話精算",
        "親屬繼承遺囑效力、特留分與應繼分法律權益計算",
        "不假手他人！教你自己申辦全套手續，省下萬元代書費"
      ],
      syllabus: [
        { title: "家人離世遺產繼承申報黃金 3 步驟", duration: "5 小時" },
        { title: "繼承申報應繼分與特留分實際爭執排除", duration: "5 小時" },
        { title: "省錢心法：自己跑國稅局與地政事務所流程", duration: "5 小時" },
        { title: "免稅免繳繼承土地與贈與實戰心法", duration: "3 小時" }
      ]
    },
    {
      id: "course-license-startup",
      role: "開業族",
      roleBadge: "開業族首選",
      tagColor: "bg-amber-100 text-amber-900 border-amber-205",
      title: "地政士接案與開業實戰班",
      targetWho: "適合誰：從證照走向實務接案",
      price: 8800,
      originalPrice: 15000,
      hours: 32,
      lectures: 24,
      rating: 4.9,
      reviewsCount: 148,
      points: [
        "地政事務所與客戶雙向委任合約談判、實務合理報價",
        "多人共有分割、公同共有疑難排除拆款申論實例",
        "代書事務所初期零客源開發秘訣與人脈拓寬攻略"
      ],
      syllabus: [
        { title: "開業地政士日常運作、執照申請與實務報價", duration: "8 小時" },
        { title: "多人共有房產合約談判及分割拆解實力", duration: "8 小時" },
        { title: "跨足代鋪、合建、都更之進階法理服務要領", duration: "10 小時" },
        { title: "代書獲利增長心法：零客源到自動上門流程", duration: "6 小時" }
      ]
    }
  ];

  // Map to core format types to pass up nicely
  const handleAddClicked = (course: any) => {
    const formatCourse: Course = {
      id: course.id,
      title: course.title,
      subtitle: course.targetWho,
      category: course.roleBadge,
      price: course.price,
      originalPrice: course.originalPrice,
      rating: course.rating,
      reviewsCount: course.reviewsCount,
      hours: course.hours,
      lectures: course.lectures,
      features: course.points,
      recommendedFor: [course.targetWho],
      syllabus: course.syllabus
    };
    onAddCourse(formatCourse);
  };

  return (
    <section id="course-selector" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20 border-b border-slate-200">
      
      {/* 區塊標題 */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold text-[#e11d48] bg-rose-50 border border-rose-200 px-3.5 py-1 rounded-xs uppercase tracking-wider inline-block">
          精選推薦學習
        </span>
        <h2 className="text-2.5xl md:text-3xl font-display font-medium text-slate-950 font-bold tracking-tight mt-3">
          本月推薦學習路線
        </h2>
        <p className="text-slate-600 text-sm mt-3 leading-relaxed font-light">
          首頁不堆放雜亂商品。我們針對不同的目標定位，推薦最合理的四套應援學習模組。
        </p>
      </div>

      {/* 4張精品推薦卡片網格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedCourses.map((course) => {
          const isHighlighted = selectedRoleFilter === course.role;
          return (
            <div
              key={course.id}
              className={`bg-white rounded-xs border-2 flex flex-col justify-between transition-all duration-300 relative ${
                isHighlighted 
                  ? "border-[#e11d48] ring-4 ring-rose-50 scale-[1.02] shadow-md" 
                  : "border-slate-900 shadow-sm hover:border-slate-800"
              }`}
            >
              {/* 客群標籤 */}
              <div className="absolute top-4 right-4">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border rounded-full uppercase ${course.tagColor}`}>
                  {course.roleBadge}
                </span>
              </div>

              {/* 卡片本體上半部 */}
              <div className="p-6 space-y-5">
                <div className="flex items-center space-x-1 text-slate-500 font-mono text-[11px] font-bold">
                  <Bookmark className="w-3.5 h-3.5 text-[#e11d48] fill-[#e11d48]" />
                  <span>專屬學習路線</span>
                </div>

                {/* 課程名稱 + 適合對象 */}
                <div className="space-y-1">
                  <h3 className="text-base font-display font-semibold font-bold text-slate-950 line-clamp-1">
                    {course.title}
                  </h3>
                  <span className="block text-xs text-[#e11d48] font-medium leading-relaxed font-mono">
                    {course.targetWho}
                  </span>
                </div>

                {/* 三個重點，固定格式 */}
                <div className="space-y-3.5 border-t border-dashed border-slate-300 pt-4 text-left">
                  <span className="text-[10px] text-slate-500 font-mono font-bold block uppercase tracking-wider">
                    ⚡ 路線三大重點要目：
                  </span>
                  <ul className="space-y-2">
                    {course.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug font-normal">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 卡片本體下半部：包裝價格與 CTAs */}
              <div className="bg-[#f5f3ee] border-t-2 border-slate-900 p-6 rounded-b-xs space-y-4">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-base sm:text-lg font-mono font-bold text-slate-950">
                      NT$ {course.price.toLocaleString()}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 line-through">
                      NT$ {course.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-mono font-bold">
                    省 ${ (course.originalPrice - course.price).toLocaleString() }
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedCourseSyllabus(course)}
                    className="bg-white hover:bg-slate-100 text-slate-800 font-mono text-xs py-2 border border-slate-300 rounded-xs transition-all cursor-pointer font-bold"
                  >
                    課堂大綱
                  </button>
                  <button
                    onClick={() => handleAddClicked(course)}
                    className="bg-slate-950 hover:bg-[#e11d48] text-white font-mono text-xs py-2 rounded-xs transition-all flex items-center justify-center space-x-1 cursor-pointer font-semibold shadow-xs"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    <span>了解更多</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 課表詳情大綱視窗 */}
      {selectedCourseSyllabus && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#fdfcf9] rounded-xs max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl p-6 relative border-2 border-slate-900">
            <h3 className="text-lg font-display font-medium font-bold text-slate-950 mb-1">{selectedCourseSyllabus.title} 大綱表</h3>
            <p className="text-xs text-slate-500 mb-6 font-mono font-bold">{selectedCourseSyllabus.targetWho} | 共 {selectedCourseSyllabus.hours} 小時</p>

            <div className="space-y-2.5">
              {selectedCourseSyllabus.syllabus.map((s, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xs bg-white border border-slate-300 text-xs text-left">
                  <div className="flex-1 pr-3">
                    <span className="font-bold text-slate-950 block">第 {idx + 1} 階段：{s.title}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#fdfcf9] py-0.5 px-2 rounded-xs border border-slate-300 text-slate-600 flex-shrink-0">
                    {s.duration}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-300 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#e11d48]">✓ 全單元支持離線重複聆聽</span>
              <button
                onClick={() => setSelectedCourseSyllabus(null)}
                className="bg-slate-950 text-white font-mono font-bold text-xs py-2 px-4 rounded-xs hover:bg-[#e11d48] cursor-pointer"
              >
                關閉大綱
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
