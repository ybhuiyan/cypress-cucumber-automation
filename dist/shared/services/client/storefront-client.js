"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMutation = exports.executeQuery = exports.createClient = void 0;
const core_1 = require("@apollo/client/core");
const cross_fetch_1 = require("cross-fetch");
async function createClient() {
    const client = new core_1.ApolloClient({
        link: new core_1.HttpLink({
            uri: process.env.STOREFRONT_URI,
            fetch: cross_fetch_1.default,
            headers: {
                Authorization: process.env.STOREFRONT_AUTHORIZATION,
                'Content-Type': 'application/json',
            },
        }),
        cache: new core_1.InMemoryCache(),
    });
    return client;
}
exports.createClient = createClient;
async function executeQuery(gqlQuery, gqlVariables) {
    try {
        const client = await createClient();
        return (client
            .query({
            query: gqlQuery,
            variables: gqlVariables,
        })
            .then((result) => {
            return result;
        }));
    }
    catch (err) {
        console.error(err);
    }
}
exports.executeQuery = executeQuery;
async function executeMutation(gqlMutation, gqlVariables) {
    try {
        const client = await createClient();
        console.log(gqlVariables);
        const response = client
            .mutate({
            mutation: gqlMutation,
            variables: gqlVariables,
        })
            .then((result) => {
            return result;
        });
        return response;
    }
    catch (err) {
        console.error(err);
    }
}
exports.executeMutation = executeMutation;
//# sourceMappingURL=storefront-client.js.map