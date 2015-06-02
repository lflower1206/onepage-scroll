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
    _handleMouseWheel: function() {
        document.addEventListener('mousewheel', this._mouseWheelHandler, false);
        document.addEventListener('DOMMouseScroll', this._mouseWheelHandler, false);
    },
    _handleSwipe: function() {

        document.addEventListener('touchstart', this._swipeStartHandler, false);

        document.addEventListener('touchmove', function(event) {
            event.preventDefault();
        }, false);

        document.addEventListener('touchend', this._swipeEndHandler, false);
    },
    _mouseWheelHandler: function(event) {
        event.preventDefault();
        var delta = event.wheelDelta || -event.detail,
            nextIndex = 0,
            activeIndex = this.state.activeIndex,
            sectionCount = this.state.sectionCount;

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
            activeIndex = this.state.activeIndex,
            sectionCount = this.state.sectionCount;

        console.log('delta : ' + delta);

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
        this._scroll(this.state.activeIndex - 1);
    },
    _scrollDown: function() {
        this._scroll(this.state.activeIndex + 1);
    },
    _scroll: function(nextIndex) {

        this.setState({
            activeIndex: nextIndex,
            startX: 0,
            startY: 0,
            startTime: 0
        });

        React.findDOMNode(this.refs.sectionList).style.cssText = this._getTransformCSS(nextIndex * -100);
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
            sectionCount: 0,
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
            allowedTime: 200
        };
    },
    componentWillMount: function() {},
    componentDidMount: function() {
        this._handleMouseWheel();
        this._handleSwipe();

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
        this.setState({sectionCount: sectionList.getElementsByClassName('section').length});
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

