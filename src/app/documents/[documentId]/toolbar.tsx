"use client";

import { LucideIcon, Undo2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store"; // Correct import statement
interface ToolbarButtonProps  {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
}: ToolbarButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-nuetral-200/80",
                isActive && "bg-neutral-200/80"
            )}
        >
            <Icon size={16} />
        </button>
    )
}

export const Toolbar: React.FC = () => {
    const { editor } = useEditorStore();

    console.log("Toolbar editor: ", { editor });


    const sections: {
        label: string;
        icon: LucideIcon;
        onClick?: () => void;
        isActive?: boolean;
    }[][] = [
        [
            {
                label: "Undo",
                icon: Undo2Icon,
                onClick: () => editor?.chain().focus().undo().run(),
            }
        ]
    ];

    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
        </div>
    );
};
