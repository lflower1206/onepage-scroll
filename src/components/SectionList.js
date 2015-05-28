'use strict';

var React = require('react/addons'),
    FirstSection = require('./FirstSection'),
    transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ];


var SectionList = React.createClass({
    mixins: [],
    _mouseWheelHandler: function(event) {
        event.preventDefault();
        var delta = event.wheelDelta || -event.detail;
        // if (!_hasClass(body, "disabled-onepage-scroll")) _init_scroll(event, delta);
        console.log(delta);
        this._scrollSection();
    },
    _scrollSection: function() {

        var transformCSS = ['-webkit-transform: translate3d(0, -100%, 0);',
                            '-webkit-transition: -webkit-transform 1000ms ease;',
                            '-moz-transform: translate3d(0, -100%, 0);',
                            '-moz-transition: -moz-transform 1000msms ease;',
                            '-ms-transform: translate3d(0, -100%, 0);',
                            '-ms-transition: -ms-transform 1000ms ease;',
                            'transform: translate3d(0, -100%, 0);',
                            'transition: transform 1000ms ease;'].join(' ');

        if(this.state.scrollable) {
            this.setState({
                scrollable: false
            });

            React.findDOMNode(this.refs.sectionList).style.cssText = transformCSS;
        }
    },
    getInitialState: function() { 
        return({
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

        window.requestAnimationFrame = Modernizr.prefixed('requestAnimationFrame', window);
        window.cancelAnimationFrame = Modernizr.prefixed('cancelAnimationFrame', window);

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
                <FirstSection />
                <FirstSection />
            </div>
        );
    }
});

module.exports = SectionList; 

