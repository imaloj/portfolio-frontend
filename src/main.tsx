import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import ErrorBoundary from "./Component/ErrorBoundary.tsx"

console.log("Initializing app...")

// Add a small delay before rendering to ensure the loader is visible
setTimeout(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  )
}, 100)