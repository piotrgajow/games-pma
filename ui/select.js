import Vue from "./lib/vue.esm.browser.js";

const template = `
<div>
    <label :for="dataId">{{label}}:</label>
    <input :list="dataId" v-model="selectedLabel"/>
    <datalist :id="dataId">
        <option v-for="option in options" :key="option.id" :value="option.label"></option>
    </datalist>
</div>
`

function selectedLabelGetter() {
    return this.options.find((it) => this.selected === it.id)?.label || "";
}

function selectedLabelSetter(label) {
    const selected = this.options.find((it) => it.label === label)?.id;
    this.$emit('select', selected);
}

const props = ['dataId', 'options', 'selected', 'label'];
const computed = {
    selectedLabel: {get: selectedLabelGetter, set: selectedLabelSetter},
}
const model = {prop: 'selected', event: 'select'};

Vue.component('pma-select', {template, props, computed, model});
