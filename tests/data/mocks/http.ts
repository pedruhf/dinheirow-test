import { HttpClient } from "@/data/contracts";
import { characterMock } from "@/tests/domain/mocks";

export const makeFakeHttpClient = (): HttpClient => ({
  request: jest.fn().mockReturnValue({
    statusCode: 200,
    data: [characterMock()],
  }),
});
