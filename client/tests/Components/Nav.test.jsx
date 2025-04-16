import Nav from "../../src/Components/Nav";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../../src/Context/AuthContext";
import { ThemeProvider } from "../../src/Context/ThemeContext";
import { MemoryRouter } from "react-router-dom";
import { test, vi } from "vitest";
import { useTheme } from "../../src/Context/ThemeContext";

vi.mock("../../src/Context/AuthContext", async () => {
  const actual = await vi.importActual("../../src/Context/AuthContext");
  return {
    ...actual,
    useAuth: () => ({
      user: null,
      logout: vi.fn(),
    }),
  };
});

vi.mock("../../src/Context/ThemeContext", async () => {
  const actual = await vi.importActual("../../src/Context/ThemeContext");
  return {
    ...actual,
    useTheme: () => ({
      theme: "light",
      toggleTheme: vi.fn(),
    }),
  };
});

describe("Nav Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders logo", () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });

  test("renders home link for logged-out users", () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );
    const homeLink = screen.getByText(/my requests/i);
    expect(homeLink).toBeInTheDocument();
  });

  test("toggle theme button is present", () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );
    const toggleButton = screen.getByRole("checkbox");
    expect(toggleButton).toBeInTheDocument();
  });

  test("toggle theme button toggles theme from light to dark", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ThemeProvider>
            <Nav />
          </ThemeProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    const toggleButton = screen.getByRole("checkbox");
    fireEvent.change(toggleButton, { target: { checked: true } });
    expect(toggleButton).toBeChecked();
  });
});
