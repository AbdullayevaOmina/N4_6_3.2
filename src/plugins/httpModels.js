import http from "./axios";

async function Get(url) {
  try {
    let response = await http.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function Post(url, payload) {
  try {
    let reponse = await http.post(url, payload);
    return reponse;
  } catch (error) {
    console.log(error);
  }
}

async function Patch(url, payload) {
  try {
    let reponse = await http.patch(`${url}/${payload.id}`, payload);
    return reponse;
  } catch (error) {
    console.log(error);
  }
}

async function Delete(url, id) {
  try {
    let reponse = await http.delete(`${url}/${id}`);
    return reponse;
  } catch (error) {
    console.log(error);
  }
}

export { Get, Post, Patch, Delete };
