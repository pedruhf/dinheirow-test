import React, { useEffect, useState } from "react";

import { Character } from "@/domain/models";
import { LoadCharacters } from "@/domain/features";
import { CharacterCard, Pagination } from "@/presentation/components";
import { useStringFilterSetup } from "@/presentation/hooks";

import styles from "./styles.module.scss";

type HomeProps = {
  loadCharacters: LoadCharacters;
};

export const Home: React.FC<HomeProps> = ({ loadCharacters }: HomeProps) => {
  const reqLength = 24;
  const [currentPage, setCurrentPage] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loadError, setLoadError] = useState("");
  const useStringFilter = useStringFilterSetup((array) => setFilteredCharacters(array));

  const handleNextPage = async () => {
    setCurrentPage((prevState) => prevState + 1);
    const result = await loadCharacters.loadAll(currentPage + 1, reqLength);
    setCharacters(result);
    setFilteredCharacters(result);
  };

  const handlePrevPage = async () => {
    setCurrentPage((prevState) => prevState - 1);
    const result = await loadCharacters.loadAll(currentPage - 1, reqLength);
    setCharacters(result);
    setFilteredCharacters(result);
  };

  useEffect(() => {
    loadCharacters
      .loadAll(currentPage, reqLength)
      .then((result) => {
        setCharacters(result);
        setFilteredCharacters(result);
      })
      .catch((err) => setLoadError(err.message));
  }, []);

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.searchFilter}>
        <input
          data-testid="search-filter"
          type="text"
          placeholder="Filtrar por nome"
          onChange={(event) => useStringFilter(event.target.value, characters, "name")}
        />
      </div>

      <div className={styles.characterCardsWrapper}>
        {filteredCharacters.map((item) => (
          <CharacterCard {...item} key={item.id} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={10} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />

      {loadError.length && <div data-testid="load-error">{loadError}</div>}
    </div>
  );
};
