interface SearchProps {
    width?: string;
    showOnMobile?: boolean;
    type?: string;
    showIcon?: boolean;
}

export const Search = ({
    width = "lg:w-5/12",
    showOnMobile = false,
    type = "solid",
    showIcon = true,
}: SearchProps) => {
    return (
        <div
            className={`
        ${showOnMobile ? "flex" : "hidden"}
        lg:flex
        ${width}
        ${type === "solid" ? "bg-white" : ""}
        ${type === "outline" ? "border-2 border-accent-600" : ""}
        items-center
        bg-white/10
        rounded-4xl
        px-3
        pr-0
        w-full
      `}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-300"
            >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
                type="text"
                className="p-2 w-full bg-transparent text-white placeholder:text-gray-300 outline-none
                 border-none "
                placeholder="Tìm kiếm..."
            />
            {
                showIcon && (
                    <button
                        className="
                        bg-accent-600
                        min-w-max
                        px-4
                        py-2
                        rounded
                        text-white
                        ml-2
                        hover:bg-accent-700
                        flex
                        items-center
                        gap-2
                    " >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 lg:hidden"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>

                        <span className="hidden lg:inline">Tìm kiếm</span>
                    </button>
                )
            }


        </div>
    );
};
