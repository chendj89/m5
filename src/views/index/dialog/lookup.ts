export default function lookup(
  arr: any[],
  key: string,
  val: any
): number[] | -1 {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return [i];
    }
    if (Array.isArray(arr[i].children)) {
      const nestedIndex = lookup(arr[i].children, key, val);
      if (nestedIndex !== -1) {
        return [i].concat(nestedIndex);
      }
    }
  }
  return -1;
}
