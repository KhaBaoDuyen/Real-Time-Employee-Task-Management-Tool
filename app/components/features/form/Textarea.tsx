import { forwardRef } from "react";

type TextareaProps = {
    label?: string;
    error?: any;
    className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, id, className = "", ...props }, ref) => {
        return (
            <div className="flex flex-col gap-2">
                {label && (
                    <label
                        htmlFor={id}
                        className="font-bold text-accent-700"
                    >
                        {label}
                    </label>
                )}

                <textarea
                    ref={ref} 
                    id={id}
                    {...props}
                    className={`
                        border rounded-lg px-3 py-2 w-full
                        min-h-[100px]
                        resize-y
                        focus:outline-none focus:ring-2 focus:ring-orange-500
                        ${error ? "border-red-500" : "border-gray-300"}
                        ${className}
                    `}
                />

                {error && (
                    <p className="text-sm text-red-500">
                        {error.message}
                    </p>
                )}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";
