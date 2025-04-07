import { render, screen, fireEvent, queryByText } from "@testing-library/react";
import Edit from "./Edit";

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
};

describe("Edit component", () => {
  test("openmodal function when Edit button is clicked", () => {
    render(<Edit id={1} currentData={dummyCurrentData} />);

    // Edit button is clicked
    fireEvent.click(screen.getByText(/Edit/));

    expect(screen.getByText(/Edit Item/)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name:/)).toHaveValue("John");
    expect(screen.getByLabelText(/Last Name:/)).toHaveValue("Doe");
    expect(screen.getByLabelText(/Rank:/)).toHaveValue("TSgt");
    expect(screen.getByLabelText(/Email:/)).toHaveValue("john.doe@example.com");
    expect(screen.getByLabelText(/Duty Phone:/)).toHaveValue("999-999-9999");
    expect(screen.getByLabelText(/Organization:/)).toHaveValue("Delta 1");
    expect(screen.getByLabelText(/Crew:/)).toHaveValue("Alpha");
    expect(screen.getByLabelText(/Position:/)).toHaveValue("CSS");
  });
});
