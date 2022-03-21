const Jimp = require("jimp");
const imp = require("image-pixels");
const express = require("express");
const app = express();

app.use(express.static("static"));

async function main() {
    const font = await Jimp.loadFont("assets/chalk.fnt");
    Jimp.read("iklan4.png")
        .then((image) => {
            return image
                .print(
                    font,
                    100,
                    100,
                    {
                        text: "Mukhamad Khusaini",
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                    },
                    500,
                    100
                )
                .write("./static/img/lpg.jpg"); // save
        })
        .catch((err) => {
            console.error(err);
        });
}

main();

app.get("/", (req, res) => {
    // calculatePXL("./iklan.png");
});

app.listen(5000, () => {
    console.log("Listening at http://localhost:5000");
});

async function calculatePXL(img) {
    let data = await imp(img);
    console.log(data);
}
