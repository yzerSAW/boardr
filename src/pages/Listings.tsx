import { useState, useMemo } from "react";
import { getUserPlan } from "@/lib/subscriptionStore";
import { getUser } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, X, MapPin } from "lucide-react";

import { mockListings, schools, roomTypes } from "@/lib/mockData";
import ListingCard from "@/components/ListingCard";
import { motion, AnimatePresence } from "framer-motion";

const Listings = () => {
  const [search, setSearch] = useState("");
  const [school, setSchool] = useState("all");
  const [roomType, setRoomType] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const user = getUser();
const navigate = useNavigate();

useEffect(() => {
  if (!user) {
    navigate("/login");
  }
}, []);

  const plan = getUserPlan();

  // ✅ load user listings
  const userListings = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("listings") || "[]");
    } catch {
      return [];
    }
  }, []);

  // ✅ merge mock + user
  const allListings = useMemo(() => {
    return [...mockListings, ...userListings];
  }, [userListings]);

  const activeFilterCount = [
    school !== "all",
    roomType !== "all",
    availableOnly,
    verifiedOnly,
    maxPrice !== "all",
  ].filter(Boolean).length;

  // ✅ FINAL FILTER (FIXED)
  const filtered = useMemo(() => {
    let data = [...allListings];

    // 🔒 FREE PLAN LIMIT
    if (plan === "free") {
      data = data.slice(0, 4);
    }

    return data.filter((l) => {
      const type = l.roomType || l.type;

      if (
        search &&
        !l.title.toLowerCase().includes(search.toLowerCase()) &&
        !l.address.toLowerCase().includes(search.toLowerCase())
      )
        return false;

      if (school !== "all" && l.school !== school) return false;

      if (roomType !== "all" && type !== roomType) return false;

      if (availableOnly && !l.available) return false;

      if (verifiedOnly && !l.verified) return false;

      if (maxPrice !== "all" && l.price > Number(maxPrice)) return false;

      return true;
    });
  }, [
    allListings,
    search,
    school,
    roomType,
    availableOnly,
    verifiedOnly,
    maxPrice,
    plan,
  ]);

  const clearFilters = () => {
    setSchool("all");
    setRoomType("all");
    setAvailableOnly(false);
    setVerifiedOnly(false);
    setMaxPrice("all");
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
            <MapPin className="w-4 h-4" /> Cagayan de Oro City
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Find Your Boarding House
          </h1>

          <p className="text-muted-foreground">
            Browse verified rentals near your campus
          </p>
        </motion.div>

        {/* SEARCH */}
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 bg-yellow-500 text-xs px-2 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        {/* FILTERS */}
        <AnimatePresence>
          {showFilters && (
            <motion.div>
              <div className="border p-4 rounded-xl mb-6 space-y-4">

                <Select value={school} onValueChange={setSchool}>
                  <SelectTrigger>
                    <SelectValue placeholder="School" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Schools</SelectItem>
                    {schools.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={roomType} onValueChange={setRoomType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Room Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {roomTypes.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={maxPrice} onValueChange={setMaxPrice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Max Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="2000">₱2,000</SelectItem>
                    <SelectItem value="3000">₱3,000</SelectItem>
                    <SelectItem value="4000">₱4,000</SelectItem>
                    <SelectItem value="5000">₱5,000</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-4">
                  <label>
                    <Checkbox
                      checked={availableOnly}
                      onCheckedChange={(v) => setAvailableOnly(!!v)}
                    />
                    Available
                  </label>

                  <label>
                    <Checkbox
                      checked={verifiedOnly}
                      onCheckedChange={(v) => setVerifiedOnly(!!v)}
                    />
                    Verified
                  </label>
                </div>

                <Button onClick={clearFilters} variant="ghost">
                  <X className="w-4 h-4" /> Clear
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RESULTS */}
        <p className="mb-4 text-sm text-muted-foreground">
          {filtered.length} listings found
        </p>

        {/* LISTINGS */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No listings found
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;