import React from 'react'
import img from "../assets/first.jpg"

const Landing = () => {
  return (
    <div className=' w-full h-screen f1 overflow-hidden fixed text-white '>
               {/* this is the nav-bar */}
               <nav className='w-full fixed px-10 flex items-center  justify-around'>
                              <div className='menu-btn w-fit bg-black/10 rounded-[40px] backdrop-blur-[20px] px-[6px] py-[12px]'>
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
               <div className='footer fixed px-10 bottom-0 text-xl flex items-center justify-between w-full '>
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