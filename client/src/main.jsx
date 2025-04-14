import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { AuthProvider } from "./Context/AuthContext";
import { ThemeProvider } from "./Context/ThemeContex.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<ThemeProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</AuthProvider>
);
