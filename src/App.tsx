import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LazyMotion, domAnimation } from "framer-motion";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LangProvider } from "./contexts/LangContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { lazy, Suspense } from "react";

const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const TooltipProvider = lazy(() => import("@/components/ui/tooltip").then(m => ({ default: m.TooltipProvider })));

const queryClient = new QueryClient();

function Router() {
  return (
    <ErrorBoundary>
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route component={NotFound} />
        </Switch>
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
