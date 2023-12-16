import axios from "axios";
import { url } from "./url";

export default function signUpUser(data) {
  return axios.post(`${url}/auth/signup`, data);
}

export function signInUser(data) {
  return axios.post(`${url}/auth/login`, data);
}