import React, { useEffect, useState } from "react";
import './App.css';
import Form1 from './components/Form1';

function App() {
  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch data from the backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/'); // Make the GET request
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result); // Set the fetched data into state
      } catch (error) {
        setError(error.message); // Set error message if the fetch fails
      } finally {
        setLoading(false); // Set loading to false when the request completes
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) {
    return <p className="loading">Loading...</p>; // Show loading text while fetching data
  }

  if (error) {
    return <p className="error">Error: {error}</p>; // Show error message if there's an issue
  }

  return (
    <div className="app-container">
      <Form1 />
      <h1 className="page-title">Read Blogs</h1>
      <h1 className="data-list-title">Data List</h1>
      <ul className="data-list">
        {data.map(item => (
          <li key={item.id} className="data-item">
            <h2 className="data-title">{item.title}</h2>
            <p className="data-description">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
