import { Character } from "@/domain/models";
import { LoadCharacters } from "@/domain/features";
import { HttpClient } from "@/data/contracts";

export class RemoteLoadCharacters implements LoadCharacters {
  constructor(private readonly httpClient: HttpClient) {}

  async loadAll(page: number = 1, limit: number = 10): Promise<Character[]> {
    const result = await this.httpClient.request("/characters", "get", {
      params: {
        offset: (page - 1) * limit,
        limit,
      },
    });

    return this.mapDataToModel(result.data.data.results);
  }

  private mapDataToModel(characters: any[]): Character[] {
    return characters.map((character) => ({
      id: character.id,
      name: character.name,
      description: character.description,
      resourceURI: character.resourceURI,
      thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
    }));
  }
}
