/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import StatusClient from '../api/statusClient';
import StatusIcon from './Icon';
import '../css/status.css';
import ServiceResponse from './Response';

export default function Status(props) {
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
    const [status, setStatus] = useState('updating');
    const [response, setResponse] = useState(null);
    const [responseView, setResponseView] = useState(false);
    const statusClient = new StatusClient(props);

    function handleStatusChange(result, newStatus) {
        setResponse(result);
        setStatus(newStatus);
    }

    useEffect(() => {
        let ignore = false;

        async function lookupStatus () {
            handleStatusChange('', 'updating');
            try {
                const result = await statusClient.getStatus(props.method);
                // console.log("Got good response for " + props.name, result);
                if (!ignore) {
                    handleStatusChange(result, 'ok');
                }
            }
            catch(error) {
                let result = {
                    attemptedCall: props.method,
                    url: props.url
                };
                if (error.message) {
                    result.message = error.message;
                }
                if (error.stack) {
                    result.stack = error.stack;
                }
                if (!ignore) {
                    handleStatusChange(result, 'error');
                }
                console.error(error);
            }
        };
        lookupStatus();
        return () => { ignore = true; }
    }, [props.url]);

    function toggleResponseView() {
        setResponseView(!responseView);
    }

    return (
        <div className={`kb-service-status ${status}`}>
            <div className="status-flex" onClick={toggleResponseView}>
                <div>{props.name}</div>
                <a className="status-button">
                    <StatusIcon status={status}/>
                </a>
            </div>
            <ServiceResponse view={responseView} response={response} url={props.url} />
        </div>
    );
}
