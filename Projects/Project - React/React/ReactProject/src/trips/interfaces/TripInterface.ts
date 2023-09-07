interface TripInterface {
  // Record<string, unknown> | undefined;
  id?: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  description: string;
  price: number;
  image: string;
  activities: string[];
}
export default TripInterface;
