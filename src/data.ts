import { VideoCard, Course, QuizQuestion } from "./types";

export const VIDEO_CARDS: VideoCard[] = [
  {
    id: "video-1",
    title: "【名師引路】土地法規複雜條文 3 分鐘圖像記憶法",
    category: "土地法規",
    speaker: "詹坤林 地政特考名師",
    duration: "12:45",
    views: 96,
    initialLikes: 48,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Anchor or simulation fallback
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    summary: "法條密密麻麻背不起來？本影音公開地政特考不外傳的「左右聯想圖像記憶法」，將土地法第 34 條之 1、第 104 條等高頻考點，化繁為簡為三張關鍵圖像，讓你上考場閉上眼就能默寫出申論重點！",
    keyPoints: [
      "土地法 34-1 處分、變更與設定負擔之多數決比例互補記憶",
      "優先購買權 (土地法 104 條) 債權效力與物權效力衝突時的圖像化解法",
      "申論題開標三要件：引、申、結，3分鐘架構模板"
    ]
  },
  {
    id: "video-2",
    title: "【學姐分享】非本科系如何利用零碎時間，6 個月一次考取地政士",
    category: "備考心得",
    speaker: "廖學姐 (112年地政士榜眼，原民營企劃)",
    duration: "18:20",
    views: 166,
    initialLikes: 89,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    summary: "零基礎、要加班、下班還要照顧小孩...這樣如何備考？廖學姐親自分享如何分配每日 2.5 小時黃金時間，並利用通勤、午休重複刷題。本影音加碼公開：如何調適考前焦慮及最後 30 天的衝刺作訓表！",
    keyPoints: [
      "黃金3小時分散學習法：晨讀、通勤、晚間覆盤",
      "民法申論題：如何用法理彌補法條記憶的不完整",
      "各科筆記整理心法：只錄「考前 15 分鐘精華筆記」"
    ]
  },
  {
    id: "video-3",
    title: "【關鍵解題】土地登記規則——申論題拿高分必背格式",
    category: "土地登記",
    speaker: "謝豪 地政士事務所執行長/補教名師",
    duration: "15:40",
    views: 425,
    initialLikes: 213,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    summary: "土地登記規則幾乎是百分百純申論題考科！很多考生會做登記卻寫不出高分卷。這堂公開課解析歷年中標率最高的核心法規，並示範「主、客、客、客」與「法源依据、法律效果、特例除外」的公式寫法，直接多拿 10 分！",
    keyPoints: [
      "他項權利登記、信託登記申論題高頻考點分析",
      "答卷結構學：如何用法律條款編號與釋字亮瞎閱卷官雙眼",
      "常犯失分地雷：避免用詞不夠精準、漏列複丈程序"
    ]
  },
  {
    id: "video-4",
    title: "【修法特報】最新平均地權條例修正重點與考題預測",
    category: "修法趨勢",
    speaker: "陳教授 考試院前地政命題委員",
    duration: "22:15",
    views: 596,
    initialLikes: 354,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
    summary: "「新修法內容絕對是今年必考題！」陳教授針對平均地權條例最新條正——包含限制預售屋轉售、禁止私法人購私有住宅許可制、吹哨者條款及非法炒作重罰，進行深度考點預言，更為大家準備了精準的自創模擬題解析！",
    keyPoints: [
      "預售屋與新建成屋限制轉售與配偶、直系血親特例申論寫法",
      "私法人購買住宅「許可制」與「免經許可」案之申論題對比",
      "今年土地稅法、土地法規跨科連動考點最完整預測"
    ]
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: "course-all-pass",
    title: "【全科全套精修班】買一送一！雙師資合體教學",
    subtitle: "不限觀看次數，送獨家精編講義，從基礎觀念、法規架構到歷屆試題完整陪跑。",
    category: "全科首選",
    price: 18800,
    originalPrice: 28800,
    rating: 4.9,
    reviewsCount: 384,
    hours: 180,
    lectures: 120,
    isHot: true,
    features: [
      "雙師資合體教學，不限觀看次數",
      "贈送全套實體教科講義與大套書免運宅配",
      "加贈最新修法衝刺突擊班，隨時防突襲",
      "一對一專業學員 Line 諮詢解惑服務到考前"
    ],
    recommendedFor: ["第一次準備地政士考試、想一次準備全科的考生。"],
    syllabus: [
      { title: "民法篇：物權編、債編與繼承編核心重點剖析", duration: "45 小時" },
      { title: "土地法規篇：土地徵收、計畫與利用法學大躍進", duration: "45 小時" },
      { title: "土地稅法規：增值稅、房地合一與契稅算題實戰", duration: "35 小時" },
      { title: "土地登記規則：登記實務、程序與救濟完全攻略", duration: "35 小時" },
      { title: "總複習與申論寫作突破考前衝刺", duration: "20 小時" }
    ]
  },
  {
    id: "course-law-sprint",
    title: "【土地法規破產特訓】圖像化解構！複雜條文不再死記",
    subtitle: "將土地法規拆成圖表、流程與關鍵句，直擊核心考點，降低法條背誦壓力。",
    category: "圖像記憶",
    price: 4980,
    originalPrice: 8000,
    rating: 4.8,
    reviewsCount: 196,
    hours: 24,
    lectures: 16,
    isHot: true,
    features: [
      "圖像化拆解複雜法條與關係圖",
      "直擊核心考點、專攻高頻命題範圍",
      "22 道精修申論擬真題與答題模板",
      "法條與生活案例結合，融會貫通好吸收"
    ],
    recommendedFor: ["土地法規讀不熟、容易混淆條文與適用情境的考生。"],
    syllabus: [
      { title: "新修平均地權條例防炒作實務及民刑事法律責任", duration: "6 小時" },
      { title: "預售屋及建案限制換約申論試題精解", duration: "6 小時" },
      { title: "私法人買房許可制之要件、豁免與審查程序", duration: "6 小時" },
      { title: "土地徵收最新條正案與相關裁判實務釋字關聯性", duration: "6 小時" }
    ]
  },
  {
    id: "course-land-register",
    title: "【土地登記規則衝刺】申論題必勝範本＋10 年考古題詳解",
    subtitle: "整理土地登記規則高頻申論題，搭配必背答題格式與 10 年考古題詳解，上榜關鍵這一科不能失分。",
    category: "考前衝刺",
    price: 6200,
    originalPrice: 9000,
    rating: 4.8,
    reviewsCount: 167,
    hours: 42,
    lectures: 28,
    isHot: false,
    features: [
      "10 年考古題題題白話析解、完美格式",
      "提供申論寫作『主、客、客、客』上岸套路",
      "表格化速記程序，例如登記八大步驟",
      "附贈精美全套紙本背誦大圖表及講義"
    ],
    recommendedFor: ["想強化申論題、需要考前快速建立答題模板的考生。"],
    syllabus: [
      { title: "土地登記之基本原理、公示力與公信力辦理", duration: "8 小時" },
      { title: "登記程序八大步驟：收件、審查、公告、登簿完全拆解", duration: "10 小時" },
      { title: "各權利登記實務（所有權、他項權利、限制登記、信託等）", duration: "16 小時" },
      { title: "地籍測量實施規則與複丈、分割、重測等實務考點", duration: "8 小時" }
    ]
  },
  {
    id: "course-civil-law",
    title: "【民法物權與信託法】法律小白也能懂！",
    subtitle: "透過生活化案例引導，從買賣、繼承、抵押、共有到信託概念，讓法律小白也能掌握得分重點。",
    category: "物權信託",
    price: 6800,
    originalPrice: 9800,
    rating: 4.7,
    reviewsCount: 145,
    hours: 48,
    lectures: 32,
    isHot: false,
    features: [
      "精選生活趣味案例，快速理解法律底層邏輯",
      "物權編共有土地分割與 34-1 交叉大專題解剖",
      "信託法 15 大高頻金鑰考點與受益人保障",
      "三段論法邏輯寫作公式：大前提、小前提、結論"
    ],
    recommendedFor: ["非法律本科系、民法基礎薄弱、需要從生活案例理解法條的考生。"],
    syllabus: [
      { title: "民法總則：行為能力、意思表示瑕疵及代理基礎", duration: "10 小時" },
      { title: "債權法與物權法連動：共有物管理、共有處分 34-1 交叉解構", duration: "18 小時" },
      { title: "親屬繼承：特留分、應繼份及夫妻財產制疑難點破解", duration: "12 小時" },
      { title: "信託法：信託財產獨立性及受益人權益保障機制", duration: "8 小時" }
    ]
  }
];

export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    subject: "土地法規",
    question: "依土地法第三十四條之一規定，共有土地或建築改良物，其處分、變更及設定地上權、農育權、不動產役權或典權，應如何決定？",
    options: [
      "應得共有人全體之同意",
      "應以共有人過半數及其應有部分合計過半數之同意行之；但其應有部分合計逾三分之二者，其人數不予計算",
      "應以共有人三分之二以上及其應有部分合計過半數之同意行之",
      "應以共有人過半數或其應有部分合計過半數之同意行之"
    ],
    correctAnswer: 1,
    explanation: "答案為 (B)。依土地法第 34-1 條第 1 項規定，共有土地或建築改良物，其處分、變更及設定地上權、農育權、不動產役權或典權，應以共有人過半數及其應有部分合計過半數之同意行之。但其應有部分合計逾三分之二者，其人數不予計算。這是著名的多數決處分條限，為地政士特考必考之重點中的重點！"
  },
  {
    id: 2,
    subject: "民法概要",
    question: "關於地上權，下列敘述何者錯誤？",
    options: [
      "普通地上權人，得以土地之上下在特定範圍內設定地上權",
      "地上權人不論有無約定地租，皆得隨時拋棄其權利而消滅",
      "地上權不因工作物或竹木之滅失而消滅",
      "當事人約定地租而地上權人積欠地租達兩年之總額時，土地所有人得終止地上權"
    ],
    correctAnswer: 1,
    explanation: "答案為 (B)。民法第 833-1 條與相應實務：有約定地租之普通地上權，地上權人原則上不得任意隨時拋棄其權利，若拋棄應支付相當之賠償或依一定地租給付義務。若無地租約定，才可隨時拋棄。民法物權編地上權章之修法也強化了共有人及權利關係人的衡平。"
  },
  {
    id: 3,
    subject: "土地稅法規",
    question: "依土地稅法規定，共有土地辦理共有物分割後，各人取得之土地價值與分割前應有部分價值相等者，應否課徵土地增值稅？",
    options: [
      "應按各人取得部分核課 10% 稅率土地增值稅",
      "免徵或不課徵土地增值稅",
      "應折半課徵土地增值稅",
      "由稅捐機關核定補貼其前手稅額後免予課徵"
    ],
    correctAnswer: 1,
    explanation: "答案為 (B)。依規定，若共有物分割後，各人取得土地價值與分割前應有部分價值相符或在規定差額以內者，屬於產權理算之非交易處分，免徵或不課徵土地增值稅。若取得價值有增加，增加土地之共有人應依補償協定辦理，其取得價值減少之共有人則應就減少部分課徵土地增值稅。"
  },
  {
    id: 4,
    subject: "土地登記規則",
    question: "依土地登記規則規定，下列何種登記得免提出「土地所有權狀或建物所有權狀」？",
    options: [
      "所有權移轉登記",
      "抵押權設定登記",
      "限制登記（如法院假扣押查封登記）",
      "塗銷信託登記"
    ],
    correctAnswer: 2,
    explanation: "答案為 (C)。依土地登記規則第 35 條規定，限制登記係由法院或機關嘱託登記機關行之，具有強制與公示性質，免提出土地或建物所有權狀。其餘所有權移轉、他項設定或塗銷信託等一般主動申請之權利變更登記，均必須提出所有權狀以憑核對。"
  }
];

export const MOCK_REVIEWS = [
  { name: "陳*廷", score: 5, badge: "精選全科保證班", date: "2026-04-12", comment: "感謝老師的圖像記憶法！我是完全沒有法學底子的化學系工程師，平常加班到八九點，靠本課程 6 個月一次通過。民法與土地登記申論拿了 72 與 68 的高分，真的無痛好吸收！" },
  { name: "林*雅", score: 5, badge: "最新修法精必衝刺班", date: "2026-05-02", comment: "今年平均地權條例修改細節非常複雜，一堆名詞。曾教授講得很白話，考前給的 22 道模擬申論題，在今年果然考了兩題在類似架構，直接拿了近 45 分！今年一定能上岸！" },
  { name: "張*維", score: 5, badge: "土地稅高分實戰班", date: "2026-05-18", comment: "之前考兩次都敗在土地稅法計算題，只要稍微變形算出來的增值稅就錯。這門課的九宮格算稅模板救了我，寫題流暢無比，大力推薦代書同業來補強！" }
];
