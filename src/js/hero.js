import {Model} from "./model";
import {rng} from "./common";

export class Hero {

    constructor(name) {
        this.hero = PIXI.Sprite.fromImage(`images/heroes/${name}.png`);
        this.hero.anchor.set(0.5);

        this.hero.name = name;

        this.hero.position.set(
            rng(this.hero.width/2, Model.APP_WIDTH - this.hero.width/2),
            rng(this.hero.height/2, Model.APP_HEIGHT - this.hero.height/2)
        );

        this.hero.interactive = true;
        this.hero.buttonMode = true;

        this.hero.tempo = rng(Model.HERO_TEMPO_MIN, Model.HERO_TEMPO_MAX);

        this.hero.timeToStep = rng(1000/Model.HERO_SPEED_MAX, 1000/Model.HERO_SPEED_MIN);

        this.addWalkingMethods();
        this.addPositioningMethods();

        return this.hero;
    }

    addWalkingMethods() {
        this.hero.walk = () => {
            this.hero.walkingInterval = setInterval(() => {
                if (Math.round(this.hero.position.x) !== this.hero.targetPosition.x) {
                    this.hero.walking = true;
                    this.hero.rotation = this.hero.rotation === 0.1 ? -0.1 : 0.1;
                } else {
                    this.hero.stop();
                }
            }, this.hero.tempo);
        };

        this.hero.stop = () => {
            this.hero.walking = false;
            clearInterval(this.hero.walkingInterval);
            this.hero.rotation = 0;
        };
    }

    addPositioningMethods() {
        (this.hero.generateTargetPosition = () => this.hero.targetPosition = {
            x: rng(this.hero.width/2, Model.APP_WIDTH - this.hero.width/2),
            y: rng(this.hero.height/2, Model.APP_HEIGHT - this.hero.height/2)
        })();

        (this.hero.calculateDistance = () => this.hero.distance = {
            x: this.hero.targetPosition.x - this.hero.position.x,
            y: this.hero.targetPosition.y - this.hero.position.y
        })();
    }

    get timeToStep() {
        return this.hero.timeToStep;
    }

    set timeToStep(value) {
        this.hero.timeToStep = value;
    }

}