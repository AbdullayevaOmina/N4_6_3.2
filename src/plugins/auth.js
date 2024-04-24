import http from "./axios";

const register = async (url, payload) => {
  try {
    let response = await http.post(url, payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const login = async (url, payload) => {
  try {
    let response = await http.post(url, payload);
    localStorage.setItem("userToken", response?.data?.accessToken);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { register, login };
