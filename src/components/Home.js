import './Home.css';
import React, { useState } from 'react';
import { storage } from '../firebase';

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorReports, setErrorReports] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files]);
  };

  const handleUpload = async () => {
    try {
      const storageRef = storage.ref();
      const filePromises = selectedFiles.map((file) => {
        const fileRef = storageRef.child(file.name);
        return fileRef.put(file).then((snapshot) => snapshot.ref.getDownloadURL());
      });

      const fileURLs = await Promise.all(filePromises);

      const response = await fetch('https://emkc.org/api/v1/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: 'python', // Change the language as needed
          version: '3.9.6', // Change the version as needed
          files: fileURLs.map((fileURL) => ({ content: fileURL })),
        }),
      });

      if (!response.ok) {
        throw new Error('An error occurred while processing the files.');
      }

      const data = await response.json();

      const reports = selectedFiles.map(() => data.run?.stderr || '');
      setErrorReports(reports);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Code Error Checker</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Generate Report</button>
      <div>Upload Progress: {uploadProgress}%</div>
      {errorReports.length > 0 && (
        <div>
          <h2>Error Reports:</h2>
          {selectedFiles.map((file, index) => (
            <div key={file.name}>
              <h3>{file.name}</h3>
              <pre>{errorReports[index]}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

{/* <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" className="bi bi-upload styleme" viewBox="0 0 16 16" >
      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
      <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
    </svg> */}