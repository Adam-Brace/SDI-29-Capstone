import UserBadge from "../../src/Components/UserBadge";
import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

global.API_URL = "http://mock-api.com";

vi.mock("../../src/Context/AuthContext", () => ({
  useAuth: () => ({
    user: {
      first_name: "John",
      last_name: "Jacob",
      rank: "TSgt",
    },
  }),
}));

describe("UserBadge", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("fetches user by ID and displays tooltip", async () => {
    const mockFetchedUser = [
      {
        first_name: "Jane",
        last_name: "Doe",
        rank: "Captain",
      },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockFetchedUser),
      })
    );

    render(
      <MemoryRouter>
        <UserBadge wh={40} id={1} />
      </MemoryRouter>
    );

    const avatar = await screen.findByText("D");
    expect(avatar).toBeInTheDocument();
  });
});
