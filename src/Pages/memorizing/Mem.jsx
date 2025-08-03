import React, { useState, useEffect } from "react";
import {
  Plus,
  BookOpen,
  Settings,
  Play,
  Shuffle,
  Clock,
  Star,
  Volume2,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

const VocabularyApp = () => {
  const [cards, setCards] = useState([]);
  const [currentView, setCurrentView] = useState("home");
  const [selectedCard, setSelectedCard] = useState(null);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [showDefinition, setShowDefinition] = useState(false);
  const [reviewSettings, setReviewSettings] = useState({
    interval: 15, // دقائق
    enabled: false,
  });

  // تحميل البيانات من التخزين المحلي
  useEffect(() => {
    const savedCards = localStorage.getItem("vocabularyCards");
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, []);

  // حفظ البيانات في التخزين المحلي
  useEffect(() => {
    localStorage.setItem("vocabularyCards", JSON.stringify(cards));
  }, [cards]);

  // إضافة كرت جديد
  const addCard = (cardData) => {
    const { word, pronunciation, definition, example, image, color } = cardData;
    const newCard = {
      id: Date.now(),
      word: word,
      pronunciation: pronunciation,
      definition: definition,
      example: example,
      image: image,
      color: color || "#4F46E5",
      createdAt: new Date().toISOString(),
      reviewCount: 0,
      lastReviewed: null,
      difficulty: "medium",
    };
    setCards([...cards, newCard]);
  };

  // تشغيل النطق
  const playPronunciation = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  };

  // مكون إضافة كرت جديد
  const AddCardForm = () => {
    const [formData, setFormData] = useState({
      word: "",
      pronunciation: "",
      definition: "",
      example: "",
      image: "",
      color: "#4F46E5",
    });

    const colors = [
      "#4F46E5",
      "#059669",
      "#DC2626",
      "#7C2D12",
      "#7C3AED",
      "#DB2777",
    ];

    const handleSubmit = () => {
      if (formData.word && formData.definition) {
        addCard(formData);
        setFormData({
          word: "",
          pronunciation: "",
          definition: "",
          example: "",
          image: "",
          color: "#4F46E5",
        });
        setCurrentView("home");
      }
    };

    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">
            إضافة كلمة جديدة
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                الكلمة
              </label>
              <input
                type="text"
                value={formData.word}
                onChange={(e) =>
                  setFormData({ ...formData, word: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل الكلمة الإنجليزية"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                النطق
              </label>
              <input
                type="text"
                value={formData.pronunciation}
                onChange={(e) =>
                  setFormData({ ...formData, pronunciation: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="/prəˌnʌnsiˈeɪʃən/"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                المعنى
              </label>
              <textarea
                value={formData.definition}
                onChange={(e) =>
                  setFormData({ ...formData, definition: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="أدخل معنى الكلمة"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                مثال
              </label>
              <textarea
                value={formData.example}
                onChange={(e) =>
                  setFormData({ ...formData, example: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="جملة توضح استخدام الكلمة"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                رابط الصورة (اختياري)
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                لون الكرت
              </label>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-8 h-8 rounded-full border-2 ${
                      formData.color === color
                        ? "border-gray-800"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-medium"
              >
                إضافة الكرت
              </button>
              <button
                onClick={() => setCurrentView("home")}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 font-medium"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // مكون عرض الكرت
  const VocabularyCard = ({ card, inReview = false }) => {
    return (
      <div
        className={`rounded-xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl`}
        style={{ backgroundColor: card.color, color: "white" }}
        onClick={() => setSelectedCard(card)}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                playPronunciation(card.word);
              }}
              className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30"
            >
              <Volume2 size={16} />
            </button>
          </div>
          <div className="text-right">
            <h3 className="text-2xl font-bold mb-1">{card.word}</h3>
            {card.pronunciation && (
              <p className="text-white text-opacity-80 text-sm">
                {card.pronunciation}
              </p>
            )}
          </div>
        </div>

        {card.image && (
          <div className="mb-4">
            <img
              src={card.image}
              alt={card.word}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        )}

        {inReview ? (
          <div className="space-y-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDefinition(!showDefinition);
              }}
              className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-2 rounded-lg hover:bg-opacity-30"
            >
              {showDefinition ? <EyeOff size={16} /> : <Eye size={16} />}
              {showDefinition ? "إخفاء المعنى" : "إظهار المعنى"}
            </button>

            {showDefinition && (
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <p className="text-sm mb-2">{card.definition}</p>
                {card.example && (
                  <p className="text-xs text-white text-opacity-80 italic">
                    "{card.example}"
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <p className="text-white text-opacity-90 text-sm mb-2">
              {card.definition}
            </p>
            {card.example && (
              <p className="text-white text-opacity-70 text-xs italic">
                "{card.example}"
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  // الصفحة الرئيسية
  const HomePage = () => {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <VocabularyCard key={card.id} card={card} />
          ))}

          {cards.length === 0 && (
            <div className="col-span-full text-center py-12">
              <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                لا توجد كروت حتى الآن
              </h3>
              <p className="text-gray-500">ابدأ بإضافة أول كلمة لك!</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // وضع المراجعة
  const ReviewMode = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [shuffledCards, setShuffledCards] = useState([]);

    useEffect(() => {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
    }, [cards]);

    const nextCard = () => {
      setCurrentCardIndex((prev) => (prev + 1) % shuffledCards.length);
      setShowDefinition(false);
    };

    if (shuffledCards.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600">لا توجد كروت للمراجعة</p>
        </div>
      );
    }

    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            وضع المراجعة
          </h2>
          <p className="text-gray-600">
            {currentCardIndex + 1} من {shuffledCards.length}
          </p>
        </div>

        <VocabularyCard
          card={shuffledCards[currentCardIndex]}
          inReview={true}
        />

        <div className="mt-6 text-center">
          <button
            onClick={nextCard}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            الكلمة التالية
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* شريط التنقل */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-800">كروت المفردات</h1>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                {cards.length} كلمة
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView("home")}
                className={`p-2 rounded-lg ${
                  currentView === "home"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <BookOpen size={20} />
              </button>

              <button
                onClick={() => {
                  setCurrentView("review");
                  setIsReviewMode(true);
                  setShowDefinition(false);
                }}
                className={`p-2 rounded-lg ${
                  currentView === "review"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600"
                }`}
                disabled={cards.length === 0}
              >
                <Play size={20} />
              </button>

              <button
                onClick={() => setCurrentView("add")}
                className={`p-2 rounded-lg ${
                  currentView === "add"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <main>
        {currentView === "home" && <HomePage />}
        {currentView === "add" && <AddCardForm />}
        {currentView === "review" && <ReviewMode />}
      </main>

      {/* زر عائم للإضافة السريعة */}
      {currentView === "home" && (
        <button
          onClick={() => setCurrentView("add")}
          className="fixed bottom-6 left-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={24} />
        </button>
      )}
    </div>
  );
};

export default VocabularyApp;
