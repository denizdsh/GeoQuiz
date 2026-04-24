export function getRandomElements(arr, count) {
  let tempArray = [...arr];
  let result = [];

  for (let i = 0; i < count && tempArray.length; i++) {
    let index = Math.floor(Math.random() * tempArray.length); // random index

    result.push(tempArray[index]);

    tempArray.splice(index, 1);
  }

  return result;
}
