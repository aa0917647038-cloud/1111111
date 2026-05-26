import React from "react";
import { BookOpen, Briefcase, Home, Award, ArrowRight } from "lucide-react";

interface IdentitySplitProps {
  onSelectRole: (role: string) => void;
}

export default function IdentitySplit({ onSelectRole }: IdentitySplitProps) {
  const identities = [
    {
      id: "考照族",
      title: "我要考地政士",
      description: "從零開始準備考試，掌握各科法規、申論題庫與修法重點。",
      badge: "考照族",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      buttonText: "看考照課程",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      colorTheme: "hover:border-blue-500 hover:shadow-indigo-50"
    },
    {
      id: "從業族",
      title: "我是不動產從業者",
      description: "補強土地登記、謄本判讀、交易稅務與代書實務整合交收流程。",
      badge: "從業族",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      buttonText: "看實務課程",
      icon: <Briefcase className="w-6 h-6 text-emerald-600" />,
      colorTheme: "hover:border-emerald-500 hover:shadow-emerald-50"
    },
    {
      id: "一般人",
      title: "我是一般民眾",
      description: "搞懂繼承、買賣、贈與、過戶與常見的切身房地法規產權問題。",
      badge: "一般人",
      badgeColor: "bg-orange-100 text-orange-850 border-orange-200",
      buttonText: "看生活課程",
      icon: <Home className="w-6 h-6 text-orange-600" />,
      colorTheme: "hover:border-orange-500 hover:shadow-orange-50"
    },
    {
      id: "開業族",
      title: "我已考上 / 想開業",
      description: "學會如何獨立接案、委任報價、疑難案件與客戶端溝通技巧。",
      badge: "開業族",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      buttonText: "看開業課程",
      icon: <Award className="w-6 h-6 text-amber-600" />,
      colorTheme: "hover:border-amber-500 hover:shadow-amber-50"
    }
  ];

  return (
    <section id="identity-split" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20 border-b border-slate-200">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold text-[#e11d48] uppercase tracking-widest block mb-2">
          IDENTITY NAVIGATION
        </span>
        <h2 className="text-2.5xl md:text-3xl font-display font-medium text-slate-950 font-bold tracking-tight">
          你現在最接近哪一種需求？
        </h2>
        <p className="text-slate-600 text-sm mt-3 leading-relaxed font-light">
          先確認您的真實身分或目標，我們將一對一引導您進入量身打造、可讀懂的不動產知識宇宙。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {identities.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectRole(item.id)}
            className={`bg-[#fdfcf9] rounded-xs p-6 border-2 border-slate-900 shadow-sm transition-all duration-300 group cursor-pointer flex flex-col justify-between ${item.colorTheme} hover:translate-y-[-2px]`}
          >
            <div className="space-y-4">
              {/* Header block with Icon & customized target label badge */}
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-white border border-slate-300 rounded-sm">
                  {item.icon}
                </div>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-1 border rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5 text-left">
                <h3 className="text-base font-display font-bold text-slate-950 group-hover:text-[#e11d48] transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-650 leading-relaxed font-sans font-normal">
                  {item.description}
                </p>
              </div>
            </div>

            {/* CTA action button */}
            <div className="pt-6">
              <button
                type="button"
                className="w-full bg-[#fdfcf9] group-hover:bg-slate-950 text-slate-950 group-hover:text-white font-mono font-bold text-xs py-2.5 px-4 border-2 border-slate-900 transition-all flex items-center justify-center space-x-1.5 shadow-sm active:translate-y-px"
              >
                <span>{item.buttonText}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
