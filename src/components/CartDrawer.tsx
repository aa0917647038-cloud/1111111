import React, { useState } from "react";
import { X, Trash2, ShoppingBag, ShieldCheck, User, Phone, Mail, Award, CheckCircle, Gift } from "lucide-react";
import { Course } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { course: Course; quantity: number }[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  // Checkout form details
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSimulationLoggedIn, setIsSimulationLoggedIn] = useState(true);

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.course.price, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "PASS2026" || code === "應援百分百") {
      setDiscountAmount(500);
      setCouponSuccess("🎟️ 成功套用『備考大補帖折抵款』！已現折 NT$ 500！");
    } else {
      (window as any).showToast?.("此優惠代碼無效或已過期，請輸入『PASS2026』領取 $500 優惠！", "warning");
      setDiscountAmount(0);
      setCouponSuccess(null);
    }
  };

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      (window as any).showToast?.("您的購物車目前是空的，請先挑選要應援的代書好課！", "warning");
      return;
    }
    setIsOrdered(true);
  };

  const handleSuccessClose = () => {
    setIsOrdered(false);
    setUserName("");
    setPhone("");
    setEmail("");
    setCouponCode("");
    setDiscountAmount(0);
    setCouponSuccess(null);
    onClearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay shadow */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-lg w-full bg-[#fdfcf9] shadow-2xl flex flex-col justify-between text-slate-900 z-10 border-l-2 border-slate-900">
        
        {/* Header */}
        <div className="p-5 border-b-2 border-slate-900 bg-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#f59e0b]" />
            <span className="font-display font-bold text-base tracking-tight">備考應援選購門市</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer" title="關閉購物車">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isOrdered ? (
          /* 成交訂單成功頁面 (高仿代書合格應援書) */
          <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 text-center flex flex-col justify-center items-center">
            <div className="bg-emerald-50 text-[#e11d48] p-4 rounded-xs border-2 border-slate-900 animate-bounce">
              <CheckCircle className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold text-slate-950">🎉 恭喜！您已成功開拓金榜特約！</h3>
              <p className="text-xs text-slate-650 max-w-xs mx-auto">
                系統已經為<strong>{userName || "同學"}</strong>寄出您的上線課件開啟通知！
              </p>
            </div>

            {/* 實體教材寄送憑證 */}
            <div className="w-full bg-[#f7f5f0] border-2 border-slate-900 rounded-xs p-4 text-left space-y-3">
              <span className="text-[10px] font-bold text-slate-500 font-mono block border-b border-slate-300 pb-1.5 uppercase">收件與出貨聯憑單</span>
              <div className="text-xs space-y-1.5 text-slate-800 font-mono">
                <p><strong>收件學員：</strong> {userName || "無名考生"}</p>
                <p><strong>聯絡電話：</strong> {phone || "0912-34-567"}</p>
                <p><strong>電子信箱：</strong> {email || "demo@student.com"}</p>
                <p><strong>購買項目：</strong> {cartItems.map(i => i.course.title).join(", ")}</p>
                <p><strong>結帳總額：</strong> <strong className="text-[#e11d48]">NT$ {finalTotal.toLocaleString()} 元</strong></p>
              </div>
              <div className="bg-[#fbeee0] p-2.5 rounded-xs border border-slate-300 text-[10px] text-slate-800 leading-relaxed font-sans">
                🚚 實體教材套書（含考古題全套詳解及各科大鋼）將於次日以<b>郵局挂號</b>方式宅配出貨，請保持手機暢通！
              </div>
            </div>

            {/* 應援加油小語 */}
            <div className="bg-white p-4.5 rounded-xs border-2 border-slate-900 space-y-1.5 max-w-md">
              <span className="font-bold text-xs text-[#e11d48] flex items-center justify-center font-mono">
                <Award className="w-4 h-4 mr-1 animate-pulse" />
                應援局局長贈言
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-light">
                「地政士國家考試雖然辛苦、申論複雜，但只要每天多讀一步，背對圖像與寫作邏輯，今年金榜必有你的大名！我們線上見！」
              </p>
            </div>

            <button
              onClick={handleSuccessClose}
              className="w-full bg-slate-950 hover:bg-[#e11d48] text-white font-mono font-bold text-xs py-3 rounded-xs transition-all cursor-pointer border border-transparent"
            >
              返回學習平台，開始免費試聽 →
            </button>
          </div>
        ) : (
          /* 標準購物車內容與結帳表表 */
          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#fdfcf9]">
            
            {/* 購物車品項 */}
            <div>
              <span className="text-[10px] tracking-widest text-slate-450 font-mono font-bold block mb-3 uppercase">已選購應援教材套裝</span>
              {cartItems.length === 0 ? (
                <div className="py-12 text-center border-2 border-dashed border-slate-300 rounded-xs bg-[#fdfcf9] space-y-2">
                  <ShoppingBag className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-600 font-mono">您的備考購物車空空如也</p>
                  <p className="text-[10px] text-slate-400">挑選首頁任何一個名師合輯，打牢備考地基！</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {cartItems.map((item) => (
                    <div key={item.course.id} className="flex items-start justify-between p-3.5 bg-white rounded-xs border border-slate-300">
                      <div className="flex-1 pr-3 text-xs space-y-1 text-left">
                        <span className="font-bold text-slate-950 block">{item.course.title}</span>
                        <span className="text-[10px] text-slate-500 block">{item.course.category} | 共 {item.course.hours} 小時複習課</span>
                        <div className="flex items-center space-x-2 text-[10px] text-[#e11d48] font-mono font-bold">
                          <Gift className="w-3.5 h-3.5" />
                          <span>免費搭贈實體課表 & Line 解答特權</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 self-stretch flex flex-col justify-between items-end">
                        <span className="font-mono font-bold text-[#e11d48] text-xs">NT$ {item.course.price.toLocaleString()}</span>
                        <button
                          onClick={() => onRemoveItem(item.course.id)}
                          className="text-slate-400 hover:text-[#e11d48] cursor-pointer p-1"
                          title="刪除"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 優惠券區域 */}
            {cartItems.length > 0 && (
              <div className="bg-[#f7f5f0] p-4 rounded-xs border-2 border-slate-900 space-y-3">
                <span className="text-[10px] tracking-widest text-slate-500 font-mono font-bold block uppercase">套用備考優惠券代碼</span>
                
                {couponSuccess ? (
                  <p className="text-[11px] text-emerald-800 font-mono font-bold">{couponSuccess}</p>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="輸入例如：PASS2026"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-white border border-slate-300 text-xs rounded-xs px-3 py-1.5 focus:border-slate-800 outline-hidden font-mono"
                    />
                    <button
                      type="submit"
                      className="bg-slate-950 text-white font-mono font-bold text-xs px-4 rounded-xs hover:bg-[#e11d48] transition-colors cursor-pointer"
                    >
                      套用
                    </button>
                  </form>
                )}
                <p className="text-[10px] text-slate-400 font-mono">💡 提示：輸入 <strong>PASS2026</strong> 可省下 $500！</p>
              </div>
            )}

            {/* 訂單結帳表單 */}
            {cartItems.length > 0 && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-3.5 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <span className="text-[10px] tracking-widest text-slate-500 font-mono font-bold block uppercase">填寫學員宅配與啟用資料</span>
                  
                  {/* 模擬狀態切換器 */}
                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <span className="text-[9px] text-slate-400 font-mono">系統模擬：</span>
                    <button
                      type="button"
                      onClick={() => {
                        const nextState = !isSimulationLoggedIn;
                        setIsSimulationLoggedIn(nextState);
                        if (!nextState) {
                          setUserName("");
                          setPhone("");
                          setEmail("");
                        }
                        (window as any).showToast?.(
                          nextState 
                            ? "👤 已切換：已登入且有購買紀錄學員" 
                            : "👤 已切換：常客登出 / 未登入新訪客", 
                          "info"
                        );
                      }}
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                        isSimulationLoggedIn 
                          ? "bg-rose-50 text-[#e11d48] border-rose-200 hover:bg-rose-100" 
                          : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200"
                      }`}
                    >
                      {isSimulationLoggedIn ? "● 已登入 (詹金榜)" : "○ 未登入／訪客"}
                    </button>
                  </div>
                </div>

                {/* 快速填寫行動提示與按鈕 */}
                {isSimulationLoggedIn ? (
                  <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xs flex items-center justify-between text-xs my-2.5 animate-slide-in-right">
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-500 text-sm">👤</span>
                      <div className="text-left">
                        <p className="font-bold text-slate-900 text-[11px] leading-tight">偵測到已登入的曾購學員</p>
                        <p className="text-[9px] text-slate-500 font-mono leading-tight">可直接一鍵匯入前次購買資料</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUserName("詹金榜");
                        setPhone("0988-168-168");
                        setEmail("jinbang.zhan@e-landscrivener.com.tw");
                        (window as any).showToast?.("⚡ 歷史聯絡資料已快速填入完成！", "success");
                      }}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px] px-2.5 py-1 rounded-sm shadow-xs transition-all cursor-pointer flex items-center gap-0.5 shrink-0"
                    >
                      ⚡ 快速填寫
                    </button>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xs flex items-center justify-between text-xs my-2.5 animate-slide-in-right">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 text-sm">👤</span>
                      <div className="text-left">
                        <p className="font-medium text-slate-500 text-[11px] leading-tight">目前處於新訪客狀態</p>
                        <p className="text-[9px] text-slate-400 font-mono leading-tight">手動輸入或切換狀態以啟用快速填寫</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSimulationLoggedIn(true);
                        setUserName("詹金榜");
                        setPhone("0988-168-168");
                        setEmail("jinbang.zhan@e-landscrivener.com.tw");
                        (window as any).showToast?.("⚡ 已切換登入並快速帶入常用備份聯絡資料！", "success");
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-650 font-bold text-[10px] px-2 py-1 rounded-sm transition-all cursor-pointer shrink-0"
                    >
                      啟用並快速填寫
                    </button>
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="學員姓名 (實體教材收件人)"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-white border-2 border-slate-950 text-xs rounded-xs pl-9 pr-4 py-3 placeholder:text-slate-400 text-slate-900 focus:outline-hidden"
                    />
                    <span className="absolute left-3 top-3.5 text-xs text-slate-500">✍</span>
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="行動電話 (物流宅配聯絡)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border-2 border-slate-950 text-xs rounded-xs pl-9 pr-4 py-3 placeholder:text-slate-400 text-slate-900 focus:outline-hidden"
                    />
                    <span className="absolute left-3 top-3.5 text-xs text-slate-500">📞</span>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="電子信箱 (線上課件啟用收件)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border-2 border-slate-950 text-xs rounded-xs pl-9 pr-4 py-3 placeholder:text-slate-400 text-slate-900 focus:outline-hidden"
                    />
                    <span className="absolute left-3 top-3.5 text-xs text-slate-500">✉</span>
                  </div>
                </div>

                {/* 費用計算彙總 */}
                <div className="bg-[#f5f3ee] p-4.5 rounded-xs border-2 border-slate-900 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>課程教材小計</span>
                    <span className="font-mono font-bold text-slate-900">NT$ {subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-[#e11d48] font-bold">
                      <span>優惠券折扣折抵</span>
                      <span className="font-mono">- NT$ {discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-slate-600">
                    <span>實體書宅配物流費用</span>
                    <span className="text-emerald-700 font-bold font-mono">NT$ 0 (免運)</span>
                  </div>
                  <div className="border-t border-slate-300 pt-2 flex items-center justify-between text-sm">
                    <span className="font-bold">今日應繳金額</span>
                    <span className="text-xl font-mono font-bold text-[#e11d48]">NT$ {finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-950 hover:bg-[#e11d48] text-white font-mono font-bold text-xs py-3.5 rounded-xs flex items-center justify-center space-x-2 cursor-pointer shadow-xs border-2 border-slate-950 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>送交訂單・開啟金榜入會</span>
                </button>
              </form>
            )}

          </div>
        )}

        {/* Footer info */}
        <div className="p-4 bg-[#f5f3ee] border-t-2 border-slate-900 text-[10px] text-slate-550 text-center flex items-center justify-center space-x-1 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
          <span>金流完全採用標準 SSL 加密安全認證交易保護機制。</span>
        </div>

      </div>
    </div>
  );
}
