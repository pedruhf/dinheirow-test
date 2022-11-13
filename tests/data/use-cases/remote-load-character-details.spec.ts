import { RemoteLoadCharacterDetails } from "@/data/use-cases";
import { backendCharacterMock, HttpClientSpy } from "@/tests/data/mocks";

const makeSut = () => {
  const httpClientStub = new HttpClientSpy();
  httpClientStub.data = {
    data: {
      results: backendCharacterMock(),
    },
  };
  const sut = new RemoteLoadCharacterDetails(httpClientStub);
  return { sut, httpClientStub };
};

describe("RemoteLoadCharacterDetails Use Case", () => {
  test("should call httpClient with correct input", async () => {
    const { sut, httpClientStub } = makeSut();
    const requestSpy = jest.spyOn(httpClientStub, "request");
    await sut.load(1);

    expect(requestSpy).toHaveBeenCalledWith("/characters/1", "get");
  });

  test("should return a character on success", async () => {
    const { sut } = makeSut();
    const result = await sut.load(1);

    expect(result).toMatchObject({
      ...backendCharacterMock(),
      thumbnail: `${backendCharacterMock().thumbnail.path}.${backendCharacterMock().thumbnail.extension}`,
    });
  });

  test("should return default thumbnail when string is included", async () => {
    const { sut, httpClientStub } = makeSut();
    httpClientStub.data = {
      data: {
        results: { ...backendCharacterMock(), thumbnail: { path: "image_not_available", extension: "png" } },
      },
    }
    const result = await sut.load(1);

    expect(result).toMatchObject({
      ...backendCharacterMock(),
      thumbnail:
        "https://midias.correiobraziliense.com.br/_midias/jpg/2021/05/03/675x450/1_marvel_studios_logo-6637962.jpeg?20220621151438?20220621151438",
    });
  });

  test("should rethrow if httpClient throws", async () => {
    const { sut, httpClientStub } = makeSut();
    jest.spyOn(httpClientStub, "request").mockRejectedValueOnce(new Error("request error"));
    const resultPromise = sut.load(1);

    await expect(resultPromise).rejects.toThrow(new Error("request error"));
  });
});
