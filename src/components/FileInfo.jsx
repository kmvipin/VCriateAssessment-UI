import React, { useEffect, useState } from "react";
import { FaFileDownload, FaTrash } from "react-icons/fa";
import {
    deleteFile,
  downloadFile,
  getAllFileName,
  uploadFile,
} from "../service/FileService";
import Loading from "../Loading";
import Navbar from "./Navbar";

const FileInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadingOrDownloading, setUploadingOrDownloading] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(null);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (selectedFile.size > maxFileSize) {
        alert("File size exceeds the maximum limit of 5MB.");
        setFile(null); // Reset file
      } else {
        setFile(selectedFile);
      }
    }
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    setUploadingOrDownloading("Uploading...");
    setProgress(0);
    try {
      uploadFile(formData, setProgress)
        .then((res) => {
          if (res.success === true) {
            alert("File Uploaded Successfully");
            const fileNameList = [...uploadedFiles,file.name];
            setUploadedFiles([...new Set(fileNameList)]);
          } else {
            alert(res.message);
          }
          setUploadingOrDownloading(null);
        })
        .catch((err) => {
          alert(err);
          setUploadingOrDownloading(null);
        });
    } catch (err) {
      console.error(err);
      setUploadingOrDownloading(false);
    }
  };

  const handleDownloadFile = (filename) => {
    setUploadingOrDownloading("Downloading...");
    setProgress(0);
    try {
      downloadFile(filename, setProgress)
        .then((data) => {
          const url = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setUploadingOrDownloading(null);
        })
        .catch((err) => {
          alert("Something Went Wrong");
          setUploadingOrDownloading(null);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const getAllFilesInfo = () => {
    try {
      getAllFileName()
        .then((res) => {
          setUploadedFiles(res);
        })
        .catch((err) => {
          alert("Something Went Wrong !!");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFile = (filename) =>{
    setLoading("Deleting...");
    try {
        deleteFile(filename)
          .then((res) => {
            alert("File Successfully Deleted");
            setLoading(null);
            deleteItem(filename);
          })
          .catch((err) => {
            alert("Something Went Wrong !!");
            setLoading(null);
          });
      } catch (err) {
        console.log(err);
        setLoading(null);
      }
  }

  const deleteItem = (itemToDelete) => {
    const updatedItems = uploadedFiles.filter(item => item !== itemToDelete);
    setUploadedFiles(updatedItems);
  }

  useEffect(() => {
    getAllFilesInfo();
  }, []);

  return (
    <div className="h-screen">
        <Navbar/>
        <div className="min-h-full bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {uploadingOrDownloading && (
        <Loading content={uploadingOrDownloading + progress+"%"} />
      )}
      {loading && (
        <Loading content={loading} />
      )}
      <div
        className={`max-w-md w-full space-y-8  ${
          uploadingOrDownloading || loading ? "blur-[1px]" : ""
        }`}
      >
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            File Upload and Download
          </h1>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-2">
            <div>
              <input
                type="file"
                multiple
                onChange={(e) => {
                  handleFileChange(e);
                }}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <button
              className={`w-full flex justify-between items-center px-4 py-2 ${
                file === null ? "bg-green-400" : "bg-green-600"
              } text-white font-medium text-sm leading-5 rounded-md hover:bg-green-500 focus:outline-none focus:bg-green-500`}
              disabled={file === null}
              onClick={handleFileUpload}
            >
              <span>Upload</span>
            </button>
          </div>

          <div className="mt-4">
            <div className="relative">
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className="w-full flex justify-between items-center px-4 py-2 bg-indigo-600 text-white font-medium text-sm leading-5 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
              >
                <span>Uploaded Files</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                className={`absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none max-h-40 overflow-auto transition-all duration-300 ease-in-out transform ${
                  isOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <ul
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {uploadedFiles.map((filename, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 text-sm text-gray-700 flex justify-between items-center"
                    >
                      <span
                        onClick={() => {
                          handleDownloadFile(filename);
                        }}
                        className="cursor-pointer"
                      >
                        {filename}
                      </span>
                      <div>
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleDownloadFile(filename)}
                        >
                          <FaFileDownload />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 ml-2"
                           onClick={() => handleDeleteFile(filename)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default FileInfo;
