// define variables
const divImg = document.querySelector(".img");
const div = document.querySelector(".editor");
const inp = document.querySelector("form input");
const blocker = document.querySelector(".blocker");
const pointer = document.querySelector(".blocker .pointer");
const dotC = document.querySelector(".blocker .dotContainer");
const x = document.querySelector("#x");
const y = document.querySelector("#y");

// set default width & height
let width = 0;
let height = 0;

// observe divImg
let observer = new MutationObserver((ml, obs) => {
    height = ml[0].addedNodes[0].height;
    width = ml[0].addedNodes[0].width;

    pointer.style.width = width + "px";
    pointer.style.height = height + "px";

    observer.disconnect();
});

observer.observe(divImg, { childList: true });

// event handling
divImg.addEventListener("dragover", function (e) {
    e.preventDefault();
});

divImg.addEventListener("drop", function (e) {
    e.preventDefault();

    this.classList.remove("draging");

    let file = new FileReader();

    file.readAsDataURL(e.dataTransfer.files[0]);

    file.onload = () => {
        let ele = document.createElement("img");
        ele.setAttribute("src", file.result);
        ele.setAttribute("id", "imga");
        ele.setAttribute("style", "width: 40%");

        divImg.appendChild(ele);
    };

    blocker.style.display = "flex";
});

divImg.addEventListener("dragenter", function () {
    this.classList.add("draging");
});

divImg.addEventListener("dragleave", function () {
    this.classList.remove("draging");
});

divImg.addEventListener("click", function () {
    inp.click();
});

divImg.addEventListener("change", function (e) {
    console.log(this);
});

inp.addEventListener("change", function () {
    let file = new FileReader();

    file.readAsDataURL(this.files[0]);

    file.onload = () => {
        console.log(file);
        let ele = document.createElement("img");
        ele.setAttribute("src", file.result);
        ele.setAttribute("style", "width: 40%");
        divImg.appendChild(ele);
    };

    blocker.style.display = "flex";
});

let digit = [];

x.addEventListener("keydown", (e) => {
    if (e.code[0] === "D") {
        digit.push(parseInt(e.key));
        if (parseInt(digit.join("")) <= 200) {
            dotC.style.transform = `translateX(${parseInt(digit.join(""))}%)`;
        }
    } else if (e.code === "Backspace") {
        digit.pop();
    }
});

// trigger upload file csv
const choose = document.getElementById("file");

function show() {
    choose.click();
}
