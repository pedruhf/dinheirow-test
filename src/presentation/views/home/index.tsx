import React, { useEffect, useState } from "react";

import { Character } from "@/domain/models";
import { LoadCharacters } from "@/domain/features";
import { CharacterCard, Pagination } from "@/presentation/components";

import styles from "./styles.module.scss";

type HomeProps = {
  loadCharacters: LoadCharacters;
};

export const Home: React.FC<HomeProps> = ({ loadCharacters }: HomeProps) => {
  const reqLength = 24;
  const [currentPage, setCurrentPage] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);

  const handleNextPage = async () => {
    const result = await loadCharacters.loadAll(currentPage + 1, reqLength);
    setCurrentPage((prevState) => prevState + 1);
    setCharacters(result);
  };

  const handlePrevPage = async () => {
    const result = await loadCharacters.loadAll(currentPage - 1, reqLength);
    setCurrentPage((prevState) => prevState - 1);
    setCharacters(result);
  };

  useEffect(() => {
    loadCharacters
      .loadAll(currentPage, reqLength)
      .then((result) => setCharacters(result))
      .catch((err) => alert(err));
  }, []);

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.characteCardsWrapper}>
        {characters.map((item) => (
          <CharacterCard {...item} key={item.id} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={10} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />
    </div>
  );
};
