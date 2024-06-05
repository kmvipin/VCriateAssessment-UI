import React from 'react';
import { FaUpload, FaLock, FaDownload } from 'react-icons/fa';
import { getUser } from '../authService/auth';
import CookieConsent from 'react-cookie-consent';
import { Cookies } from 'react-cookie-consent';
import { useState, useEffect } from 'react';

const Home = ({setSwitchPage}) => {
  const [showCookieConsent,setShowCookieConsent] = useState(false);
  const hostname = window.location.hostname;

    const getTitle = () =>{
        const user = getUser();
        if(user == null){
            return "VCriate File Upload and Download";
        }
        else{
            return "Welcome Back "+user.name;
        }
    }
    useEffect(()=>{
      if(!Cookies.get('CookieConsent')){
        setShowCookieConsent(true);
      }
    },[])
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {showCookieConsent && <CookieConsent
        debug={true}
        extraCookieOptions={{ domain: hostname }}
        style={{ background: "#f1f2f1", color: "black" }}
        buttonStyle={{ backgroundColor:'#0c3059',color: "white", fontSize: "13px" }}
        buttonText="OKAY!"
      >
        Third Party Cookie Must Be Enable to Authenticate
      </CookieConsent>}
      <main className="flex-grow container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">{getTitle()}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white text-indigo-600 p-8 rounded-lg shadow-md flex flex-col items-center">
              <FaUpload className="text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Upload</h3>
              <p>Quickly upload multiple files at once with our intuitive interface.</p>
            </div>
            <div className="bg-white text-indigo-600 p-8 rounded-lg shadow-md flex flex-col items-center">
              <FaLock className="text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
              <p>Your files are stored securely and can only be accessed by you.</p>
            </div>
            <div className="bg-white text-indigo-600 p-8 rounded-lg shadow-md flex flex-col items-center">
              <FaDownload className="text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Downloads</h3>
              <p>Download your files quickly and efficiently whenever you need them.</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
          <p className="text-lg max-w-2xl mx-auto mb-6">
            Join our community of users who manage their files effortlessly. Click the button below to get started with uploading and downloading your files.
          </p>
          <button
            to="/upload"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-md shadow-md hover:from-indigo-700 hover:to-purple-700 transition duration-300"
            onClick={()=>{setSwitchPage(true)}}
          >
            Get Started
          </button>
        </section>
      </main>
    </div>
  );
};

export default Home;
