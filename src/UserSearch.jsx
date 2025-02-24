// UserSearch.jsx
import { useState } from "react";
import GithubUser from "./GithubUser";

const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [searchedUser, setSearchedUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchedUser(username);
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="flex-1 px-3 py-2 border rounded-md"
            data-testid="github-username-input"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            data-testid="github-search-button"
          >
            Search
          </button>
        </div>
      </form>
      {searchedUser && <GithubUser username={searchedUser} />}
    </div>
  );
};

export default UserSearch;
