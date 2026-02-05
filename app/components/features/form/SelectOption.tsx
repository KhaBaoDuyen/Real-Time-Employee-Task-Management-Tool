import { useFormContext } from "react-hook-form";
import { useState } from "react";

type Option = {
  id: number | string;
  name?: string;
  title?: string;
};

type Props = {
  label: string;
  name: string;
  options: Option[];
};

export const FilterSelect = ({ label, name, options }: Props) => {
  const { watch, setValue } = useFormContext();

  const [keyword, setKeyword] = useState("");

  const value = watch(name);  

  const filtered = options.filter((o) =>
    (o.name || o.title)!
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <h1 className="font-bold">{label}</h1>

      <input
        placeholder="Tìm kiếm..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border rounded-md px-3 py-2 w-full text-sm"
      />

      <div className="border rounded-md max-h-[180px] overflow-y-auto p-2 space-y-2">
        {filtered.map((o) => {
          const text = o.name || o.title;

          return (
            <label key={o.id} className="flex items-center gap-2">
              <input
                type="radio"
                checked={value === o.id}
                onChange={() => setValue(name, o.id)}
              />
              <span>{text}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
