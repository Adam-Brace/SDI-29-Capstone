import { fireEvent, render, screen } from "@testing-library/react";
import App from "../src/App";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../src/Context/AuthContext";
import { ThemeProvider } from "../src/Context/ThemeContex";
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

    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
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

    expect(screen.getByRole("link", { name: /register/i })).toBeInTheDocument();
  });

  test("renders profile page at /profile route", () => {
    render(
      <AuthProvider>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/profile"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </AuthProvider>
    );

    expect(screen.getByRole("link", { name: /profile/i })).toBeInTheDocument();
  });

  test("renders admin page at /admin route", () => {
    render(
      <AuthProvider>
        <ThemeProvider>
          <MemoryRouter initialEntries={["/admin"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </AuthProvider>
    );

    expect(screen.getByRole("heading", { name: /users/i })).toBeInTheDocument();
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

  // //Test for Theme selection
  // test("render theme toggle", () => {
  //   render(
  //     <AuthProvider>
  //       <MemoryRouter>
  //         {/* <SchedulerProvider> */}
  //         <App />
  //         {/* </SchedulerProvider> */}
  //       </MemoryRouter>
  //     </AuthProvider>
  //   );

  //   const toggleThemeButton = screen.getByRole("checkbox");
  //   //   name: /Switch to Dark Mode/,
  //   // });
  //   expect(document.body.className).toBe("light-theme");

  //   fireEvent.click(toggleThemeButton);
  //   expect(document.body.className).toBe("dark-theme");

  //   fireEvent.click(toggleThemeButton);
  //   expect(document.body.className).toBe("light-theme");
  // });
});
