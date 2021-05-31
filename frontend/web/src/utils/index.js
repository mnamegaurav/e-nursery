// Setup config with token - helper function
export const tokenConfig = (accessToken) => {
  // if token add it to headers
  if (accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    return config;
  }
  return {}
};
