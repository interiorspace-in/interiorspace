import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GetEstimate from "./pages/GetEstimate";
import NotFound from "./pages/NotFound";
import FullHomeInteriors from "./pages/services/FullHomeInteriors";
import ModularKitchens from "./pages/services/ModularKitchens";
import LivingRooms from "./pages/services/LivingRooms";
import Bedrooms from "./pages/services/Bedrooms";
import Wardrobes from "./pages/services/Wardrobes";
import SofaDining from "./pages/services/SofaDining";
import EntranceFoyer from "./pages/services/EntranceFoyer";
import OfficeSpaces from "./pages/services/OfficeSpaces";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/get-estimate" element={<GetEstimate />} />
          <Route path="/services/full-home-interiors" element={<FullHomeInteriors />} />
          <Route path="/services/modular-kitchens" element={<ModularKitchens />} />
          <Route path="/services/living-rooms" element={<LivingRooms />} />
          <Route path="/services/bedrooms" element={<Bedrooms />} />
          <Route path="/services/wardrobes" element={<Wardrobes />} />
          <Route path="/services/sofa-dining" element={<SofaDining />} />
          <Route path="/services/entrance-foyer" element={<EntranceFoyer />} />
          <Route path="/services/office-spaces" element={<OfficeSpaces />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
