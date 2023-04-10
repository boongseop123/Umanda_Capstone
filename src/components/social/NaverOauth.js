const NAVER_CLIENT_ID = "7JCgGRN0OuIDIkKF1fvF";
const REDIRECT_URI = "http://localhost:3000/oauth/callback/naver";
const STATE = "Random";

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${STATE}`;
