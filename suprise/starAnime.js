var dollarPassedIn,
    shuffleText,
    activeSponsorAmt,
    activeUserAmt;

var sponsorAmtElem = $('#sponsor-payout');
var userAmtElem = $('#user-payout');
var nums = $('.numberContainer>span');
var trigger = $('.trigger');

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

function TextShuffle() {
    var _this = this;

    _this.to = function (dollars) {
        TweenLite.killTweensOf(_this);
        var offerResult = new TimelineLite();
        var businessOutro = new TimelineLite({ delay: 4 });
        var dollarsTl = new TimelineLite({ delay: 4.5 });
        var starTl = new TimelineLite({ delay: 10.3 });
        var giftsTl = new TimelineLite({ delay: 11 });

        // Remove the offer info
        offerResult.to('.offerResultContainer', .2, { 'opacity': 0 })
            .set('.offerResultContainer', { 'display': 'none' })
            .set('.affiliateContainer', { 'display': 'flex' })
            .to('.affiliateContainer', .2, { 'opacity': 1 });

        // Remove the affiliate logo
        businessOutro.to('.affiliateContainer', .2, { 'opacity': 0 })
            .set('.affiliateContainer', { 'display': 'none' });

        //move the dollars down, this is timed with the stripping zero's function
        dollarsTl.to('.dollars', .2, { 'opacity': 1 })
            .to('.dollars', 1, { 'top': '+=80px', ease: Elastic.easeOut.config(1, 0.3) }, 5.8);

        //Show the stars and kick off the burst
        //This has two different animations dependent on the dollar value.  One penny only goes to the organization
        starTl.to('#stars', .8, { 'opacity': 1, 'scale': 1, ease: Bounce.easeOut })
            .to('#burst', 1, { 'opacity': 1 })
            .to('#burst', 100, { rotation: 360, repeat: -1, transformOrigin: "50% 50%", ease: Linear.easeNone });
        if (dollars > .01) {
            giftsTl.to('#sponsor-gift', .8, { 'scale': 1, 'opacity': 1, ease: Expo.easeInOut })
                .to('#sponsor-gift', .8, { 'scale': .6, 'opacity': 1, ease: Expo.easeInOut, x: -100, y: -50 }, 1)
                // .to('#sponsor-payout', .8, { 'color': 'white' }, '-=.5')
                .to('#user-boost', .8, { 'scale': 1, 'opacity': 1, ease: Expo.easeInOut })
                .to('#user-boost', .8, { 'scale': .6, 'opacity': 1, ease: Expo.easeInOut, x: 100, y: -50 })
                // .to('#user-payout', .8, { 'color': 'white' }, '-=.5')
                .to('#moving-on', .8, { 'opacity': 1, y: -50, ease: Expo.easeInOut });
        } else {
            giftsTl.to('#sponsor-gift', .8, { 'scale': 1, 'opacity': 1, ease: Expo.easeInOut })
                .to('#sponsor-gift', .8, { 'scale': .5, 'opacity': 1, ease: Expo.easeInOut, y: -50 }, 1)
                // .to('#sponsor-payout', .8, { 'color': 'white' }, '-=.5');
                .to('#moving-on', .8, { 'opacity': 1, y: -100, ease: Expo.easeInOut });
        }
    };
}

var bonusPresentationInit = function () {
    var boostAnime = new TimelineLite({ delay: 2 });
    var boostPulse = new TimelineMax({ repeat: -1, yoyo: true, delay: 4 });
    var delayNote = new TimelineLite({ delay: 9 });
    boostAnime.to('.kickoffBtn', 1.5, { 'opacity': 1, 'y': 0, ease: Expo.easeOut })
        .to('.coinContainer', .8, { 'opacity': 1, ease: Expo.Linear }, '-=.5');
    boostPulse.to('.coinContainer', .6, { 'scale': 1.1 });
    delayNote.to('#lateNote', .8, { 'opacity': 1 });
};

var setDistributions = function (orgDollars, userDollars) {
    activeUserAmt = userDollars.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    activeSponsorAmt = orgDollars.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    userAmtElem.html("+ $" + activeUserAmt.toString());
    sponsorAmtElem.html("+ $" + activeSponsorAmt.toString());
};

_shuffle = new TextShuffle();

bonusPresentationInit();

var init = function (dollarPassedIn, orgDollars, userDollars) {
    shuffleText = transformIntToShuffleString(dollarPassedIn);
    setDistributions(orgDollars, userDollars);

    setTimeout(function () {
        activateShuffle(shuffleText);
    }, 4000);

    _shuffle.to(dollarPassedIn.toString());
};