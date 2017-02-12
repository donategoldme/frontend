export function toAudioObjects(arrayOfurl, userId) {
  const arr = {};
  for (let index = 0; index < arrayOfurl.length; index++) {
    const myAudio = new Audio(`/uploads/${userId}/sound/${arrayOfurl[index]}`);
    arr[arrayOfurl[index]] = myAudio;
  }
  return arr;
}
