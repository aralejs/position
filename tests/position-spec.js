define(function(require) {

    var Position = require('../src/position');
    var $ = require('$');
    var expect = chai.expect;

    describe('position', function() {

        var pinElement, baseElement, noopDiv;
        $(document.body).css('margin', 0);

        beforeEach(function() {
            pinElement = $('<div style="width:100px;height:100px;">pinElement</div>').prependTo(document.body);
            // for ie6 bug
            noopDiv = $('<div></div>').prependTo(document.body);
            baseElement = $('<div style="margin:20px;border:5px solid #000;padding:20px;width:200px;height:200px;">baseElement</div>').prependTo(document.body);            
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

        it('带px的字符串参数：Position.pin(pinElement, { element:baseElement, x: "100px", y: "100px" })', function() {
            Position.pin({ element: pinElement, x: 0, y: 0 }, { element:baseElement, x: "100px", y: "100px" });
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

        it('别名：Position.pin({ element:pinElement, x: "left", y: "left" }, { element:baseElement, x: "right", y: "center" })', function() {
            Position.pin({ element:pinElement, x: "left", y: "left" }, { element:baseElement, x: 'right', y: 'center' });
            expect(pinElement.offset().top).to.equal(145);
            expect(pinElement.offset().left).to.equal(270);
        });

        it('百分比小数：Position.pin(pinElement, { element:baseElement, x: "99.5%", y: "50.5%" })', function() {
            Position.pin(pinElement, { element:baseElement, x: "99.5%", y: "50.5%" });
            expect(pinElement.offset().top).to.equalGreaterThan(145.99);
            expect(pinElement.offset().top).to.equalLessThan(147.01);            
            expect(pinElement.offset().left).to.equalGreaterThan(267.99);
            expect(pinElement.offset().left).to.equalLessThan(269.01);
        });

        it('居中定位：Position.center(pinElement, baseElement);', function() {
            Position.center(pinElement, baseElement);
            expect(pinElement.offset().top).to.equal(95);
            expect(pinElement.offset().left).to.equal(95);
        });

        it('屏幕居中定位：Position.center(pinElement );', function() {
            Position.center(pinElement);
            expect(($(window).outerHeight()-100)/2).to.equalGreaterThan(pinElement.offset().top-0.51);
            expect(($(window).outerHeight()-100)/2).to.equalLessThan(pinElement.offset().top+0.51);
            expect(($(window).outerWidth()-100)/2).to.equalGreaterThan(pinElement.offset().left-0.51);
            expect(($(window).outerWidth()-100)/2).to.equalLessThan(pinElement.offset().left+0.51); 
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

        it('相对自身定位：', function() {
            baseElement.remove();
            Position.pin(pinElement, { element:pinElement, x: "100%", y: 0 });
            expect(parseInt(pinElement.offset().top)).to.equal(0);
            expect(parseInt(pinElement.offset().left)).to.equal(100);
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

    });
});
