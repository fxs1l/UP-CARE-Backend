import axios from "axios";

import { careDatabaseAuthToken, careDatabaseBaseUrl } from "@/constants/caredb";

const careDatabaseHeaders = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Basic ${careDatabaseAuthToken}=`,
};

const careDatabaseApi = axios.create({
  baseURL: careDatabaseBaseUrl,
  headers: careDatabaseHeaders,
});

export default careDatabaseApi;
