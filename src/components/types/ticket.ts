export type Ticket = {
  id: number;
  aircraftId: number;
  stationFrom: string;
  stationTo: string;
  timeStart: Date;
  timeEnd: Date;
  price: number;
}
