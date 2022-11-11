import React from "react";

import { Character } from "@/domain/models";
import { CharacterCard } from "@/presentation/components/character-card";

import styles from "./styles.module.scss";

export const Home: React.FC = () => {
  const mock: Character[] = [
    { id: 1, description: "um boyzinho muito louco q solta teia", name: "Homem Aranha", resourceURI: "anu_rui", thumbnail: "https://images.unsplash.com/photo-1502230831726-fe5549140034?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" },
    { id: 2, description: "um boyzinho muito louco q solta teia", name: "Homem Aranha", resourceURI: "anu_rui", thumbnail: "https://images.unsplash.com/photo-1502230831726-fe5549140034?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" },
    { id: 3, description: "um boyzinho muito louco q solta teia", name: "Homem Aranha", resourceURI: "anu_rui", thumbnail: "https://images.unsplash.com/photo-1502230831726-fe5549140034?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" },
  ];

  return (
    <div className={styles.homeWrapper}>
      {mock.map((item) => (
        <CharacterCard {...item} key={item.id} />
      ))}
    </div>
  );
};
