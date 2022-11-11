export type ComicItem = {
  resourceURI: string;
  name: string;
}

export type Comic = {
  available: number;
  collectionURI: string,
  item: ComicItem[];
}
