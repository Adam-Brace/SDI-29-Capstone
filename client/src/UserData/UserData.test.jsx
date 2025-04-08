import { render, screen, waitFor, within } from "@testing-library/react";
import UserData from "./UserData";

global.fetch = vi.fn(() =>
  Promise.resolve({
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
  })
);

describe("UserData", () => {
  test("renders a profile after fetch occurs", async () => {
    render(<UserData />);

    await waitFor(() =>
      screen.getByRole("heading", { name: "TSgt Doe's Profile" })
    );

    const userCard = screen.getByRole("listitem"); // <li class="user-card">
    const utils = within(userCard);

    expect(
      utils.getByText(
        (content, node) => node?.textContent === "First Name: John"
      )
    ).toBeInTheDocument();

    expect(
      utils.getByText((content, node) => node?.textContent === "Last Name: Doe")
    ).toBeInTheDocument();

    expect(
      utils.getByText((content, node) => node?.textContent === "Rank: TSgt")
    ).toBeInTheDocument();

    expect(
      utils.getByText(
        (content, node) => node?.textContent === "Email: john.doe@example.com"
      )
    ).toBeInTheDocument();

    expect(
      utils.getByText(
        (content, node) => node?.textContent === "Duty Phone #: 999-999-9999"
      )
    ).toBeInTheDocument();

    expect(
      utils.getByText(
        (content, node) => node?.textContent === "Organization: Delta 1"
      )
    ).toBeInTheDocument();

    expect(
      utils.getByText((content, node) => node?.textContent === "Crew: Alpha")
    ).toBeInTheDocument();

    expect(
      utils.getByText((content, node) => node?.textContent === "Position: CSS")
    ).toBeInTheDocument();

    expect(
      utils.getByText((content, node) => node?.textContent === "Role: Admin")
    ).toBeInTheDocument();
  });
});
