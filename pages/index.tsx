import { useRouter } from 'next/router';
import { useState } from 'react';

const topics = [
  "Cardiovascular System",
  "CNS",
  "Infections",
  "Endocrine",
  "GI System",
  "Respiratory",
  "Genito-Urinary",
  "Immunosuppression & Cancer",
  "Nutrition & Blood",
  "Musculoskeletal, ENT, Skin, Anaesthesia, Poisoning",
  "MEP / Law"
];

export default function Home() {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState("");

  const startQuiz = () => {
    if (!selectedTopic) return alert("Pick a topic!");
    router.push(`/quiz?topic=${encodeURIComponent(selectedTopic)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">🧠 CLSSri Quiz App</h1>
      <select
        onChange={(e) => setSelectedTopic(e.target.value)}
        className="p-2 border rounded w-72 mb-4"
        value={selectedTopic}
      >
        <option value="">-- Select a topic --</option>
        {topics.map((t, i) => (
          <option key={i} value={t}>{t}</option>
        ))}
      </select>
      <button
        onClick={startQuiz}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Start Quiz
      </button>
    </div>
  );
}
