import ReactMarkdown from "react-markdown";

interface ResponseDisplayProps {
  explanation: string;
}

function cleanExplanation(text: string) {
  console.log(text);
  let cleaned = text.replace(/'/g, "");
  cleaned = cleaned.replace(/\s*\+\s*/g, "");
  cleaned = cleaned.replace(/\\n/g, "\n");
  cleaned = cleaned.replace(/\n\s+/g, "\n");
  // Ensure blank lines before --- and ###
  cleaned = cleaned.replace(/([^\n])\n(---|###)/g, "$1\n\n$2");
  return cleaned.trim();
}

function ResponseDisplay({ explanation }: ResponseDisplayProps) {
  //const explanationLines = explanation.split("\n").filter((line) => line.trim());
  return (
    <div className="mt-8 space-y-8">
      <div className="bg-matcha-green/10 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-matcha-green mb-3">
          Explanation
        </h2>
        <ReactMarkdown>{cleanExplanation(explanation)}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ResponseDisplay;
