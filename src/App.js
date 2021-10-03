import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home.pages';
import Detail from './pages/Detail.pages';
import Add from './pages/Add.pages';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/card/add" component={Add} />
          <Route path="/card/:id" component={Detail} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
