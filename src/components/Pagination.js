'use strict';

var React = require('react/addons');

var Pagination = React.createClass({
    getDefaultProps: function() {
        return {
            activeIndex: 0,
            sectionCount: 0
        };
    },
    componentDidUpdate: function(prevProps, prevState) {
        React.findDOMNode(this.refs['indicator' + prevProps.activeIndex]).classList.remove('active');
        React.findDOMNode(this.refs['indicator' + this.props.activeIndex]).classList.add('active');
    },
    render: function () {

      var pageDots = [],
          index = 0;

      while (index < this.props.sectionCount) {
          pageDots.push(<li ref={'indicator' + index} key={'li' + index} className="indicator">
                            <a href="#" data-page-index={index} onClick={this.props.onClick} key={'a' + index}>{++index}</a>
                        </li>);
      }

      return (
          <ul ref="pagination" className="pagination">
              {pageDots}
          </ul>
      );
    }
});

module.exports = Pagination; 
