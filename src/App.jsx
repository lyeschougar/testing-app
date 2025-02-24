import TestButton from "./TestButton.jsx";
import UserList from "./UserList.jsx";
import Form from "./Form.jsx";
import UserSearch from "./UserSearch.jsx";

const App = () => {
  // Gestionnaire pour le bouton
  const handleClick = () => {
    console.log("Button clicked!");
  };

  // Gestionnaire pour le formulaire
  const handleSubmit = (formData) => {
    console.log("Form submitted:", formData);
  };

  // Données des utilisateurs
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Editor" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">React Testing Demo</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Test Button Component</h2>
        <TestButton label="Click me!" onClick={handleClick} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">User List Component</h2>
        <UserList users={users} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Form to Fill</h2>
        <Form onSubmit={handleSubmit} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">GitHub User Search</h2>
        <UserSearch />
      </div>
    </div>
  );
};

export default App;
