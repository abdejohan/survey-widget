import React from "react";
import "./index.css";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";

//const container = document.getElementById("app-root")!;
// Find all widget divs
const widgets = document.querySelectorAll(".survey-widget")!;

// Inject our React App into each
widgets.forEach((widget) => {
	const root = ReactDOMClient.createRoot(widget);
	return root.render(
		<React.StrictMode>
			<App widget={widget} />
		</React.StrictMode>
	);
});
