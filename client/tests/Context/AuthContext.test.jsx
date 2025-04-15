import AuthContext from "../../src/Context/AuthContext";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../src/Context/AuthContext";

describe("AuthContext", () => {
  test("renders AuthProvider without crashing", () => {
    render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>
    );
    const testElement = screen.getByText(/Test/i);
    expect(testElement).toBeInTheDocument();
  });
});
