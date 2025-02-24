// Form.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";

import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import Form from "./Form";

describe("Form Component", () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  const fillForm = (values = {}) => {
    const { username, email, password, age } = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      age: "25",
      ...values,
    };

    const usernameInput = screen.getByTestId("username-input");
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const ageInput = screen.getByTestId("age-input");

    if (username !== undefined) fireEvent.change(usernameInput, { target: { value: username } });
    if (email !== undefined) fireEvent.change(emailInput, { target: { value: email } });
    if (password !== undefined) fireEvent.change(passwordInput, { target: { value: password } });
    if (age !== undefined) fireEvent.change(ageInput, { target: { value: age } });
  };

  it("renders all form fields", () => {
    render(<Form onSubmit={mockSubmit} />);

    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("age-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("submits form with valid data", () => {
    render(<Form onSubmit={mockSubmit} />);

    fillForm();
    fireEvent.click(screen.getByTestId("submit-button"));

    expect(mockSubmit).toHaveBeenCalledWith({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      age: "25",
    });
  });

  it("shows error for short username", () => {
    render(<Form onSubmit={mockSubmit} />);

    fillForm({ username: "ab" });
    fireEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("username-error")).toHaveTextContent("Username must be at least 3 characters");
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("shows error for short password", () => {
    render(<Form onSubmit={mockSubmit} />);

    fillForm({ password: "12345" });
    fireEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("password-error")).toHaveTextContent("Password must be at least 6 characters");
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("shows error for invalid age", () => {
    render(<Form onSubmit={mockSubmit} />);

    fillForm({ age: "17" });
    fireEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("age-error")).toHaveTextContent("Please enter a valid age between 18 and 100");
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("shows error for missing required fields", () => {
    render(<Form onSubmit={mockSubmit} />);

    fireEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("username-error")).toBeInTheDocument();
    expect(screen.getByTestId("email-error")).toBeInTheDocument();
    expect(screen.getByTestId("password-error")).toBeInTheDocument();
    expect(screen.getByTestId("age-error")).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("updates form values on change", () => {
    render(<Form onSubmit={mockSubmit} />);

    const usernameInput = screen.getByTestId("username-input");
    fireEvent.change(usernameInput, { target: { value: "newuser" } });

    expect(usernameInput.value).toBe("newuser");
  });

  it("clears errors when valid data is entered", () => {
    render(<Form onSubmit={mockSubmit} />);

    // First show errors
    fillForm({ username: "ab" });
    fireEvent.click(screen.getByTestId("submit-button"));
    expect(screen.getByTestId("username-error")).toBeInTheDocument();

    // Then fix the error
    fillForm({ username: "validusername" });
    fireEvent.click(screen.getByTestId("submit-button"));

    expect(screen.queryByTestId("username-error")).not.toBeInTheDocument();
  });
});
