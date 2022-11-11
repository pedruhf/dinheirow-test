import { characterMock } from "@/tests/domain/mocks";
import { RemoteLoadCharacters } from "@/data/use-cases";
import { makeFakeHttpClient } from "@/tests/data/mocks";

const makeSut = () => {
  const httpClientStub = makeFakeHttpClient();
  const sut = new RemoteLoadCharacters(httpClientStub);
  return { sut, httpClientStub };
};

describe("RemoteLoadCharacters Use Case", () => {
  test("should call httpClient with correct input", async () => {
    const { sut, httpClientStub } = makeSut();
    const requestSpy = jest.spyOn(httpClientStub, "request");
    await sut.loadAll(2, 50);

    expect(requestSpy).toHaveBeenCalledWith("/characters", "get", {
      params: {
        offset: 50,
        limit: 50,
      },
    });
  });

  test("should call httpClient with correct input and default params", async () => {
    const { sut, httpClientStub } = makeSut();
    const requestSpy = jest.spyOn(httpClientStub, "request");
    await sut.loadAll();

    expect(requestSpy).toHaveBeenCalledWith("/characters", "get", {
      params: {
        offset: 0,
        limit: 10,
      },
    });
  });

  test("should return a character list on success", async () => {
    const { sut } = makeSut();
    const result = await sut.loadAll();

    expect(result).toEqual([characterMock()]);
  });

  test("should rethrow if httpClient throws", async () => {
    const { sut, httpClientStub } = makeSut();
    jest.spyOn(httpClientStub, "request").mockRejectedValueOnce(new Error("request error"));
    const resultPromise = sut.loadAll();

    await expect(resultPromise).rejects.toThrow(new Error("request error"));
  });
});
