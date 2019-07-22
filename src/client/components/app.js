import React from 'react';
import '../assets/css/app.scss';
import AddQuestion from './addQuestion'

const App = () => (
    <div>
        <div className="app">

            <h1>Welcome to fidelio</h1>
            <div>
                <AddQuestion/>
            </div>

        </div>
    </div>
);

export default App;
