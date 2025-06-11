import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type QA = {
  question: string;
  selected: string;
  correct: string;
};

export default function ReviewPage() {
  const [results, setResults] = useState<QA[]>([]);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("lastResults");
    if (data) setResults(JSON.parse(data));
  }, []);

  const restart = () => {
    router.push("/");
  };

  if (!results.length) return <div className="p-4">No results to show.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 Review Your Answers</h1>
      <ul className="space-y-4">
        {results.map((r, i) => (
          <li key={i} className="border p-4 rounded">
            <p className="font-medium">{i + 1}. {r.question}</p>
            <p className={`mt-1 ${r.selected === r.correct ? 'text-green-600' : 'text-red-600'}`}>
              Your answer: {r.selected}
            </p>
            {r.selected !== r.correct && (
              <p className="text-blue-700">Correct answer: {r.correct}</p>
            )}
          </li>
        ))}
      </ul>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={restart}
      >
        🔁 Restart
      </button>
    </div>
  );
}
