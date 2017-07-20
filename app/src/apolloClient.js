import ApolloClient, {
    createNetworkInterface,
    addTypeName,
} from 'apollo-client';

const baseUrl = process.env.API_URL || 'https://api.github.com/';
const url = `${baseUrl}graphql`;
const TOKEN = 'replace with your own token';

const networkInterface = createNetworkInterface({
    uri: url, // Server URL (must be absolute)
    opts: { // Additional fetch() options like `credentials` or `headers`
        // credentials: 'same-origin'
    },
}).use([{
    applyMiddleware(req, next) {

        if (TOKEN === 'replace with your own token') {
            window.alert('please replace with your own token in apolloClient.js, when github personal access token is in a public github repo, it expires immediately. refer to: https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql')
        }
        if (req.request.operationName === '') {
            req.request.operationName = null;
        }

        if (!req.options.headers) {
            req.options.headers = {}  // Create the header object if needed.
        }

        // Send the login token in the Authorization header
        req.options.headers.authorization = `Bearer ${TOKEN}`
        next()
    }
}]);



const client = new ApolloClient({
    networkInterface,
    initialState: typeof window !== 'undefined' ? window.__APOLLO_STATE__ : null, // eslint-disable-line
    queryTransformer: addTypeName,
});

export default client;