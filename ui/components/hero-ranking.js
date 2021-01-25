import Vue from "../lib/vue.esm.browser.js";
import {get} from "../services/communication.js";
import {EVENT_BUS, EVENT} from "../services/message-bus.js";

const template = `
<div>
    <span>Filters: {{filterText}}</span>
    <ol>
        <li v-for="hero in heroes" :key="hero.name" :class="heroColor(hero)">{{hero.name}} ({{hero.score}})</li>    
    </ol>
</div>
`

function mounted() {
    loadRanking.call(this);
    EVENT_BUS.addEventListener(EVENT.GAME.REGISTER, onGameRegistered.bind(this));
    EVENT_BUS.addEventListener(EVENT.FILTER.INPUT, filterInput.bind(this));
    EVENT_BUS.addEventListener(EVENT.FILTER.CUT, filterCut.bind(this));
    EVENT_BUS.addEventListener(EVENT.FILTER.DELETE, filterDelete.bind(this));
}

async function loadRanking() {
    this.heroes = await get("hero/ranking");
}

function onGameRegistered() {
    void loadRanking.call(this);
    this.filters = [""];
    filterChanged.call(this);
}

function filterInput({detail: key}) {
    if (key === " ") {
        this.filters.push("");
    } else {
        const filter = this.filters.pop()
        this.filters.push(`${filter}${key}`);
    }
    filterChanged.call(this);
}

function filterCut() {
    const filter = this.filters.pop();
    this.filters.push(filter.slice(0, -1));
    filterChanged.call(this);
}

function filterDelete() {
    const last = this.filters.pop();
    if (last === "") {
        this.filters.pop();
    }
    this.filters.push("");
    filterChanged.call(this);
}

function filterChanged() {
    const terms = this.filters.filter((it) => it !== "");
    this.heroes = this.heroes.map((hero) => {
        const heroName = hero.name.toLowerCase();
        const found = terms.some((term) => heroName.includes(term))
        return { ...hero, found };
    })
}

function filterText() {
    return this.filters.join(" ");
}

function heroColor(hero) {
    return {
        green: hero.score > 0,
        red: hero.score < 0,
        highlight: hero.found,
    };
}

const data = () => ({heroes: [], filters: [""]});
const methods = {heroColor};
const computed = {filterText};

Vue.component('pma-hero-ranking', {template, mounted, data, computed, methods});
