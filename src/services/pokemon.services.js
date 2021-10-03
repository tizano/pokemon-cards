import axios from "axios";

export const apiUrl = process.env.REACT_APP_API_URL;

export async function getCards() {
  const url = `${apiUrl}/cards`;
  return await axios.get(url);
}

export const getCardById = async (id) => {
  const url = `${apiUrl}/cards/${id}`;
  return await axios.get(url);
}

export const createCard = async (data) => {
  const url = `${apiUrl}/cards/`;
  return await axios.post(url, data);
}

export const updateCardById = async (id, data) => {
  const url = `${apiUrl}/cards/${id}`;
  return await axios.put(url, data);
}

export const deleteCardById = async (id) => {
  const url = `${apiUrl}/cards/${id}`;
  return await axios.delete(url);
}
