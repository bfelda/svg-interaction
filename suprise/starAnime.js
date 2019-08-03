var dollarPassedIn,
    shuffleText;

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
        setTimeout(killShuffle, 1000 * (i + 1), i, dollarValue);
    }
};

function textShuffle() {
    var dollarsTl = new TimelineLite({ delay: .5 });
    var starTl = new TimelineLite({ delay: 6.3 });
    var giftsTl = new TimelineLite({ delay: 6.5 });

    //move the dollars down, this is timed with the stripping zero's function
    dollarsTl.to('.dollars', .2, { 'opacity': 1 })
        .to('.dollars', 1, { 'top': '+=120px', ease: Elastic.easeOut.config(1, 0.3) }, 5.8);

    //Show the stars and kick off the burst
    //This has two different animations dependent on the dollar value.  One penny only goes to the organization
    starTl.to('#stars', .8, { 'opacity': 1, 'scale': 1, ease: Bounce.easeOut })
        .to('#burst', 1, { 'opacity': .5 })
        .to('#burst', 100, { rotation: 360, repeat: -1, transformOrigin: "50% 50%", ease: Linear.easeNone });
    giftsTl.to('#reward', .8, { 'scale': 1, 'opacity': 1, ease: Expo.easeInOut })
        .to('#reward', .8, { 'scale': .75, 'opacity': 1, ease: Expo.easeInOut, y: -50 }, 1)   
        .to('#moving-on', .8, { 'opacity': 1, y: -100, ease: Expo.easeInOut });
}

var bonusPresentationInit = function () {
    var boostAnime = new TimelineLite({ delay: 2 });
    var boostPulse = new TimelineMax({ repeat: -1, yoyo: true, delay: 4 });
    var delayNote = new TimelineLite({ delay: 9 });
    boostAnime.to('.kickoffBtn', 1.5, { 'opacity': 1, 'y': 0, ease: Expo.easeOut })
        .to('.coinContainer', .8, { 'opacity': 1, ease: Expo.Linear }, '-=.5');
    boostPulse.to('.coinContainer', .6, { 'scale': 1.1 });
};

bonusPresentationInit();

var init = function (dollarPassedIn) {
    shuffleText = transformIntToShuffleString(dollarPassedIn);
    activateShuffle(shuffleText);

    textShuffle();
};
let value = Math.floor(Math.random() * 100) + 1;
init(value, value, value);