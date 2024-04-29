import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Movies } from "../movies/Movies";
import { HomePage } from "../Layout/homePage/HomePage";
import "@testing-library/jest-dom";

describe("Logo component", () => {
  it("should render Movies page when user is authenticated", () => {
    const authUser = { isAuthenticated: true };
    const { getByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ authUser }}>
          <Movies />
        </AuthContext.Provider>
      </MemoryRouter>,
    );
    expect(
      getByText("Lights, camera, no action! No movies found."),
    ).toBeInTheDocument();
  });

  it("should render Home Page when user is not authenticated", () => {
    const authUser = { isAuthenticated: false };
    const { getByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ authUser }}>
          <HomePage />
        </AuthContext.Provider>
      </MemoryRouter>,
    );
    expect(
      getByText("Unlimited movies, TV shows, and more"),
    ).toBeInTheDocument();
  });
});
