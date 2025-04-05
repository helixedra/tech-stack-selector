import { RiFileCopyLine } from "react-icons/ri";
import { useRef } from "react";

interface SelectionAreaProps {
  selection: number[];
  buildCommands: (selected: number[]) => string | undefined;
  reset: () => void;
}

export default function SelectionArea({
  selection,
  buildCommands,
  reset,
}: SelectionAreaProps) {
  const codeRef = useRef<HTMLDivElement>(null);
  const copyToClipboard = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="mt-12 justify-center flex font-mono">
        <div
          ref={codeRef}
          className="bg-gradient-to-r from-zinc-600 to-purple-800 text-white py-0.5 px-0.5 rounded-lg m-4"
        >
          <span className="flex w-full bg-gray-900 text-white rounded-lg p-2 px-4">
            {buildCommands(selection) || ""}
          </span>
        </div>
        <button onClick={copyToClipboard}>
          <RiFileCopyLine size={24} className="opacity-50" />
        </button>
      </div>
      <button
        className="bg-zinc-500/50 text-white text-xs rounded-lg px-2 py-1 ml-4"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
}
