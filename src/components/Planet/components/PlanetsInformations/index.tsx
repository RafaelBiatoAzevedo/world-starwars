import { FC } from 'react';
import TPlanet from '../../../../types/TPlanet';

import {
  Wrapper,
  WrapperContent,
  Content,
  Text,
  WrapperImage,
  Image,
} from './styles';

type TImages = {
  image1?: string;
  image2?: string;
};

type TPlanetInformation = {
  planet?: TPlanet;
  images?: TImages;
};

export const PlanetsInformations: FC<TPlanetInformation> = ({
  planet,
  images,
}) => {
  return (
    <Wrapper>
      <WrapperImage urlImage={images?.image1}></WrapperImage>
      {/* <Image src={images?.image1} alt={planet?.name} /> */}
      <WrapperContent>
        <Content>
          <Text className="title">Terreno</Text>
          <Text>{planet?.terrain}</Text>
        </Content>
        <Content>
          <Text className="title">Clima</Text>
          <Text>{planet?.climate}</Text>
        </Content>
        <Content>
          <Text className="title">Gravidade</Text>
          <Text>{planet?.gravity}</Text>
        </Content>
        <Content>
          <Text className="title">População</Text>
          <Text>{planet?.population}</Text>
        </Content>
        <Content>
          <Text className="title">Período Rotação</Text>
          <Text>{`${planet?.rotation_period} horas`}</Text>
        </Content>
        <Content>
          <Text className="title">Período orbital</Text>
          <Text>{`${planet?.orbital_period} dias`}</Text>
        </Content>
        <Content>
          <Text className="title">Diametro</Text>
          <Text>{`${planet?.diameter} Km`}</Text>
        </Content>
        <Content>
          <Text className="title">Água na superfície</Text>
          <Text>{`${planet?.surface_water} %`}</Text>
        </Content>
      </WrapperContent>
      {/* <Image src={images?.image2} alt={planet?.name} /> */}
      <WrapperImage urlImage={images?.image2}></WrapperImage>
    </Wrapper>
  );
};
