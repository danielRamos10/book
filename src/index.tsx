import * as esbuild from "esbuild-wasm";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import React from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
    console.log(service);
  };
  useEffect(() => {
    startService();
  }, []);
  const onClick = () => {
    console.log("clicked");
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
