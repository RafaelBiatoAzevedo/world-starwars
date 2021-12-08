import { FC } from 'react';

import { useHistory } from 'react-router-dom';

import { useTheme } from 'styled-components';

import headerImage from '~/shared/assets/images/planets.jpg';
import { useModeView } from '~/hooks/modeView';

import { SearchPlanet } from './components/SearchPlanet';
import { ModeView } from './components/ModeView';

import { Wrapper, Image } from './styles';

import { Text } from '../Text';

type THeader = {
  title: string;
  renderModeView?: boolean;
};

export const Header: FC<THeader> = ({ title, renderModeView = false }) => {
  const { colors, fontWeight } = useTheme();
  const history = useHistory();
  const { modeView } = useModeView();

  return (
    <Wrapper>
      {renderModeView && <ModeView />}
      <Text
        color={colors.secondary}
        title={title}
        size="3.2rem"
        weight={fontWeight.bold}
        fontFamily="StarJedi"
      />
      <Image src={headerImage} alt="planets" />
      <Text
        color={colors.secondary}
        title="STAR WARS"
        size="3.2rem"
        weight={fontWeight.bold}
        fontFamily="StarJedi"
      />
      {history.location.pathname !== '/' && modeView.mode === 'table' && (
        <SearchPlanet />
      )}
    </Wrapper>
  );
};

Header.defaultProps = {
  renderModeView: undefined,
};
