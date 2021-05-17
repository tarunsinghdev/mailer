import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import DashboardScreen from './screens/DashboardScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  const { adminInfo } = useSelector((state) => state.adminLogin);

  return (
    <BrowserRouter>
      <Route component={Header} />
      <main className="py-3">
        <Switch>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/admin/login" component={LoginScreen} exact />
          {adminInfo.email && (
            <Route path="/admin/dashboard" component={DashboardScreen} exact />
          )}
          <Redirect from="/" to="/" />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
