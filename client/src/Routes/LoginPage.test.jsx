import { render, screen, waitFor, within } from "@testing-library/react";
import { AuthProvider } from "../Context/AuthContext";
import LoginPage from "./LoginPage";
import { MemoryRouter } from "react-router-dom";

describe("LoginPage", () => {
  test("Displays welcome information", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(
      screen.getByRole("heading", { name: /Welcome Back\!/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/Please log in to continue./)).toBeInTheDocument();
  });

  test("directs to create an account", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>
    );
    const createAccountLink = screen.getByRole("link", {
      name: /Don't have an account\? Sign up/i,
    });
    expect(createAccountLink).toBeInTheDocument();
  });

  test("allows forgot password link to function", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>
    );
    const forgotPassword = screen.getByRole("link", {
      name: /Forgot Password\?/,
    });
    expect(forgotPassword).toBeInTheDocument();
  });
});
