import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

const qc = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <MotionConfig reducedMotion="user">
        <BrowserRouter><App /></BrowserRouter>
        <Toaster theme="dark" />
      </MotionConfig>
    </QueryClientProvider>
  </React.StrictMode>
);

const loader = document.getElementById("loader");

const hideLoader = () => {
  if (!loader) return;
  loader.classList.add("hide");
  loader.addEventListener("transitionend", () => loader.remove(), { once: true });
  setTimeout(() => loader.remove(), 600); // fallback if transitionend never fires
};

const loaded =
  document.readyState === "complete"
    ? Promise.resolve()
    : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true }));

const MIN_MS = 3000; // loader stays up at least 3s total
const minTime = new Promise<void>((r) => setTimeout(r, Math.max(0, MIN_MS - performance.now())));

Promise.all([loaded, document.fonts.ready, minTime]).then(() => requestAnimationFrame(hideLoader));
setTimeout(hideLoader, 8000); // safety net
