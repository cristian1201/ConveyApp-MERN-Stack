import http from "./httpService";
import { apiUrl } from "../../config.json";

export function getOrders() {
  return http.get(apiUrl);
}
