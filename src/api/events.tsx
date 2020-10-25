import { API_BASE_URL } from "../constants";

export interface MyEvent {
  id: string;
  name: string;
  carName: string;
  trackName: string;
  lastModified?: Date;
  rawData: any;
}
export default class EventsService {
  public static eventList(token: string): Promise<MyEvent[]> {
    return new Promise((resolve, reject) => {
      fetch(API_BASE_URL + "/events", { headers: { Authorization: "Bearer " + token } }).then((res: Response) => {
        if (res.ok) {
          res.json().then((j) => resolve(j._embedded.events));
        }
      });
    });
  }

  public static storeEvent(token: string, ev: MyEvent): Promise<{}> {
    return new Promise((resolve, reject) => {
      fetch(API_BASE_URL + "/events", {
        method: "POST",
        headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify(ev),
      });
    });
  }
}
