import { API_BASE_URL } from "../constants";
import { IDriver } from "../stores/driver/types";
import { ITimedRace } from "../stores/race/types";
import { jsonDateEnhancer } from "../utils/compressJson";

export interface InternalRawData {
  race: ITimedRace;
  drivers: IDriver[];
}
export interface MyEvent {
  id: string;
  name: string;
  carName: string;
  trackName: string;
  lastModified?: Date;
  rawData: InternalRawData;
}
export default class EventsService {
  public static eventList(token: string): Promise<MyEvent[]> {
    return new Promise((resolve, reject) => {
      fetch(API_BASE_URL + "/events/own", { method: "GET", headers: { Authorization: "Bearer " + token } }).then(
        (res: Response) => {
          if (res.ok) {
            res
              .json()
              .then((j) =>
                resolve(j._embedded !== undefined ? jsonDateEnhancer(JSON.stringify(j._embedded.events)) : [])
              );
          }
        }
      );
    });
  }

  public static event(token: string, id: string): Promise<MyEvent[]> {
    return new Promise((resolve, reject) => {
      fetch(API_BASE_URL + "/events/" + id, { method: "GET", headers: { Authorization: "Bearer " + token } }).then(
        (res: Response) => {
          if (res.ok) {
            res.text().then((j) => resolve(jsonDateEnhancer(j)));
          }
        }
      );
    });
  }

  public static storeEvent(token: string, ev: MyEvent): Promise<{}> {
    return new Promise((resolve, reject) => {
      fetch(API_BASE_URL + "/events/" + ev.id, {
        method: "PUT",
        headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify(ev),
      }).then((res: Response) => {
        if (res.ok) {
          res.text().then((j) => resolve(jsonDateEnhancer(j)));
        }
      });
    });
  }

  public static deleteEvent(token: string, id: string): Promise<{}> {
    return new Promise((resolve, reject) => {
      fetch(API_BASE_URL + "/events/" + id, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      });
    });
  }
}
