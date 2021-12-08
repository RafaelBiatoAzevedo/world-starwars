import { FC } from 'react';

import { Switch, Route } from 'react-router-dom';

import { Planets } from '~/pages/Planets';
import { Home } from '~/pages/Home';
import { Layout } from '~/layout';

export const Routes: FC = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/planets" component={Planets} />
      </Switch>
    </Layout>
  );
};
