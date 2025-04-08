import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

describe("App component", () => {
	test("renders Hello World", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<App />
			</MemoryRouter>
		);

		const linkElement = screen.getByText(/Hello World/);
		expect(linkElement).toBeInTheDocument();
	});

	//Test for Theme selection
	test("render theme toggle", () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		const toggleThemeButton = screen.getByRole("button", {
			name: /Switch to Dark Mode/,
		});
		expect(document.body.className).toBe("light-theme");

		fireEvent.click(toggleThemeButton);
		expect(document.body.className).toBe("dark-theme");

		fireEvent.click(toggleThemeButton);
		expect(document.body.className).toBe("light-theme");
	});
});
