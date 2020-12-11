const getUVPA = async () => {
  const pkc = window.PublicKeyCredential;

  if (!pkc) {
    return null;
  }

  return pkc.isUserVerifyingPlatformAuthenticatorAvailable();
};

export default getUVPA;
