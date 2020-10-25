// export const API_BASE_URL = 'http://localhost:18080/irsdk';
export const API_BASE_URL = process.env.REACT_APP_BASE_URL;
export const API_AUTH_URL = process.env.REACT_APP_AUTH_URL;
export const ACCESS_TOKEN = "accessToken";
export const SERVER_KEY = "servers"; //

export const OAUTH2_REDIRECT_URI = process.env.REACT_APP_MY_REDIRECT_URL;

//export const GOOGLE_AUTH_URL = API_BASE_URL + "/oauth2/authorize/google";
export const GOOGLE_AUTH_URL = API_BASE_URL + "/oauth2/authorization/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + "/oauth2/authorize/facebook?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;
