import './resizable.css';
import { ResizableBox } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

export const Resizable: React.FC<ResizableProps> = ({
  direction,
  children,
}) => {
  return (
    <ResizableBox height={300} width={Infinity} resizeHandles={["s"]}>
      {children}
    </ResizableBox>
  );
};
