import React from 'react';

export default class ServiceResponse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            view: false
        }
        console.log(props);
    }

    updateResponse(response) {
        console.log(response);
        try {
            response = JSON.stringify(response);
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
        return <div style={{overflow: 'none'}}>{response}</div>
    }
}
