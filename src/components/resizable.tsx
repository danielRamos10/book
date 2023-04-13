import { useEffect } from "react";
import "./resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

export const Resizable: React.FC<ResizableProps> = ({
  direction,
  children,
}) => {
  let resizableOpts: ResizableBoxProps;
  useEffect(() => {
    const listener = () => {
      console.log(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);
  if (direction === "horizontal") {
    resizableOpts = {
      className: "resize-horizontal",
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ["e"],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      minConstraints: [window.innerWidth * 0.2, Infinity],
    };
  } else {
    resizableOpts = {
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, 24],
    };
  }
  return <ResizableBox {...resizableOpts}>{children}</ResizableBox>;
};
