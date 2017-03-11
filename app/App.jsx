import React from 'react';

import favicon from './favicon.ico';
import resetCss from './reset.css';
import baseCss from './base.css';
import css from './App.scss';

const link = document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = favicon;
document.getElementsByTagName('head')[0].appendChild(link);

export default class App extends React.Component {
  static propTypes = {
    test: React.PropTypes.bool,
  }

  render() {
    return (
      <div>
        <h1 className={css.myClass}>Boomshakalaka</h1>
      </div>
    );
  }
}
