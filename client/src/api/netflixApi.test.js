import {
  fetchMovieData,
  fetchMovies,
  getVideoPath,
  homePageLogin,
  loginUser,
  logoutUser,
  registerUser,
  uploadMovie,
} from "./netflixApi";

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
  it("calls correct endpoint for home page login and return login result", async () => {
    const mockEmail = "test@example.com";
    const mockResponse = { success: true };

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    );

    const loginResult = await homePageLogin(mockEmail);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_NETFLIX_API_URL}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: mockEmail }),
      },
    );

    expect(loginResult).toEqual(mockResponse);
  });

  it("calls correct endpoint for login and return login result", async () => {
    const mockEmail = "test@example.com";
    const mockPassword = "example123";
    const mockResponse = { success: true };

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    );

    const loginResult = await loginUser(mockEmail, mockPassword);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_NETFLIX_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: mockEmail, password: mockPassword }),
      },
    );

    expect(loginResult).toEqual(mockResponse);
  });

  it("calls correct endpoint for logout and return logout result", async () => {
    const mockResponse = { success: true };

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    );

    await logoutUser();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_NETFLIX_API_URL}/api/auth/logout`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
    );
  });

  it("calls correct endpoint for user registration and returns registration result", async () => {
    const mockUserData = {
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
      phoneNumber: "123456789",
    };
    const mockResponse = { success: true };

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    );

    const registrationResult = await registerUser(mockUserData);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_NETFLIX_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockUserData),
      },
    );

    expect(registrationResult).toEqual(mockResponse);
  });

  it("calls correct endpoint for fetching movie data and returns movie data", async () => {
    const mockMovieId = "12345";
    const mockResponse = {
      title: "Test Movie",
      description: "This is a test movie description.",
      length: "2h3min",
      type: "War",
      imageUrl: "https://example.com/test-movie.jpg",
      category: "Trending",
      videoFolder: "test-movie",
    };

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      }),
    );

    const movieData = await fetchMovieData(mockMovieId);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_NETFLIX_API_URL}/api/movies/${mockMovieId}`,
    );

    expect(movieData).toEqual(mockResponse);
  });

  it("throws and error when fetching movie data fails", async () => {
    const mockMovieId = "12345";

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      }),
    );

    await expect(fetchMovieData(mockMovieId)).rejects.toThrow(
      "Failed to fetch movie data",
    );

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_NETFLIX_API_URL}/api/movies/${mockMovieId}`,
    );
  });

  it("returns correct video path for correct video folder", () => {
    const mockVideoFolder = "test-movie-folder";
    const expectedVideoPath = `${process.env.REACT_APP_NETFLIX_API_URL}/api/stream/${encodeURIComponent(mockVideoFolder)}`;
    const videoPath = getVideoPath(mockVideoFolder);

    expect(videoPath).toEqual(expectedVideoPath);
  });

  it("uploads movie data to the server", async () => {
    const mockMovieData = {
      title: "Test Movie",
      description: "This is a test movie description.",
      length: "2h3min",
      type: "War",
      imageUrl: "https://example.com/test-movie.jpg",
      category: "Trending",
      videoFolder: "test-movie",
    };
    const mockResponse = { success: true };

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    );

    const uploadResult = await uploadMovie(mockMovieData);

    const formData = new FormData();
    formData.append("title", mockMovieData.title);
    formData.append("description", mockMovieData.description);
    formData.append("length", mockMovieData.length);
    formData.append("type", mockMovieData.type);
    formData.append("imageUrl", mockMovieData.imageUrl);
    formData.append("category", mockMovieData.category);
    formData.append("video", mockMovieData.videoFolder);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_NETFLIX_API_URL}/api/movies`,
      {
        method: "POST",
        body: formData,
      },
    );

    expect(uploadResult).toEqual(true);
  });
});
