import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { HomePage } from "./HomePage";

const mockLogin = jest.fn();

jest.mock("../../../hooks/useHomePageLogin", () => ({
  useHomePageLogin: () => ({
    loginHandler: () => mockLogin(),
  }),
}));

describe("Home page login", () => {
  it("should login user", async () => {
    const { getByText } = render(<HomePage />);

    fireEvent.click(getByText("Get Started"));
    expect(mockLogin).toHaveBeenCalled();
  });
  it("should update email state when input value changes", () => {
    const { getByPlaceholderText } = render(<HomePage />);

    const emailInput = getByPlaceholderText("Email adress");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(emailInput.value).toBe("test@example.com");
  });
});
