import NotFound from "../../src/Components/NotFound";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../src/Context/AuthContext";
import { vi } from "vitest";
import { act } from "react";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("NotFound", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockNavigate.mockClear();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test("renders NotFound component", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(
      screen.getByRole("heading", { name: /404 Not Found/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Redirecting to home page in/i)
    ).toBeInTheDocument();
  });

  test("redirects to home page after countdown", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </AuthProvider>
    );

    act(() => {
      vi.advanceTimersByTime(1500 * 3);
    });

    act(() => {
      vi.advanceTimersByTime(1500 * 3);
    });

    act(() => {
      vi.advanceTimersByTime(1500 * 3);
    });

    act(() => {
      vi.advanceTimersByTime(1500 * 3);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
