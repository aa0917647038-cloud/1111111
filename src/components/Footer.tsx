import React, { useState } from "react";
import { GraduationCap, MessageSquare, BellRing, Check, Send } from "lucide-react";

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export default function Footer({ onNavigateSection }: FooterProps) {
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const githubProjectUrl = import.meta.env.VITE_GITHUB_PROJECT_URL?.trim();
  const showGithubProjectLink = import.meta.env.VITE_SHOW_GITHUB_PROJECT_LINK === "true";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribedEmail || !subscribedEmail.includes("@")) {
      (window as any).showToast?.("請輸入有效的 Email。", "warning");
      return;
    }

    setHasSubscribed(true);
    setSubscribedEmail("");
    (window as any).showToast?.("你已加入更新通知名單。", "success");
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs py-16 border-t-4 border-double border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-amber-500" />
            <span className="font-display font-semibold text-sm text-white tracking-wider">
              地政士備考應援局
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-light text-left">
            用更有系統的方式整理土地法、民法、不動產登記與實務重點，讓備考和進修都更聚焦。
          </p>
          <button
            onClick={() => onNavigateSection("course-selector")}
            className="hover:text-white transition-colors cursor-pointer text-left text-[11px]"
          >
            立即查看課程內容
          </button>
        </div>

        <div className="space-y-4">
          <span className="text-[11px] tracking-wider text-slate-200 font-bold block uppercase border-b border-slate-800 pb-2 text-left">
            快速導覽
          </span>
          <ul className="space-y-2.5 font-light text-[11px] text-left">
            <li>
              <button
                onClick={() => onNavigateSection("hero")}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                首頁介紹
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateSection("demo-classroom")}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                試看教室
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateSection("study-helper")}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                學習工具
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <span className="text-[11px] tracking-wider text-slate-200 font-bold block uppercase border-b border-slate-800 pb-2 text-left">
            聯絡方式
          </span>
          <div className="space-y-4 font-light text-[11px] leading-relaxed text-left">
            <p className="text-slate-400">
              若想了解課程安排、購課建議或最新更新，可以先透過 LINE 聯繫。
            </p>
            <button
              onClick={() => {
                (window as any).showToast?.("LINE 聯絡資訊目前先保留，之後可再補上。", "info");
              }}
              className="flex items-center text-emerald-400 hover:text-white transition-colors text-left font-semibold cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              <span>LINE 諮詢</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <span className="text-[11px] tracking-wider text-slate-200 font-bold block uppercase border-b border-slate-800 pb-2 flex items-center text-left">
            <BellRing className="w-3.5 h-3.5 mr-1.5 text-amber-500 animate-pulse" />
            更新通知
          </span>
          <p className="leading-relaxed text-[11px] text-slate-400 font-light text-left">
            留下 Email，之後有新課、試看內容或功能更新時會第一時間通知你。
          </p>

          {hasSubscribed ? (
            <div className="bg-emerald-950/70 border border-emerald-500/40 rounded-xs p-3 text-emerald-300 text-[11px] text-center space-y-1 animate-pulse">
              <Check className="w-4 h-4 text-emerald-400 mx-auto" />
              <p className="font-bold">已加入通知清單</p>
              <p className="text-[10px] text-emerald-400">之後有新消息時會優先通知。</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-1 bg-slate-900 border border-slate-800 p-1 rounded-sm">
                <input
                  type="email"
                  required
                  placeholder="請輸入 Email"
                  value={subscribedEmail}
                  onChange={(e) => setSubscribedEmail(e.target.value)}
                  className="bg-transparent text-white placeholder:text-slate-600 outline-none text-[11px] px-2 py-1 flex-1 font-mono min-w-0"
                />
                <button
                  type="submit"
                  className="bg-[#e11d48] hover:bg-rose-700 text-white px-3 py-1.5 rounded-xs transition-colors cursor-pointer flex items-center justify-center flex-shrink-0 font-bold text-[10px]"
                  title="送出"
                >
                  <Send className="w-3 h-3" />
                  <span className="ml-1">訂閱</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
        <div>
          <span>Copyright 1999 - 2026 地政士備考應援局. All rights reserved.</span>
        </div>
        <div className="flex space-x-3">
          <a href="#" className="hover:text-slate-400">
            使用條款
          </a>
          <span>|</span>
          <a href="#" className="hover:text-slate-400">
            隱私政策
          </a>
          {showGithubProjectLink && githubProjectUrl && (
            <>
              <span>|</span>
              <a
                href={githubProjectUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-400"
              >
                GitHub Project
              </a>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
