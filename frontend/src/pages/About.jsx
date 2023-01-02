
function About() {
   

  return (
    <>
    <nav >
        <div className='navbar-content'>
            <div  >  
               <a href="/"><img alt='logo'  src='./images/logo.png'></img> </a>  
            </div>      
        </div>
      </nav>
      <div className="showcase">
        <div style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems: "center"}}>
            <h1>Something went wrong!</h1>
            <a className="link" href="/">Click here</a>
        </div>
    </div>
      <footer>
        <div className='footer-content'>
           <p>Copyright@2023 All Rights Reserved</p>
        </div>
    </footer>
    </>
  )
}

export default About