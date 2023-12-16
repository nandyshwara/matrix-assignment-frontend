import axios from "axios";
import { url } from "./url";


export function getAllCandidates() {
  return axios.get(`${url}/candidate`);
}

export function getCandidateById(id) {
  return axios.get(`${url}/candidate/${id}`);
}

export function createCandidate(candidateData) {
    console.log(candidateData)
  return axios.post(`${url}/candidate`,candidateData,{
        headers: {
          'Content-Type': 'application/json',
        },
  });
}

export function updateCandidate(data) {
  return axios.put(`${url}/candidate/${data._id}`,data);
}

export function deleteCandidateById(id) {
    return axios.delete(`${url}/candidate/${id}`);
  }

