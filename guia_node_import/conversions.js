const mk2m = (m) => {
    return m*1.60934
}

const km2m = (km) => {
    return km/1.60934
}

const c2f = (c) => {
    return (c*9/5)+32;
}

const f2c = (f) => {
    return (f-32)*0.5556
}

export default {mk2m, km2m, c2f, f2c}