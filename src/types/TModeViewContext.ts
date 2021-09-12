import TModeView from './TModeView';

type TModeViewContext = {
  modeView: TModeView;
  changeModeView: (mode: 'show' | 'table') => void;
};

export default TModeViewContext;
