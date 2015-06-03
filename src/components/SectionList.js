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
        var delta = event.wheelDelta || -event.detail,
            nextIndex = 0,
            activeIndex = this.props.activeIndex,
            sectionCount = this.props.sectionCount;

        if(this.state.scrollable) {

            this.setState({
                scrollable: false
            });

            if (delta > 0 && (activeIndex - 1) >= 0) {
                this._scrollUp();
            } else if (delta < 0 && (activeIndex + 1) < sectionCount) {
                this._scrollDown();
            } else {
                this.setState({
                    scrollable: true
                });
            }
        }

    },
    _swipeStartHandler: function(event) {
        event.preventDefault();

        var changedTouch = event.changedTouches[0];

        this.setState({
            startX: changedTouch.pageX,
            startY: changedTouch.pageY,
            startTime: new Date().getTime()
        });
    },
    _swipeEndHandler: function(event) {
        event.preventDefault();

        var changedTouch = event.changedTouches[0],
            startX = this.state.startX,
            startY = this.state.startY,
            delta = changedTouch.pageY - startY,
            threshold = this.props.threshold,
            allowedTime = this.props.allowedTime,
            elapsedTime = new Date().getTime() - this.state.startTime,
            swiperightBol = (elapsedTime <= allowedTime && delta >= threshold && Math.abs(changedTouch.pageX - startX) <= 100),
            activeIndex = this.props.activeIndex,
            sectionCount = this.props.sectionCount;

        if(this.state.scrollable) {

            this.setState({
                scrollable: false
            });

            if (delta > 0 && (activeIndex - 1) >= 0) {
                this._scrollUp();
            } else if (delta < 0 && (activeIndex + 1) < sectionCount) {
                this._scrollDown();
            } else {
                this.setState({
                    scrollable: true
                });
            }
        }
    },
    _scrollUp: function() {
        this._scroll(this.props.activeIndex - 1);
    },
    _scrollDown: function() {
        this._scroll(this.props.activeIndex + 1);
    },
    _scroll: function(nextIndex) {

        React.findDOMNode(this.refs.sectionList).style.cssText = this._getTransformCSS(nextIndex * -100);

        if (this.props.onScrolled) {
            this.props.onScrolled({
                from: this.props.activeIndex,
                to: nextIndex
            });
        }

        this.setState({
            startX: 0,
            startY: 0,
            startTime: 0
        });
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
            scrollable: true,
            startX: 0, 
            startY: 0,
            startTime: 0
        });
    },
    getDefaultProps: function() {
        return {
            easing: 'ease',
            animationTime: 1000,
            threshold: 150,
            allowedTime: 200,
            sectionCount: 0
        };
    },
    componentWillMount: function() {

        document.addEventListener('mousewheel', this._mouseWheelHandler, false);
        document.addEventListener('DOMMouseScroll', this._mouseWheelHandler, false);

    },
    componentDidMount: function() {

        var sectionList = React.findDOMNode(this.refs.sectionList),
            sectionCount = sectionList.getElementsByClassName('section').length,
            _scrollEnd = function() {
                this.setState({
                    scrollable: true
                });
            };

        sectionList.addEventListener(transEndEventName, _scrollEnd.bind(this), false);

        if (this.props.onDidMount) {
            this.props.onDidMount({sectionCount: sectionCount});
        }
    },
    shouldComponentUpdate: function() {
        return true;
    },
    render: function () {
        return (
            <div className="section-list" ref="sectionList" onTouchStart={this._swipeStartHandler} onTouchEnd={this._swipeEndHandler}>
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

