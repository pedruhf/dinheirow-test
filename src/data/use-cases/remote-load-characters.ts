import { Character } from "@/domain/models";
import { LoadCharacters } from "@/domain/features";
import { HttpClient } from "@/data/contracts";

export class RemoteLoadCharacters implements LoadCharacters {
  constructor(private readonly httpClient: HttpClient) {}

  async loadAll(page: number = 1, limit: number = 10): Promise<Character[]> {
    const result = await this.httpClient.request("any_url", "get", {
      params: {
        page,
        limit,
      },
    });
    return result.data;
  }
}
