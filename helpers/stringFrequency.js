// https://stackoverflow.com/questions/3561493
function escapeRegEx(string){
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

// https://stackoverflow.com/questions/4009756
function countOccurrences(substring, string){
    let regex = new RegExp(escapeRegEx(substring), 'g');
    let count = (string.match(regex) || []).length;
    return count;
}

module.exports = {
    countOccurrences
};
