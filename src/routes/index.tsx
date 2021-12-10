import { FC } from 'react';

import { Switch, Route } from 'react-router-dom';

import { Vehicles } from '~/pages/Vehicles';
import { StarShips } from '~/pages/Starships';
import { Species } from '~/pages/Species';
import { Planets } from '~/pages/Planets';
import { Home } from '~/pages/Home';
import { Films } from '~/pages/Films';
import { Characters } from '~/pages/Characters';
import { Layout } from '~/layout';

export const Routes: FC = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/planets" component={Planets} />
        <Route exact path="/vehicles" component={Vehicles} />
        <Route exact path="/characters" component={Characters} />
        <Route exact path="/films" component={Films} />
        <Route exact path="/species" component={Species} />
        <Route exact path="/starships" component={StarShips} />
      </Switch>
    </Layout>
  );
};
