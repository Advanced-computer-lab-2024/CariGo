// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';

// export default function BasicMenu() {

//     const [sortOption, setSortOption] = useState('');

//   const [anchorEl, setAnchorEl] = React.useState(null);
  
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

  
//   const handleSortChange = (event) => {
//     setSortOption(event.target.value);
//   };

// //   useEffect(() => {
//     // Fetch activities with sort query when the sortOption changes
//     // const fetchSortedActivities = async () => {
//     //     try {
//     //       const response = await fetch(`http://localhost:4000/cariGO/activity?sort=${sortOption}`);
//     //       const data = await response.json();
//     //       setActivities(data);
//     //     } catch (error) {
//     //       console.error('Error fetching activities:', error);
//     //     }
//     //   };
  
//     //   if (sortOption) {
//     //     fetchSortedActivities();
//     //   }
//     // }, [sortOption]);


//   return (
//     <div>
//       <Button
//         id="basic-button"
//         aria-controls={open ? 'basic-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         Sort By
//       </Button>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           'aria-labelledby': 'basic-button',
//         }}
//         onchange={handleSortChange}
//       >
//         <MenuItem onClick={handleClose}>price</MenuItem>
//         <MenuItem onClick={handleClose}>review</MenuItem>
//         <MenuItem onClick={handleClose}>date</MenuItem>
//       </Menu>
//     </div>
//   );
// }
