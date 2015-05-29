'use strict';

var React = require('react/addons'),
    Section1 = require('./Section1'),
    Section2 = require('./Section2'),
    Section3 = require('./Section3'),
    Section4 = require('./Section4'),
    Section5 = require('./Section5'),
    Section6 = require('./Section6'),
    transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ];


var SectionList = React.createClass({
    mixins: [],
    _mouseWheelHandler: function(event) {
        event.preventDefault();
        var delta = event.wheelDelta || -event.detail;
        // if (!_hasClass(body, "disabled-onepage-scroll")) _init_scroll(event, delta);
        this._scrollSection(delta);
    },
    _scrollSection: function(delta) {

        var nextPosition = 0;

        if(this.state.scrollable) {
            this.setState({
                scrollable: false
            });

            nextPosition = this._getPosition(delta);

            React.findDOMNode(this.refs.sectionList).style.cssText = this._getTransformCSS(nextPosition);
        }
    },
    _getPosition: function(delta) {

        var nextIndex = 0,
            activeIndex = this.state.activeIndex,
            sectionCount = this.state.sectionCount;

        if (delta > 0 && (activeIndex - 1) >= 0) {

            nextIndex = activeIndex - 1;

        } else if (delta < 0 && (activeIndex + 1) < sectionCount) {

            nextIndex = activeIndex + 1;

        } else {
            nextIndex = activeIndex;

            this.setState({
                scrollable: true
            });
        }

        this.setState({
            activeIndex: nextIndex,
        });

        return nextIndex * -100;
    },
    _getTransformCSS: function(position) {
        return ['-webkit-transform: translate3d(0, ' + position + '%, 0);',
                '-webkit-transition: -webkit-transform 1000ms ease;',
                '-moz-transform: translate3d(0, ' + position + '%, 0);',
                '-moz-transition: -moz-transform 1000msms ease;',
                '-ms-transform: translate3d(0, ' + position + '%, 0);',
                '-ms-transition: -ms-transform 1000ms ease;',
                'transform: translate3d(0, ' + position + '%, 0);',
                'transition: transform 1000ms ease;'].join(' ');
    },
    getInitialState: function() { 
        return({
            activeIndex: 0,
            sectionCount: 6,
            scrollable: true
        });
    },
    getDefaultProps: function() {
        return {
            easing: 'ease',
            animationTime: 1000
        };
    },
    componentWillMount: function() {},
    componentDidMount: function() {
        document.addEventListener('mousewheel', this._mouseWheelHandler);
        document.addEventListener('DOMMouseScroll', this._mouseWheelHandler);

        // window.requestAnimationFrame = Modernizr.prefixed('requestAnimationFrame', window);
        // window.cancelAnimationFrame = Modernizr.prefixed('cancelAnimationFrame', window);

        var sectionList = React.findDOMNode(this.refs.sectionList),
            _scrollEnd = function() {

                this.setState({
                    scrollable: true
                });
                console.log('scroll end');
            };

        sectionList.addEventListener(transEndEventName, _scrollEnd.bind(this), false);

    },
    shouldComponentUpdate: function() {
        return true;
    },
    componentDidUpdate: function() {},
    componentWillUnmount: function() {},
    render: function () {
        return (
            <div className="section-list" ref="sectionList">
                <Section1 ref="section1" />
                <Section2 ref="section2" />
                <Section3 ref="section3" />
                <Section4 ref="section4" />
                <Section5 ref="section5" />
                <Section6 ref="section6" />
            </div>
        );
    }
});

module.exports = SectionList; 

