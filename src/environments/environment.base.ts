export interface IAuthConfig {
  domain: string;
  clientId: string;
  audience?: string;
  apiUri: string;
  errorPath: string;
}

export const environmentBase = (authConfig: IAuthConfig) => {
  const { domain, clientId, audience, apiUri, errorPath } = authConfig;
  return {
    production: false,
    auth: {
      domain,
      clientId,
      ...(audience ? { audience } : null),
      redirectUri: window.location.origin,
      errorPath
    },
    httpInterceptor: {
      allowedList: [`${apiUri}/*`]
    },
    version: "1.2.2"
  };
};
