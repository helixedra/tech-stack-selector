import React from "react";
import { twMerge } from "tailwind-merge";

interface CategoriesTabsProps {
  tech: {
    id: number;
    name: string;
    icon: string;
    install: string;
    category: string;
  }[];
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function CategoriesTabs({
  tech,
  category,
  setCategory,
}: CategoriesTabsProps) {
  const categoriesList = Array.from(new Set(tech.map((item) => item.category)));

  const classes =
    "text-gray-500 text-white/80 hover:text-white/60 font-medium text-sm px-4 py-2.5 text-center inline-flex items-center";

  const activeClasses = "text-white bg-zinc-600/50 rounded-lg";

  console.log(category);

  return (
    <div className="categories-tabs flex flex-wrap gap-2 justify-center mt-4">
      {categoriesList.map((cat) => (
        <button
          key={cat}
          className={
            cat === category ? twMerge(classes, activeClasses) : classes
          }
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
