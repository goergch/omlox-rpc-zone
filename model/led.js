import Mongoose from 'mongoose'

const LedSchema = {
  id: String,
  color: {
      red: Number,
      green: Number,
      blue: Number
  },
  brightness: Number,
  state:{
    type: String,
    enum: ['ON', 'OFF', 'BLINKING']
  }
};
const Led = Mongoose.model('Led', LedSchema)

export { Led, LedSchema }
