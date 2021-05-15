import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import DashboardScreen from './screens/DashboardScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Switch>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/admin/login" component={LoginScreen} exact />
          <Route path="/admin/dashboard" component={DashboardScreen} exact />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
