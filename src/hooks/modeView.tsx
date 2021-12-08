import {
  FC,
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';

import { IContextModeView } from '~/interfaces/IContextModeView';

import { TModeView } from '../types/TModeView';

const ModeViewContext = createContext<IContextModeView>({} as IContextModeView);

const ModeViewProvider: FC = ({ children }) => {
  const [modeView, setModeView] = useState<TModeView>({ mode: 'show' });

  const changeModeView = useCallback((mode: 'show' | 'table'): void => {
    setModeView({ mode });
  }, []);

  const valueContext = useMemo(
    () => ({ modeView, changeModeView }),
    [modeView, changeModeView]
  );

  return (
    <ModeViewContext.Provider value={valueContext}>
      {children}
    </ModeViewContext.Provider>
  );
};

function useModeView(): IContextModeView {
  return useContext(ModeViewContext);
}

export { ModeViewProvider, useModeView };
