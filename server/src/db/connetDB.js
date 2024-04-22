import mongoose from 'mongoose'
import { logger } from '../../logger.js'

const connect = () => {
  mongoose
    .connect(`${process.env.DATABASE_URL}`)
    .then(() => logger.info('Connected to DB'))
    .catch((error) => {
      logger.error('Smth went wrong', error)
    })
}

export { connect }
