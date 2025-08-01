import Explainer from "./components/Explainer";
import "./App.css";

function App() {
  return (
    <>
      <Explainer />
      <footer className="text-center text-gray-500 text-sm mt-8">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://github.com/laurencoker"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lauren Coker
          </a>
        </p>
        <a
          href="https://www.flaticon.com/free-icons/cherry-tree"
          title="cherry tree icon"
        >
          Cherry tree icon created by Freepik - Flaticon
        </a>
      </footer>
    </>
  );
  return <Explainer />;
}

export default App;
