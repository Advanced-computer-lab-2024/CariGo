import '../styles/index.css';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

const Activity=({id, img, title,tags, description, path })=>{

  return (
    <Box 
    sx={{
      width : '60vw',
      height:'400px',
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: 2 
      }}>
    <Grid container spacing={2}  >
      <Grid  size ={8}  
      sx={{
        backgroundColor: 'aquamarine',
        Width: '500px',
        Height: '250px'
        }}>
        <img 
          src={img} 
          alt={title} 
          style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px' }} 
        />
      </Grid>
      <Grid item  sx={{}}>
        <h3 style={{ fontSize: '18px', color: '#126782' }}>{title}</h3>
        <div style={{ marginBottom: '10px' }}>

          {tags.map((tag, index) => (
            <span key={index} style={{
              backgroundColor: 'rgba(16, 32, 25, 0.375)',
              padding: '2px 4px',
              marginRight: '5px',
              borderRadius: '5px',
              color: 'white',
              fontSize: '12px',
              fontWeight: 600
            }}>
              {tag}
            </span>

          ))}
        </div>
        <p>{description}</p>
      </Grid>
    </Grid>
    </Box>
  );
};




































































// import {Link} from "react-router-dom";


// const Activity=({id, img, title,tags, description, path })=>{
//   return (
//     <div className="card" key={id}>
//       {/* <Link to={`/${path}/${id}`}> */}
        
//         <div className="card-content">
//         <img src={img} />
//           <div className="brief">
//           <h3>{title}</h3>
//           <div className="tags">
//           {tags.map((tag, index) => (
//             <span className="tag" key={index}>
//               {tag}
//             </span>
//           ))}
//           </div>
//           </div>
//           <p>{description}</p>
//         </div>
//       {/* </Link> */}
//     </div>
//   )

// };

export default Activity;