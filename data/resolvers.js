import { PubSub } from 'apollo-server-express'
import { Author } from '../model/author'
import { View } from '../model/view'
import { Post } from '../model/post'
import { FortuneCookie } from '../model/fortune-cookie'
import { Trackable } from '../model/trackable'
import { Led } from '../model/led'

const OmloxRPC = require('omlox-rpc')

const pubsub = new PubSub()

const omloxRPC = new OmloxRPC('ws://localhost:8081/v1/ws/rpc');
omloxRPC.on('wsConnected', (connected) => {
  if (connected) {
    omloxRPC.registerMethodCall('omloxExampleGetTrackables', (methodName, params, cb) => {
      cb(null, `Echo for ${methodName}`);
    }, []);
    omloxRPC.registerMethodCall('omloxExampleGetTrackable', (methodName, params, cb) => {
      cb(null, `Echo for ${methodName}`);
    }, []);
    omloxRPC.registerMethodCall('omloxExampleSubscribeBattery', (methodName, params, cb) => {
      cb(null, `Echo for ${methodName}`);
    }, []);
    omloxRPC.registerMethodCall('omloxExampleSetLed', (methodName, params, cb) => {
      cb(null, `Echo for ${methodName}`);
    }, []);

  }
});
omloxRPC.on('connectionStateChanged',(stateObj) => {
  switch(stateObj.newState){
    case OmloxRPC.CONNECTION_STATE.OFF: 
      pubsub.publish('rpcConnectionStateChanged', {rpcConnectionStateChanged: 'OFF'});
      break;
      case OmloxRPC.CONNECTION_STATE.CONNECTING: 
        pubsub.publish('rpcConnectionStateChanged', {rpcConnectionStateChanged: 'CONNECTING'});
        break;
      case OmloxRPC.CONNECTION_STATE.CONNECTED: 
          pubsub.publish('rpcConnectionStateChanged', {rpcConnectionStateChanged: 'CONNECTED'});
          break;
      case OmloxRPC.CONNECTION_STATE.OFF: 
          pubsub.publish('rpcConnectionStateChanged', {rpcConnectionStateChanged: 'OFF'});
          break;
  }
});
omloxRPC.connect();

const resolvers = {
  Query: {
    // author (parent, args) {
    //   return Author.find({ firstName: args.firstName, lastName: args.lastName }).then(results => Promise.resolve(results[0]))
    // },
    // allAuthors (parent, args) {
    //   return Author.find({})
    // },
    // getFortuneCookie (parent, args, _, info) {
    //   // info.cacheControl.setCacheHint({ maxAge: 60, scope: 'PRIVATE' })
    //   return FortuneCookie.getOne()
    // }
    allTrackables: ()=> {
      return Trackable.find().then((trackables)=> Promise.resolve(trackables));
    }
  },
  Mutation: {
    createTrackable: (_, {input}) => {
      console.log(input)
      return new Trackable(input).save().then((trackable) => {
        Promise.resolve(trackable)
      })
    },
    setBattery: (_, {input}) => {

      return Trackable.findOneAndUpdate({id: input.trackableId},{battery: {
        input
      }},{new: true}).then((trackable)=> {
        console.log(trackable);
        Promise.resolve(trackable)
      })
    },
    // createPost (parent, { input }) {
    //   return new Post(input).save().then((post) => {
    //     pubsub.publish('postAdded', { postAdded: post })
    //     return Promise.resolve(post)
    //   })
    // }
  },
  Subscription: {
    rpcConnectionStateChanged: {
      subscribe: () => pubsub.asyncIterator(['rpcConnectionStateChanged'])
    }
    // postAdded: {
    //   subscribe: () => pubsub.asyncIterator(['postAdded'])
    // }
  },
  // Author: {
  //   posts (author) {
  //     return Post.find({ author: author })
  //   },
  //   id (author) {
  //     return author.id
  //   }
  // },
  // Post: {
  //   author (post) {
  //     return Author.findById(post.author)
  //   },
  //   views (post) {
  //     return View.findOne({ postId: post.id }).then(view => view.views)
  //   }
  // }
}

export default resolvers
