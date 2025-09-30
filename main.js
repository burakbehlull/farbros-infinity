import 'dotenv/config'

import startApi from '#api'
import startBot from '#bot'
import { db } from '#config'

db()

startApi()
await startBot()

