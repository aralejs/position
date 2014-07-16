var expect = require('expect.js');
var Position = require('../index.js');
var $ = require('jquery');

describe('position', function() {

    var pinElement, baseElement, noopDiv;
    
    // reset mocha padding
    $(document.body).css({
        'margin': 0,
        'padding': 0,
        'overflow': 'scroll'
    });

    beforeEach(function() {
        pinElement = $('<div style="width:100px;height:100px;position:absolute;top:0;left:0;" id="pin-element">pinElement</div>').prependTo(document.body);
        // for ie6 bug
        noopDiv = $('<div></div>').prependTo(document.body);
        baseElement = $('<div style="margin:20px;border:5px solid #000;padding:20px;width:200px;height:200px;" id="base-element">baseElement</div>').prependTo(document.body);
    });

    afterEach(function() {
        baseElement.remove();
        noopDiv.remove();
        pinElement.remove();
    });

    it('相对屏幕定位：Position.pin(pinElement, { x: 100, y: 100 })', function() {
        Position.pin(pinElement, { x: 100, y: 100 });
        expect(pinElement.offset().top).to.equal(100);
        expect(pinElement.offset().left).to.equal(100);
    });

    it('基本情况：Position.pin({ element: pinElement, x: 0, y: 0 }, { element:baseElement, x: 100, y: 100 })', function() {
        Position.pin({ element: pinElement, x: 0, y: 0 }, { element:baseElement, x: 100, y: 100 });
        expect(pinElement.offset().top).to.equal(120);
        expect(pinElement.offset().left).to.equal(120);
    });

    it('第一个参数简略写法：Position.pin(pinElement, { element:baseElement, x: 100, y: 100 })', function() {
        Position.pin({ element: pinElement, x: 0, y: 0 }, { element:baseElement, x: 100, y: 100 });
        expect(pinElement.offset().top).to.equal(120);
        expect(pinElement.offset().left).to.equal(120);
    });

    it('第二个参数简略写法：Position.pin({ element:pinElement, x: -100, y: -100 }, baseElement)', function() {
        Position.pin({ element:pinElement, x: -100, y: -100 }, baseElement);
        expect(pinElement.offset().top).to.equal(120);
        expect(pinElement.offset().left).to.equal(120);
    });

    it('两个参数都简略：Position.pin(pinElement, baseElement)', function() {
        Position.pin(pinElement, baseElement);
        expect(pinElement.offset().top).to.equal(20);
        expect(pinElement.offset().left).to.equal(20);
    });

    it('省略x参数：Position.pin(pinElement, { element:baseElement, x: "99px" })', function() {
        Position.pin(pinElement, { element:baseElement, x: "99px" });
        expect(pinElement.offset().top).to.equal(20);
        expect(pinElement.offset().left).to.equal(119);
    });

    it('省略y参数：Position.pin(pinElement, { element:baseElement, y: "99px" })', function() {
        Position.pin(pinElement, { element:baseElement, y: "99px" });
        expect(pinElement.offset().top).to.equal(119);
        expect(pinElement.offset().left).to.equal(20);
    });

    it('带px的字符串参数：Position.pin(pinElement, { element:baseElement, x: "100px", y: "100px" })', function() {
        Position.pin({ element: pinElement, x: 0, y: 0 }, { element:baseElement, x: "100px", y: "100px" });
        expect(pinElement.offset().top).to.equal(120);
        expect(pinElement.offset().left).to.equal(120);
    });

    it('参数传递选择器：Position.pin("#pin-element", { element:"#base-element", x: "100px", y: "100px" })', function() {
        Position.pin('#pin-element', { element:'#base-element', x: "100px", y: "100px" });
        expect(pinElement.offset().top).to.equal(120);
        expect(pinElement.offset().left).to.equal(120);
    });

    it('参数传递原生对象：Position.pin(pinElement[0], { element:baseElement[0], x: "100px", y: "100px" })', function() {
        Position.pin(pinElement[0], { element:baseElement[0], x: "100px", y: "100px" });
        expect(pinElement.offset().top).to.equal(120);
        expect(pinElement.offset().left).to.equal(120);
    });

    it('负数定位点：Position.pin({ element: pinElement, x: -100, y: -100 }, { element:baseElement, x: 0, y: 0 })', function() {
        Position.pin({ element: pinElement, x: -100, y: -100 }, { element:baseElement, x: 0, y: 0 });
        expect(pinElement.offset().top).to.equal(120);
        expect(pinElement.offset().left).to.equal(120);
    });

    it('百分比：Position.pin(pinElement, { element:baseElement, x: "100%", y: "50%" })', function() {
        Position.pin(pinElement, { element:baseElement, x: '100%', y: '50%' });
        expect(pinElement.offset().top).to.equal(145);
        expect(pinElement.offset().left).to.equal(270);
    });

    it('负百分比：Position.pin(pinElement, { element:baseElement, x: "-100%", y: "-50%" })', function() {
        Position.pin(pinElement, { element:baseElement, x: '-100%', y: '-50%' });
        expect(pinElement.offset().top).to.equal(-105);
        expect(pinElement.offset().left).to.equal(-230);
    });

    it('很大的百分比：Position.pin(pinElement, { element:baseElement, x: "1000%", y: "500%" })', function() {
        Position.pin(pinElement, { element:baseElement, x: '1000%', y: '500%' });
        expect(pinElement.offset().top).to.equal(1270);
        expect(pinElement.offset().left).to.equal(2520);
    });

    it('别名：Position.pin({ element:pinElement, x: "left", y: "left" }, { element:baseElement, x: "right", y: "center" })', function() {
        Position.pin({ element:pinElement, x: "left", y: "left" }, { element:baseElement, x: 'right', y: 'center' });
        expect(pinElement.offset().top).to.equal(145);
        expect(pinElement.offset().left).to.equal(270);
    });

    it('大写的别名：Position.pin({ element:pinElement, x: "LEFT", y: "LEFT" }, { element:baseElement, x: "RIGHT", y: "CENTER" })', function() {
        Position.pin({ element:pinElement, x: "LEFT", y: "LEFT" }, { element:baseElement, x: 'RIGHT', y: 'CENTER' });
        expect(pinElement.offset().top).to.equal(145);
        expect(pinElement.offset().left).to.equal(270);
    });

    it('百分比小数：Position.pin(pinElement, { element:baseElement, x: "99.5%", y: "50.5%" })', function() {
        Position.pin(pinElement, { element:baseElement, x: "99.5%", y: "50.5%" });
        expect(pinElement.offset().top).to.be.greaterThan(145.99);
        expect(pinElement.offset().top).to.be.lessThan(147.01);            
        expect(pinElement.offset().left).to.be.greaterThan(267.99);
        expect(pinElement.offset().left).to.be.lessThan(269.01);
    });

    it('居中定位：Position.center(pinElement, baseElement);', function() {
        Position.center(pinElement, baseElement);
        expect(pinElement.offset().top).to.equal(95);
        expect(pinElement.offset().left).to.equal(95);
    });

    it('屏幕居中定位：Position.center(pinElement);', function() {
        Position.center(pinElement);
        expect(($(window).outerHeight()-100)/2).to.be.greaterThan(pinElement.offset().top-0.51);
        expect(($(window).outerHeight()-100)/2).to.be.lessThan(pinElement.offset().top+0.51);
        expect(($(window).outerWidth()-100)/2).to.be.greaterThan(pinElement.offset().left-0.51);
        expect(($(window).outerWidth()-100)/2).to.be.lessThan(pinElement.offset().left+0.51);
    });

    it('baseElement绝对定位：', function() {
        baseElement.css({
            'position': 'absolute',
            'top': '20px',
            'left': '30px'
        });
        Position.pin(pinElement, { element:baseElement, x: 100, y: 100 });
        expect(parseInt(pinElement.offset().top)).to.equal(140);
        expect(parseInt(pinElement.offset().left)).to.equal(150);
    });

    it('baseElement相对定位：', function() {
        baseElement.css({
            'position': 'relative',
            'top': '-20px',
            'left': '30px'
        });
        Position.pin(pinElement, { element:baseElement, x: 100, y: 100 });
        expect(parseInt(pinElement.offset().top)).to.equal(100);
        expect(parseInt(pinElement.offset().left)).to.equal(150);
    });

    it('offsetParent不为body：', function() {
        var offsetParent = $('<div style="margin:20px;border:10px solid #000;padding:20px;position:relative;"></div>').appendTo(document.body);
        baseElement.appendTo(offsetParent);
        Position.pin(pinElement, { element:baseElement, x: 100, y: 100 });
        expect(parseInt(pinElement.offset().top) - parseInt(baseElement.offset().top)).to.equal(100);
        expect(parseInt(pinElement.offset().left) - parseInt(baseElement.offset().left)).to.equal(100);
        offsetParent.remove();
    });

    it('offsetParent绝对定位：', function() {
        var offsetParent = $('<div style="position:absolute;top:50px;left:50px;"></div>').appendTo(document.body);
        baseElement.appendTo(offsetParent);
        Position.pin(pinElement, { element:baseElement, x: 100, y: 100 });
        expect(parseInt(pinElement.offset().top)).to.equal(170);
        expect(parseInt(pinElement.offset().left)).to.equal(170);
        offsetParent.remove();
    });

    it('offsetParent相对定位：', function() {
        var offsetParent = $('<div style="position:relative;top:50px;left:50px;"></div>').prependTo(document.body);
        baseElement.appendTo(offsetParent);
        Position.pin(pinElement, { element:baseElement, x: 100, y: 100 });
        expect(parseInt(pinElement.offset().top)).to.equal(170);
        expect(parseInt(pinElement.offset().left)).to.equal(170);
        offsetParent.remove();
    });

    it('加号应用：', function() {
        Position.pin(pinElement, { element:baseElement, x: "100%+20px", y: "50%+15px" });
        expect(parseInt(pinElement.offset().top)).to.equal(160);
        expect(parseInt(pinElement.offset().left)).to.equal(290);
    });

    it('减号应用：', function() {
        Position.pin(pinElement, { element:baseElement, x: "100%-20px", y: "50%-15px" });
        expect(parseInt(pinElement.offset().top)).to.equal(130);
        expect(parseInt(pinElement.offset().left)).to.equal(250);
    });

    it('加减号混用：', function() {
        Position.pin(pinElement, { element:baseElement, x: "100%-20px+10px", y: "50%-15px+5px" });
        expect(parseInt(pinElement.offset().top)).to.equal(135);
        expect(parseInt(pinElement.offset().left)).to.equal(260);
    });

    it('0% 的情况', function() {
        Position.pin(pinElement, { element:baseElement, x: "0%", y: '0%' });
        expect(parseInt(pinElement.offset().top)).to.equal(20);
        expect(parseInt(pinElement.offset().left)).to.equal(20);
    });

    it('Position.VIEWPORT', function() {
        expect(Position.VIEWPORT._id).to.equal('VIEWPORT');
        expect(Position.VIEWPORT.nodeType).to.equal(1);
    });

    it('Position.VIEWPORT 作为第二个参数（简略）', function() {
        Position.pin(pinElement, Position.VIEWPORT);        
        expect(parseInt(pinElement.offset().top)).to.equal(0);
        expect(parseInt(pinElement.offset().left)).to.equal(0);
    });

    it('Position.VIEWPORT 作为第二个参数（完整）', function() {
        Position.pin(pinElement, {element: Position.VIEWPORT, x: 25, y: 30});        
        expect(parseInt(pinElement.offset().top)).to.equal(30);
        expect(parseInt(pinElement.offset().left)).to.equal(25);
    });

    it('fixed定位：', function() {
        pinElement.css('position', 'fixed');
        Position.pin(pinElement, { x: "300px", y: 250 });
        if ($.browser.msie && $.browser.version == 6.0) {
            expect(pinElement.css('position')).to.equal('absolute');
        } else {
            expect(pinElement.css('position')).to.equal('fixed');
        }
        expect(pinElement.css('top')).to.equal('250px');
        expect(pinElement.css('left')).to.equal('300px');
    });

    it('support 0%+10px', function() {
        Position.pin({ element: pinElement, x: '0%+20px', y: '0%+20px' }, { element:baseElement, x: 100, y: 100 });
        expect(parseInt(pinElement.offset().top)).to.equal(100);
        expect(parseInt(pinElement.offset().left)).to.equal(100);
    });

    it('body 有 margin 的情况', function() {
        $(document.body).css({
            marginTop: 50,
            marginLeft: 50
        });

        Position.pin(pinElement, baseElement);
        expect(pinElement.offset().top).to.equal(baseElement.offset().top);
        expect(pinElement.offset().left).to.equal(baseElement.offset().left);

        $(document.body).css({
            margin: 0
        });
    });

    it('body 是 absolute 的情况', function() {
        $(document.body).css({
            position: 'absolute',
            top: 20,
            left: 20
        });
        Position.pin(pinElement, baseElement);
        expect(parseInt(pinElement.offset().top)).to.equal(40);
        expect(parseInt(pinElement.offset().left)).to.equal(40);

        $(document.body).css({
            position: '',
            top: '',
            left: ''
        });
    });

    it('body 是 relative 的情况', function() {
        $(document.body).css({
            position: 'relative',
            top: 20,
            left: 20
        });

        Position.pin(pinElement, baseElement);
        expect(parseInt(pinElement.offset().top)).to.equal(40);
        expect(parseInt(pinElement.offset().left)).to.equal(40);

        $(document.body).css({
            position: '',
            top: '',
            left: ''
        });
    });

    it("scroll 1000px 之后", function() {
        var temp = $("<div style='height:1000px;'></div>").prependTo(document.body);
        $(document).scrollTop(500);

        Position.pin(pinElement, baseElement);
        expect(parseInt(pinElement.offset().top)>1000).to.be(true);

        temp.remove();
    });

});
