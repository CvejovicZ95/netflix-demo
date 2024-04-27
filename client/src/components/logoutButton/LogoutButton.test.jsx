import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Logout } from "./LogoutButton";

const mockLogout = jest.fn();
jest.mock("../../hooks/useLogout", () => ({
  useLogout: () => ({
    logoutHandler: () => mockLogout(),
  }),
}));

describe("Logout button", () => {
  it("should call logout on click", async () => {
    const { getByText } = render(<Logout />);

    fireEvent.click(getByText("Logout"));
    expect(mockLogout).toHaveBeenCalled();
  });
});
