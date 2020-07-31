import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import ExplorePage from './pages/ExplorePage/ExplorePage';
import StudyPage from './pages/StudyPage/StudyPage';
import BgVideo from './components/BgVideo/BgVideo';

function App() {
  return (
    <div className="App">
      <Header />
      <BgVideo />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/explore" component={ExplorePage} />
        <Route exact path="/study" component={StudyPage} />
      </Switch>
    </div>
  );
}

export default App;
