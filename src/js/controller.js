export class Controller {

    constructor(app, model, view) {
        this.app = app;
        this.model = model;
        this.view = view;

        this.addHeroesListeners();
        this.addHeroesBiographyListeners();
    }

    addHeroesBiographyListeners() {
        this.view.heroesBiography.addEventListener('mouseover', () => {
            Array.from(document.getElementsByClassName('heroes-container')).forEach(container =>
                container.style.display = 'flex'
            );
        });

        this.view.heroesBiography.addEventListener('mouseout', () => {
            Array.from(document.getElementsByClassName('heroes-container')).forEach(container =>
                container.style.display = 'none'
            );
        });
    }

    addHeroesListeners() {
        this.model.heroes.forEach( hero => {
            hero.on("pointerdown", event => {
                hero.dragging = !hero.walking;
                this.app.stage.children[0].setChildIndex(hero, this.model.heroes.length - 1);
            });

            hero.on("pointerup", event => {
                hero.dragging = false
            });

            hero.on("pointerupoutside", event => {
                if (!hero.walking) {
                    hero.dragging = false;

                    hero.generateTargetPosition();
                    hero.calculateDistance();
                    if (!this.model.animatedHeroes.includes(hero)) {
                        this.model.animatedHeroes.push(hero);
                        hero.walk();
                    }
                }
            });

            hero.on("mousemove", event => {
                if(hero.dragging){
                    hero.position.x += event.data.originalEvent.movementX;
                    hero.position.y += event.data.originalEvent.movementY;
                }
            });

            hero.on('rightclick', event => {
                hero.generateTargetPosition();
                hero.calculateDistance();
                if (!this.model.animatedHeroes.includes(hero)) {
                    this.model.animatedHeroes.push(hero);
                    hero.walk();
                }
            });
        });
    }

    moveHeroes() {
        this.model.animatedHeroes.forEach(hero => {
            if (Math.round(hero.position.x) !== hero.targetPosition.x) {
                hero.position.x += hero.distance.x / hero.timeToStep;
                hero.position.y += hero.distance.y / hero.timeToStep;
            } else {
                this.model.animatedHeroes.splice(this.model.animatedHeroes.indexOf(hero), 1);
                hero.stop();
                hero.generateTargetPosition();
                hero.calculateDistance();
            }
        });
    }
}