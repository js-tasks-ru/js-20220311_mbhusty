/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {

  const directionsSort = {
    asc: 1,
    desc: -1
  };

  const directionSort = directionsSort[param];

  return [...arr].sort(function (a, b) {
    return a.localeCompare(b, 'ru', {caseFirst: 'upper'}) * directionSort;
  });
}
