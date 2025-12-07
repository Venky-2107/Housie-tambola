import { useState, useEffect } from "react";
import { useCallerStore } from "../../state/callerStore";
import Button from "../ui/Button";

// // ---------------------------------------------
// // 🌐 Load Telugu voices once
// // ---------------------------------------------
// let teluguVoice: SpeechSynthesisVoice | null = null;

// const loadVoices = () => {
//   const voices = window.speechSynthesis.getVoices();
//   teluguVoice = voices.find((v) => v.lang === "te-IN") || null;
// };

// window.speechSynthesis.onvoiceschanged = loadVoices;
// loadVoices();

// // ---------------------------------------------
// // ⭐ Random Telugu phrases (optional fun!)
// // ---------------------------------------------
// const TE_PHRASES = [
//   "హౌసీ మొదలైంది!",
//   "సిద్ధంగా ఉండండి!",
//   "మరి వచ్చే సంఖ్య!",
//   "అందరూ లిసన్!",
//   "ఇప్పుడు బిగ్ నెంబర్!",
// ];

// const getRandomPhrase = () =>
//   TE_PHRASES[Math.floor(Math.random() * TE_PHRASES.length)];

export default function CallerControls() {
  const {
    drawNextNumber,
    startAuto,
    stopAuto,
    isAuto,
    remainingNumbers,
    drawnNumbers,
  } = useCallerStore();

  const [intervalSeconds, setIntervalSeconds] = useState<number>(8);

  const gameFinished = remainingNumbers.length === 0;

  // =====================================================
  // 🔊 SPEAK NUMBER IN ENGLISH
  // =====================================================
  const speakNumber = (num: number) => {
    if (!("speechSynthesis" in window)) return;

    const phrase = "Rolling Number...."; // 🪄 Random Telugu phrase
    const u1 = new SpeechSynthesisUtterance(phrase);
    u1.lang = "te-IN";
    u1.rate = 0.8;
    u1.pitch = 1.1;

    const u2 = new SpeechSynthesisUtterance(String(num));
    u2.lang = "te-IN";
    u2.rate = 1;
    u2.pitch = 1.0;

    window.speechSynthesis.cancel();

    // Speak phrase → then number
    window.speechSynthesis.speak(u1);
    u1.onend = () => window.speechSynthesis.speak(u2);
  };

  // Speak whenever a NEW number is drawn
  useEffect(() => {
    if (drawnNumbers.length === 0) return;
    const latest = drawnNumbers[drawnNumbers.length - 1];
    speakNumber(latest);
  }, [drawnNumbers]);

  // =====================================================
  // 🔥 ENTER key triggers drawNextNumber()
  // =====================================================
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !gameFinished && !isAuto) {
        drawNextNumber();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [drawNextNumber, gameFinished, isAuto]);

  const handleAutoToggle = () => {
    if (isAuto) stopAuto();
    else {
      if (intervalSeconds < 3) {
        alert("Auto draw must be at least 3 seconds.");
        return;
      }
      startAuto(intervalSeconds);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 items-end max-md:justify-center">
      {/* Auto Interval */}
      <div>
        <label className="text-sm p-1 text-gray-800">
          Auto every (seconds)
        </label>
        <input
          type="number"
          min={3}
          className="w-20 mt-1 rounded bg-card border border-slate-700 px-2 py-1 text-black"
          value={intervalSeconds}
          onChange={(e) => setIntervalSeconds(Number(e.target.value))}
          disabled={isAuto || gameFinished}
        />
      </div>

      {/* Auto Draw */}
      <Button
        className={
          isAuto ? "bg-red-500 text-white" : "bg-slate-800 text-gray-200"
        }
        onClick={handleAutoToggle}
        disabled={gameFinished}
      >
        {isAuto ? "⏸ Stop Auto" : "▶ Start Auto"}
      </Button>

      {/* Draw Next */}
      <Button
        onClick={drawNextNumber}
        disabled={gameFinished}
        className="bg-blue-300"
      >
        🎲 Generate
      </Button>
    </div>
  );
}
