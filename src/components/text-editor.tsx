import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useState, useRef } from "react";
import "./text-editor.css";
const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [textValue, setTextValue] = useState("# header");
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
      <div className="text-editor" ref={editRef}>
        <MDEditor
          value={textValue}
          onChange={(val) => {
            setTextValue(val || "");
          }}
        />
      </div>
    );
  }
  return (
    <div
      className="text-editor card"
      onClick={() => {
        setEditing(true);
      }}
    >
      <div className="card-content">
        <MDEditor.Markdown source={textValue} />
      </div>
    </div>
  );
};

export default TextEditor;
