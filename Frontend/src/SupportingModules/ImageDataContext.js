import { createContext } from "react";


// ImageDataContext allows modules to call ImageData directly,
// without convoluted props lineages. See React Docs:
// https://react.dev/reference/react/useContext#usecontext
const ImageDataContext = createContext(null);

export default ImageDataContext;
