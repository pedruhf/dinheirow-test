import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Comic } from "@/domain/models";
import { LoadCharactersComics } from "@/domain/features";
import { ComicCard, Pagination } from "@/presentation/components";
import { useStringFilterSetup } from "@/presentation/hooks";

import styles from "./styles.module.scss";

type CharacterDetailsProps = {
  loadCharactersComics: LoadCharactersComics;
};

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({ loadCharactersComics }: CharacterDetailsProps) => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [comics, setComics] = useState<Comic[]>([]);
  const [filteredComics, setFilteredComics] = useState([]);
  const [totalComics, setTotalComics] = useState(0);
  const [loadError, setLoadError] = useState("");
  const useStringFilter = useStringFilterSetup((array) => setFilteredComics(array));

  const handleNextPage = async () => {
    setCurrentPage((prevState) => prevState + 1);
    const result = await loadCharactersComics.loadAll(Number(id));
    setComics(result.comics);
    setFilteredComics(result.comics);
  };

  const handlePrevPage = async () => {
    setCurrentPage((prevState) => prevState - 1);
    const result = await loadCharactersComics.loadAll(Number(id));
    setComics(result.comics);
    setFilteredComics(result.comics);
  };

  useEffect(() => {
    loadCharactersComics.loadAll(Number(id))
      .then((result) => {
        setComics(result.comics);
        setFilteredComics(result.comics);
        setTotalComics(result.totalComics);
      })
      .catch((err) => setLoadError(err.message));
  }, []);

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.searchFilter}>
        <input
          data-testid="search-filter"
          type="text"
          placeholder="Filtrar por titulo"
          onChange={(event) => useStringFilter(event.target.value, comics, "title")}
        />
      </div>

      <div className={styles.comicCardsWrapper}>
        {filteredComics.map((item) => (
          <Link data-testid="link" to={{ pathname: `/comics/details/${item.id}` }} key={item.id}>
            <ComicCard {...item} />
          </Link>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={1} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />

      {loadError.length && <div data-testid="load-error">{loadError}</div>}
    </div>
  );
};
