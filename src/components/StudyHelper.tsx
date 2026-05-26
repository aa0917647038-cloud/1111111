import React, { useState } from "react";
import { Sparkles, ClipboardCheck, Calendar, HelpCircle, Check, X, ShieldAlert, Lightbulb } from "lucide-react";
import { MOCK_QUIZ_QUESTIONS } from "../data";

export default function StudyHelper() {
  const [activeTab, setActiveTab] = useState<"quiz" | "scheduler" | "chatbot" | string>("quiz");

  // 1. Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleGradeQuiz = () => {
    let score = 0;
    MOCK_QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        score += 25; // 4 questions = 100 points
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // 2. Scheduler Calculator State
  const [dailyHours, setDailyHours] = useState<number>(2.5);
  const [monthsLeft, setMonthsLeft] = useState<number>(4);
  const [examLevel, setExamLevel] = useState<string>("零基礎加強者");

  const mockWeeklySchedule = [
    { day: "星期一 (民法打底)", task: "物權編：所有權及地役權重點整理", focus: "精選 15 道申論題套路背下來" },
    { day: "星期二 (土地稅法)", task: "土地增值稅漲價總數額計算公式複習", focus: "勤做考古題，重劃扣除額手算" },
    { day: "星期三 (土地法規)", task: "土地法第 34-1 條多數決與優先特有權", focus: "掌握圖像記憶，默寫關鍵條文" },
    { day: "星期四 (土地登記)", task: "他項權利登記及信託登記辦理要件", focus: "表格化整理登記八大步驟程序" },
    { day: "星期五 (錯題覆盤)", task: "這週各科目錯題拿出來重做一遍", focus: "加強記憶，找出失分盲區" },
    { day: "星期六 (申論特訓)", task: "自選兩題民法及土地登記模擬手寫答卷", focus: "套用『引、申、結』與『主、客、客』" },
    { day: "星期日 (彈性調整)", task: "放鬆心情，聆聽學姐分享或補齊漏掉課時", focus: "休息是為了走更長的路，調整心態" }
  ];

  const schedulerAdvices: Record<string, string[]> = {
    "零基礎加強者": [
      "強烈建議優先觀看【地政士全科金榜保證班】的民法打底課，先掌握『法學物理概念』，否則後面讀土地法會非常生澀。",
      "每天最少保證 2 小時觀看時數，並強迫自己睡前花 10 分鐘在腦海中默念今天背下的 3 個法規條文號。",
      "先求看懂、看熟，不要企圖一開始就把每一個字背得百分百一致，那是磨損耐心的地雷。"
    ],
    "本科系複習精進": [
      "你的優勢在於對基礎概念有輪廓。建議直接對焦【最新修法精必衝刺班】及【土地稅突圍班】，加強今年變動最大的囤房稅與土地法規。",
      "申論題寫作部分，重點在於追求『閱卷官高分格式』，不要敷衍帶過，利用『三段論法』拉開與非本科考生的差距。"
    ],
    "重考戰士/代書轉型": [
      "之前沒過的最大原因大概率是民法或土地稅法拖累。建議使用『考古題練功房模擬答題系統』一邊刷題、一邊回頭聽補強短影片。",
      "善加利用我們名師的專屬學員 Line 群組，遇到申論題盲點一秒截圖詢問助教，保障你這一次絕不留遺憾地考過。"
    ]
  };

  // 3. Chatbot Simulator State
  const [chatMessage, setChatMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatLogs, setChatLogs] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: "您好！我是備考應援局的法規查閱與學習諮詢小幫手 🤖。您可以試試詢問我關於『平均地權條例』或『土地法 34-1』之類的修法考點，或者問問怎麼安排讀書時間喔！" }
  ]);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || isTyping) return;

    const userText = chatMessage.trim();
    const newLogs = [...chatLogs, { sender: "user" as const, text: userText }];
    setChatLogs(newLogs);
    setChatMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: chatLogs
        })
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      setChatLogs((prev) => [...prev, { sender: "bot" as const, text: data.text }]);
    } catch (err) {
      console.warn("AI Route error, falling back to simulated answers:", err);
      // Offline / Error fallback
      setTimeout(() => {
        let botResponse = "這是一個非常專業的地政法規問題！依地政士國家考試出題實務，關於這類考點通常著重於申論題應答要件。";
        const lowerText = userText.toLowerCase();

        if (lowerText.includes("平均地權") || lowerText.includes("修法")) {
          botResponse = "【最新修法衝刺突擊重點】平均地權條例修法核心五大重點包括：①限制預售屋及新建成屋換約轉售；②重罰炒作行為（最高可罰 5,000 萬元）；③建立檢舉獎金吹哨者制度；④增設私法人購買住宅許可制；⑤解約申報登錄。今年地政士考試極高機率會考出『私法人免經許可與免許可之對比表』，建議購買【最新修法衝刺班】加強答題技巧喔！";
        } else if (lowerText.includes("34-1") || lowerText.includes("共有土地")) {
          botResponse = "【土地法 34-1 核心要點】共有土地之處分多數決需要符合『人數過半數且應有部分過半數』的同意（雙過半原則）。但如果應有部分合計已經超過三分之二（應有部分逾 2/3），則人數可以免予計算！這科考點常與民法 819 條及土地登記規則的他項權利相提並論，名師詹坤林在【名師引路 3分鐘圖像法】影音中有做秒背圖像，非常推薦前往觀看！";
        } else if (lowerText.includes("民法") || lowerText.includes("信託")) {
          botResponse = "【民法與信託法備考指南】地政士的民法主要考物權、親屬繼承及總則。尤其物權涉及共有、地上權、抵押權等概念，是地政登記的法理核心。答題時記得符合三段論（依民法第XX條...查本案...故結論為...），信託法則常考受託人的權限與保全撤銷權，我們建議購買【民法概要與信託法申論高效搶分班】進行模組訓練，可以大幅度提升平均分！";
        } else if (lowerText.includes("時數") || lowerText.includes("讀書") || lowerText.includes("怎麼讀")) {
          botResponse = "備考時數因人而異。如果您是上班族，建議利用『備考時數計算機』。通常零基礎考生需要累計觀看課時 + 自修達 250 小時以上才能高機率合格。核心關鍵在於每天重複、不間斷地複習與適量刷擬真題！";
        } else if (lowerText.includes("價格") || lowerText.includes("多少錢") || lowerText.includes("特惠")) {
          botResponse = "現在我們地政士備考應援局正值『最新修法衝刺班』快閃銷售期，全科金榜班直接打 6 折只要 NT$ 18,800 元！在結帳頁面輸入折扣代碼『PASS2026』還可以當場再扣 $500 購物金，並免費宅配全套實體教科講義到您家！";
        } else {
          botResponse = `謝謝您的發問！您提到的『${userText}』是地政備考的關鍵詞。我們平台的名師與專業代書助教已經在全套金榜保證班中準備了詳細的解答講義與 15 年考古申論詳解。建議您參考【金榜保證班】，現在下單即贈送全套教科大套書與助教 Line 線上一對一問到飽服務唷！`;
        }

        setChatLogs((prev) => [...prev, { sender: "bot" as const, text: botResponse }]);
      }, 600);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="study-helper" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      
      {/* 區塊導引 */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold text-[#e11d48] uppercase tracking-wider mb-2">Interactive Tools Room</span>
        <h2 className="text-3xl font-display font-medium text-slate-950 tracking-tight flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#e11d48] animate-pulse" />
          備考應援神助手
        </h2>
        <p className="text-slate-600 text-sm mt-3 leading-relaxed font-light">
          全台首創！在線免費測試、讀書計劃速算及法規語音文字模擬諮詢系統，為您的每一天備考注入滿滿底氣！
        </p>
      </div>

      {/* 神助手主體選項 */}
      <div className="bg-[#fdfcf9] rounded-xs border-2 border-slate-900 shadow-xs overflow-hidden">
        
        {/* 選項卡導航 */}
        <div className="flex border-b-2 border-slate-900 bg-[#f5f3ee]">
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex-1 py-4 px-4 text-center font-mono font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 border-b-4 transition-all cursor-pointer ${
              activeTab === "quiz"
                ? "border-slate-950 text-slate-950 bg-white shadow-inner"
                : "border-transparent text-slate-600 hover:text-slate-950"
            }`}
          >
            <ClipboardCheck className="w-4 h-4 text-[#e11d48]" />
            <span>模擬題隨堂練</span>
          </button>
          <button
            onClick={() => setActiveTab("scheduler")}
            className={`flex-1 py-4 px-4 text-center font-mono font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 border-b-4 transition-all cursor-pointer ${
              activeTab === "scheduler"
                ? "border-slate-950 text-slate-950 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-950"
            }`}
          >
            <Calendar className="w-4 h-4 text-slate-700" />
            <span>備考計劃速算</span>
          </button>
          <button
            onClick={() => setActiveTab("chatbot")}
            className={`flex-1 py-4 px-4 text-center font-mono font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 border-b-4 transition-all cursor-pointer ${
              activeTab === "chatbot"
                ? "border-slate-950 text-slate-950 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-950"
            }`}
          >
            <HelpCircle className="w-4 h-4 text-slate-700" />
            <span>法規 AI 諮詢機</span>
          </button>
        </div>

        {/* 內容區塊 */}
        <div className="p-6 md:p-8">

          {/* Tab 1: 模擬練習題 */}
          {activeTab === "quiz" && (
            <div className="space-y-8">
              <div className="bg-[#fbeee0] rounded-xs p-4 border border-slate-900 flex items-start space-x-3">
                <ShieldAlert className="w-5 h-5 text-[#e11d48] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-800 leading-relaxed text-left">
                  <span className="font-bold block text-slate-950 font-mono">🚨 名師提醒：歷屆試題是通過的唯一門卡！</span>
                  下方為 114 年四大科目精選考點模擬單選，請試著選出正確解答，提交後即可查看最詳盡的白話條文解析。
                </div>
              </div>

              <div className="space-y-6">
                {MOCK_QUIZ_QUESTIONS.map((q, idx) => {
                  const selectedOpt = quizAnswers[q.id];
                  return (
                    <div key={q.id} className="p-5 rounded-xs border border-slate-350 bg-white space-y-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-[10px] bg-slate-950 px-2.5 py-0.5 rounded-xs font-mono font-bold">
                          題 {idx + 1}
                        </span>
                        <span className="text-[10px] text-[#e11d48] font-mono font-bold bg-[#fdfcf9] px-1.5 py-0.5 rounded-xs border border-slate-300">
                          {q.subject}
                        </span>
                      </div>
                      <h4 className="text-sm font-display font-bold text-slate-950 leading-relaxed text-left">
                        {q.question}
                      </h4>

                      {/* 四大選項 */}
                      <div className="grid grid-cols-1 gap-2.5">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedOpt === optIdx;
                          let optStyle = "bg-[#fdfcf9] hover:bg-[#f7f5f0] border-slate-300 text-slate-950";
                          
                          if (isSelected) {
                            optStyle = "bg-slate-950 text-white border-slate-950 font-bold";
                          }

                          if (quizSubmitted) {
                            if (optIdx === q.correctAnswer) {
                              optStyle = "bg-[#f59e0b] text-slate-950 border-slate-900 font-bold";
                            } else if (isSelected && optIdx !== q.correctAnswer) {
                              optStyle = "bg-[#e11d48] text-white border-slate-900";
                            } else {
                              optStyle = "bg-[#f5f3ee] text-slate-400 border-slate-200 cursor-not-allowed";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => handleSelectAnswer(q.id, optIdx)}
                              className={`w-full text-left text-xs p-3 rounded-xs border-2 transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                            >
                              <span className="flex-1 pr-2">
                                <strong className="mr-1.5 font-mono">({["A", "B", "C", "D"][optIdx]})</strong>
                                {opt}
                              </span>
                              {quizSubmitted && optIdx === q.correctAnswer && <Check className="w-4 h-4 flex-shrink-0 text-slate-950" />}
                              {quizSubmitted && isSelected && optIdx !== q.correctAnswer && <X className="w-4 h-4 flex-shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* 出題解析說明 */}
                      {quizSubmitted && (
                        <div className="p-4 bg-[#fcf9f2] rounded-xs border-2 border-slate-900 text-xs text-slate-900 leading-relaxed space-y-1.5 text-left">
                          <strong className="text-slate-950 flex items-center font-mono">
                            <Lightbulb className="w-4 h-4 text-[#f59e0b] mr-1.5" />
                            【試題解析與考點關聯】
                          </strong>
                          <p className="font-light">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* grading panel */}
              <div className="pt-5 border-t border-slate-350 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  {quizSubmitted ? (
                    <div className="text-sm">
                      您的所得份數：
                      <span className="text-2xl font-mono font-bold text-[#e11d48]"> {quizScore} 分</span>
                      {quizScore === 100 && <span className="text-xs font-bold text-emerald-700 block mt-1">🏆 太強了！所有核心法理全部滿分通過！</span>}
                      {quizScore >= 50 && quizScore < 100 && <span className="text-xs font-bold text-slate-600 block mt-1">✨ 常識不錯，但申論仍須防新修法陷阱，建議加強！</span>}
                      {quizScore < 50 && <span className="text-xs font-bold text-[#e11d48] block mt-1">⚠️ 警報！基礎觀念有紕漏，代書特考申論最忌法條混淆。</span>}
                    </div>
                  ) : (
                    <span className="text-xs font-mono text-slate-500">目前已答題數： {Object.keys(quizAnswers).length} / 4 題</span>
                  )}
                </div>

                <div className="flex gap-2">
                  {quizSubmitted ? (
                    <button
                      onClick={handleResetQuiz}
                      className="bg-slate-950 text-white font-mono font-bold text-xs py-2 px-5 rounded-xs hover:bg-slate-900 transition-colors cursor-pointer border-2 border-slate-950"
                    >
                      重新測驗一遍
                    </button>
                  ) : (
                    <button
                      onClick={handleGradeQuiz}
                      disabled={Object.keys(quizAnswers).length < 2}
                      className={`font-mono font-bold text-xs py-2 px-6 rounded-xs transition-all cursor-pointer border-2 ${
                        Object.keys(quizAnswers).length < 2
                          ? "bg-[#f5f3ee] text-slate-400 border-slate-300 cursor-not-allowed"
                          : "bg-slate-950 hover:bg-[#e11d48] text-white border-slate-900"
                      }`}
                    >
                      提交今日模擬解答並瀏覽詳解
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: 備考計量學 */}
          {activeTab === "scheduler" && (
            <div className="space-y-6">
              <div className="text-xs text-slate-600 font-sans leading-relaxed max-w-xl text-left">
                請輸入您的每日預期自修讀書時間，以及目前您對地政考科的掌握程度，系統將會利用學姐的『零碎時間黃金拼圖公式』為您秒算出最適合的每週考程衝刺日程表！
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border border-slate-350 bg-[#f7f5f0] p-5 rounded-xs text-left">
                {/* 每日時數 */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-900 block">每日學習時間 (小時)</label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="0.5"
                    value={dailyHours}
                    onChange={(e) => {
                      setDailyHours(parseFloat(e.target.value));
                    }}
                    className="w-full accent-slate-900"
                  />
                  <span className="text-xs font-mono font-bold text-[#e11d48] block">
                    每天可撥出 {dailyHours} 小時學課
                  </span>
                </div>

                {/* 剩餘月數 */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-900 block">距離考試剩餘月數</label>
                  <select
                    value={monthsLeft}
                    onChange={(e) => {
                      setMonthsLeft(parseInt(e.target.value));
                    }}
                    className="w-full bg-[#fdfcf9] border border-slate-300 p-2 text-xs rounded-xs outline-hidden focus:border-slate-850 font-mono"
                  >
                    <option value="1">1 個月（火燒屁股急救修心）</option>
                    <option value="2">2 個月（高頻考古極速衝刺）</option>
                    <option value="4">4 個月（精緻複習表格默寫）</option>
                    <option value="6">6 個月（零基礎完美穩步上金榜編排）</option>
                  </select>
                </div>

                {/* 備考基礎 */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-900 block">目前您的程度身分</label>
                  <select
                    value={examLevel}
                    onChange={(e) => {
                      setExamLevel(e.target.value);
                    }}
                    className="w-full bg-[#fdfcf9] border border-[#d1cfca] p-2 text-xs rounded-xs outline-hidden focus:border-slate-800 font-mono"
                  >
                    <option value="零基礎加強者">零基礎代書小白 / 跨行轉職考生</option>
                    <option value="本科系複習精進">地政或法律系本科 / 已有工作經驗</option>
                    <option value="重考戰士/代書轉型">曾參加過地政得考 / 欲補足民法弱環者</option>
                  </select>
                </div>
              </div>

              {/* 計算結果呈現 (高仿客製日程表) */}
              <div className="space-y-6">
                <div className="bg-slate-950 text-white rounded-xs p-5 md:p-6 space-y-4 border border-slate-950 text-left">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] bg-[#f59e0b] text-slate-950 font-mono font-bold px-2 py-0.5 rounded-xs">分析報告</span>
                    <span className="text-[10px] text-slate-400 font-mono">115地政特考衝刺版</span>
                  </div>
                  
                  <div>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      距今預期備考剩餘時數： 
                      <span className="text-lg font-bold text-[#f59e0b]"> {dailyHours * 30 * monthsLeft} 小時</span>
                      （含保證班四大必讀複習考區）。
                    </p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      對於 <strong className="text-[#f59e0b] font-mono">{examLevel}</strong>，這段時間彌足寶貴。我們為您提供神助手的每週規劃：
                    </p>
                  </div>

                  {/* 課綱清單表格 */}
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-3 pt-2">
                    {mockWeeklySchedule.map((sch, i) => (
                      <div key={i} className="bg-slate-900 p-3 rounded-xs border border-slate-850 text-[11px] flex flex-col justify-between">
                        <span className="font-bold text-[#f59e0b] block border-b border-slate-800 pb-1 mb-1.5 font-mono">{sch.day.split(" ")[0]}</span>
                        <p className="text-slate-200 font-sans leading-relaxed">{sch.task}</p>
                        <span className="text-[10px] text-[#e11d48] block mt-1.5 font-mono">重點：{sch.focus.length > 15 ? sch.focus.substring(0, 15) + "..." : sch.focus}</span>
                      </div>
                    ))}
                  </div>

                  {/* 應援大師提示 */}
                  <div className="border-t border-slate-800 pt-4 space-y-2">
                    <strong className="text-xs text-[#f59e0b] flex items-center font-mono">
                      <Lightbulb className="w-3.5 h-3.5 mr-1 text-[#f59e0b]" />
                      給您的備考個人策略：
                    </strong>
                    <ul className="text-[11px] text-slate-350 font-sans space-y-1.5 pl-1 list-disc list-inside">
                      {schedulerAdvices[examLevel]?.map((adv, idx) => (
                        <li key={idx} className="leading-relaxed font-light">{adv}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: AI 法規查閱模擬機 */}
          {activeTab === "chatbot" && (
            <div className="space-y-5 text-left">
              <div className="text-xs text-slate-600 leading-relaxed font-sans">
                我們貼心編纂了高頻法規知識庫！請在下方文字欄輸入『平均地權』、『過半數處分』、或『土地登記權狀免提』，系統即時模擬由名師團隊與法規庫提供的精準解答與白話答題模組。
              </div>

              {/* 對話記錄窗口 */}
              <div className="bg-[#fcf9f2] border-2 border-slate-300 rounded-xs p-4 h-64 overflow-y-auto space-y-3">
                {chatLogs.map((log, ind) => (
                  <div
                    key={ind}
                    className={`flex ${log.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xs p-3 text-xs leading-relaxed border shadow-xs ${
                        log.sender === "user"
                          ? "bg-slate-950 text-white border-slate-950 font-mono font-medium"
                          : "bg-white text-slate-900 border-slate-300 font-sans text-left"
                      }`}
                    >
                      {log.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-slate-400 border border-slate-200 rounded-xs px-3 py-2 text-[11px] font-mono animate-pulse flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></span>
                      <span>AI正在查閱法學庫中...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 輸入欄 */}
              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="輸入例如：『平均地權有哪些重點』或『土地處分如何看人頭與等份』"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 bg-white border-2 border-slate-950 text-xs rounded-xs px-4 py-3 outline-hidden focus:border-[#e11d48] font-mono transition-colors placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="bg-slate-950 hover:bg-[#e11d48] text-white font-mono font-bold text-xs px-6 rounded-xs cursor-pointer border-2 border-slate-950 transition-colors"
                >
                  向法規庫發問
                </button>
              </form>

              {/* 預選問句標籤 */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 text-[11px] text-slate-500 font-mono">
                <span className="font-semibold text-slate-650">大家都在問：</span>
                <button
                  type="button"
                  onClick={() => {
                    setChatMessage("平均地權條例有什麼必考重點？");
                  }}
                  className="border border-slate-300 hover:border-slate-800 hover:text-slate-950 bg-white rounded-xs px-2.5 py-0.5 transition-colors cursor-pointer"
                >
                  # 平均地權條例
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setChatMessage("共有土地怎麼決定？土地法34-1條");
                  }}
                  className="border border-slate-300 hover:border-slate-800 hover:text-slate-950 bg-white rounded-xs px-2.5 py-0.5 transition-colors cursor-pointer"
                >
                  # 土地法 34-1 條
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setChatMessage("如何學好民法與信託法申論？");
                  }}
                  className="border border-slate-300 hover:border-slate-800 hover:text-slate-950 bg-white rounded-xs px-2.5 py-0.5 transition-colors cursor-pointer"
                >
                  # 民與信託申論秘訣
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

    </section>
  );
}
