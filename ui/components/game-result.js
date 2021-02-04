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
    const game = {
        mmr: Number.parseInt(this.mmr),
        heroId: Number.parseInt(this.heroId),
        compositionId: Number.parseInt(this.compositionId),
    };
    const result = await registerGame(game);
    console.log("Game registered:", result)
    this.heroId = undefined;
    this.compositionId = undefined;
    this.mmr = "";

    EVENT_BUS.send(EVENT.GAME.REGISTER);
}

const data = () => ({heroes: [], heroId: undefined, compositions: [], compositionId: undefined, mmr: ""});
const methods = {onSave};

Vue.component('pma-game-result', {template, mounted, data, methods});
