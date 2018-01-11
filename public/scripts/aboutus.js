function setPosMap() {
    window._posMap = [];
    var hexs = $('.hexagon');
    if (hexs.length) {
        $.each(hexs, function (i, hex) {
            var t = {};
            t.ref = $(hex);
            var offsets = t.ref.offset();
            t.cx = offsets.left + t.ref.width() / 2;
            t.cy = offsets.top + t.ref.height() / 2;
            t.ref = t.ref.find('.member').first();
            window._posMap.push(t);
        })
    }
}

window._hoverRange = 50;

window._clockPositions = [
    [-2.8, /*-2.25,*/ 10], // 10
    [-2.25, /*-2.0,*/ 11], // 11
    [-2.0, /*-1.0,*/ 12], // 12
    [-1.0, /*-0.5,*/ 1], // 1
    [-0.5, /*-0.25,*/ 2], // 2
    [-0.25, /*0.25,*/ 3], // 3
    [0.25, /*0.5,*/ 4], // 4
    [0.5, /*1.0,*/ 5], // 5
    [1.0, /*2.0,*/ 6], // 6
    [2.0, /*2.25,*/ 7], // 7
    [2.25, /*2.8,*/ 8], // 8
    [2.8,/*100*/, 9] //9
];

window._mapClockPositionBackgroundPosition = {
    0: -2147,
    1: -1789,
    2: -1966,
    3: 0,
    4: -182,
    5: -355,
    6: -540,
    7: -720,
    8: -897,
    9: -1078,
    10: -1253,
    11: -1434,
    12: -1613,
}

function redrawAvatar(cursorPositionX,cursorPositionY) {
    if (window._posMap.length) {
        $.each(window._posMap, function (i, avatar) {
            var p = getClockPosition(avatar.cx, avatar.cy, cursorPositionX, cursorPositionY);
            var ip = window._mapClockPositionBackgroundPosition[p];
            avatar.ref.css('background-position-y', ip + 'px');
        });
    }
}

function getClockPosition(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    if (Math.abs(dx) <= window._hoverRange && Math.abs(dy) <= window._hoverRange) {
        return 0;
    } else {
        // REF: https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        if (theta <= -2.8 || theta >= 2.8)
            return 9;
        for (var i = 0; i < window._clockPositions.length; i++) {
            if (theta < window._clockPositions[i][0]) {
                return window._clockPositions[i - 1][1];
            }
        }

        throw 'ErrClockPosition';
    }
}

$(window).resize(function (event) {
    setPosMap();
});

window._myMaxStepCount = 5;
window._myCurrentSteps = 0;

$(window).mousemove(function (event) {
    if (window._currentNamecardMember == null && window._myCurrentSteps++ >= window._myMaxStepCount) {
        redrawAvatar(event.pageX,event.pageY);
        window._myCurrentSteps = 0;
    }
});

// regist click item event
var items = $('#grid>li>.hexagon');
$.each(items, function (i, item) {
    $(item).on('click', showTitle);
});

window._currentNamecardMember = null;
function showTitle(event) {    
    
    if(window._currentNamecardMember){
        window._currentNamecardMember.removeClass('show-namecard');
    } 

    var thisItem = $(this);
    var member = thisItem.find('.member:first');
    if(window._currentNamecardMember && member.attr('id') === window._currentNamecardMember.attr('id')){
        window._currentNamecardMember = null;
    }else{
        member.addClass('show-namecard');
        window._currentNamecardMember = member;
        redrawAvatar(event.pageX,event.pageY);
    } 
}

// init
setPosMap();