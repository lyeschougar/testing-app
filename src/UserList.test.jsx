// UserList.test.jsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserList from "./UserList";
import { describe, it, expect, jest, beforeEach, afterAll } from "@jest/globals";

describe("UserList Component", () => {
  // Mock des données utilisateurs
  const mockUsers = [
    { id: 1, name: "John Doe", email: "john@test.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@test.com", role: "User" },
  ];

  // Mock de console.error pour les tests de PropTypes
  const consoleErrorSpy = jest.spyOn(console, "error");

  beforeEach(() => {
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it("should render table headers correctly", () => {
    // Arrange & Act
    render(<UserList users={mockUsers} />);

    // Assert
    const headers = ["ID", "Name", "Email", "Role"];
    headers.forEach((headerText) => {
      expect(screen.getByText(headerText)).toBeInTheDocument();
    });
  });

  it("should render all user data correctly", () => {
    // Arrange & Act
    render(<UserList users={mockUsers} />);

    // Assert
    mockUsers.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
      expect(screen.getByText(user.role)).toBeInTheDocument();
      expect(screen.getByText(user.id.toString())).toBeInTheDocument();
    });
  });

  it("should render empty table when users array is empty", () => {
    // Arrange & Act
    render(<UserList users={[]} />);

    // Assert
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1); // Just the header row
  });

  it("should apply correct Tailwind classes", () => {
    // Arrange & Act
    render(<UserList users={mockUsers} />);

    // Assert
    const table = screen.getByRole("table");
    expect(table).toHaveClass("min-w-full", "table-auto");

    const headerRow = screen.getAllByRole("row")[0];
    expect(headerRow).toHaveClass("bg-gray-100");
  });

  it("should handle invalid user data gracefully", () => {
    // Arrange
    const invalidUser = [{ id: "invalid", name: null, role: undefined }];
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    // Act & Assert
    expect(() => {
      render(<UserList users={invalidUser} />);
    }).toThrow();

    // Nettoyage
    consoleError.mockRestore();
  });

  it("should handle missing users prop", () => {
    // Arrange
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    // Act & Assert
    expect(() => {
      // @ts-ignore pour tester le cas où users est undefined
      render(<UserList />);
    }).toThrow();

    // Nettoyage
    consoleError.mockRestore();
  });
});
