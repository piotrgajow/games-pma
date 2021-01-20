import "./hero-ranking.js";
import "./game-result.js";

const template = `
<div>
    <pma-hero-ranking></pma-hero-ranking>
    <pma-game-result></pma-game-result>
</div>
`

Vue.component('pma-app', {template});

new Vue({el: '#app'});
