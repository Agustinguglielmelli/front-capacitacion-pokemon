import { Popover, PopoverTrigger, PopoverContent } from "./popover"

export function SortPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="w-32 h-10 rounded-full bg-white text-red-500 font-bold hover:bg-gray-100 flex items-center justify-center">
                    Sort by
                </button>
            </PopoverTrigger>

            <PopoverContent className="w-32 p-2">
                <div className="flex flex-col space-y-2">
                    <button
                        className="w-full text-left px-2 py-1 rounded hover:bg-gray-100"
                        onClick={() => console.log("Sort by Name")}
                    >
                        Name
                    </button>
                    <button
                        className="w-full text-left px-2 py-1 rounded hover:bg-gray-100"
                        onClick={() => console.log("Sort by Type")}
                    >
                        Type
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
