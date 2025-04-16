import MyRequests from "../../src/Routes/MyRequests";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../src/Context/AuthContext";
import { MemoryRouter } from "react-router-dom";

describe("MyRequests Component", () => {
  test("renders request list", () => {
    const mockUser = { id: 1 };
    const mockRequests = [
      {
        chatId: 101,
        title: "Mock Meeting",
        description: "Discuss test cases",
        startDate: "2025-04-10T10:00:00Z",
        endDate: "2025-04-10T11:00:00Z",
        status: "approved",
      },
      {
        chatId: 102,
        title: "Planning Session",
        description: "Feature roadmap discussion",
        startDate: "2025-04-12T13:00:00Z",
        endDate: "2025-04-12T14:30:00Z",
        status: "pending",
      },
    ];

    render(
      <AuthProvider value={{ user: mockUser }}>
        <MemoryRouter>
          <MyRequests requests={mockRequests} />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText(/your requests/i)).toBeInTheDocument();
    expect(screen.getByText(/mock meeting/i)).toBeInTheDocument();
    expect(screen.getByText(/planning session/i)).toBeInTheDocument();
  });
});
