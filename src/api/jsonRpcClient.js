import uuid from 'uuid/v4';

export default class JSONRPCClient {
    constructor(url, mod) {
        this.url = url;
        this.mod = mod;
    }

    /**
     * Returns a Promise with the fetch call being made.
     * JSON-RPC calls are POSTed with the following info:
     * { version: "1.1", method: "Module.method", params: [data] }
     * @param {string} func - the function to invoke
     * @param {object} data (optional) - data to pass to the function
     */
    async makeCall(func, data) {
        const request = {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                // 'Content-type': 'application/json; charset=utf-8',
                'Accept': 'application/json'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            maxRedirects: 5,
            body: JSON.stringify({
                id: uuid(),
                version: '1.1',
                method: `${this.mod}.${func}`,
                params: data ? [data] : []
            })
        };
        const response = await fetch(this.url, request);
        if (!response.ok) {
            console.log(response);
            throw new Error('Bad response from service');
        }
        return response;
    }
}
