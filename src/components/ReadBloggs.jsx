import React, { useEffect, useState } from "react";

const App1 = () => {
  // State to hold the fetched data
  const [posts, setPosts] = useState([]);

  // Fetching data inside useEffect
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={styles.container}>
      {posts.map((post) => (
        <div key={post.id} style={styles.card}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

// Styles for container and cards
const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
    padding: "16px",
    backgroundColor: "#f5f5f5",
  },
  card: {
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default App1;
