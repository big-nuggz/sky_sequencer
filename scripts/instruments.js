const note_names = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

// harp
var source_harp = [];
var octaves = [3, 4, 5];
octaves.forEach((octave) => {
    note_names.forEach((name) => {
        source_harp.push(new Howl({src: ['../audio/harp/' + name + octave + '.ogg']}));
    })
})
source_harp.push(new Howl({src: ['../audio/harp/C6.ogg']}));

// plong
var source_plong = []
octaves = [4, 5, 6];
octaves.forEach((octave) => {
    note_names.forEach((name) => {
        source_plong.push(new Howl({src: ['../audio/plong/' + name + octave + '.mp3']}));
    })
})
source_plong.push(new Howl({src: ['../audio/plong/C7.mp3']}));

// definitons
const instruments = {
    "harp": {
        "id": "harp", 
        "source": source_harp
    },
    // "bass harp": {
    //     "id": "bass_harp"
    // },
    // "guitar": {
    //     "id": "guitar"
    // },
    // "ukulele": {
    //     "id": "ukulele"
    // },
    // "lute": {
    //     "id": "lute"
    // },
    // "electric guitar": {
    //     "id": "electric_guitar"
    // },
    // "piano": {
    //     "id": "piano"
    // },
    // "winter piano": {
    //     "id": "winter_piano"
    // },
    // "xylophone": {
    //     "id": "xylophone"
    // },
    // "kalimba": {
    //     "id": "kalimba"
    // },
    // "horn": {
    //     "id": "horn"
    // },
    // "flute": {
    //     "id": "flute"
    // },
    // "panflute": {
    //     "id": "panflute"
    // },
    // "bugle": {
    //     "id": "bugle"
    // },
    // "vessel flute": {
    //     "id": "vessel_flute"
    // },
    // "drum": {
    //     "id": "drum"
    // },
    // "small bell": {
    //     "id": "small_bell"
    // },
    // "large bell": {
    //     "id": "large_bell"
    // },
    // "handpan": {
    //     "id": "handpan"
    // },
    // "prophecy drum": {
    //     "id": "prophecy_drum"
    // },
    // "aurora": {
    //     "id": "aurora"
    // },
    // "ocarina": {
    //     "id": "ocarina"
    // },
    // "violin": {
    //     "id": "violin"
    // },
    // "saxophone": {
    //     "id": "saxophone"
    // },
    // "fortune drum": {
    //     "id": "fortune_drum"
    // }, 
    "plong": {
        "id": "pling_plong", 
        "source": source_plong
    }
}