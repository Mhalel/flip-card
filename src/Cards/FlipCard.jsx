import { RotateCcw, Volume2 } from "lucide-react";
import { useState } from "react";
const FlipCard = () => {
  const [currentFace, setCurrentFace] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const wordData = {
    word: "Bank",
    ipa: "/bæŋk/",
    faces: [
      {
        type: "main",
        meaning: "Main Word",
      },
      {
        type: "meaning",
        meaning: "Financial Institution",
        explanation:
          "A place where people can save money, get loans, and perform financial transactions.",
        example: "I need to go to the bank to deposit my paycheck.",
        image: "🏦",
      },
      {
        type: "meaning",
        meaning: "River's Edge",
        explanation: "The land alongside or sloping down to a river or lake.",
        example: "We sat on the grassy bank watching the river flow by.",
        image: "🏞️",
      },
      {
        type: "meaning",
        meaning: "To Rely On",
        explanation: "To depend on or count on something or someone.",
        example: "You can bank on me to help you with this project.",
        image: "🤝",
      },
      {
        type: "idiom",
        meaning: "Idioms & Expressions",
        explanation: "Common phrases and expressions using this word.",
        idioms: [
          {
            phrase: "Break the bank",
            meaning: "To cost too much money",
            example: "This vacation won't break the bank.",
          },
          {
            phrase: "Bank on it",
            meaning: "You can be sure of it",
            example: "It will rain tomorrow, you can bank on it.",
          },
          {
            phrase: "Laughing all the way to the bank",
            meaning: "Making money easily",
            example:
              "With this new business, he's laughing all the way to the bank.",
          },
        ],
        image: "💭",
      },
    ],
  };

  const playPronunciation = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleFaceChange = (faceIndex) => {
    if (faceIndex !== currentFace) {
      setIsFlipped(true);
      setTimeout(() => {
        setCurrentFace(faceIndex);
        setIsFlipped(false);
      }, 300);
    }
  };

  const resetCard = () => {
    setIsFlipped(true);
    setTimeout(() => {
      setCurrentFace(0);
      setIsFlipped(false);
    }, 300);
  };

  const currentData = wordData.faces[currentFace];

  return (
    <div className="relative">
      {/* Reset Button */}
      <button
        onClick={resetCard}
        className="absolute -top-12 right-0 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50"
        title="Reset to first meaning"
      >
        <RotateCcw className="w-5 h-5 text-gray-600" />
      </button>

      {/* Main Card */}
      <div
        className={`relative w-96 h-96 transition-transform duration-300 ${
          isFlipped ? "scale-95 opacity-80" : "scale-100 opacity-100"
        }`}
      >
        <div className="w-full h-full bg-white rounded-2xl shadow-2xl p-8 flex flex-col">
          {/* Header with Word and Voice */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-gray-800">
                {wordData.word}
              </h1>
              <button
                onClick={() => playPronunciation(wordData.word)}
                className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors duration-200"
                title="Pronounce word"
              >
                <Volume2 className="w-5 h-5 text-blue-600" />
              </button>
            </div>

            {/* IPA Pronunciation */}
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <span className="text-lg font-mono">{wordData.ipa}</span>
              <button
                onClick={() => playPronunciation(wordData.word)}
                className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                title="Play pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Face Navigation Circles */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-2">
              {wordData.faces.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleFaceChange(index)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                    currentFace === index
                      ? "bg-blue-500 border-blue-500 text-white shadow-lg scale-110"
                      : "bg-white border-gray-300 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                  title={`${
                    index === 0
                      ? "Main Word"
                      : index === wordData.faces.length - 1
                      ? "Idioms"
                      : `Meaning ${index}`
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col">
            {currentFace === 0 ? (
              // Main Word Face
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-8xl mb-6">📚</div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Word Definition
                </h2>
                <p className="text-gray-600 text-center">
                  Click the numbers below to explore different meanings and uses
                  of this word
                </p>
              </div>
            ) : currentData.type === "idiom" ? (
              // Idioms Face
              <div className="flex-1 flex flex-col">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{currentData.image}</div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    {currentData.meaning}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {currentData.explanation}
                  </p>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto">
                  {currentData.idioms.map((idiom, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border-l-4 border-purple-400"
                    >
                      <h4 className="font-semibold text-purple-800 mb-1">
                        "{idiom.phrase}"
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {idiom.meaning}
                      </p>
                      <p className="text-xs text-gray-500 italic">
                        Example: "{idiom.example}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Regular Meaning Face
              <div className="flex-1 flex flex-col">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">{currentData.image}</div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    {currentData.meaning}
                  </h2>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {currentData.explanation}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Example
                    </h4>
                    <p className="text-sm text-gray-700 italic">
                      "{currentData.example}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Current Face Indicator */}
          <div className="text-center mt-4">
            <span className="text-xs text-gray-400">
              {currentFace + 1} of {wordData.faces.length} meanings
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
