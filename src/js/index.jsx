import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/stylesheets/style.css';
import '../assets/stylesheets/animate.css';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('app'));
