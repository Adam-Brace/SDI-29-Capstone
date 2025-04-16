import { fireEvent, render, screen } from "@testing-library/react";
import App from "../src/App";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../src/Context/AuthContext";
import { ThemeProvider } from "../src/Context/ThemeContext";
import { AuthContext } from "../src/Context/AuthContext";
import { test } from "vitest";

describe("App routes", () => {
  test("renders home page at /login route", () => {
    render(
      <AuthProvider>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/login"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </AuthProvider>
    );

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("renders register page at /register route", () => {
    render(
      <AuthProvider>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/register"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </AuthProvider>
    );

    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  test("renders not found page at unknown route", () => {
    render(
      <AuthProvider>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/unknown"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </AuthProvider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
