import { render, screen, waitFor, within } from "@testing-library/react";
import UserData from "../../src/UserData/UserData.jsx";

vi.stubEnv("VITE_API_URL", "http://localhost:3000");

vi.mock("../../src/Context/AuthContext", () => ({
  useAuth: () => ({
    user: { id: 1 },
  }),
}));

global.fetch = vi.fn((url) => {
  if (url.includes("/user/1")) {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            first_name: "John",
            last_name: "Doe",
            rank: "TSgt",
            email: "john.doe@example.com",
            phone: "999-999-9999",
            organization: "Delta 1",
            crew: "Alpha",
            position: "CSS",
            permissions: "Admin",
          },
        ]),
    });
  }
  return Promise.reject(new Error("Unknown fetch" + url));
});

describe("UserData", () => {
  test("renders a profile after fetch occurs", async () => {
    render(<UserData />);

    const heading = await screen.findByRole("heading", {
      name: "TSgt Doe's Profile",
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("TSgt Doe's Profile");
    expect(heading).not.toHaveTextContent("Error. No User Data Found");

    expect(screen.getByText("First Name:")).toBeInTheDocument();
    expect(screen.getByText("Last Name:")).toBeInTheDocument();
    expect(screen.getByText("Rank:")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("Duty Phone #:")).toBeInTheDocument();
    expect(screen.getByText("Organization:")).toBeInTheDocument();
    expect(screen.getByText("Crew:")).toBeInTheDocument();
    expect(screen.getByText("Position:")).toBeInTheDocument();
    expect(screen.getByText("Role:")).toBeInTheDocument();
  });

  test("renders a loading message while fetching data", async () => {
    render(<UserData />);

    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
});
