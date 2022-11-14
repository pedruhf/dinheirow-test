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
  const reqLength = 12;
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [comics, setComics] = useState<Comic[]>([]);
  const [filteredComics, setFilteredComics] = useState([]);
  const [totalComics, setTotalComics] = useState(0);
  const [loadError, setLoadError] = useState("");
  const useStringFilter = useStringFilterSetup((array) => setFilteredComics(array));

  const handleNextPage = async () => {
    setCurrentPage((prevState) => prevState + 1);
    const result = await loadCharactersComics.loadAll(Number(id), currentPage + 1, reqLength);
    setComics(result.comics);
    setFilteredComics(result.comics);
  };

  const handlePrevPage = async () => {
    setCurrentPage((prevState) => prevState - 1);
    const result = await loadCharactersComics.loadAll(Number(id), currentPage - 1, reqLength);
    setComics(result.comics);
    setFilteredComics(result.comics);
  };

  useEffect(() => {
    loadCharactersComics
      .loadAll(Number(id), currentPage, reqLength)
      .then((result) => {
        setComics(result.comics);
        setFilteredComics(result.comics);
        setTotalComics(result.totalComics);
      })
      .catch((err) => setLoadError(err.message));
  }, []);

  return (
    <div className={styles.characterDetailsWrapper}>
      <Link data-testid="back-button" to={{ pathname: "/" }} className={styles.backButton}>
        <div>&larr;</div>
        <span>Back</span>
      </Link>
      {filteredComics.length > 0 && (
        <div className={styles.searchFilter}>
          <input
            data-testid="search-filter"
            type="text"
            placeholder="Filtrar por titulo"
            onChange={(event) => useStringFilter(event.target.value, comics, "title")}
          />
        </div>
      )}

      <div className={styles.comicCardsWrapper}>
        {filteredComics.length === 0 ? (
          <div className={styles.noData}>Nenhum dado encontrado</div>
        ) : (
          filteredComics.map((item) => <ComicCard {...item} key={item.id} />)
        )}
      </div>

      {filteredComics.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalComics / reqLength)}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      )}
      {loadError && <div data-testid="load-error">{loadError}</div>}
    </div>
  );
};
