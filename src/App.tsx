import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import AdminCategories from "./pages/admin/Categories";
import Warehouse from "./pages/admin/Warehouse";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/:slug" element={<CategoryPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/auth" element={<Auth />} />
                  {/* Admin routes */}
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/admin/products" element={<Products />} />
                  <Route path="/admin/orders" element={<Orders />} />
                  <Route path="/admin/users" element={<Users />} />
                  <Route path="/admin/categories" element={<AdminCategories />} />
                  <Route path="/admin/warehouse" element={<Warehouse />} />
                  <Route path="/admin/reports" element={<Reports />} />
                  <Route path="/admin/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
