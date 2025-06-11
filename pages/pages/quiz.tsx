import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import allQuestions from '../questions.json';

type Question = {
  question: string;
  options: string[];
  answer: string;
  topic: string;
};

export default function QuizPage() {
  const router = useRouter();
  const { topic } = router.query;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ question: string; selected: string; correct: string }[]>([]);

  useEffect(() => {
    if (topic && typeof topic === 'string') {
      const filtered = allQuestions.filter(q => q.topic === topic);
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
    }
  }, [topic]);

  const handleAnswer = (option: string) => {
    if (selected) return;
    setSelected(option);

    const correct = questions[current].answer;
    const q = questions[current];

    const updatedAnswers = [...userAnswers, { question: q.question, selected: option, correct }];
    setUserAnswers(updatedAnswers);

    if (option === correct) {
      setScore(score + 1);
    } else {
      const wrongQs = JSON.parse(localStorage.getItem("wrongQuestions") || "[]");
      localStorage.setItem("wrongQuestions", JSON.stringify([...wrongQs, q]));
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        localStorage.setItem("lastResults", JSON.stringify(updatedAnswers));
        router.push("/review");
      }
    }, 1000);
  };

  if (!questions.length) return <div className="p-4">Loading questions...</div>;

  const q = questions[current];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Q{current + 1}: {q.question}</h2>
      <ul className="space-y-3">
        {q.options.map((opt, i) => (
          <li key={i}>
            <button
              className={`w-full p-2 border rounded ${
                selected
                  ? opt === q.answer
                    ? "bg-green-200 border-green-600"
                    : opt === selected
                    ? "bg-red-200 border-red-600"
                    : "opacity-50"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => handleAnswer(opt)}
              disabled={!!selected}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
