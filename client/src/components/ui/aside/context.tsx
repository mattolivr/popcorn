import { createContext, ReactNode, useContext, useState } from "react";

interface Aside {
  content?: ReactNode;
  setContent: (children: ReactNode) => void;
}

const AsideContext = createContext<Aside | null>(null);

export const useAside = () => {
  const context = useContext(AsideContext);
  if (context == null) {
    throw new Error("Aside deve ser instanciado dentro de AsideProvider");
  }
  return context;
};

export function AsideProvider({ children }: { children: ReactNode }): ReactNode {
  const [asideContent, setAsideContent] = useState<ReactNode>(null);

  return (
    <AsideContext.Provider value={{ content: asideContent, setContent: setAsideContent }}>
      {children}
    </AsideContext.Provider>
  );
}
