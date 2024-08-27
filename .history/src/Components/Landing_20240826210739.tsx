import React from 'react'
import img from "../assets/first.jpg"

const Landing = () => {
  return (
    <div className=' w-full h-screen f1 overflow-hidden fixed text-white px-10'>
               {/* this is the nav-bar */}
               <nav className='w-full fixed flex items-center bg-black justify-around'>
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
               <div className='footer fixed bottom-0 text-xl flex items-center justify-between w-full '>
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
                  <img className='w-full h-full object-cover ' src={img} alt="not showign" />
                </div>

    </div>

  )
}

export default Landing