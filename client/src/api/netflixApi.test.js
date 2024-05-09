import { fetchMovies } from "./netflixApi";

const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);

global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
});

describe("Netflix API", () => {
  it("calls correct endpoint for fetch movies and returns list of movies", async () => {
    const mockMovies = [
      {
        title: "Test title",
        type: "Comedy",
      },
      {
        title: "Another title",
        type: "Thriller",
      },
    ];

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockMovies),
      }),
    );

    const movies = await fetchMovies();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_NETFLIX_API_URL}/api/movies`,
    );

    expect(movies).toBeTruthy();
  });
});
