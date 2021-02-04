import Vue from "../lib/vue.esm.browser.js";
import {EVENT, EVENT_BUS} from "../services/message-bus.js";
import {getStatistics} from "../services/communication.js";

const template = `
<div>
    <p>Current MMR: {{current}}</p>
    <p>Peak MMR: {{peak}}</p>
    <p>Today MMR: <span :class="todayColor()">{{today}}</span></p>
    <a href="https://hearthstone.gamepedia.com/Battlegrounds" target="_blank">Wiki</a>
    <p>BentonNelvar#2166</p>
</div>
`

function mounted() {
    loadStatistics.call(this);
    EVENT_BUS.addEventListener(EVENT.GAME.REGISTER, loadStatistics.bind(this));
}

async function loadStatistics() {
    const statistics = await getStatistics();
    this.current = statistics.currentMmr;
    this.peak = statistics.peakMmr;
    this.delta = statistics.mmrDeltaToday;
    this.played = statistics.gamesPlayedToday;
}

function todayColor() {
    return {
        green: this.delta > 0,
        red: this.delta < 0,
    };
}

function today() {
    const sign = this.delta > 0 ? '+' : '';
    return `${sign}${this.delta} over ${this.played} games`;
}

const data = () => ({current: 0, peak: 0, delta: 0, played: 0});
const methods = {todayColor};
const computed = {today};

Vue.component('pma-app-header', {template, data, computed, methods, mounted});
