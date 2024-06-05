import React from 'react';
import { logoutUser } from '../service/AuthService';
import { doLogout } from '../authService/auth';

const Navbar = () => {
    const handleLogoutClick = () =>{
        try{
            logoutUser()
            .then((res)=>{
                
            })
            .catch(()=>{
                alert("Something Went Wrong");
            })
        }
        catch(error){
            console.error(error)
        }
        doLogout();
        window.location.reload();
    }
  return (
    <header className="bg-white shadow h-14">
      <nav className="container mx-auto flex items-center justify-between px-6">
        <div className="font-semibold text-xl text-gray-700 mt-3">
          <a href="/">VCU&D</a>
        </div>
        <div>
          <button className="text-gray-700 text-sm rounded border border-gray-300 px-4 py-2 transition-colors duration-150 hover:bg-red-700 hover:text-white mt-3" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
