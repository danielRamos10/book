import ReactDOM from "react-dom/client";
import { useState } from "react";
import React from "react";
import CodeEditor from "./components/code-editor";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import Preview from "./components/preview";
import bundle from "./bundler";

const App = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="console.log(123);"
        onChange={(value) => {
          setInput(value);
        }}
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
