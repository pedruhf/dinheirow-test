import React, { useEffect } from "react";
import styles from "./styles.module.scss";

import { LoadCharactersComics } from "@/domain/features";

type CharacterDetailsProps = {
  loadCharactersComics: LoadCharactersComics;
};

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({ loadCharactersComics }: CharacterDetailsProps) => {
  useEffect(() => {
    loadCharactersComics.loadAll(1)
      .then()
      .catch();
  }, []);

  return <div className={styles.characterDetailsWrapper}>teste</div>;
};
