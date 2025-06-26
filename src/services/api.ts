import axios from 'axios';
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const { CLIENT_SECRET } = process.env;

const api = axios.create({
  baseURL: 'https://discord.com/api'
});

async function exchangeCodeForToken(code: string, codeVerifier: string) {
  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', CLIENT_SECRET);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', REDIRECT_URI);
  params.append('code_verifier', codeVerifier);

  try {
    const response = await axios.post('https://discord.com/api/oauth2/token', params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao trocar token:', error.response?.data || error.message);
    throw error;
  }
}

export { api, exchangeCodeForToken }