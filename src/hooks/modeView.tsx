import { FC, createContext, useState, useContext } from 'react';
import TModeView from '../types/TModeView';
import TModeViewContext from '../types/TModeViewContext';

const ModeViewContext = createContext<TModeViewContext>({} as TModeViewContext);

const ModeViewProvider: FC = ({ children }) => {
  const [modeView, setModeView] = useState<TModeView>({ mode: 'show' });

  const changeModeView = (mode: 'show' | 'table'): void => {
    setModeView({ mode });
  };

  return (
    <ModeViewContext.Provider value={{ modeView, changeModeView }}>
      {children}
    </ModeViewContext.Provider>
  );
};

function useModeView() {
  return useContext(ModeViewContext);
}

export { ModeViewProvider, useModeView };
