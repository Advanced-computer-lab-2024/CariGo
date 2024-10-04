//import './styles/App.css';
import './styles/index.css';
import Activity from './components/Activity';
import Navbar from './Navbar';
import ActivityGrid from './components/ActivityGrid';
import ActivityPost from './components/ActivityPost';

let tags=["tag1","tag2","tag3","tag3","tag1","tag2","tag3","tag3"];
let activities=[
  {
    id:'29148012',
    title:'Activity Title',
    tags:tags,
    description: 'Description of the activity',
    img :"/0ae1e586-0d84-43c3-92d4-924c13c01059.jpeg"},
  {
    id:'29148012',
    title:'Activity Title',
    tags:tags,
    description: 'Description of the activity',
    img :"/0ae1e586-0d84-43c3-92d4-924c13c01059.jpeg"
  },
  {
    id:'29148012',
    title:'Activity Title',
    tags:tags,
    description: 'Description of the activity',
    img :"/0ae1e586-0d84-43c3-92d4-924c13c01059.jpeg"
  }
];
function App() {
  return (
    <div className="container">
      <Navbar/>
      {/* <Activity 
     id={'29148012'}
     title= {'Activity Title'}
     tags={tags}
     description={'Description of the activity'}
     img ={"/0ae1e586-0d84-43c3-92d4-924c13c01059.jpeg"}
     /> */}

     <ActivityPost
     title= {'Activity Title'}
     tags={tags}
     description={'Description of the activity Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
     img ={"/0ae1e586-0d84-43c3-92d4-924c13c01059.jpeg"}
     />
    </div>
  );
}

export default App;
