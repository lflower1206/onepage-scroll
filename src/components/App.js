'use strict';

var React = require('react/addons');
var SectionList = require('./SectionList');

require('../sass/fullpage.scss');

var App = React.createClass({
    render: function () {
      return (
          <SectionList />
      );
    }
});

React.render(<App />, document.body); // jshint ignore:line

module.exports = App; 
