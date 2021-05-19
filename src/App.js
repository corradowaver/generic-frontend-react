import React, {Component} from 'react';
import './App.css';

import AccountingApp from './component/AccountingApp';

class App extends Component {
    render() {
        return (
            <div className="container">
                <AccountingApp/>
            </div>
        );
    }
}

export default App;

