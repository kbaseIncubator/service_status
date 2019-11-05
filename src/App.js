import React, {useState} from 'react';
import './css/App.css';
import config from './config.json';
import Status from './components/Status';
import EnvironmentPicker from './components/EnvironmentPicker';

function App() {
    const updateEnv = (env) => {
        setEnv(env);
    }

    const [env, setEnv] = useState('prod');
    const envs = config.environments;
    const envOrder = config.env_order;
    let services = Object.keys(config.services).sort();
    const prefix = envs[env].prefix ? envs[env].prefix + '.' : '';
    let baseUrl = 'https://' + prefix + 'kbase.us/services/';

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
                <EnvironmentPicker
                    envs={envs}
                    envOrder={envOrder}
                    updater={updateEnv}
                />
            </header>
            <div className="status-area">
                {statuses}
            </div>
        </div>
    );
}

export default App;
