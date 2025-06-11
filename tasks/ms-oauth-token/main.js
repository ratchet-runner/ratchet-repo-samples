(function(input) {
  const {
    TENANT_ID,
    CLIENT_ID,
    CLIENT_SECRET
  } = input;

  const TOKEN_URL = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
  const DEFENDER_QUERY_URL = 'https://api.security.microsoft.com/api/advancedqueries/run';

  // Prepare x-www-form-urlencoded body as a string
  const body =
    `grant_type=client_credentials` +
    `&client_id=${encodeURIComponent(CLIENT_ID)}` +
    `&client_secret=${encodeURIComponent(CLIENT_SECRET)}` +
    `&scope=${encodeURIComponent('https://api.security.microsoft.com/.default')}`;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': body.length.toString()
  };

  const httpResponse = fetch(TOKEN_URL, {
    method: 'POST',
    headers: headers
  }, body);

  const response = httpResponse.body;

  if (!response.access_token) {
    throw new Error('Failed to get access token: ' + JSON.stringify(response));
  }

  return {
    token: response.access_token
  };
})
