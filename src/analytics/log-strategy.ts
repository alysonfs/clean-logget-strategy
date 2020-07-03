import { Log } from "../apresentation/log";
import { ErrorLog } from "./error-log";
import { ScreenLog } from "./screen-log";
import { ActionLog } from "./action-log";

export class LogStrategy implements Log {
  constructor(
    private readonly errorLog: ErrorLog,
    private readonly screenLog: ScreenLog,
    private readonly actionLog: ActionLog
  ) { }

  event(type: Log.Type, data: Log.Data): void {
    switch (type) {
      case 'action': 
        this.actionLog.event(type, data)
        break
      case 'screen': 
        this.screenLog.event(type, data)
        break
      case 'error': 
        this.errorLog.event(type, data)
        break
    }
  }
}
