const GOOGLE_ID =
  "1088015269144-plfceav7f592b2fn9ov1062pa1sq8rg5.apps.googleusercontent.com";
const REDIRECT_URI = "http://localhost:3000/oauth/callback/google";
export const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/drive.metadata.readonly`;
