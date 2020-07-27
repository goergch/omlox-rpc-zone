import Mongoose from 'mongoose'
import {LedSchema} from './led'
const TrackableSchema = {
  id: String,
  zone: String,
  battery: {
    type:{
      type: String,
      enum: ["LIION", "NIMH", "LEAD", "SUPERCAP"],
    },
    state: {
      type: String,
      enum: [ "CHARGING", "DISCHARGING" ],
    },
    stateOfCharge: Number
  },
  leds: [LedSchema]
}
const Trackable = Mongoose.model('Trackable', TrackableSchema)

export { Trackable }
