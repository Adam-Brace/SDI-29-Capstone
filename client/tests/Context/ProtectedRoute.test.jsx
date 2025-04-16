import ProtectedRoute from "../../src/Context/ProtectedRoute";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.resetModules();
    navigateMock.mockClear();
  });

  test("redirects to login when user is not authenticated", async () => {
    vi.doMock("../../src/Context/AuthContext", async () => {
      const actual = await import("../../src/Context/AuthContext");
      return {
        ...actual,
        useAuth: () => ({ user: null }),
      };
    });

    const { default: ProtectedRoute } = await import(
      "../../src/Context/ProtectedRoute"
    );

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/login", { replace: true });
    });
  });

  test("renders children when user is authenticated", async () => {
    vi.doMock("../../src/Context/AuthContext", async () => {
      const actual = await import("../../src/Context/AuthContext");
      return {
        ...actual,
        useAuth: () => ({ user: { permissions: "user" } }),
      };
    });

    const { default: ProtectedRoute } = await import(
      "../../src/Context/ProtectedRoute"
    );

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
