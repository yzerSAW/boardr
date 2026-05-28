import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getUser, logout } from "@/lib/auth";

const navLinks = [
  { to: "/listings", label: "Listings" },
  { to: "/contact", label: "Contact" },
  { to: "/pricing", label: "Pricing" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const user = getUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const isHome = location.pathname === "/";
  const navBg =
    scrolled || !isHome
      ? "bg-foreground/95 backdrop-blur-xl shadow-elevated"
      : "bg-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="container mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link
          to="/"
          className="font-display font-bold text-2xl text-background flex items-center gap-1"
        >
          BOARD<span className="text-gold">R</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            // 🔒 HIDE PRICING WHEN NOT LOGGED IN
            if (link.to === "/pricing" && !user) return null;

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-display font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-gold bg-gold/10"
                    : "text-background/70 hover:text-gold hover:bg-background/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-2">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-background/80 hover:text-gold">
                  <LogIn className="w-4 h-4" /> Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button size="sm" className="bg-gold text-foreground hover:bg-gold/90">
                  <UserPlus className="w-4 h-4" /> Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="border-red-400 text-red-300"
              onClick={() => {
                logout();
                navigate("/");
                window.location.reload();
              }}
            >
              Logout
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-background p-2 rounded-lg hover:bg-background/10"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-foreground/98 backdrop-blur-xl border-t border-background/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">

              {/* Nav Links */}
              {navLinks.map((link) => {
                if (link.to === "/pricing" && !user) return null;

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-4 py-3 rounded-lg font-display text-sm ${
                      location.pathname === link.to
                        ? "text-gold bg-gold/10"
                        : "text-background/70 hover:text-gold hover:bg-background/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Auth Mobile */}
              <div className="flex gap-2 pt-3 border-t border-background/10 mt-3">
                {!user ? (
                  <>
                    <Link to="/login" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <LogIn className="w-4 h-4" /> Login
                      </Button>
                    </Link>

                    <Link to="/signup" className="flex-1">
                      <Button size="sm" className="w-full bg-gold text-foreground">
                        <UserPlus className="w-4 h-4" /> Sign Up
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      logout();
                      navigate("/");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;