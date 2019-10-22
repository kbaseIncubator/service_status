export default class RestClient {
    constructor(url) {
        this.url = url;
    }

    async makeCall(func) {
        const request = {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-type': 'application/json; charset=utf8'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            maxRedirects: 5
        };
        const response = await fetch(this.url + func, request);
        console.log(response);
        if (!response.ok) {
            throw new Error('Error while contacting service');
        }
        return response;
    }
}
