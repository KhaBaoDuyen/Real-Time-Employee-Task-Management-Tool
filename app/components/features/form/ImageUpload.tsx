import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
    name: string;
    label?: string;
    multiple?: boolean;  
};

export const ImageUpload = ({ name, label, multiple = false }: Props) => {
    const { setValue, watch, formState: { errors } } = useFormContext();

    const files: File[] = watch(name) || [];
    const [previews, setPreviews] = useState<string[]>([]);

    // preview
    useEffect(() => {
        if (!files.length) {
            setPreviews([]);
            return;
        }

        const urls = files.map(file => URL.createObjectURL(file));
        setPreviews(urls);

        return () => urls.forEach(u => URL.revokeObjectURL(u));
    }, [files]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = Array.from(e.target.files || []);
        setValue(name, selected, { shouldDirty: true });
    };

    const remove = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setValue(name, newFiles);
    };

    return (
        <div className="space-y-3">
            {label && <p className="font-semibold">{label}</p>}

            <input
                type="file"
                accept="image/*"
                multiple={multiple}
                onChange={handleChange}
                className="block w-full border p-5 rounded-xl border-dashed"
            />

            {errors[name] && (
                <p className="text-sm text-red-500">{String(errors[name]?.message)}</p>
            )}

            <div className="grid grid-cols-4 gap-3">
                {previews.map((src, index) => (
                    <div key={index} className="relative">
                        <img src={src} className="h-24 w-full object-cover rounded-lg border" />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
