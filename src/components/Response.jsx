import React from 'react';
import '../css/response.css';

export default class ServiceResponse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            view: false
        }
    }

    updateResponse(response) {
        try {
            response = JSON.stringify(response, null, 2);
        }
        catch (error) {
            // pass
        }
        return response;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.view !== prevState.view) {
            return { view: nextProps.view };
        }
        return null;
    }

    render() {
        if (!this.state.view) {
            return <div></div>
        }
        const response = this.updateResponse(this.props.response);
        console.log(response);
        return <pre className="response-area">{response}</pre>
    }
}
