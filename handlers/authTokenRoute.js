const jwt = require('jsonwebtoken');
const axios = require('axios');
const { verifyAttestationToken } = require('./postVerifyAttestationTokenRoute');

  // Verify Google ID Token
  async function verifyGoogleIdToken(idToken) {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

  try {
    const response = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
    );

    const payload = response.data;

    // Check if the token was issued for your app
    if (payload.aud !== GOOGLE_CLIENT_ID) {
      throw new Error('Invalid Google Client ID');
    }

    return payload; // Valid Google user data
  } catch (error) {
    console.error('Google ID Token verification failed:', error.message);
    return null;
  }
}

// Auth Token Handler
async function authTokenHandler(request, h) {
  const { google_id_token, attestation_token, platform } = request.payload;

  if (!google_id_token || !attestation_token || !platform) {
    return h.response({ error: 'Missing parameters' }).code(400);
  }

  try {
    // Verify App Attestation
    const isValidApp = await verifyAttestationToken(attestation_token, platform);
    if (!isValidApp) {
      return h.response({ error: 'Unauthorized App' }).code(401);
    }

    // Verify Google ID Token
    const googleUser = await verifyGoogleIdToken(google_id_token);
    if (!googleUser) {
      return h.response({ error: 'Invalid Google ID Token' }).code(401);
    }

    // Issue JWT Access Token for API
    const accessToken = jwt.sign(
      { userId: googleUser.sub, email: googleUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return h.response({ token: accessToken });
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Internal Server Error' }).code(500);
  }
}

module.exports = {
    method: 'POST',
    handler: authTokenHandler
};