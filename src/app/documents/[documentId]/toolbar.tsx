"use client";

import { LucideIcon, Undo2Icon, Redo2Icon, BoldIcon, ItalicIcon, RemoveFormatting, Table, Strikethrough, Code, Superscript, Subscript, Highlighter, Printer, SpellCheck, SeparatorHorizontal, SquareCheckBig, Underline} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";

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
            },
            {
                label: "Redo",
                icon: Redo2Icon,
                onClick: () => editor?.chain().focus().redo().run(),
            },
            {
                label: "Bold",
                icon: BoldIcon,
                onClick: () => editor?.chain().toggleBold().run(),
                isActive: editor?.isActive("bold"),
            },
            {
                label: "Italic",
                icon: ItalicIcon,
                onClick: () => editor?.chain().toggleItalic().run(),
                isActive: editor?.isActive("italic"),
            },
            {
                label: "Underline",
                icon: Underline,
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
                isActive: editor?.isActive("underline"),
            },
            {
                label: "Strikethrough",
                icon: Strikethrough,
                onClick: () => editor?.chain().focus().toggleStrike().run(),
                isActive: editor?.isActive("strikeThrough"),
            },
            {
                label: "Code",
                icon: Code,
                onClick: () => editor?.chain().toggleCode().run(),
                isActive: editor?.isActive("code"),
            },
            {
                label: "Superscript",
                icon: Superscript,
                onClick: () => editor?.chain().focus().toggleSuperscript().run(),
                isActive: editor?.isActive("superscript"),
            },
            {
                label: "Subscript",
                icon: Subscript,
                onClick: () => editor?.chain().focus().toggleSubscript().run(),    
                isActive: editor?.isActive("subscript"),
            },            
            {
                label: "Highlight",
                icon: Highlighter,
                onClick: () => editor?.chain().focus().toggleHighlight().run(),
                isActive: editor?.isActive("highlight", ),
            },
            {
                label: "Clear Formatting",
                icon: RemoveFormatting,
                onClick: () => editor?.chain().focus().clearNodes().run(),
            },
            {
                label: "Insert Table",
                icon: Table,
                onClick: () => editor?.chain().focus().insertTable().run(),
            },
            {
                label: "Insert Horizontal Rule",
                icon: SeparatorHorizontal,
                onClick: () => editor?.chain().focus().setHorizontalRule().run(),
            },
            {
                label: "Insert Bullet List",
                icon: SquareCheckBig,
                onClick: () => editor?.chain().focus().toggleBulletList().run(),
            },
            {
                label: "Print",
                icon: Printer,
                onClick: () => window.print(),
            },
            {
                label: "Spell Check",
                icon: SpellCheck,
                onClick: () => {
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
            }
        }
        ],
    ];

    return (
        <div className="bg-[#d2d7d7] px-2.5 py-0.5 min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto place-content-center toolbar">
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
        </div>
    );
};
