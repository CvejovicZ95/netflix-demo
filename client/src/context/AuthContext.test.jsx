import React from "react";
import { render, act } from "@testing-library/react";
import { AuthContextProvider, useAuthContext } from "./AuthContext";

describe("AuthContextProvider", () => {
  it("should provide authUser state and login/logout functions", () => {
    let result;
    const TestComponent = () => {
      result = useAuthContext();
      return null;
    };

    render(
      <AuthContextProvider>
        <TestComponent />
      </AuthContextProvider>,
    );

    expect(result.authUser).toBeNull();
    expect(typeof result.login).toBe("function");
    expect(typeof result.logout).toBe("function");
  });

  it("should update authUser state on login and logout", () => {
    let result;
    const TestComponent = () => {
      result = useAuthContext();
      return null;
    };

    render(
      <AuthContextProvider>
        <TestComponent />
      </AuthContextProvider>,
    );

    act(() => {
      result.login({ username: "testuser", isAuthenticated: true });
    });

    expect(result.authUser).toEqual({
      username: "testuser",
      isAuthenticated: true,
    });

    act(() => {
      result.logout();
    });

    expect(result.authUser).toBeNull();
  });
});
