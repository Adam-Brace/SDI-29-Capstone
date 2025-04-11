import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css"; 

function NotFound() {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count > 0) {
        setCount(count - 1);
      } else {
        navigate('/');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [count, navigate]);

  return (
    <div className="content-container">
      <div className="notfound-container">
        <div className="notfound-card">
          <h1>404 Not Found</h1>
          <p>Redirecting to home page in {count} seconds...</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
