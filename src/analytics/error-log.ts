import { Log } from "../apresentation/log";
import { ErrorAnalytics } from "./error-analytics";

export class ErrorLog implements Log {
  constructor(private readonly errorAnalytics: ErrorAnalytics) { }
  
  event(type: Log.Type, data: Log.Data): void {
    this.errorAnalytics.saveError(data.error)
  }
}
