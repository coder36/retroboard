require('./stylesheets/main.css');
var $ = require('jquery');

import React from 'react'
import Retroboard from './retroboard'
import 'whatwg-fetch'


React.render(<Retroboard/>, document.body)