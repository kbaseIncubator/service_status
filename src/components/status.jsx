/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import StatusClient from '../api/statusClient';
import StatusIcon from './icon';
import '../css/status.css';
import ServiceResponse from './response';

export default class Status extends React.Component {
    /**
     * Makes a new Status component, sets the initial status as 'starting'
     * @param {object} props
     * props are mostly as defined in config.json, but here's an expected list:
     * url - string - the url to contact
     * key - string - the service (something unique)
     * name - the name of the service (display string)
     * path - the path to the service endpoint (service_wizard if it's a dynamic service)
     * type - one of jsonrpc, dynamic, rest
     * module - the registered module name (for making calls with)
     * method - the unauthenticated method to invoke to see if the service is up.
     */
    constructor(props) {
        super(props);
        this.statusClient = new StatusClient(this.props);
        this.state = {
            status: 'starting',
            responseView: false
        };
        this.response = 'Loading. Please wait...';
        this.toggleResponseView = this.toggleResponseView.bind(this);
    }

    async componentDidMount() {
        this.setState(() => { return {status: 'updating'} });
        try {
            const response = await this.statusClient.getStatus(this.props.method);
            console.log("Got good response for " + this.props.name, response);
            this.setState(() => { return {status: 'ok'} });
            this.response = response;
        }
        catch(error) {
            this.setState(() => { return {status: 'error'} });
            console.log(error);
            this.response = error;
        }
    }

    toggleResponseView() {
        let responseView = !this.state.responseView;
        this.setState(() => { return {responseView: responseView} });
    }

    render() {
        return (
            <div className={`kb-service-status ${this.state.status}`}>
                <div className="status-flex">
                    <div>{this.props.name}</div>
                    <a onClick={this.toggleResponseView} className="status-button">
                        <StatusIcon status={this.state.status}/>
                    </a>
                </div>
                <ServiceResponse view={this.state.responseView} response={this.response} />
            </div>
        );
    }
}
