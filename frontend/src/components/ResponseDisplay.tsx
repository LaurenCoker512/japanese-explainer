import ReactMarkdown from "react-markdown";
import Furigana from "react-furigana";

interface ResponseDisplayProps {
  explanation: string;
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
  return (
    <div className="mt-8 space-y-8 response-display">
      <div className="bg-matcha-green/10 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-matcha-green mb-3">
          Explanation
        </h2>
        <div className="text-left prose prose-base">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <Furigana text={flattenChildren(children)} />
              ),
              li: ({ children }) => (
                <li>
                  <Furigana text={flattenChildren(children)} />
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote>
                  <Furigana text={flattenChildren(children)} />
                </blockquote>
              ),
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
            {explanation}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default ResponseDisplay;
