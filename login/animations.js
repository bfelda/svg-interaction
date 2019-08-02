document.querySelectorAll("fieldset.with-placeholder input").forEach(function (el, idx) {
    el.addEventListener("focus", function () {
        this.parentNode.querySelector(".placeholder").classList.add("active");
    });
    el.addEventListener("blur", function () {
        if (this.value == "") {
            this.parentNode.querySelector(".placeholder").classList.remove("active");
        }
    })
});

function blink() {
    face.leftEye.setAttribute('ry', 5);
    face.rightEye.setAttribute('ry', 5);
    setTimeout(() => {
        face.leftEye.setAttribute('ry', 26);
        face.rightEye.setAttribute('ry', 26);
    }, 200);
}

setInterval(() => {
    blink();
}, 7000);

function updateMouthEyesForUsername() {
    if (inputs.email.value.length > 0) {
        if (inputs.email.value.indexOf("@") > 0 && inputs.email.value.indexOf("@") < email.value.length - 1) {
            face.mouth.setAttribute("d", "M690.5,684.475s76.753,73.824,150.094,0");
            face.mouth.setAttribute("transform", "translate(-20.208 -40.03)");
            face.muzzleLeft.setAttribute("d", "M745.127,451.228l-61.152,29.339L645.023,609.446l29.946,66.5,70.159,29.339Z");
            face.muzzleRight.setAttribute("d", "M659.809,451.228l61.152,29.339L758.7,607.161,729.968,675.95l-70.159,29.339Z");
        } else {
            face.mouth.setAttribute("d", "M690.5,684.475s54.039,24.258,105.677,0")
            face.mouth.setAttribute("transform", "translate(2 -18)");
            face.muzzleLeft.setAttribute("d", "M745.127,451.228l-61.152,29.339L659.809,635.821l15.16,40.129,70.159,29.339Z");
            face.muzzleRight.setAttribute("d", "M659.809,451.228l61.152,29.339,24.167,155.254-15.16,40.129-70.159,29.339Z");
        }
    } else {
        face.mouth.setAttribute("d", "M690.5,684.475s54.039,24.258,105.677,0")
        face.mouth.setAttribute("transform", "translate(2 -18)");
        face.muzzleLeft.setAttribute("d", "M745.127,451.228l-61.152,29.339L659.809,635.821l15.16,40.129,70.159,29.339Z");
        face.muzzleRight.setAttribute("d", "M659.809,451.228l61.152,29.339,24.167,155.254-15.16,40.129-70.159,29.339Z");
    }
    let movePos = inputs.email.value.length > 30 ? inputs.email.value.length : inputs.email.value.length / 1.25;
    face.rightEye.setAttribute("transform", "translate(814 494)");
    face.leftEye.setAttribute("transform", "translate(591 494)");
    face.rightEye.setAttribute("transform", `translate(${ 814 + movePos } 494)`);
    face.leftEye.setAttribute("transform", `translate(${ 591 + movePos } 494)`);
    face.glassesEyes.setAttribute("transform", `translate(-24 27)`);
    face.glassesEyes.setAttribute("transform", `translate(${ -24 + movePos } 27)`);
    face.muzzleNose.setAttribute("transform", `translate(-22 29)`);
    face.muzzleNose.setAttribute("transform", `translate(${ -22 + movePos } 29)`);
}

function coverEyes() {
    body.upperLeftShirt.setAttribute("transform", "translate(362.634 496.579) rotate(25)");
    body.leftBareArm.setAttribute("transform", "translate(279.54 968.176) rotate(-158)");
    body.upperRightShirt.setAttribute("transform", "translate(796.976 551.83) rotate(-25)");
    body.RightBareArm.setAttribute("transform", "translate(1026.985 758.386) rotate(158)");
}

function uncoverEyes() {
    body.upperLeftShirt.setAttribute("transform", "translate(281.482 592.614)");
    body.leftBareArm.setAttribute("transform", "translate(275.323 592.614)");
    body.upperRightShirt.setAttribute("transform", "translate(859.323 592.614)");
    body.RightBareArm.setAttribute("transform", "translate(883.806 790.475)");
}

function straightFace() {
    face.rightEye.setAttribute("transform", "translate(830 473)");
    face.leftEye.setAttribute("transform", "translate(632 473)");
    face.muzzleNose.removeAttribute("transform");
    face.glassesEyes.removeAttribute("transform");
}

function setDefault() {
    straightFace();
    uncoverEyes();
}

function peek() {
    if(document.activeElement === inputs.password) {
        body.leftBareArm.setAttribute("transform", "translate(279.54 968.176) rotate(-162)");
        body.RightBareArm.setAttribute("transform", "translate(1026.985 758.386) rotate(162)");
        inputs.password.setAttribute('type', 'text');
        setTimeout(() => {
            face.rightEye.setAttribute("transform", "translate(830 494)");
            face.leftEye.setAttribute("transform", "translate(632 494)");            
        }, 200);
    }
}

function unpeek() {
    if(document.activeElement === inputs.password) {
        body.leftBareArm.setAttribute("transform", "translate(279.54 968.176) rotate(-158)");
        body.RightBareArm.setAttribute("transform", "translate(1026.985 758.386) rotate(158)");
        inputs.password.setAttribute('type', 'password');
    }
}

inputs.showPass.addEventListener('mouseover', peek);
inputs.showPass.addEventListener('mouseout', unpeek);
inputs.email.addEventListener("focus", updateMouthEyesForUsername);
inputs.email.addEventListener("input", updateMouthEyesForUsername);
inputs.email.addEventListener("blur", straightFace);
inputs.password.addEventListener("focus", coverEyes);
inputs.password.addEventListener("blur", uncoverEyes);