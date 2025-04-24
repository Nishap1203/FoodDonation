// src/pages/SearchNGO.tsx

import React from "react";
import SearchNGOMap from "../components/donations/SearchNgo";

const SearchNGO: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">Find Nearby NGOs</h2>
      <SearchNGOMap />
    </div>
  );
};

export default SearchNGO;


