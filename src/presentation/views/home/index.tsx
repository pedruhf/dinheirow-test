import React, { useEffect, useState } from "react";

import { Character } from "@/domain/models";
import { LoadCharacters } from "@/domain/features";
import { CharacterCard } from "@/presentation/components";

import styles from "./styles.module.scss";

type HomeProps = {
  loadCharacters: LoadCharacters;
}

export const Home: React.FC<HomeProps> = ({ loadCharacters }: HomeProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    loadCharacters.loadAll(1, 10)
    .then(result => setCharacters(result))
    .catch(err => alert(err));
  }, [])

  return (
    <div data-testid="character-list" className={styles.homeWrapper}>
      {characters.map((item) => (
        <CharacterCard {...item} key={item.id} />
      ))}
    </div>
  );
};
