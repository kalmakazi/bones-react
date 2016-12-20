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

const App = React.createClass({
  render() {
    return (
      <h1>Boomshakalaka</h1>
    );
  },
});

export default App;
