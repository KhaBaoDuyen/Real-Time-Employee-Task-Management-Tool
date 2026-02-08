import { forwardRef } from "react";

type Props = {
    index: number;
    register: any;
    error?: any;
};

export const OtpInput = forwardRef<HTMLInputElement, Props>(
  ({ index, register, error }, ref) => {

    const {
      onChange,
      ...rest
    } = register(`code.${index}`);

    const moveNext = (el: HTMLInputElement) => {
      const next = el.nextElementSibling as HTMLInputElement;
      next?.focus();
    };

    const movePrev = (el: HTMLInputElement) => {
      const prev = el.previousElementSibling as HTMLInputElement;
      prev?.focus();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      if (!/^\d?$/.test(val)) return;

      if (val) moveNext(e.target);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !e.currentTarget.value) {
        movePrev(e.currentTarget);
      }
    };

    return (
      <input
        ref={ref}
        maxLength={1}
        inputMode="numeric"
        className={`otp-input w-12 h-12 text-lg font-semibold text-center border rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : ""}`}
        {...rest}
        onChange={(e) => {
          onChange(e);    
          handleChange(e);
        }}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

OtpInput.displayName = "OtpInput";
