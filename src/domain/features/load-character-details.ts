import { Character } from "@/domain/models";

export interface LoadCharactersDetails {
  load: (id: number) => Promise<Character>;
}
