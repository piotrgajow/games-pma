import Vue from "../lib/vue.esm.browser.js";
import {getCompositions, getHeroes, registerGame} from "../services/communication.js";
import "./select.js";
import {EVENT_BUS, EVENT} from "../services/message-bus.js";

const template = `
<div>
    <pma-select data-id="hero-choice" label="Hero" :options="heroes" v-model="heroId"></pma-select>
    <pma-select data-id="composition-choice" label="Composition" :options="compositions" v-model="compositionId"></pma-select>
    <label for="mmr-change">MMR change:</label>
    <input id="mmr-change" name="mmr-change" v-model="mmr"/>
    <br/>
    <label for="placement">Placement:</label>
    <input id="placement" name="placement" v-model="placement"/>
    <br/>
    <input type="checkbox" id="ex-aequo" name="ex-aequo" v-model="isExAequo"/>
    <label for="ex-aequo">Ex aequo</label>
    <br/>
    <button @click="onSave">Save</button>
</div>
`

async function mounted() {
    const [heroes, compositions] = await Promise.all([getHeroes(), getCompositions()]);
    this.heroes = heroes.map((it) => ({id: `${it.id}`, label: it.name}));
    this.compositions = compositions.map((it) => ({id: `${it.id}`, label: it.name}));
}

async function onSave() {
    if (this.heroId === undefined || this.compositionId === undefined) {
        window.alert("Hero/composition not chosen");
        return;
    }
    const placement = Number.parseInt(this.placement);
    if (![1, 2, 3, 4, 5, 6, 7, 8].includes(placement)) {
        window.alert("Invalid placement");
        return;
    }
    const game = {
        mmr: Number.parseInt(this.mmr),
        heroId: Number.parseInt(this.heroId),
        compositionId: Number.parseInt(this.compositionId),
        placement,
        isExAequo: this.isExAequo,
    };
    const result = await registerGame(game);
    console.log("Game registered:", result)
    this.heroId = undefined;
    this.compositionId = undefined;
    this.mmr = "";
    this.placement = "";
    this.isExAequo = false;

    EVENT_BUS.send(EVENT.GAME.REGISTER);
}

const data = () => ({heroes: [], heroId: undefined, compositions: [], compositionId: undefined, mmr: "", placement: "", isExAequo: false});
const methods = {onSave};

Vue.component('pma-game-result', {template, mounted, data, methods});
