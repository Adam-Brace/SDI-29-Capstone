import ProtectedRoute from "../../src/Context/ProtectedRoute";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../src/Context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/Context/AuthContext";

describe("ProtectedRoute", () => {
  const MockComponent = () => <div>Protected Content</div>;

  test("redirects to login when user is not authenticated", () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/protected"]}>
          <ProtectedRoute>
            <MockComponent />
          </ProtectedRoute>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  //   test("renders children when user is authenticated", () => {
  //     const mockUser = { permissions: "user" };

  //     render(
  //       <AuthContext.Provider value={{ user: mockUser }}>
  //         <MemoryRouter initialEntries={["/protected"]}>
  //           <ProtectedRoute>
  //             <MockComponent />
  //           </ProtectedRoute>
  //         </MemoryRouter>
  //       </AuthContext.Provider>
  //     );

  //     expect(screen.getByText("Protected Content")).toBeInTheDocument();
  //   });
});
