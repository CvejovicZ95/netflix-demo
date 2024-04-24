// Mocked API URL
process.env.REACT_APP_NETFLIX_API_URL = "http://localhost:4500";

// Mocked fetch function
global.fetch = jest.fn();

// Import functions to be tested
import {
  fetchMovies,
  homePageLogin,
  loginUser,
  logoutUser,
  registerUser,
  fetchMovieData,
  getVideoPath,
  uploadMovie,
} from "../api/netflixApi";

describe("Test Cases for API Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchMovies function - Successful API Call", async () => {
    const mockData = [{ id: 1, title: "Sample Movie" }]; // Sample movie data
    fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });

    const data = await fetchMovies();

    expect(fetch).toHaveBeenCalledWith("http://localhost:4500/api/movies");
    expect(data).toEqual(mockData);
  });

  test("homePageLogin function - Successful Login", async () => {
    const mockData = { userId: 1, username: "test_user" }; // Sample user login data
    fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });

    const email = "test@example.com";
    const data = await homePageLogin(email);

    expect(fetch).toHaveBeenCalledWith("http://localhost:4500", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    expect(data).toEqual(mockData);
  });

  // Similar tests for other functions...
});

test("loginUser function - Successful Login", async () => {
  const mockData = { userId: 1, username: "test_user" }; // Sample user login data
  const email = "test@example.com";
  const password = "password123";

  fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });

  const data = await loginUser(email, password);

  expect(fetch).toHaveBeenCalledWith("http://localhost:4500/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  expect(data).toEqual(mockData);
});

test("logoutUser function - Successful Logout", async () => {
  const mockData = { message: "Logout successful" }; // Sample logout success message

  fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });

  await logoutUser();

  expect(fetch).toHaveBeenCalledWith("http://localhost:4500/api/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
});

test("registerUser function - Successful Registration", async () => {
  const mockData = { userId: 2, username: "new_user" }; // Sample user registration data
  const newUser = {
    email: "newuser@example.com",
    password: "newuserpassword",
    confirmPassword: "newuserpassword",
    phoneNumber: "1234567890",
  };

  fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });

  const data = await registerUser(newUser);

  expect(fetch).toHaveBeenCalledWith(
    "http://localhost:4500/api/auth/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    },
  );
  expect(data).toEqual(mockData);
});

test("fetchMovieData function - Successful Fetch", async () => {
  const movieId = 123; // Sample movie ID
  const mockData = { id: 123, title: "Sample Movie" }; // Sample movie data

  fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(mockData),
  });

  const data = await fetchMovieData(movieId);

  expect(fetch).toHaveBeenCalledWith(
    `http://localhost:4500/api/movies/${movieId}`,
  );
  expect(data).toEqual(mockData);
});

test("getVideoPath function - Returns Correct Path", () => {
  const videoFolder = "sample_video_folder"; // Sample video folder name
  const expectedPath = `http://localhost:4500/api/stream/${encodeURIComponent(videoFolder)}`;

  const path = getVideoPath(videoFolder);

  expect(path).toEqual(expectedPath);
});

test("uploadMovie function - Successful Upload", async () => {
  const mockData = { message: "Movie uploaded successfully" }; // Sample upload success message
  const formData = new FormData(); // Mocked FormData object

  // Populate FormData object with sample data
  formData.append("title", "Sample Movie");
  formData.append("description", "A sample movie");
  formData.append("length", "120");
  formData.append("type", "movie");
  formData.append("imageUrl", "http://example.com/sample_image.jpg");
  formData.append("category", "Action");
  formData.append("videoFolder", "sample_video_folder"); // Update to match function parameter

  fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });

  // Call uploadMovie function with populated FormData object
  const success = await uploadMovie({
    title: "Sample Movie",
    description: "A sample movie",
    length: "120",
    type: "movie",
    imageUrl: "http://example.com/sample_image.jpg",
    category: "Action",
    videoFolder: "sample_video_folder",
  });

  // Update expect statement to match the FormData object structure
  expect(fetch).toHaveBeenCalledWith("http://localhost:4500/api/movies", {
    method: "POST",
    body: formData,
  });
  expect(success).toEqual(true);
});
