import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import resolvers from './resolvers'
import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    allTrackables: [Trackable]
    trackable(id: ID, zoneId: ID): Trackable
    led(id: ID!): LED
  }

  type Subscription {
    batteryChanged(trackable:ID): Trackable
    rpcConnectionStateChanged: RpcConnectionState
    ledChanged: LED
  }

  type Mutation {
    setLed(input: LedInput): LED 
    setBattery(input: BatteryInput): Trackable
    createTrackable(input: TrackableInput): Trackable
  }
 
  input LedInput {
    id: ID!
    color: LedColorInput
    brightness: Int
    state: LedState 
  }

  input TrackableInput {
    id: ID!
    zone: ID!
    battery: BatteryInput
    leds: [LedInput]
  } 
  
  input LedColorInput{
    red: Int
    green: Int
    blue: Int
  }

  input BatteryInput {
    trackableId: ID
    type: BatteryType
    state: BatteryState 
    stateOfCharge: Int
  }

  enum BatteryState {
    CHARGING
    DISCHARGING
  }

  enum BatteryType {
    LIION
    NIMH
    LEAD
    SUPERCAP
  }

  enum RpcConnectionState {
    OFF
    CONNECTING
    CONNECTED
    ERROR
  }

  enum LedState{
    ON
    OFF
    BLINKING
  }

  type Battery{
    type: BatteryType
    state: BatteryState
    stateOfCharge: Int
  }
 
  type LedColor{
    red: Int
    green: Int
    blue: Int
  }

  type LED {
    id: ID!
    color: LedColor
    brightness: Int
    state: LedState 
  }

  type Trackable {
    id: ID!
    zone: ID!
    battery: Battery
    leds: [LED]
  }
`

const schema = makeExecutableSchema({ typeDefs, resolvers })

// addMockFunctionsToSchema({ schema, mocks })

export { schema, typeDefs }
