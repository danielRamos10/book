import { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  bundlingStatus:string;
}
const html = `
<html>
<head>
<style>
html{
  background-color: white;
}
</style>
</head>
<body>
  <div id="root"></div>
  <script>
  const handleError = (err) =>{
    const root = document.querySelector('#root');
      root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
      console.error(err);
  };
  window.addEventListener('error', (e)=>{
    event.preventDefault();
    handleError(event.error);
  });
  window.addEventListener('message', (event) =>{
    try{
      eval(event.data);
    }catch(err){
      handleError(err);
    }
  }, false);
  </script>
</body>
</html>
`;
const Preview: React.FC<PreviewProps> = ({ code, bundlingStatus }) => {
  const iframeRef = useRef<any>();
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview-window"
        ref={iframeRef}
        srcDoc={html}
        sandbox="allow-scripts"
      />
      {bundlingStatus && <div className="preview-err">{bundlingStatus}</div>}
    </div>
  );
};
export default Preview;
