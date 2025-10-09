import 'dotenv/config'

import startApi from '#api'
import startBot from '#botBase'

import { db } from '#config'

db()

startApi()

const bot = await startBot()

export default bot


