
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route component={Layout} />
        </Switch>
      </Router>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
