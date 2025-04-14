import RegisterPage from "./RegisterPage";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../Context/AuthContext";

describe("RegisterPage", () => {
  test("shows the registration page correctly", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(
      screen.getByRole("heading", { name: /Create Your Account/ })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please fill in the information below to register./)
    ).toBeInTheDocument();
  });

  test("directs to login if account already created", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </AuthProvider>
    );
    const loginLink = screen.getByRole("link", {
      name: /already have an account\? log in/i,
    });
    expect(loginLink).toBeInTheDocument();

    fireEvent.click(loginLink);
  });

  test("allows forgot password link to function", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </AuthProvider>
    );
    const forgotPassword = screen.getByRole("link", {
      name: /Forgot Password\?/,
    });
    expect(forgotPassword).toBeInTheDocument();

    fireEvent.click(forgotPassword);
  });
});
