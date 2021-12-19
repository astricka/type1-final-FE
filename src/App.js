import './App.css';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';
import { Switch, Route } from 'react-router-dom';
import UpdatePage from './pages/UpdatePage';
import AddUserPage from './pages/AddUserPage';

function App() {
  return (
    <div className="App">
        <Toaster />
        <Switch>
            <Route path={'/addUser'}>
                <AddUserPage />
            </Route>
            <Route path={'/updateUser/:userId'}>
                <UpdatePage />
            </Route>
            <Route exact path={'/'}>
                <HomePage />
            </Route>
            <Route path='*'>
                <h2>Page does not exist</h2>
            </Route>
        </Switch>
    </div>
  );
}

export default App;
