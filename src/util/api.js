const url = 'https://monthly-budget.herokuapp.com/rpc/';

const clientFactory = () => {
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBwdXNlciJ9.Kb4W2IEOp_Yw0JpzGez1xWj6_kK2GJ_z_5dyIHjy44U';

  const getAuthHeader = () => ({
    Authorization: `Bearer ${token}`
  });

  const request = (endpoint, options = {}) =>
    fetch(`${url}${endpoint}`, {
      ...options,
      headers: {
        'content-type': 'application/json',
        ...getAuthHeader(),
        ...options.headers
      },
      method: 'POST'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching resource: ${response.status}`);
          return response;
        } else {
          return response.json();
        }
      })
      .catch(e => {
        console.error(e);
        throw e;
      });

  const setToken = value => {
    token = value;
  };
  const isExpired = () => {
    // todo
  };
  const refreshToken = () => {
    // todo
  };

  return {
    post: (endpoint, data, options = {}) =>
      request(endpoint, {
        body: JSON.stringify(data),
        ...options
      }),
    get: (endpoint, filters) =>
      request(endpoint, {
        headers: {
          Accept: 'application/vnd.pgrst.object+json'
        },
        body: JSON.stringify(filters)
      }),
    getAll: (endpoint, filters) =>
      request(endpoint, {
        body: JSON.stringify(filters)
      })
  };
};

export default clientFactory();
