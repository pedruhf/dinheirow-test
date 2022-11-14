import { RemoteLoadCharacterComics } from "@/data/use-cases";
import { HttpClientSpy } from "@/tests/data/mocks";
import { backendComicMock } from "@/tests/data/mocks";

const makeSut = () => {
  const httpClientStub = new HttpClientSpy();
  httpClientStub.data = {
    data: {
      results: [backendComicMock()],
    },
  };
  const sut = new RemoteLoadCharacterComics(httpClientStub);
  return { sut, httpClientStub };
};

describe("RemoteLoadCharacterComics Use Case", () => {
  test("should call httpClient with correct input", async () => {
    const { sut, httpClientStub } = makeSut();
    const requestSpy = jest.spyOn(httpClientStub, "request");
    await sut.loadAll(1);

    expect(requestSpy).toHaveBeenCalledWith("/characters/1/comics", "get");
  });

  test("should return a list of comics on success", async () => {
    const { sut } = makeSut();
    const result = await sut.loadAll(1);

    expect(result).toEqual([{
      ...backendComicMock(),
      thumbnail: `${backendComicMock().thumbnail.path}.${backendComicMock().thumbnail.extension}`,
    }]);
  });

  test("should rethrow if httpClient throws", async () => {
    const { sut, httpClientStub } = makeSut();
    jest.spyOn(httpClientStub, "request").mockRejectedValueOnce(new Error("request error"));
    const resultPromise = sut.loadAll(1);

    await expect(resultPromise).rejects.toThrow(new Error("request error"));
  });
});
