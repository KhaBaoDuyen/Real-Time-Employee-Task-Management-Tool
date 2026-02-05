import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

type Props = {
    name: string
    label?: string
    required?: boolean
    maxFiles?: number
    maxSizeMB?: number
}

export const ImageUpload = ({
    name,
    label,
    required = false,
    maxFiles = 5,
    maxSizeMB = 2
}: Props) => {
    const {
        register,
        setValue,
        watch,
        setError,
        clearErrors,
        formState: { errors }
    } = useFormContext()

    const [previews, setPreviews] = useState<string[]>([])

    const raw = watch(name)

    const files: any[] =
        raw instanceof FileList
            ? Array.from(raw)
            : Array.isArray(raw)
                ? raw
                : []

    //PREVIEW
    useEffect(() => {
        if (!files.length) {
            setPreviews([])
            return
        }

        const urls = files
            .map((item) => {
                if (typeof item === "string") return item
                if (item?.url) return item.url
                if (item instanceof File) return URL.createObjectURL(item)
                return null
            })
            .filter(Boolean) as string[]

        setPreviews(urls)

        return () => {
            urls.forEach((u) => {
                if (u.startsWith("blob:")) URL.revokeObjectURL(u)
            })
        }
    }, [files])

    //VALIDATION 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileArray = Array.from(e.target.files || [])

        clearErrors(name)

        // max files
        if (fileArray.length > maxFiles) {
            setError(name, {
                message: `Chỉ được tối đa ${maxFiles} ảnh`
            })
            return
        }

        for (const file of fileArray) {
            // only image
            if (!file.type.startsWith("image/")) {
                setError(name, { message: "Chỉ cho phép file ảnh" })
                return
            }

            // size
            if (file.size > maxSizeMB * 1024 * 1024) {
                setError(name, {
                    message: `Ảnh phải nhỏ hơn ${maxSizeMB}MB`
                })
                return
            }
        }

        setValue(name, fileArray, { shouldDirty: true })
    }

    //REMOVE
    const removeImage = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index)
        setValue(name, newFiles, { shouldDirty: true })

        if (required && newFiles.length === 0) {
            setError(name, { message: "Vui lòng chọn ảnh" })
        }
    }


    const { onChange, ...rest } = register(name, {
        validate: (value) => {
            if (required && (!value || value.length === 0)) {
                return "Vui lòng chọn ảnh"
            }
            return true
        }
    })


    return (
        <div className="space-y-3">
            {label && <p className="font-semibold">{label}</p>}

            <input
                type="file"
                multiple
                accept="image/*"
                {...rest}
                onChange={(e) => {
                    onChange(e)
                    handleChange(e)
                }}
                className="block w-full border p-5 rounded-xl border-dashed"
            />

            {errors[name] && (
                <p className="text-sm text-red-500">
                    {String(errors[name]?.message)}
                </p>
            )}

            <div className="grid grid-cols-4 gap-3">
                {previews.map((src, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={src}
                            className="h-24 w-full object-cover rounded-lg border"
                        />

                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
