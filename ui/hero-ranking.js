import Vue from "./lib/vue.esm.browser.js";
import {get} from "./communication.js";

const template = `
<div>
    <input @keyup="onFilter"/>
    <ol>
        <li v-for="hero in heroes" :key="hero.name" :class="heroColor(hero)">{{hero.name}} ({{hero.score}})</li>    
    </ol>
</div>
`

async function created() {
    this.heroes = await get("hero/ranking");
}

function onFilter(event) {
    console.log(event)
    const filter = event.target.value.toLowerCase();
    const terms = filter.split(" ").filter((it) => it.trim());
    this.heroes = this.heroes.map((hero) => {
        const heroName = hero.name.toLowerCase();
        const found = terms.some((term) => heroName.includes(term))
        return { ...hero, found };
    })
}

function heroColor(hero) {
    return {
        green: hero.score > 0,
        red: hero.score < 0,
        highlight: hero.found,
    };
}

const data = () => ({heroes: []});
const methods = {heroColor, onFilter};

Vue.component('pma-hero-ranking', {template, created, data, methods});
