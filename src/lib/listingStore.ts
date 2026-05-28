import { mockListings, Listing } from "@/lib/mockData";

const STORAGE_KEY = "listings";

export const getListings = (): Listing[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const localListings = stored ? JSON.parse(stored) : [];

  // merge mock + user listings
  return [...mockListings, ...localListings];
};

export const addListing = (listing: Listing) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const current = stored ? JSON.parse(stored) : [];

  const updated = [...current, listing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};