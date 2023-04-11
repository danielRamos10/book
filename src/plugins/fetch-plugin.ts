import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";
const fileCache = localforage.createInstance({
    name: "filecache",
  });

export const fetchPlugin = (inputCode:string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild){
        build.onLoad({ filter: /.*/ }, async (args: any) => {
            console.log("onLoad", args);
    
            if (args.path === "index.js") {
              return {
                loader: "jsx",
                contents: inputCode,
              };
            }
            //check to se if we have fetched file
            const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
              args.path
            );
    
            //if it is, return the result
            if (cachedResult) {
              return cachedResult;
            }
            const { data, request } = await axios.get(args.path);
            const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';
            const contents = fileType === 'css' ? 
            `const style = document.createElement('style');
            style.innerText = ' body { background-color: "red" } ';
            document.head.appendChild(style);
            `: data;
            const result: esbuild.OnLoadResult = {
              loader: contents,
              contents: data,
              resolveDir: new URL("./", request.responseURL).pathname,
            };
            await fileCache.setItem(args.path, result);
    
            return result;
          });

        }
    }
}