import uuid from 'uuid/v4';
import JSONRPCClient from "./jsonRpcClient";

export default class DynamicClient extends JSONRPCClient {
    constructor(url, mod) {
        super(url, mod);
        this.serviceWizardUrl = url;
    }

    async makeCall(func, data) {
        const response = await this.getServiceUrl();
        this.url = response.result[0].url;
        return super.makeCall(func, data);
    }

    async getServiceUrl() {
        const request = {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            maxRedirects: 5,
            body: JSON.stringify({
                id: uuid(),
                version: '1.1',
                method: 'ServiceWizard.get_service_status',
                params: [{
                    module_name: this.mod,
                    version: null
                }]
            })
        };
        const response = await fetch(this.serviceWizardUrl, request);
        if (!response.ok) {
            throw new Error('Error while looking up dynamic service URL');
        }
        return await response.json();
    }
}
