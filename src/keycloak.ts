import Keycloak from "keycloak-js";
import { API_AUTH_CLIENT, API_AUTH_REALM, API_AUTH_URL } from "./constants";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
  realm: API_AUTH_REALM,
  url: API_AUTH_URL,
  clientId: API_AUTH_CLIENT,
});

export default keycloak;
