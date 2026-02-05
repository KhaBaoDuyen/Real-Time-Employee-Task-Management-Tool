type Primitive = string | number | boolean

type SwitchOption<T extends Primitive> = {
  label: string
  value: T
}

type SwitchProps<T extends Primitive> = {
  label: string
  value: T
  onChange: (value: T) => void
  options: [SwitchOption<T>, SwitchOption<T>]
}

export default function Switch<T extends Primitive>({
  label,
  value,
  onChange,
  options
}: SwitchProps<T>) {

  const [left, right] = options

  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold text-accent-600">{label}</span>

      <div className="flex rounded-xl bg-gray-200 p-1 w-fit">
        {[left, right].map((opt) => (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-4 py-1 rounded-lg text-sm font-semibold transition
              ${value === opt.value
                ? "bg-white shadow text-accent-600"
                : "text-gray-500"}
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
