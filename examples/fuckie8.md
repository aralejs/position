# IE8 下的诡异bug

- order: 2

---

在 ie8 下，若定位元素在基准元素的前面，并且不是body的第一个元素时，
则基准元素会出现未 reflow 而导致 margin-top 失效的问题，
所以尽量避免定位元素在基准元素相邻并在之前的情况。

下面的演示请在 IE8 下查看，定位后请将鼠标移到元素 B 上。

---

````iframe:350
<style>
    * {
        margin:0;
        padding:0;
    }
    #a1 {
        border:7px solid green;
    }
    #b1 {
        margin:60px;
        border:10px solid #777;
        padding:30px;
        background-color:red;
    }
</style>

<div>貌似无辜一</div>
<div>貌似无辜二</div>
<div id="a1" class="elem1">目标元素a1</div>
<div id="b1" class="elem2">基准元素b1</div>

<script>
seajs.use(['index', 'jquery'], function(Position, $) {
    $(function() {
        var a1 = $('#a1'),
            b1 = $('#b1');

        a1[0].style.position = 'absolute';
        // 在 ie8 下，若定位元素在基准元素的前面
        // 则基准元素会出现未 reflow 而导致 margin-top 失效的问题
        // 所以尽量避免定位元素在基准元素相邻并在之前的情况
        Position.pin(a1, b1);
    });
});
</script>
````
