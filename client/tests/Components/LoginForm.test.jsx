import LoginForm from "../../src/Components/LoginForm";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../src/Context/AuthContext";
import { expect, test, describe, beforeEach } from "vitest";
import { vi } from "vitest";

vi.mock("../../src/Context/AuthContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    AuthProvider: ({ children }) => <div>{children}</div>,
    useAuth: () => ({
      login: vi.fn(),
    }),
  };
});

describe("LoginForm", () => {
  const mockLogin = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders login form", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("displays error message on failed login", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </AuthProvider>
    );
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });
    const errorMessage = "Login failed.";
  });
});
