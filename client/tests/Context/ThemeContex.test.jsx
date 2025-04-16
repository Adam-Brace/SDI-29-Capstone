import ThemeContext from "../../src/Context/ThemeContext";
import { useTheme, ThemeProvider } from "../../src/Context/ThemeContext";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../src/Context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import Cookies from "js-cookie";

describe("ThemeContext", () => {
  const MockComponent = () => {
    const { theme, toggleTheme } = useTheme();
    return (
      <div>
        <p data-testid="theme">{theme}</p>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    );
  };

  beforeEach(() => {
    Cookies.remove("theme");
  });

  test("renders with default theme", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <MockComponent />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });

  test("toggles theme correctly", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <MockComponent />
        </MemoryRouter>
      </ThemeProvider>
    );

    const button = screen.getByText("Toggle Theme");
    button.click();

    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });

  test("sets theme from cookies", () => {
    Cookies.set("theme", "light");

    render(
      <ThemeProvider>
        <MemoryRouter>
          <MockComponent />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme").textContent).toBe("light");
  });
});
