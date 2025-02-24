// TestButton.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import TestButton from "./TestButton";

describe("TestButton Component", () => {
  it("renders button with correct label", () => {
    // Arrange
    render(<TestButton label="Test Label" onClick={() => {}} />);

    // Assert
    const buttonElement = screen.getByText("Test Label");
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    // Arrange
    const handleClick = jest.fn();
    render(<TestButton label="Click me" onClick={handleClick} />);

    // Act
    const buttonElement = screen.getByText("Click me");
    fireEvent.click(buttonElement);

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
