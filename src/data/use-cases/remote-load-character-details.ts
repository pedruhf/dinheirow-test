import { Character } from "@/domain/models";
import { LoadCharactersDetails } from "@/domain/features";
import { HttpClient } from "@/data/contracts";

export class RemoteLoadCharacterDetails implements LoadCharactersDetails {
  constructor(private readonly httpClient: HttpClient) {}

  async load(id: number): Promise<Character> {
    const result = await this.httpClient.request(`/characters/${id}`, "get")
    return this.mapDataToModel(result.data);
  }

  private mapDataToModel(data: Record<any, any>): Character {
    const character = data.data.results;
    return {
      id: character.id,
      name: character.name,
      description: character.description,
      resourceURI: character.resourceURI,
      thumbnail: character.thumbnail.path.includes("image_not_available")
        ? "https://midias.correiobraziliense.com.br/_midias/jpg/2021/05/03/675x450/1_marvel_studios_logo-6637962.jpeg?20220621151438?20220621151438"
        : `${character.thumbnail.path}.${character.thumbnail.extension}`,
    };
  }
}
