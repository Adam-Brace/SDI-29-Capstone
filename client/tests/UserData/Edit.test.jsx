import { render, screen, fireEvent, queryByText } from "@testing-library/react";
import Edit from "../../src/UserData/Edit";
import { vi } from "vitest";

vi.mock("../../src/Context/AuthContext", () => ({
  useAuth: () => ({
    user: {
      id: 1,
      first_name: "Jane",
      last_name: "Smith",
      rank: "Captain",
      permissions: "admin",
    },
  }),
}));

//Dummy data for currentData
const dummyCurrentData = {
  first_name: "John",
  last_name: "Doe",
  rank: "TSgt",
  email: "john.doe@example.com",
  phone: "999-999-9999",
  organization: "Delta 1",
  crew: "Alpha",
  position: "CSS",
  permissions: "user",
};

describe("Edit component", () => {
  test("openmodal function when Edit button is clicked", () => {
    render(<Edit id={1} currentData={dummyCurrentData} />);

    // Edit button is clicked
    fireEvent.click(screen.getByText(/Edit/));

    expect(screen.getByText(/Edit Item/)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toHaveValue("John");
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue("Doe");
    expect(screen.getByLabelText(/Rank/i)).toHaveValue("TSgt");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("john.doe@example.com");
    expect(screen.getByLabelText(/Duty Phone/i)).toHaveValue("999-999-9999");
    expect(screen.getByLabelText(/Organization/i)).toHaveValue("Delta 1");
    expect(screen.getByLabelText(/Crew/i)).toHaveValue("Alpha");
    expect(screen.getByLabelText(/Position/i)).toHaveValue("CSS");
  });

  test("closeModal function when cancel button is clicked", () => {
    render(<Edit id={1} currentData={dummyCurrentData} />);

    fireEvent.click(screen.getByText(/Edit/));
    expect(screen.getByText(/Edit Item/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Cancel/));
    expect(screen.queryByText(/Edit Item/)).not.toBeInTheDocument();
  });
});
