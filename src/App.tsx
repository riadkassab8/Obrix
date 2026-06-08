import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LazyMotion, domAnimation } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LangProvider } from "./contexts/LangContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { lazy, Suspense } from "react";

const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
const Projects = lazy(() => import("@/pages/Projects"));
const Contact = lazy(() => import("@/pages/Contact"));
const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const TooltipProvider = lazy(() => import("@/components/ui/tooltip").then(m => ({ default: m.TooltipProvider })));

const queryClient = new QueryClient();

function Router() {
  return (
    <ErrorBoundary>
      <main>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ color: "var(--text)" }}>Loading...</div>}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/projects" component={Projects} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LangProvider>
            <Suspense fallback={null}>
              <TooltipProvider>
                <WouterRouter base="">
                  <Router />
                </WouterRouter>
                <Toaster />
              </TooltipProvider>
            </Suspense>
          </LangProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </LazyMotion>
  );
}

export default App;
