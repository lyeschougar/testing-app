// UserSearch.test.jsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import UserSearch from "./UserSearch";

window.fetch = jest.fn();

describe("UserSearch Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should search and display user information", async () => {
    const mockUser = {
      login: "testuser",
      name: "Test User",
      followers: 100,
    };

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockUser),
      })
    );

    render(<UserSearch />);

    // Saisir le nom d'utilisateur
    const input = screen.getByTestId("github-username-input");
    fireEvent.change(input, { target: { value: "testuser" } });

    // Cliquer sur le bouton de recherche
    fireEvent.click(screen.getByTestId("github-search-button"));

    // Vérifier le chargement
    expect(screen.getByTestId("loading")).toBeInTheDocument();

    // Attendre et vérifier l'affichage des informations
    await waitFor(() => {
      expect(screen.getByTestId("user-info")).toBeInTheDocument();
    });

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Login: testuser")).toBeInTheDocument();
    expect(screen.getByText("Followers: 100")).toBeInTheDocument();
  });

  it("should handle user not found error", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    render(<UserSearch />);

    const input = screen.getByTestId("github-username-input");
    fireEvent.change(input, { target: { value: "nonexistentuser" } });
    fireEvent.click(screen.getByTestId("github-search-button"));

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
      expect(screen.getByText("User not found or client error")).toBeInTheDocument();
    });
  });

  it("should handle server error", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    render(<UserSearch />);

    const input = screen.getByTestId("github-username-input");
    fireEvent.change(input, { target: { value: "testuser" } });
    fireEvent.click(screen.getByTestId("github-search-button"));

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
      expect(screen.getByText("Server error")).toBeInTheDocument();
    });
  });
});
