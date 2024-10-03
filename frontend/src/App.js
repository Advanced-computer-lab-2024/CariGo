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
      img = {'../pictures/0ae1e586-0d84-43c3-92d4-924c13c01059.jpeg'}
      />
     
    </div>
  );
}

export default App;
