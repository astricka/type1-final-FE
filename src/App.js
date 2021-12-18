import './App.css';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';
import { Switch, Route } from 'react-router-dom';
import UpdatePage from './pages/UpdatePage';

function App() {
  return (
    <div className="App">
        <Toaster />
        <Switch>
            <Route path={'/updateUser/:userId'}>
                <UpdatePage />
            </Route>
            <Route exact path={'/'}>
                <HomePage />
            </Route>
        </Switch>
    </div>
  );
}

export default App;
