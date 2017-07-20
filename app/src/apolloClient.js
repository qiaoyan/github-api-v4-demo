import ApolloClient, {
    createNetworkInterface,
    addTypeName,
} from 'apollo-client';

const baseUrl = process.env.API_URL || 'https://api.github.com/';
const url = `${baseUrl}graphql`;
const TOKEN = '092a02df19c1aa48df88bdb5ed1281af3e81fa64';

const networkInterface = createNetworkInterface({
    uri: url, // Server URL (must be absolute)
    opts: { // Additional fetch() options like `credentials` or `headers`
        // credentials: 'same-origin'
    },
}).use([{
    applyMiddleware(req, next) {
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