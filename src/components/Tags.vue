<template>
    <div class="tags-div">
        <div class="tag" v-for="tag in tags">
            <div class="tooltip">
                <p>{{ tag.title }}</p>
                <span class="tooltiptext">{{ tag.description }}</span>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    props: ['tags'],
}
</script>

<style>
.tags-div {
    display: inline-flex;
    gap: 10px;
}

.tag {
    padding: 2px;
    margin: 0;
    background-color: var(--primary);
    border-radius: 5px;
}

/* .tag:hover {
    cursor: pointer;
} */

div.tag p {
    padding: 3px 6px;
    margin: 0;
    color: white;
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
</style>