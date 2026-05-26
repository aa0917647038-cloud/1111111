import React, { useState, useEffect } from "react";
import { Course, CartItem } from "./types";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import IdentitySplit from "./components/IdentitySplit";
import CourseCatalog from "./components/CourseCatalog";
import VideoList from "./components/VideoList";
import StudyHelper from "./components/StudyHelper";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import { Check, AlertCircle, Info, X } from "lucide-react";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string | undefined>(undefined);
  const [toasts, setToasts] = useState<{ id: string; message: string; type: "success" | "warning" | "info" }[]>([]);

  useEffect(() => {
    (window as any).showToast = (msg: string, type: "success" | "warning" | "info" = "success") => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((prev) => [...prev, { id, message: msg, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4500);
    };
  }, []);

  const handleAddCourse = (course: Course) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.course.id === course.id);
      if (exists) {
        (window as any).showToast?.(`【${course.title}】已存於您的應援購物車包中囉！`, "warning");
        return prevCart;
      }
      (window as any).showToast?.(`🎉 成功將【${course.title}】納入應援購物車！`, "success");
      return [...prevCart, { course, quantity: 1 }];
    });
    // Open the drawer automatically for elegant e-commerce flow feedback
    setIsCartOpen(true);
  };

  const handleAddCourseByRole = (role: string) => {
    setSelectedRoleFilter(role);
    handleNavigateSection("course-selector");
  };

  const handleRemoveCartItem = (courseId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.course.id !== courseId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectRole = (role: string) => {
    setSelectedRoleFilter(role);
    handleNavigateSection("course-selector");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fdfcf9] pb-16 lg:pb-0 selection:bg-[#f59e0b]/30 selection:text-slate-900">
      
      {/* 1 & 2. 導航與最新消息公告條 */}
      <Header
        onSearch={setSearchTerm}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        cartItems={cart}
        onRemoveItem={handleRemoveCartItem}
        onOpenCartDrawer={() => setIsCartOpen(true)}
        onNavigateSection={handleNavigateSection}
        currentSearchTerm={searchTerm}
      />

      {/* 3. 主視覺 Banner 與快速行動 */}
      <HeroSection onNavigateSection={handleNavigateSection} />

      {/* 主要內容區 */}
      <main className="flex-1 space-y-4">
        
        {/* 4. 身分分流區塊 */}
        <IdentitySplit onSelectRole={handleSelectRole} />

        {/* 5. 本月推薦學習路線 */}
        <CourseCatalog
          onAddCourse={handleAddCourse}
          selectedRoleFilter={selectedRoleFilter}
        />

        {/* 6. 免費試聽 / 免費工具 */}
        <VideoList
          onAddCourseByRole={handleAddCourseByRole}
          onNavigateSection={handleNavigateSection}
        />

        {/* 備考應援神助手 (自帶計算器/AI隨身問/測驗) */}
        <StudyHelper />

      </main>

      {/* 7. Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* 滑動式學員購物與註冊 Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* 手機版固定 CTA：免費試聽 / 立即報名 / LINE 諮詢 */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-[#fdfcf9] border-t-4 border-slate-900 grid grid-cols-3 z-30 font-display font-bold divide-x-2 divide-slate-900 shadow-[0_-8px_20px_rgba(0,0,0,0.1)]">
        <button
          onClick={() => handleNavigateSection("demo-classroom")}
          className="py-3.5 px-2 text-center text-xs text-slate-950 hover:bg-slate-100 flex flex-col items-center justify-center space-y-0.5 cursor-pointer"
        >
          <span className="text-[9px] text-[#e11d48] uppercase tracking-wider block font-mono leading-none">DEMO LECTURE</span>
          <span className="leading-tight font-extrabold text-slate-900">📺 免費試聽</span>
        </button>
        <button
          onClick={() => handleNavigateSection("course-selector")}
          className="py-3.5 px-2 text-center text-xs text-slate-950 bg-amber-400 hover:bg-amber-500 flex flex-col items-center justify-center space-y-0.5 cursor-pointer"
        >
          <span className="text-[9px] text-amber-950 uppercase tracking-wider block font-mono leading-none">ORDER NOW</span>
          <span className="leading-tight font-extrabold text-slate-900">🎓 立即報名</span>
        </button>
        <button
          onClick={() => {
            (window as any).showToast?.("💬 請加入地政士應援局 LINE 客服好友：@land_cheer，即時獲得老師 1對1 回覆與專屬 $500 購物抵扣代碼！", "info");
          }}
          className="py-3.5 px-2 text-center text-xs text-white bg-emerald-600 hover:bg-emerald-700 flex flex-col items-center justify-center space-y-0.5 cursor-pointer"
        >
          <span className="text-[9px] text-emerald-100 uppercase tracking-wider block font-mono leading-none">CONSULTATION</span>
          <span className="leading-tight font-extrabold text-white">💬 LINE 諮詢</span>
        </button>
      </div>

      {/* Toast 容器 */}
      <div className="fixed top-24 right-4 z-50 space-y-2 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center p-3.5 text-xs font-bold font-sans rounded-xs shadow-lg border-2 border-slate-900 animate-slide-in-right ${
              toast.type === "success"
                ? "bg-emerald-50 text-emerald-950 border-emerald-600"
                : toast.type === "warning"
                ? "bg-amber-50 text-amber-950 border-amber-600"
                : "bg-blue-50 text-blue-950 border-blue-600"
            }`}
          >
            {toast.type === "success" && <Check className="w-4 h-4 mr-2 text-emerald-600 flex-shrink-0" />}
            {toast.type === "warning" && <AlertCircle className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" />}
            {toast.type === "info" && <Info className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />}
            <span className="flex-1 text-left">{toast.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="ml-3 text-slate-400 hover:text-slate-950 text-[10px] font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
