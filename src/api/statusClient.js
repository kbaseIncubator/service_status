import RestClient from './restClient';
import JSONRPCClient from './jsonRpcClient';
import DynamicClient from './dynamicClient';

export default class StatusClient {
    constructor(options) {
        this.options = options;
        this.client = null;
        switch(options.type) {
            case "rest":
                this.client = new RestClient(options.url);
                break;
            case "jsonrpc":
                this.client = new JSONRPCClient(options.url, options.module);
                break;
            case "dynamic":
                this.client = new DynamicClient(options.url, options.module);
                break;
            default:
                break;
        }
    }

    async getStatus(func, data) {
        console.log("calling out to " + this.options.url);
        const response = await this.client.makeCall(func, data);
        try {
            return await response.clone().json();
        }
        catch (error) {
            return await response.text();
        }
    }
}
