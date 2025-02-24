// GithubUser.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import GithubUser from "./GithubUser.jsx";

window.fetch = jest.fn();

describe("GithubUser Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should render user data on successful fetch", async () => {
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

    render(<GithubUser username="testuser" />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("user-info")).toBeInTheDocument();
    });

    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("should show error message on 404", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    render(<GithubUser username="nonexistentuser" />);

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
      expect(screen.getByText("User not found or client error")).toBeInTheDocument();
    });
  });

  // Les autres tests restent identiques...
});
