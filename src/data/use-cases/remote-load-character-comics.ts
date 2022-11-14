import { Comic } from "@/domain/models";
import { LoadCharactersComics } from "@/domain/features";
import { HttpClient } from "@/data/contracts";

export class RemoteLoadCharacterComics implements LoadCharactersComics {
  constructor(private readonly httpClient: HttpClient) {}

  async loadAll(id: number): Promise<Comic[]> {
    const result = await this.httpClient.request(`/characters/${id}/comics`, "get")
    return this.mapDataToModel(result.data);
  }

  private mapDataToModel(data: Record<any, any>): Comic[] {
    return data.data.results.map((comic) => ({
      id: comic.id,
      title: comic.title,
      description: comic.description,
      thumbnail: comic.thumbnail.path.includes("image_not_available")
        ? "https://midias.correiobraziliense.com.br/_midias/jpg/2021/05/03/675x450/1_marvel_studios_logo-6637962.jpeg?20220621151438?20220621151438"
        : `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    }));
  }
}
