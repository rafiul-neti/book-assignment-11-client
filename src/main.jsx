import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/Routes.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <RouterProvider router={router} />

        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                background: "#62ab00",
                color: "white",
              },
              duration: 5000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
