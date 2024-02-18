const track_list = document.getElementById("container_tracks");
const track_add_button = document.getElementById("button_add_track");

track_list.addEventListener("dragover", track_list_drag_handler);
track_list.addEventListener("dragenter", event => event.preventDefault());

track_add_button.addEventListener("click", event => {
    track_list.appendChild(create_new_track());
});

function create_new_track() {
    var track = document.createElement("div");
    track.classList.add("track");
        var draggable_handle = document.createElement("div");
        draggable_handle.draggable = "true";
        draggable_handle.classList.add("track_drag_handle");
        draggable_handle.addEventListener("dragstart", () => {
            // Adding dragging class to an item after a delay
            setTimeout(() => track.classList.add("dragging_track"), 0);
        });
        // Removing dragging class from the item on the dragend event
        draggable_handle.addEventListener("dragend", () => track.classList.remove("dragging_track"));

        var track_controls = document.createElement("div");
        track_controls.classList.add("container_track_controls");
            var track_delete_button = document.createElement("button");
            track_delete_button.classList.add("button_remove_track");
            track_delete_button.innerText = "delete";
            track_delete_button.addEventListener("click", event => {
                track.remove();
            });

        var instrument_selector = document.createElement("select");
        instrument_selector.classList.add("selection_instrument");

        Object.keys(instruments).forEach((key) => {
            let instrument_option = document.createElement("option");
            instrument_option.value = key;
            instrument_option.innerText = key;
            instrument_selector.appendChild(instrument_option);
        });

        var notes = document.createElement("div");
        notes.classList.add("container_note_sequence");
        notes.addEventListener("dragover", note_list_drag_handler);
        notes.addEventListener("dragenter", event => event.preventDefault());
        
            var note_add_button = document.createElement("button");
            note_add_button.classList.add("button_add_notes");
            note_add_button.innerText = "+";
            note_add_button.addEventListener("click", add_note_container);
    
    track.appendChild(draggable_handle);
    track_controls.appendChild(instrument_selector);
    track_controls.appendChild(track_delete_button);
    track.appendChild(track_controls);
    notes.appendChild(note_add_button);
    track.appendChild(notes);

    return track
}

function expand_note_container(event) {
    collapse_all_note_containers();
    event.target.classList.add("conainer_notes_expanded");
    
    let notes = event.target.querySelectorAll(".note");
    notes.forEach(note => {
        note.style.pointerEvents = "auto";
    });

    event.stopPropagation();
}

function collapse_all_note_containers() {
    let elements = document.querySelectorAll(".conainer_notes_expanded");
    elements.forEach(element => {
        element.classList.remove("conainer_notes_expanded");

        let notes = element.querySelectorAll(".note");
        notes.forEach(note => {
            note.style.pointerEvents = "none";
        });
    });
}

function add_note_container(event) {
    var container = document.createElement("div");
    container.classList.add("container_notes");
    container.draggable = "true";

    var note_index = 0;
    for (let row = 0; row < 3; row ++) {
        var container_row = document.createElement("div");
        container_row.classList.add("container_note_rows");
        for (let column = 0; column < 5; column ++) {
            var note = document.createElement("div");
            note.classList.add("note");
            note.classList.add("index_" + note_index)
            note.addEventListener("click", toggle_note_state);

            container_row.appendChild(note);
            note_index ++;
        }
        container.appendChild(container_row);
    }
    container.addEventListener("click", expand_note_container);
    container.addEventListener("contextmenu", delete_note_container);

    container.addEventListener("dragstart", () => {
        // Adding dragging class to an item after a delay
        setTimeout(() => container.classList.add("dragging_note"), 0);
    });
    // Removing dragging class from the item on the dragend event
    container.addEventListener("dragend", () => container.classList.remove("dragging_note"));

    event.target.parentNode.insertBefore(container, event.target);
}

function delete_note_container(event) {
    if (event.target.classList.contains("container_notes")) {
        event.preventDefault();
        event.target.remove();
    }
    event.stopPropagation();
}

function toggle_note_state(event) {
    if (event.target.classList.contains("active_note")) {
        event.target.classList.remove("active_note");
    } else {
        event.target.classList.add("active_note");
        var note_index = parseInt(event.target.classList[1].split('_')[1])
        var instrument = event.target.parentNode.parentNode.parentNode.parentNode.querySelectorAll(".selection_instrument")[0].value;
        if (instruments[instrument].source != undefined) {
            instruments[instrument].source[note_index].play();
        }
    }
    
    event.stopPropagation();
}

document.body.addEventListener("click", event => {
    if (!event.target.classList.contains("container_notes")) {
        collapse_all_note_containers();
    }
})

// dragging handling
function track_list_drag_handler(event) {
    event.preventDefault();
    var draggingItem = track_list.querySelector(".dragging_track");

    if (draggingItem == null)
        return;

    // Getting all items except currently dragging and making an array of them
    let siblings = [...track_list.querySelectorAll(".track:not(.dragging_track)")];

    // Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find(sibling => {
        return event.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    track_list.insertBefore(draggingItem, nextSibling);
}

function note_list_drag_handler(event) {
    event.preventDefault();
    var draggingItem = track_list.querySelector(".dragging_note");

    // Getting all items except currently dragging and making an array of them
    let siblings = [...(draggingItem.parentNode.querySelectorAll(".container_notes:not(.dragging_note)"))];

    // Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find(sibling => {
        let x_condition = event.clientX <= sibling.offsetLeft + sibling.offsetWidth / 2;
        let y_condition = event.clientY <= sibling.offsetTop + sibling.offsetHeight;
        return x_condition & y_condition;
    });

    if (nextSibling == undefined) {
        nextSibling = siblings[siblings.length - 1];
        draggingItem.parentNode.insertBefore(draggingItem, nextSibling.nextSibling);
    } else {
        draggingItem.parentNode.insertBefore(draggingItem, nextSibling);
    }
}