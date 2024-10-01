import React from "react";  
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp";
import "./main.css";  

const container = document.getElementById("root");

// Create a React root and render MyApp
const root = ReactDOMClient.createRoot(container);
root.render(<MyApp />); 