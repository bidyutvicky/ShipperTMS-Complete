
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Shipments from "./pages/Shipments";
import Planning from "./pages/Planning";
import Carriers from "./pages/Carriers";
import Execution from "./pages/Execution";
import Tracking from "./pages/Tracking";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Procurement from "./pages/Procurement";
import Settings from "./pages/Settings";
import AIInsights from "./pages/AIInsights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/carriers" element={<Carriers />} />
          <Route path="/execution" element={<Execution />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/procurement" element={<Procurement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
