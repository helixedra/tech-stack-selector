import React from "react";

interface TechItemProps {
  item: {
    id: number;
    name: string;
    icon: string;
    install: string;
  };
  selection: number[];
  handleSelection: (id: number) => void;
}

export default function TechItem({
  item,
  selection,
  handleSelection,
}: TechItemProps) {
  const [iconSrc, setIconSrc] = React.useState(
    `/images/${item.icon}` || "/images/sample.png"
  );

  React.useEffect(() => {
    const img = new Image();
    img.src = `/images/${item.icon}`;
    img.onload = () => setIconSrc(`/images/${item.icon}`);
    img.onerror = () => setIconSrc("/images/sample.png");
  }, [item.icon]);

  React.useEffect(() => {}, [selection]); // rerender on selection change

  return (
    <div
      key={item.id}
      className={`flex w-fit rounded p-2 items-center gap-2 ${
        selection.includes(item.id) ? "bg-zinc-700/50" : ""
      }`}
    >
      <div className="w-6 h-6 flex items-center">
        <img src={iconSrc} alt={item.name} />
      </div>
      <label htmlFor={`tech-${item.id}`} className="cursor-pointer">
        {item.name}
      </label>
      <input
        type="checkbox"
        id={`tech-${item.id}`}
        checked={selection.includes(item.id)}
        onChange={() => handleSelection(item.id)}
      />
    </div>
  );
}
