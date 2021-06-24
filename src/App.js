
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route component={Layout}/>
          </Switch>
      </Router>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
