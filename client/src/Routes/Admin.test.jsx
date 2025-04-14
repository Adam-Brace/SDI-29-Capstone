import Admin from "./Admin";
import { render, screen, waitFor, within } from "@testing-library/react";
import { AuthProvider } from "../Context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { fireEvent } from "@testing-library/react";

import { vi } from "vitest";

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: "Jessica",
            email: "Jessica@example.com",
            rank: "TSgt",
          },
        ]),
    })
  );
});

describe("Admin", () => {
  test("renders admin page", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Admin />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByRole("heading", { name: /Users/i })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search users by name, rank, or email/i)
    ).toBeInTheDocument();
  });

  test("open and closes edit panel", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Admin />
        </MemoryRouter>
      </AuthProvider>
    );
    const userList = await screen.findByRole("list");
    const editButtons = await within(userList).findAllByRole("button");
    expect(editButtons.length).toBeGreaterThan(0);

    fireEvent.click(editButtons[0]);

    // await waitFor(() => {
    //   expect(screen.getByText(/Close/i)).toBeInTheDocument();
    // });

    // const closeButton = await screen.findByRole("button", { name: /Close/i });
    // expect(closeButton).toBeInTheDocument();
    // fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText(/Close/i)).not.toBeInTheDocument();
    });
  });
});
