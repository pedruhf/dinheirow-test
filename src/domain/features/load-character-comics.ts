import { Comic } from "@/domain/models";

export interface LoadCharactersComics {
  loadAll: (id: number) => Promise<Comic[]>;
}
