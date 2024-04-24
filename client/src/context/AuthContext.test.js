import React from "react";
import { render, act } from "@testing-library/react";
import { AuthContextProvider, useAuthContext } from "./AuthContext";

// Mockujemo localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("AuthContextProvider", () => {
  it("should set authUser in localStorage when user logs in", async () => {
    const TestComponent = () => {
      const { login } = useAuthContext();
      return (
        <button onClick={() => login({ username: "testuser" })}>Login</button>
      );
    };

    const { getByText } = render(
      <AuthContextProvider>
        <TestComponent />
      </AuthContextProvider>,
    );

    await act(async () => {
      getByText("Login").click();
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "authUser",
      JSON.stringify({ username: "testuser" }),
    );
  });

  it("should remove authUser from localStorage when user logs out", async () => {
    const TestComponent = () => {
      const { logout } = useAuthContext();
      return <button onClick={logout}>Logout</button>;
    };

    const { getByText } = render(
      <AuthContextProvider>
        <TestComponent />
      </AuthContextProvider>,
    );

    await act(async () => {
      getByText("Logout").click();
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith("authUser");
  });
});
