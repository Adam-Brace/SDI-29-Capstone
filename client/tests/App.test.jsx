import { fireEvent, render, screen } from "@testing-library/react";
import App from "../src/App";
// import { SchedulerProvider } from "@bitnoi.se/react-scheduler";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../src/Context/AuthContext";

describe("App component", () => {
  // test("renders Hello World", () => {
  //   render(
  //     <MemoryRouter initialEntries={["/"]}>
  //       <App />
  //     </MemoryRouter>
  //   );

  //   const linkElement = screen.getByText(/Hello World/);
  //   expect(linkElement).toBeInTheDocument();
  // });

  //Test for Theme selection
  test("render theme toggle", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          {/* <SchedulerProvider> */}
          <App />
          {/* </SchedulerProvider> */}
        </MemoryRouter>
      </AuthProvider>
    );

    // const toggleThemeButton = screen.getByRole("button", {
    //   name: /Switch to Dark Mode/,
    // });
    // expect(document.body.className).toBe("light-theme");

    // fireEvent.click(toggleThemeButton);
    // expect(document.body.className).toBe("dark-theme");

    // fireEvent.click(toggleThemeButton);
    // expect(document.body.className).toBe("light-theme");
  });
});
