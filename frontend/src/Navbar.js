import './styles/index.css';

const Navbar =()=>{
    return(
    <header>
        {/* <!-- Header Start --> */}
            <div className="container">
                <div class="row align-items-center">
                    {/* <!-- Logo --> */}
                    
                        <div class="logo">
                            {/* <a href="index.html"><img src="assets/img/logo/logo.png" alt=""></a> */}
                        </div>
                    
                        <div>
                            {/* <!-- Main-menu --> */}
                            <div class="nav_links">
                            <nav style ={{ position: 'fixed', bottom :'0px' , right:'10px'}}>                                                                                                                                                  
                                <a href="index.js">Home</a>
                                <a href="Iteneraries.js">Iteneraries</a>
                                <a href="Activities.js">Activities</a>
                                <a href="Locations.js">Locations</a>
                                    {/* <ul class="submenu">
                                        <li><a href="blog.html">historical places</a></li>
                                        <li><a href="single-blog.html">museums</a></li>
                                    </ul>    */}
                            </nav>
                        </div>
                    </div>         
            </div>
            </div>
        
           
        {/* <!-- Header End --> */}
    </header>
    );
}


/*search bar code*/
{/* <div class="input-group rounded">
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <span class="input-group-text border-0" id="search-addon">
    <i class="fas fa-search"></i>
  </span>
</div> */}

export default Navbar