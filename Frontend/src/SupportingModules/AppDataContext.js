import { createContext } from "react";


// AppDataContext allows modules to call AppData directly,
// without convoluted props lineages. See React Docs:
// https://react.dev/reference/react/useContext#usecontext
const AppDataContext = createContext(null);

export default AppDataContext;
