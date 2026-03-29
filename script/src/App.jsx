import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/summary")
      .then(res => res.json())
      .then(setData);
  }, []);

  const fetchPosts = (userId) => {
    setSelectedUser(userId);

    fetch(`http://127.0.0.1:8000/posts/${userId}`)
      .then(res => res.json())
      .then(setPosts);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Post Summary</h1>

      {/* User List */}
      <ul>
        {Object.entries(data).map(([user, count]) => (
          <li key={user}>
            <a href="#" onClick={() => fetchPosts(user)}>
              User {user} → {count} posts
            </a>
          </li>
        ))}
      </ul>

      {/* Posts Display */}
      {selectedUser && (
        <div>
          <h2>Posts for User {selectedUser}</h2>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;