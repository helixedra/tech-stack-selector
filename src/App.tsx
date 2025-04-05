import { useState } from "react";
import { tech } from "./data/tech";
import ThemeToggle from "./ToggleTheme";
import TechItem from "./components/TechItem";
import SelectionArea from "./components/SelectionArea";
import AppHeader from "./components/AppHeader";
import CategoriesTabs from "./components/CategoriesTabs";

function App() {
  const [selection, setSelection] = useState<number[]>([]);
  const [category, setCategory] = useState<string>("Framework");

  const handleSelection = (id: number) => {
    setSelection((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const resetHandleSelection = () => {
    setSelection([]);
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
  const filteredTech = tech.filter((item) => item.category === category);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-4 gradient">
      {/* <ThemeToggle /> */}
      <AppHeader />
      <CategoriesTabs
        tech={tech}
        category={category}
        setCategory={setCategory}
      />
      <div className="flex flex-wrap gap-4 mt-4">
        {filteredTech.map((item) => (
          <TechItem
            item={item}
            selection={selection}
            handleSelection={handleSelection}
            key={item.id}
          />
        ))}
      </div>

      {selection.length > 0 ? (
        <SelectionArea
          selection={selection}
          buildCommands={buildCommands}
          reset={resetHandleSelection}
        />
      ) : (
        "Select a technology to see the command"
      )}
    </main>
  );
}

export default App;
