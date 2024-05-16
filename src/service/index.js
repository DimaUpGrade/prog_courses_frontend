function getColorByValue(value){
    //value from 0 to 1
    // alert('pps')

    if (value == 0) {
        return "#2985c2";
    }

    let normalize_value = (value / 10).toFixed(2);
    let hue=((normalize_value)*120).toString(10);

    return (["hsl(",hue,",100%,50%)"].join(""));
}

export {getColorByValue}