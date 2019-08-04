var dollarPassedIn,
    shuffleText;

const starburst = new mojs.Burst({
    parent: '.starContainer',
    radius: {0:200},
    count: 15,
    children: {
        fill: 'orange',
        points: 7,
        angle: {'-360': 0},
        radius: {
            10: 5
        },
        opacity: {1:0},
        duration: 2000
    }
});

const starburst2 = new mojs.Burst({
    parent: '.starContainer',
    radius: {0:400},
    count: 20,
    children: {
        fill: 'lightgreen',
        points: 7,
        angle: {'90': 0},
        radius: {
            10: 5
        },
        opacity: {1:0},
        duration: 1500
    }
});

const circ_opt = {
    parent: '.starContainer',
    radius: {50:200},
    fill: 'none',
    stroke: 'yellow',
    duration: 1500,
    opacity: {1:0}
};
const circ = new mojs.Shape({
    ...circ_opt
});

const circ2 = new mojs.Shape({
    ...circ_opt,
    delay: 500
});

const burstTl = new mojs.Timeline({
}).add(starburst, starburst2, circ, circ2);

var nums = document.querySelectorAll('.numberContainer>span');
var trigger = document.querySelector('.trigger');

var numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var shuffleDebounce = 100;  //interval for spinning numbers.  Too fast causes browser lag
var intervals = [];

var shuffle = function (element) {
    element.innerHTML = Math.floor(Math.random() * numArr.length);
};

var transformIntToShuffleString = function (int) {
    var isDecimal = (int < 1),
        intStr = int.toString(),
        finalString;
    if (isDecimal) {
        var numSubStr = intStr.substring(2, int.length);
        finalString = "000" + (numSubStr.length < 2 ? numSubStr + "0" : numSubStr);
    }
    else if (intStr.length === 1) {
        finalString = "00" + intStr + "00";
    }
    else if (intStr.length === 2) {
        finalString = "0" + intStr + "00";
    }
    else {
        finalString = intStr + "00";
    }
    return finalString;
};

stripLeadingZeros = function () {
    if (nums[0].innerHTML == 0) {
        nums[0].innerHTML = '';
        if (nums[1].innerHTML == 0) {
            nums[1].innerHTML = '';
        }
    }
};

var killShuffle = function (index, dollarValue) {
    clearInterval(intervals[index]);
    nums[4 - index].innerHTML = dollarValue[4 - index];
    if (index === 4) {
        setTimeout(stripLeadingZeros, 1300);
    }
};

var activateShuffle = function (dollarValue) {
    intervals = [];
    intervals.push(setInterval(shuffle, shuffleDebounce, nums[4]));
    intervals.push(setInterval(shuffle, shuffleDebounce, nums[3]));
    intervals.push(setInterval(shuffle, shuffleDebounce, nums[2]));
    intervals.push(setInterval(shuffle, shuffleDebounce, nums[1]));
    intervals.push(setInterval(shuffle, shuffleDebounce, nums[0]));

    for (var i = 0; i < intervals.length; i++) {
        setTimeout(killShuffle, 500 * (i + 1), i, dollarValue);
    }
};

function textShuffle() {
    var dollarsTl = new TimelineLite({ delay: .5 });
    var starTl = new TimelineLite({ delay: 3.5 });
    var giftsTl = new TimelineLite({ delay: 5 });
setTimeout(() => {
    burstTl.play();
}, 3500);
    //move the dollars down, this is timed with the stripping zero's function
    dollarsTl.to('.dollars', .2, { 'opacity': 1 })
        .to('.dollars', 1, { 'top': '+=150px', ease: Elastic.easeOut.config(1, 0.3) }, 3);

    //Show the stars and kick off the burst
    //This has two different animations dependent on the dollar value.  One penny only goes to the organization
    starTl.to('#stars', .8, { 'opacity': 1, 'scale': 1, ease: Bounce.easeOut })
        .to('#burst', 1, { 'opacity': .4 })
        .to('#burst', 100, { rotation: 360, repeat: -1, transformOrigin: "50% 50%", ease: Linear.easeNone }, '-=100');
    giftsTl.to('#reward', .8, { 'scale': 1, 'opacity': 1, ease: Expo.easeInOut })
        .to('#reward', .8, { 'scale': .75, 'opacity': 1, ease: Expo.easeInOut, y: -50 }, 1)   
        .to('#moving-on', .8, { 'opacity': 1, y: 0, ease: Expo.easeInOut });
}

var init = function (dollarPassedIn) {
    shuffleText = transformIntToShuffleString(dollarPassedIn);
    activateShuffle(shuffleText);
    textShuffle();
};
let value = Math.floor(Math.random() * 500) + 1;
init(value);