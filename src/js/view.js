export class View {

    constructor(app) {
        this.app = app;
        this.heroesBiography = document.getElementsByClassName('heroes')[0];
    }

    showHeroes(background, heroes) {
        heroes.forEach(hero => {
            background.addChild(hero);
        });
    }
}