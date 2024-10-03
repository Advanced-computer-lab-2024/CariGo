//import './styles/App.css';
import './styles/index.css';
import Activity from './Activity';
import Navbar from './Navbar';

function App() {
  return (
    <div className="container">
      <Navbar/>
      <Activity
      id={'29148012'}
      title={'Activity Title'}
      description={'Description of the activity'}
      img = {"./The Great Wall of China _ National Geographic….jpeg"}
      />
     
    </div>
  );
}

export default App;
