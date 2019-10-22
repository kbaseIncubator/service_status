import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import config from './config.json';
import Status from './components/status';

function App() {
    let services = Object.keys(config.services).sort();
    const prefix = config.env.prefix ? config.env.prefix + '.' : '';
    const baseUrl = 'https://' + prefix + 'kbase.us/services/';
    let statuses = services.map(service => {
        let serviceConfig = config.services[service];
        serviceConfig.key = service;
        serviceConfig.url = baseUrl + serviceConfig.path;
        return <Status { ...serviceConfig } />;
    });
    console.log(statuses);
    return (
        <div className="App">
            <header className="App-header">
                {statuses}
            </header>
        </div>
    );
}

export default App;
