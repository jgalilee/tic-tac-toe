import React from 'react';
import ReactDOM from 'react-dom';
import T from 'i18n-react';
import { Game } from './game';
import { Router } from './router';
import english from './i18n/en-GB.json';
import './assets/styles.scss';

T.setTexts(english);

const [container] = document.getElementsByTagName('main');

ReactDOM.hydrate(<Router><Game /></Router>, container);
