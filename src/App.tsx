import { useState, useRef } from "react";
import { tech } from "./data/tech";
import { RiFileCopyLine } from "react-icons/ri";
import ThemeToggle from "./ToggleTheme";
// import GlowGradientBackground from "@/components/glow-gradient-background";
// import "./gradient.css";

function App() {
  const [selection, setSelection] = useState<number[]>([]);

  const handleSelection = (id: number) => {
    setSelection((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const buildCommands = (selected: number[]) => {
    const selectedTech = selected.map((item) => {
      const techItem = tech.find((tech) => tech.id === item);
      if (techItem) {
        return `${techItem.install}`;
      }
    });
    if (selectedTech.length === 0) {
      return undefined;
    }
    return selectedTech.join(" && ");
  };

  const codeRef = useRef<HTMLDivElement>(null);
  const copyToClipboard = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-4 gradient">
      <ThemeToggle />
      {/* <GlowGradientBackground /> */}
      <div className="h-full p-12">
        <h1 className="text-6xl text-center font-mono">Tech Stack Selector</h1>
        <p className="text-gray-500 text-center">
          Select the technologies you want to include in your project.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {tech.map((item) => (
          <div
            key={item.id}
            className={`flex w-fit rounded p-2 items-center gap-2 ${
              selection.includes(item.id)
                ? "bg-gray-200 dark:bg-zinc-700/50"
                : ""
            }`}
          >
            <div className="w-6 h-6">
              <img src={item.icon} alt={item.name} />
            </div>
            <label htmlFor={`tech-${item.id}`} className="cursor-pointer">
              {item.name}
            </label>
            <input
              type="checkbox"
              id={`tech-${item.id}`}
              onChange={() => handleSelection(item.id)}
            />
          </div>
        ))}
      </div>

      {selection.length > 0 ? (
        <div className="mt-12 justify-center flex font-mono">
          <div
            ref={codeRef}
            className="dark:bg-black/50 w-[80%] border border-gray-100 dark:border-zinc-900 p-4 m-4 rounded-lg backdrop-blur-md transition-all duration-300 ease-in-out"
          >
            {buildCommands(selection) || ""}
          </div>
          <button onClick={copyToClipboard}>
            <RiFileCopyLine size={24} className="opacity-50" />
          </button>
        </div>
      ) : (
        "Select a technology to see the command"
      )}
    </main>
  );
}

export default App;
