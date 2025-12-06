// Collection of algorithm implementations for demonstration (not used in runtime)
// Quicksort implementation (pure, returns a new sorted array)
function quickSort(arr) {
  if (!Array.isArray(arr)) return [];
  // Work on a shallow copy to avoid mutating input
  const a = arr.slice();
  const _qs = (left, right) => {
    if (left >= right) return;
    const pivot = a[Math.floor((left + right) / 2)];
    let i = left;
    let j = right;
    while (i <= j) {
      while (a[i] < pivot) i++;
      while (a[j] > pivot) j--;
      if (i <= j) {
        const tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
        i++;
        j--;
      }
    }
    if (left < j) _qs(left, j);
    if (i < right) _qs(i, right);
  };
  _qs(0, a.length - 1);
  return a;
}

module.exports = { quickSort };
