import type {ButtonProps} from "./button.type";

export const Button = ({
  children,
  icon,
  iconPosition = "right",
  variant = "solid",
  color = "primary",
  colorText ="",
  className = "",
  onClick,
}: ButtonProps) => {

  const baseStyle =
    "px-5 py-2 w-full rounded-md flex items-center justify-center gap-3 font-medium transition-all duration-300";

 const variantStyle =
    variant === "solid"
      ? `bg-${color} !text-white hover:opacity-90`
      : `border border-${color} text-${colorText ? colorText : color} bg-transparent  hover:text-white`;

  return (
  <button
    onClick={onClick}
    className={`${baseStyle} ${variantStyle} ${className} group`}
  >
    {icon && iconPosition === "left" && (
      <span className="transition-transform duration-300 group-hover:-translate-x-1">
        {icon}
      </span>
    )}

     {children} 

    {icon && iconPosition === "right" && (
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        {icon}
      </span>
    )}
  </button>
);

};
