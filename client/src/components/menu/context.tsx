import { createContext, ReactNode, useContext, useState } from "react";

interface Menu {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const MenuContext = createContext<Menu | null>(null);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context == null) {
    throw new Error("MenuContainer deve ser instanciado dentro de MenuProvider");
  }
  return context;
};

export function MenuProvider({ children }: { children: ReactNode }): ReactNode {
  const [menuVisible, setMenuVisible] = useState(true);
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const setVisible = (visible: boolean) => {
    setMenuVisible(visible);
  };

  const setCollapsed = (collapsed: boolean) => {
    setMenuCollapsed(collapsed);
  };

  return (
    <MenuContext.Provider value={{ visible: menuVisible, setVisible, collapsed: menuCollapsed, setCollapsed }}>
      {children}
    </MenuContext.Provider>
  );
}
