import { useState, useCallback } from "react";
import { api } from "../api"; // Import the API client
import WordInputForm from "./WordInputForm";
import ResponseDisplay from "./ResponseDisplay";

type ApiResponse = {
  explanation: string;
};

function Explainer() {
  const [word, setWord] = useState("");
  const [age, setAge] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const validateWord = (word: string) => {
    // Check for reasonable length (1-10 characters is typical for most Japanese words)
    if (word.length < 1 || word.length > 10) {
      return false;
    }

    // Check if input contains only Japanese characters
    const japaneseRegex =
      /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\uFF65-\uFF9F]+$/;
    return japaneseRegex.test(word);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!word.trim()) {
        setError("Please enter a Japanese word");
        return;
      }
      if (!validateWord(word)) {
        setError(
          "Please enter a valid Japanese word (1-10 Japanese characters only)."
        );
        return;
      }
      setLoading(true);
      setError("");
      setResponse(null);
      try {
        const res = await api.getExplanation({ word, age });
        setResponse(res);
      } catch (err) {
        setError("Failed to get response. Please try again.");
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [word, age]
  );

  return (
    <div className="min-h-dvh bg-soft-washi py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-dark-gray mb-8 tracking-tight">
          Japanese Vocabulary Practice
        </h1>
        <WordInputForm
          word={word}
          age={age}
          onWordChange={setWord}
          onAgeChange={setAge}
          onSubmit={handleSubmit}
          loading={loading}
        />
        {error && (
          <div className="mt-4 p-3 bg-akabeni-red/10 border border-akabeni-red text-akabeni-red rounded-lg">
            {error}
          </div>
        )}
        {loading && (
          <div className="mt-6 flex justify-center">
            <span className="animate-spin rounded-full h-8 w-8 border-4 border-b-transparent border-gray-900"></span>
          </div>
        )}
        {response && <ResponseDisplay explanation={response.explanation} />}
      </div>
    </div>
  );
}

export default Explainer;
