import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

type InputProp = {
    label?: string;
    error?: any;
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProp>(
    ({ label, error, className = "", id, ...props }, ref) => {
        return (
            <div>
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-md font-bold text-accent-600 mb-2">
                        {label}
                    </label>
                )}

                <input
                    ref={ref}
                    id={id}
                    {...props}
                    className={`
                        border rounded-lg px-3 py-2 w-full
                        ${error ? "border-red-500" : "border-gray-300"}
                        ${className}
                    `}
                />

                {error && (
                    <p className="text-sm text-red-500 mt-1">
                        {error.message}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
