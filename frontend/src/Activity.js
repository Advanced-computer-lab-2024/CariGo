import './styles/index.css';
import {Link} from "react-router-dom";


const Activity=({id, img, title, description, path })=>{
  return (
    <div className="card" key={id}>()
      {/* <Link to={`/${path}/${id}`}> */}
        <img src={img} />
        <div className="card-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      {/* </Link> */}
    </div>
  )

};

export default Activity;