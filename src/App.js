import './App.css';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
        <Toaster />
      <HomePage />
    </div>
  );
}

export default App;
