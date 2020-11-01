import Keycloak from "keycloak-js";
import { API_AUTH_URL } from "./constants";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = Keycloak({
  realm: "iracing-tools",
  url: API_AUTH_URL,
  clientId: "login-web",
});

export default keycloak;
