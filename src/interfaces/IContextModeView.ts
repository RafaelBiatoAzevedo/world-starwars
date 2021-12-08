import { TModeView } from '~/types/TModeView';

export interface IContextModeView {
  modeView: TModeView;
  changeModeView: (mode: 'show' | 'table') => void;
}
