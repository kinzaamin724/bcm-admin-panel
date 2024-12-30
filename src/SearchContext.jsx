import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(true);
  const location = useLocation();

  useEffect(() => {
    console.log("SearchProvider rendered"); // Debugging log
    if (
      location.pathname === "/edit-user" ||
      location.pathname === "/view-user" ||
      location.pathname === "/view " ||
      location.pathname === "/create-post" ||
      location.pathname === "/sell-items" ||
      location.pathname === "/view-details" ||
      location.pathname === "/create-notofication" ||
      location.pathname === "/view-notification"
    ) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  }, [location]);

  return (
    <SearchContext.Provider value={{ showSearch, setShowSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  console.log("useSearchContext called"); // Debugging log
  return useContext(SearchContext);
};
