import * as config from "../../auth-config.json";

const { domain, clientId, audience, apiUri, errorPath } = config as {
  domain: string;
  clientId: string;
  audience?: string;
  apiUri: string;
  errorPath: string;
};

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    ...(audience ? { audience } : null),
    redirectUri: window.location.origin,
    errorPath
  },
  httpInterceptor: {
    allowedList: [`${apiUri}/*`, '*'] // TODO: tmp
  },
  usersApi: "http://localhost:8080",
  activitiesApi: "http://localhost:8080"
};
