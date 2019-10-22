import React from 'react';
import '@fortawesome/fontawesome-free/js/all';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/status.css';

export default class StatusIcon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'starting'
        }
    }

    render() {
        switch(this.state.status) {
            case 'ok':
                return <FontAwesomeIcon icon="thumbs-up" className="status-icon icon-ok"/>
            case 'error':
                return <FontAwesomeIcon icon="bomb" className="status-icon icon-error"/>
            default:
                return <FontAwesomeIcon icon="spinner" pulse className="status-icon icon-loading"/>
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.status !== prevState.status) {
            return { status: nextProps.status };
        }
        return null;
    }

}
