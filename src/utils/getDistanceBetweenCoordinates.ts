interface Coordinates {
  lat: number;
  lon: number;
}

export default function getDistanceBetweenCoordinates(
  from: Coordinates,
  to: Coordinates,
): number {
  const R: number = 6371;
  const dLat: number = (to.lat - from.lat) * (Math.PI / 180);
  const dLon: number = (to.lon - from.lon) * (Math.PI / 180);
  const a: number =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(from.lat * (Math.PI / 180)) *
      Math.cos(to.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance: number = R * c;
  return distance;
}
