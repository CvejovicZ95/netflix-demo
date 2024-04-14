const apiUrl = process.env.REACT_APP_NETFLIX_API_URL;

export const fetchMovies = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/movies`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const homePageLogin = async (email) => {
  try {
    const res = await fetch(`${apiUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error("Invalid email or password");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logoutUser = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const registerUser = async ({ email, password, confirmPassword, phoneNumber }) => {
  try {
    const res = await fetch(`${apiUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, confirmPassword, phoneNumber }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchMovieData = async (movieId) => {
  try {
    const res = await fetch(`${apiUrl}/api/movies/${movieId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch movie data');
    }
    return await res.json();
  } catch (error) {
    throw new Error('Failed to fetch movie data');
  }
};

export const getVideoPath = (videoFolder) => {
  const movieFolder = encodeURIComponent(videoFolder);
  return `${apiUrl}/api/stream/${movieFolder}`;
};

export const uploadMovie = async ({ title, description, length, type, imageUrl, category, videoFolder }) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('length', length);
    formData.append('type', type);
    formData.append('imageUrl', imageUrl);
    formData.append('category', category);
    formData.append('video', videoFolder);

    const res = await fetch(`${apiUrl}/api/movies`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
