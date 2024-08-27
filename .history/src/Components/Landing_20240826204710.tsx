import React from 'react'

const Landing = () => {
  return (
    <div className=' w-full h-screen overflow-hidden relative'>
               {/* this is the nav-bar */}
               <nav>
                              <div className='menu-btn'>
                                             <h1>menu</h1>
                              </div>
                              <div className='logo'>
                                             <h1>NikoChan</h1>
                              </div>
                              <div className='local-time'>
                                             <h1>ON 3:45PM</h1>
                              </div>
               </nav>
               {/* this is the footer */}
               <div className='footer fixed bottom-0 '>
                              <p>watch Showreel</p>
                              <p>Collection 2024</p>
               </div>
               {/* this is the section that contains all the items name */}
               <div className='items'>
                              <div className="item">
                                <p>item name</p>
                              </div>
                              <div className="item">
                                <p>item name</p>
                              </div>
                              <div className="item">
                                <p>item name</p>
                              </div>
                              <div className="item">
                                <p>item name</p>
                              </div>
                              <div className="item">
                                <p>item name</p>
                              </div>
                              <div className="item">
                                <p>item name</p>
                              </div>
                              <div className="item">
                                <p>item name</p>
                              </div>
                              <div className="item">
                                <p>item name</p>
                              </div>
                              <div className="item">
                                <p>item name</p>
                              </div>
                              <div className="item">
                                <p>item name</p>
                              </div>
                              <div className="item">
                                <p>item name</p>
                              </div>
    
               </div>


                <div className='preview-bg'>
                  <img src="" alt="" />
                </div>

    </div>

  )
}

export default Landing