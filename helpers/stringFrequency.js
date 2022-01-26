
// https://stackoverflow.com/questions/4009756
function countOccurrences(substring, string){
    let regex = new RegExp(substring, 'g');
    let count = (string.match(regex) || []).length;
    return count;
}

module.exports = {
    countOccurrences
};
