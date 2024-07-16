import React from 'react';


export default function SideBar() {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
        <>
  
        {!isOpen ? 
        (<button className="fixed  z-30 flex items-center cursor-pointer right-3 top-6 mt-0" onClick={() => setIsOpen(!isOpen)}>
    <svg
        
      className=""
      fill="#2563EB"
      viewBox="0 0 100 80"
      width="20"
      height="20"
    >
      <rect width="100" height="10"></rect>
      <rect y="30" width="100" height="10"></rect>
      <rect y="60" width="100" height="10"></rect>
    </svg>
        </button>) :
        ( 
            <button className="text-xl text-white fixed top-4   bg-black "onClick={()=> setIsOpen(!isOpen)}>
                X
                </button>
    
    )
    } 
       <div className={`top-0 right-0 fixed bg-blue-500 w-[15vw] h-full p-10
       ${isOpen ? 'translate-x-0':'translate-x-full'} ease-in-out duration-300`}
       >
            <h2 className="text-2xl text-white">Side Bar</h2>
            <div className="">
                <ul className="text-white">
                    <li>Home</li>
                    <li>Games</li>
                    <li>Categories</li>
                    <li>Logout</li>
                </ul>
            </div>
          
        </div>
        </>
    )
} 
