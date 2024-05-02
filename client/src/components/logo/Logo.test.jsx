import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Logo } from "./Logo";
import "@testing-library/jest-dom";

jest.mock("../../context/AuthContext", () => ({
  useAuthContext: () => ({ authUser: true }),
}));

describe("Logo component", () => {
  it("should render Movies page when user is authenticated", () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );

    const logoImage = getByAltText("logo");
    expect(logoImage).toBeInTheDocument();
  });

  it("should render Home Page when user is not authenticated", () => {
    jest.resetModules();
    jest.mock("../../context/AuthContext", () => ({
      useAuthContext: () => ({ authUser: false }),
    }));

    const { getByAltText } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );

    const logoImage = getByAltText("logo");
    expect(logoImage).toBeInTheDocument();
  });
});
