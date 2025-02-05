const axios = require('axios');

async function verifyAttestationToken(attestationToken, platform) {
  if (platform === 'android') {
    // Google Play Integrity API verification
    const response = await axios.post(
      `https://playintegrity.googleapis.com/v1beta1/verifyIntegrity?key=${process.env.GOOGLE_API_KEY}`,
      {
        integrityToken: attestationToken,
      }
    );

    const verdict = response.data.tokenPayloadExternal;
    return verdict.appIntegrity.appRecognitionVerdict === 'PLAY_RECOGNIZED';
  } else if (platform === 'ios') {

    const response = await axios.post(
      'https://api.devicecheck.apple.com/v1/attestations',
      {
        attestation: attestationToken,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.APPLE_API_KEY}`,
        },
      }
    );

    return response.data.isValid; // true if valid
  }

  return false;
}

async function appCertificationHandler(request, h) {
  const { attestation_token, platform } = request.payload;

  if (!attestation_token || !platform) {
    return h.response({ error: 'Missing parameters' }).code(400);
  }

  try {
    const isValid = await verifyAttestationToken(attestation_token, platform);

    if (!isValid) {
      return h.response({ error: 'Invalid App Certification' }).code(401);
    }

    return h.response({ success: true, message: 'App certification valid' });
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Internal Server Error' }).code(500);
  }
}

module.exports = { appCertificationHandler };
