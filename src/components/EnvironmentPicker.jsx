import React, {useState} from 'react';
import '../css/Environments.css';

export default function EnvironmentPicker(props) {
    const [envIdx, setEnv] = useState(0);
    const updateEnv = (idx) => {
        setEnv(idx);
        props.updater(props.envOrder[idx]);
    }

    let envs = props.envOrder.map((env, idx) => {
        let classes = idx === envIdx ? "selected": "";
        return <span className={classes} key={idx} onClick={() => updateEnv(idx)}>{props.envs[env].name}</span>
    });
    return (
        <div className="env-list">{envs}</div>
    )
}
