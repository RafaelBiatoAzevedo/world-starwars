import { FC } from 'react';
import { Switch, Route } from 'react-router';
import { Home } from '../pages/Home';

export const Routes: FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/planets-starwars" component={Home} />
    </Switch>
  );
};
