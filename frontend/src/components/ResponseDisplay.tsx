import ReactMarkdown from "react-markdown";
import Furigana from "react-furigana";

interface ResponseDisplayProps {
  explanation: string;
}

function cleanExplanation(text: string) {
  let cleaned = text.replace(/'/g, "");
  cleaned = cleaned.replace(/\s*\+\s*/g, "");
  cleaned = cleaned.replace(/\\n/g, "\n");
  cleaned = cleaned.replace(/\n\s+/g, "\n");
  // Ensure two blank lines before --- and headings (###, ##, #)
  cleaned = cleaned.replace(/([^\n])\n(---|#{1,6})/g, "$1\n\n$2");
  // Ensure two blank lines after --- and headings
  cleaned = cleaned.replace(/(---|#{1,6})([^\n])/g, "$1\n\n$2");
  return cleaned.trim();
}

// Helper to flatten children to string
function flattenChildren(children: React.ReactNode): string {
  if (Array.isArray(children)) {
    return children.map(flattenChildren).join("");
  }
  if (typeof children === "string") {
    return children;
  }
  return "";
}

function ResponseDisplay({ explanation }: ResponseDisplayProps) {
  const cleaned = cleanExplanation(explanation);

  return (
    <div className="mt-8 space-y-8 response-display">
      <div className="bg-matcha-green/10 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-matcha-green mb-3">
          Explanation
        </h2>
        <ReactMarkdown
          components={{
            p: ({ children }) => <Furigana text={flattenChildren(children)} />,
            li: ({ children }) => (
              <li>
                <Furigana text={flattenChildren(children)} />
              </li>
            ),
            // Optionally, add for headings if you want furigana there too:
            h1: ({ children }) => (
              <h1>
                <Furigana text={flattenChildren(children)} />
              </h1>
            ),
            h2: ({ children }) => (
              <h2>
                <Furigana text={flattenChildren(children)} />
              </h2>
            ),
            h3: ({ children }) => (
              <h3>
                <Furigana text={flattenChildren(children)} />
              </h3>
            ),
          }}
        >
          {cleaned}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default ResponseDisplay;
