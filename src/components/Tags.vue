<template>
    <div class="tags-div">
        <div class="tag button-shadow" v-for="tag in tags" @click="searchByTag(tag.title)">
            <div class="tooltip">
                <p>{{ tag.title }}</p>
                <span class="tooltiptext">{{ tag.description }}</span>
            </div>

        </div>
        <div class="button-shadow non-tag" v-if="tags != null && tags.length == 0">
            –
        </div>
    </div>
</template>

<script>
import router from '../router';

export default {
    props: ['tags'],
    methods: {
        searchByTag(tag_title) {
            router.push({path:`/search/results/`, query:{tag: tag_title}});
        }
    }
}
</script>

<style>
.tags-div {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 10px;
}

.tag {
    padding: 2px;
    margin: 0;
    background-color: var(--primary);
    border-radius: 5px;
    color: white;
}

.tag:hover {
    cursor: pointer;
    background-color: white;
    color: var(--primary);
}

div.tag p {
    padding: 3px 6px;
    margin: 0;
    
}

.tooltip {
    position: relative;
    display: inline-block;
    /* border-bottom: 1px dotted black; */
}

.tooltip .tooltiptext {
    visibility: hidden;
    min-width: 250px;
    /* max-width: 600px; */
    background-color: black;
    color: #fff;
    text-align: start;
    border-radius: 6px;
    padding: 10px;
    

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 50%;
    margin-left: -60px;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}

.non-tag {
    padding: 5px 10px;
    background-color: var(--primary);
    border-radius: 5px;
    color: white;
}
</style>