"use client"
import dynamic from "next/dynamic";
import { useMemo } from "react";

// Importing styles
import "react-quill/dist/quill.snow.css";

const DynamicQuill = dynamic(() => {
  const reactQuill = import("react-quill");
  reactQuill.then(q => {
    // TODO we need image support
  });
  return reactQuill;
}, { ssr: true });

export type EditorProps = {
  onFocus: () => void,
  onBlur: () => void,
  onChange: (value: string) => void,
  value: string,
  disabled?: boolean,
}

export const Editor = ({ value = "", onFocus, onBlur, onChange, disabled = false }: EditorProps) => {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", /*"image"*/],
          ["clean"],
        ],
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  return (
    <DynamicQuill
      theme="snow"
      value={value}
      formats={formats}
      modules={modules}
      onChange={(value: any) => onChange(value)}
      onFocus={onFocus}
      onBlur={onBlur}
      readOnly={disabled}
    />
  );
};