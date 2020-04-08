export const API = "http://localhost:4000/api/questions";

//Some data coming from API have special chars, so need to handle that.
export const escapeHtml = text => {
    let txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value
}

//Random number between 0 and size
export const getRandom = size => {
    return Math.floor(Math.random() * (size));
}

//Function to shuffle an array, i use that on questions.
export const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}