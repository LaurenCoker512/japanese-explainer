import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface WordInputFormProps {
  word: string;
  age: number;
  onWordChange: (word: string) => void;
  onAgeChange: (age: number) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

function WordInputForm({
  word,
  age,
  onWordChange,
  onAgeChange,
  onSubmit,
  loading,
}: WordInputFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="word"
          className="block text-base font-semibold text-dark-gray mb-1"
        >
          Japanese Vocabulary Word
        </label>
        <input
          type="text"
          id="word"
          value={word}
          onChange={(e) => onWordChange(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
          placeholder="Enter a Japanese word"
          disabled={loading}
        />
      </div>
      <div>
        <label
          htmlFor="age"
          className="block text-base font-semibold text-dark-gray mb-1"
        >
          Age Level (5-18)
        </label>
        <div className="flex items-center mt-2 gap-3">
          <div className="flex-1">
            <Slider
              min={5}
              max={18}
              value={age}
              onChange={(value) => onAgeChange(Number(value))}
              disabled={loading}
              styles={{
                track: { backgroundColor: "#2a5caa", height: 8 },
                handle: {
                  borderColor: "#2a5caa",
                  height: 24,
                  width: 24,
                  marginTop: -8,
                  backgroundColor: "#fff",
                },
              }}
              railStyle={{ backgroundColor: "#e5e7eb", height: 8 }}
            />
          </div>
          <span className="text-gray-800 w-10 text-center text-lg font-bold">
            {age}
          </span>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-japan-blue hover:bg-japan-blue/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-japan-blue/50 transition-all ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Processing..." : "Get Examples"}
      </button>
    </form>
  );
}

export default WordInputForm;
