import {Model} from "./model";
import {View} from "./view";
import {Controller} from "./controller";

let app,
    scene = document.getElementById('application'),
    background = new PIXI.Container();

let model, view, controller;

PIXI.loader
    .add([
        'images/heroes/cartman.png',
        'images/heroes/stan.png',
        'images/heroes/kyle.png',
        'images/heroes/kenny.png'
    ])
    .load(initApp);


function initApp () {
    app = new PIXI.Application(scene.offsetWidth, scene.offsetHeight, {backgroundColor: 0xBCBCBC});
    scene.appendChild(app.view);
    app.stage.addChild(background);


    model = new Model(app);
    view = new View(app);
    controller = new Controller(app, model, view);

    view.showHeroes(background, model.heroes);


    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controller.moveHeroes();
}

document.oncontextmenu = () => false;