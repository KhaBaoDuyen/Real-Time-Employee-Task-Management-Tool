import { useState, useRef, useEffect } from "react";

type Option = {
  id: string;
  name?: string;
  email?: string;
};

type Props = {
  value: string | number;
  onChange: (value: string | number) => void;
  options: Option[];
};

export const FilterSelect = ({
  value,
  onChange,
  options
}: Props) => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  // close prop
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const filtered = options.filter((o) =>
    `${o.name || ""} ${o.email || ""}`
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );

  const selected = options.find((o) => o.id === value);

  return (
    <div ref={ref} className="relative w-40">

      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full bg-gray-300 text-black text-sm px-3 py-1 rounded-full hover:scale-102 truncate"
      >
        {selected?.name || "Chưa phân công"}
      </button>

      {open && (
        <div className="absolute z-[100] top-full mt-1 w-64 bg-white rounded-md shadow-xl p-2">
          <input
            placeholder="Tìm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border text-primary rounded px-2 py-1 text-sm mb-2"
          />

          <div className="max-h-48 custom-scroll overflow-y-auto space-y-1">
            {filtered.map((o) => (
              <div
                key={o.id}
                onClick={() => {
                  onChange(o.id);
                  setOpen(false);
                  setKeyword("");
                }}
                className={`px-2 py-1 rounded text-sm text-gray-600 cursor-pointer
                  ${value === o.id
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"}
                `}
              >
                <div>{o.name}</div>
                {o.email && (
                  <div className="text-xs opacity-60">{o.email}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
