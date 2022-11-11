import React from "react";

import styles from "./styles.module.scss";

type CharacterCardProps = {
  name: string;
  description: string;
  thumbnail: string;
};

export const CharacterCard: React.FC<CharacterCardProps> = ({ name, description, thumbnail }: CharacterCardProps) => {
  return (
    <div className={styles.characterCardWrapper}>
      <div className={styles.characterThumbnail} style={{ backgroundImage: `url(${thumbnail})` }}></div>
      <div className={styles.characterInfo}>
        <strong className={styles.characterName}>{name}</strong>
        <strong className={styles.characterDescription}>
          Descrição: <p>{description}</p>
        </strong>
      </div>
    </div>
  );
};
