import PersonsGrid from "components/personsGrid";
import React from "react";
import { useSelector } from 'react-redux';

function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites);

  return (
    <div>
      <h2>Favorite Users</h2>
      <PersonsGrid
        users={favorites}
        favorite={true}
      />
    </div>
  );
}

export default FavoritesPage;
