//import './styles/App.css';
import './styles/index.css';
import Activity from './components/Activity';
import Navbar from './Navbar';
import ActivityGrid from './components/ActivityGrid';
import ActivityPost from './components/ActivityPost';
import { BrowserRouter,Route,Router,Routes } from 'react-router-dom';
import ActivityList from './components/ActivityListUser';
import ActivityPostAdvertiser from './components/ActivityPostAdvertiser';

function App() {
  return (
    <div className="App">
     
      <ActivityPostAdvertiser/>
      
    </div>
  );
}

export default App;
