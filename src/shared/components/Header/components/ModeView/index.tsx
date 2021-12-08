import { FC } from 'react';

import { RiSlideshowLine } from 'react-icons/ri';
import { IoMdHome } from 'react-icons/io';
import { ImTable } from 'react-icons/im';

import { useModeView } from '~/hooks/modeView';

import { Wrapper, Icon, LinkBack } from './styles';

export const ModeView: FC = () => {
  const { modeView, changeModeView } = useModeView();

  const handleChangeView = (mode: 'table' | 'show'): void => {
    changeModeView(mode);
  };

  return (
    <Wrapper>
      <LinkBack to="/">
        <Icon isActive>
          <IoMdHome />
        </Icon>
      </LinkBack>
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
