import React from 'react'
import {
  Route,
  Router,
  Switch
} from 'react-router'
import history from './components/history'
import BottomBar from './pages/bottomBar'
import Site from './pages/site'
import EndSite from './pages/endsite'
import Train from './pages/train'
import Login from './pages/login'
import User from './pages/user'
import Pay from './pages/pay'
const router = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={BottomBar} />
      <Route exact path="/serve" component={BottomBar} />
      <Route exact path="/record" component={BottomBar} />
      <Route exact path="/my12306" component={BottomBar} />
      <Route exact path="/site" component={Site} />
      <Route exact path="/endsite" component={EndSite} />
      <Route exact path="/train" component={Train} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/user" component={User} />
      <Route exact path="/pay" component={Pay} />
    </Switch>
  </Router>
);

export default router;
