import { LoginView } from '../apresentation/login-view'
import { LogStrategy } from '../analytics/log-strategy'
import { SentryAdapter } from '../infra/sentry-adapter'
import { FirebaseAdapter } from '../infra/firebase-adapter'
import { MongoAnalyticsRepository } from '../infra/mongodb-analytics-repo'
import { ErrorLog } from '../analytics/error-log'
import { ScreenLog } from '../analytics/screen-log'
import { ActionLog } from '../analytics/action-log'
import { ErrorAnalyticsComposite } from '../infra/error-analytics-composite'
import { LogglyAdapter } from '../infra/loggly-adapter'

export const makeLoginView = () : LoginView => {

  const errorAnalyticsComposite = new ErrorAnalyticsComposite([
    new SentryAdapter(),
    new LogglyAdapter(),
    new MongoAnalyticsRepository()
  ])
  
  const firebaseAdapter = new FirebaseAdapter()
  const errorLog = new ErrorLog(errorAnalyticsComposite)
  const actionLog = new ActionLog(firebaseAdapter)
  const screenLog = new ScreenLog(firebaseAdapter)

  const logStrategy = new LogStrategy(errorLog, screenLog, actionLog)
  return new LoginView(logStrategy)
}