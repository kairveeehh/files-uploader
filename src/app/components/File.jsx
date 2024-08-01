"use client"

import React, { useState, useCallback } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "PDF"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = useCallback((file) => {
    setFile(file);
    
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }, []);

  const renderFilePreview = () => {
    if (!file) return null;

    if (file.type.startsWith('image/')) {
      return (
        <img src={preview} alt="Uploaded file" className="max-w-full h-auto rounded-lg shadow-lg" />
      );
    } else if (file.type === 'application/pdf') {
      return (
        <object
          data={preview}
          type="application/pdf"
          width="100%"
          height="500px"
          className="rounded-lg shadow-lg"
        >
          <p>Your browser does not support PDFs. 
             <a href={preview} target="_blank" rel="noopener noreferrer">Click here to download the PDF</a>.</p>
        </object>
      );
    } else {
      return <p>Unsupported file type. Please upload an image or PDF.</p>;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">File Uploader</h2>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        multiple={false}
        maxSize={5}
      >
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer">
          <svg className="mx-auto h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="mt-2 text-lg font-semibold text-gray-700">
            Drag & Drop your file here
          </p>
          <p className="mt-1 text-sm text-gray-500">
            or click to select a file (JPG, PNG, GIF, PDF - Max size: 5MB)
          </p>
        </div>
      </FileUploader>
      {file && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">File Preview</h3>
          <div className="p-4 bg-gray-100 rounded-lg">
            {renderFilePreview()}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            File: {file.name} | Size: {(file.size / 1024 / 1024).toFixed(2)} MB | Type: {file.type}
          </p>
        </div>
      )}
    </div>
  );
}

export default DragDrop;
