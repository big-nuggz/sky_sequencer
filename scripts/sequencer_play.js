const play_pause_button = document.getElementById("button_play_pause");
const stop_button = document.getElementById("button_stop");
const key_selector = document.getElementById("select_key");
const volume_slider = document.getElementById("slider_volume");
const input_bpm = document.getElementById("input_bpm");

var playing = false;
var bpm_interval;
var global_timer;
var timers = null;

play_pause_button.addEventListener("click", play_pause_sequence);
stop_button.addEventListener("click", reset_sequence);
volume_slider.addEventListener("input", adjust_volume)
key_selector.addEventListener("input", set_key);
input_bpm.addEventListener("change", set_bpm);

set_bpm();
set_key();

function adjust_volume() {
    var volume = volume_slider.value / 100.0;
    Howler.volume(volume);
}

function set_bpm() {
    bpm_interval = 60.0 / input_bpm.value * 1000.0;
    console.log("bpm interval set to " + bpm_interval + " ms");
}

function set_key() {
    key_offset = parseInt(key_selector.value);
    console.log("key set to " + key_offset);
}

function play_pause_sequence() {
    if (playing) {
        pause_timer();
    } else {
        start_timer();
    }
}

function reset_sequence() {
    playing = false;
    clearInterval(global_timer);
    timers = null;
    reset_playheads();
}

function start_timer() {
    playing = true; 
    global_timer = setInterval(timer_increment, bpm_interval);
}

function pause_timer() {
    playing = false;
    clearInterval(global_timer);
}

function timer_increment() {
    if (timers == null) {
        initialize_timers();
    } else{
        timers.forEach((timer, index) => {
            timers[index] ++;
        });
    }

    reset_playheads();
    play_html();
}

function reset_playheads() {
    var blocks = track_list.querySelectorAll(".container_notes");
    
    blocks.forEach((block) => {
        block.classList.remove("notes_current");
    });
}

function initialize_timers() {
    timers = [];

    var tracks = track_list.querySelectorAll(".track");
    tracks.forEach(track => {
        timers.push(0);
    });
}

function play_html() {
    var tracks = track_list.querySelectorAll(".track");

    tracks.forEach((track, track_index) => {
        var instrument = track.querySelectorAll(".selection_instrument")[0].value;

        var note_blocks = track.querySelectorAll(".container_notes");
        if (timers[track_index] >= note_blocks.length) {
            timers[track_index] = 0;
        }

        var playing_block = note_blocks[timers[track_index]];
        if (playing_block != undefined){
            let notes = playing_block.querySelectorAll('.note');

            playing_block.classList.add("notes_current");

            notes.forEach((note, note_index) => {
                if (note.classList.contains("active_note")) {
                    let source_note_index = major_scale[note_index] + key_offset;
                    instruments[instrument].source[source_note_index].play();
                }
            });
        }
    })
}

// for future
function parse_html() {
    var sequence = {};

    var tracks = track_list.querySelectorAll(".track");

    tracks.forEach(track => {

    })

    return sequence
}