import { Log } from "../apresentation/log";
import { Analytics } from "./analytics";

export class ActionLog implements Log {
  constructor(private readonly analytics: Analytics) { }
  
  event(type: Log.Type, data: Log.Data): void {
    this.analytics.save(type, data.name)
  }
}
