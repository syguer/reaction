/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';

import Store from 'universal/store';

import ApplicationContainer from 'universal/views/application-container';

import i18n from 'universal/locales';
import {changeLocation} from 'universal/actions/application-action-creators';

window.addEventListener('popstate', () => {
  changeLocation(location.pathname, false);
});

window.addEventListener('DOMContentLoaded', () => {
  i18n.setLocale(window.state.locale);

  const store = new Store(window.state);

  ReactDOM.render(<ApplicationContainer store={store}/>, document.querySelector('.application'));
});
