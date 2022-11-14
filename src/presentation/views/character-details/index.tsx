import React, { useEffect } from "react";
import styles from "./styles.module.scss";

import { LoadCharactersDetails } from "@/domain/features";
import { HttpClientAxiosAdapter } from "@/infra/http";

type CharacterDetailsProps = {
  loadCharactersDetails: LoadCharactersDetails;
};

new HttpClientAxiosAdapter().request("/characters/1011334/comics", "get").then(res => console.log(res))

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({ loadCharactersDetails }: CharacterDetailsProps) => {
  useEffect(() => {
    loadCharactersDetails.load(1)
      .then()
      .catch();
  }, []);

  return <div className={styles.characterDetailsWrapper}>teste</div>;
};
