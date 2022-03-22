const divImg = document.querySelector(".img");
const div = document.querySelector(".editor");
const inp = document.querySelector("form input");
const blocker = document.querySelector(".blocker");

divImg.addEventListener("dragover", function (e) {
    e.preventDefault();
});

divImg.addEventListener("drop", function (e) {
    e.preventDefault();

    this.classList.remove("draging");
    let file = new FileReader();

    file.readAsDataURL(e.dataTransfer.files[0]);

    file.onload = () => {
        console.log(file);
        let ele = document.createElement("img");
        ele.setAttribute("src", file.result);
        ele.setAttribute("style", "width: 40%");
        divImg.appendChild(ele);
    };

    blocker.style.display = "block";
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

    blocker.style.display = "block";
});
