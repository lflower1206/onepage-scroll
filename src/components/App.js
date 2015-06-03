'use strict';

var React = require('react/addons'),
    SectionList = require('./SectionList'),
    Pagination = require('./Pagination');

require('../sass/fullpage.scss');

var App = React.createClass({
    _onPageChange: function(event) {
        this.refs.sectionList._scroll(parseInt(event.target.dataset.pageIndex));
    },
    _onSectionInit: function(event) {
        this.setState({
            sectionCount: event.sectionCount
        });
    },
    _onSectionScrolled: function(event) {
        this.setState({
            activeIndex: event.to
        });
    },
    getInitialState: function() { 
        return({
            activeIndex: 0,
            sectionCount: 0
        });
    },
    render: function () {
      return (
          <div className="container">
              <Pagination ref="pagination" 
                          sectionCount={this.state.sectionCount} 
                          activeIndex={this.state.activeIndex} 
                          onClick={this._onPageChange}/>

              <SectionList ref="sectionList" 
                           sectionCount={this.state.sectionCount} 
                           activeIndex={this.state.activeIndex} 
                           onScrolled={this._onSectionScrolled} 
                           onDidMount={this._onSectionInit}/>
          </div>
      );
    }
});

React.render(<App />, document.body);

module.exports = App; 
