import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useState, useRef } from "react";
import "./text-editor.css";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const editRef = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

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
          value={cell.content}
          onChange={(val) => {
            updateCell(cell.id, val || "");
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
        <MDEditor.Markdown source={cell.content || 'Click to edit.'} />
      </div>
    </div>
  );
};

export default TextEditor;
