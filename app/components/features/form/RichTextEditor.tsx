import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useRef } from "react";

 import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    Heading2,
    Image as ImageIcon,
    Undo2,
    Redo2,
    AlignLeft,
    AlignCenter
} from "lucide-react";

type Props = {
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
};

export const RichTextEditor = ({ label, value, onChange }: Props) => {
    const fileRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Image,
            Link,
            Placeholder.configure({
                placeholder: "Nhập mô tả sản phẩm...",
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: value || "",
        onUpdate({ editor }) {
            onChange?.(editor.getHTML());
        },
    });

    if (!editor) return null;

     const addImage = (file: File) => {
        const reader = new FileReader();

        reader.onload = () => {
            editor
                .chain()
                .focus()
                .setImage({
                    src: reader.result as string,
                    style: "max-width:100%;height:auto;border-radius:8px;margin:8px 0;",
                })
                .run();
        };

        reader.readAsDataURL(file);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) addImage(file);
    };

    const btn =
        "p-2 rounded hover:bg-gray-200 transition flex items-center justify-center";

    return (
        <div className="space-y-2">
            {label && (
                <p className="font-bold text-accent-600">{label}</p>
            )}

             <div className="flex flex-wrap gap-1 border p-2 rounded-md bg-gray-50">

                <button className={btn} onClick={() => editor.chain().focus().toggleBold().run()}>
                    <Bold size={16} />
                </button>

                <button className={btn} onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <Italic size={16} />
                </button>

                <button className={btn} onClick={() => editor.chain().focus().toggleUnderline().run()}>
                    <UnderlineIcon size={16} />
                </button>

                <button className={btn} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                    <Heading2 size={16} />
                </button>

                <button className={btn} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <List size={16} />
                </button>

                <button className={btn} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                    <ListOrdered size={16} />
                </button>

                <button className={btn} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
                    <AlignLeft size={16} />
                </button>

                <button className={btn} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
                    <AlignCenter size={16} />
                </button>

                <button className={btn} onClick={() => editor.chain().focus().undo().run()}>
                    <Undo2 size={16} />
                </button>

                <button className={btn} onClick={() => editor.chain().focus().redo().run()}>
                    <Redo2 size={16} />
                </button>

                <button className={btn} onClick={() => fileRef.current?.click()}>
                    <ImageIcon size={16} />
                </button>

                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                />
            </div>

             <div className="border rounded-md p-3 min-h-[220px] bg-white prose max-w-none">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};
