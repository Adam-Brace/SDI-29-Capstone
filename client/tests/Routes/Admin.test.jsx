import Admin from "../../src/Routes/Admin/Admin";
import { render, screen } from "@testing-library/react";
import { describe, test, vi, beforeEach } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
// import { useAuth } from "../../src/Context/AuthContext";

vi.mock("socket.io-client", () => {
  return {
    io: () => ({
      on: vi.fn(),
      emit: vi.fn(),
      disconnect: vi.fn(),
    }),
  };
});

vi.mock("../../src/Context/AuthContext", () => ({
  useAuth: () => ({
    user: {
      id: 1,
      permissions: "admin",
      first_name: "Jane",
      last_name: "Doe",
      email: "janedoe@example.com",
      rank: "Major",
    },
  }),
}));

describe("Admin", () => {
  test("renders Admin component", () => {
    render(
      <Router>
        <Admin />
      </Router>
    );

    expect(screen.getByText("My Requests")).toBeInTheDocument();
  });

  test("renders user list", async () => {
    render(
      <Router>
        <Admin />
      </Router>
    );

    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });
  test("renders requests tab", () => {
    render(
      <Router>
        <Admin />
      </Router>
    );

    expect(screen.getByText("Requests")).toBeInTheDocument();
  });
});
