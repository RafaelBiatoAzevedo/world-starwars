import { FC } from 'react';

import { Wrapper, Icon } from './styles';

import { ImTable } from 'react-icons/im';
import { RiSlideshowLine } from 'react-icons/ri';
import { useModeView } from '../../../../hooks/modeView';

export const ModeView: FC = () => {
  const { modeView, changeModeView } = useModeView();

  const handleChangeView = (mode: 'table' | 'show'): void => {
    changeModeView(mode);
  };

  return (
    <Wrapper>
      <Icon
        onClick={() => handleChangeView('show')}
        isActive={modeView.mode === 'show'}
      >
        <RiSlideshowLine />
      </Icon>
      <Icon
        onClick={() => handleChangeView('table')}
        isActive={modeView.mode === 'table'}
      >
        <ImTable />
      </Icon>
    </Wrapper>
  );
};
