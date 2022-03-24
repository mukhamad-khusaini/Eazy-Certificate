// define variables
const divImg = document.querySelector(".img");
const div = document.querySelector(".editor");
const inp = document.querySelector("form input");
const blocker = document.querySelector(".blocker");
const pointer = document.querySelector(".blocker .pointer");
const dotC = document.querySelector(".blocker .dotContainer");
const x = document.querySelector("#x");
const y = document.querySelector("#y");
const lebar = document.querySelector("#lebar");
const tinggi = document.querySelector("#tinggi");

y.disabled = true;

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

// divImg.addEventListener("change", function (e) {
//     console.log(this);
// });

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

let digitx = [];
let digity = [];

x.addEventListener("keydown", (e) => {
    if (e.code[0] === "D") {
        digitx.push(parseInt(e.key));
        if ((parseInt(digitx.join("")) / 100) * width <= width) {
            let str = dotC.style.transform;
            let c = str.indexOf(" ");

            if (c != -1) {
                let ary = [...str]
                    .map((e, i) => {
                        if (i > c) {
                            return e;
                        }
                    })
                    .join("");
                let newStr = `translateX(${(parseInt(digitx.join("")) / 100) * width}px) ${ary}`;

                dotC.style.transform = newStr;
            } else {
                dotC.style.transform = `translateX(${(parseInt(digitx.join("")) / 100) * width}px)`;
                y.disabled = false;
            }
        }
    } else if (e.code === "Backspace") {
        digitx.pop();
    }
});

y.addEventListener("keydown", (e) => {
    if (e.code[0] === "D") {
        digity.push(parseInt(e.key));
        if ((parseInt(digity.join("")) / 100) * height <= height) {
            let str = dotC.style.transform;
            let c = str.indexOf(" ");

            if (c != -1) {
                let ary = [...str]
                    .map((e, i) => {
                        if (i < c) {
                            return e;
                        }
                    })
                    .join("");
                let newStr = `${ary} translateY(${(parseInt(digity.join("")) / 200) * height}px)`;

                dotC.style.transform = newStr;
            }
            dotC.style.transform += `translateY(${(parseInt(digity.join("")) / 200) * height}px)`;
        }
    } else if (e.code === "Backspace") {
        digity.pop();
    }
});

let digitl = [];
lebar.addEventListener("keydown", (e) => {
    if (e.code[0] === "D") {
        digitl.push(parseInt(e.key));
        if (parseInt(digitl.join("")) <= 400) {
            dotC.style.width = `${parseInt(digitl.join(""))}px`;
        }
    } else if (e.code === "Backspace") {
        digitl.pop();
    }
});

let digitt = [];
tinggi.addEventListener("keydown", (e) => {
    if (e.code[0] === "D") {
        digitt.push(parseInt(e.key));
        if (parseInt(digitt.join("")) <= 100) {
            dotC.style.height = `${parseInt(digitt.join(""))}px`;
        }
    } else if (e.code === "Backspace") {
        digitt.pop();
    }
});

// trigger upload file csv
const choose = document.getElementById("file");

function show() {
    choose.click();
}
