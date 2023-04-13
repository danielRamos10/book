import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useState, useRef } from "react";

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const editRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const editingListener = (e: MouseEvent) => {
      if (
        editRef.current &&
        e.target &&
        editRef.current.contains(e.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", editingListener, { capture: true });
    return () => {
      document.removeEventListener("click", editingListener);
    };
  }, []);

  if (editing) {
    return (
      <div ref={editRef}>
        <MDEditor />
      </div>
    );
  }
  return (
    <div
      onClick={() => {
        setEditing(true);
      }}
    >
      <MDEditor.Markdown source={"# header"} />
    </div>
  );
};

export default TextEditor;
