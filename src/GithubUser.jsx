// GithubUser.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const fetchGithubUser = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new Error("User not found or client error");
    }
    if (response.status >= 500) {
      throw new Error("Server error");
    }
  }

  return await response.json();
};

const GithubUser = ({ username }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchGithubUser(username);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      loadUser();
    }
  }, [username]);

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (error) {
    return <div data-testid="error">{error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div data-testid="user-info">
      <h2>{user.name}</h2>
      <p>Login: {user.login}</p>
      <p>Followers: {user.followers}</p>
    </div>
  );
};

GithubUser.propTypes = {
  username: PropTypes.string.isRequired,
};

export default GithubUser;
