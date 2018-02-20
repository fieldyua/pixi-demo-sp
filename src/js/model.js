import {Hero} from "./hero";

export class Model {

    constructor(app) {
        this.app = app;

        Model.APP_WIDTH = app.view.width;
        Model.APP_HEIGHT = app.view.height;

        Model.HERO_SPEED_MIN = 3;
        Model.HERO_SPEED_MAX = 10;

        Model.HERO_TEMPO_MIN = 100;
        Model.HERO_TEMPO_MAX = 200;


        this.heroes = [
            new Hero('cartman'),
            new Hero('stan'),
            new Hero('kyle'),
            new Hero('kenny')
        ];

        this.animatedHeroes = [];
    }

}