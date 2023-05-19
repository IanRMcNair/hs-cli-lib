let packageJSON;
try {
  packageJSON = require('../package.json');
} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') {
    packageJSON = require('../../package.json');
  }
}
const { getAndLoadConfigIfNeeded } = require('../lib/config');
const { getHubSpotApiOrigin } = require('../lib/urls');

const version = packageJSON ? packageJSON.version : null;

const DEFAULT_USER_AGENT_HEADERS = {
  'User-Agent': `HubSpot CLI/${version}`,
};

const getRequestOptions = (options = {}, requestOptions = {}) => {
  const { env, localHostOverride } = options;
  const { httpTimeout, httpUseLocalhost } = getAndLoadConfigIfNeeded();
  return {
    baseUrl: getHubSpotApiOrigin(
      env,
      localHostOverride ? false : httpUseLocalhost
    ),
    headers: {
      ...DEFAULT_USER_AGENT_HEADERS,
    },
    json: true,
    simple: true,
    timeout: httpTimeout || 15000,
    ...requestOptions,
  };
};

module.exports = {
  getRequestOptions,
  DEFAULT_USER_AGENT_HEADERS,
};
