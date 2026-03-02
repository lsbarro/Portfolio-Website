import { createContext, useContext, useState } from "react";

const ShellContext = createContext();

export const useShell = () => useContext(ShellContext);

export const ShellProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [destroyPhase, setDestroyPhase] = useState(null);

  return (
    <ShellContext.Provider
      value={{
        history,
        setHistory,
        commandHistory,
        setCommandHistory,
        destroyPhase,
        setDestroyPhase,
      }}
    >
      {children}
    </ShellContext.Provider>
  );
};
