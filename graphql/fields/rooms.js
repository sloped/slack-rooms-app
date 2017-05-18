import {GraphQLList } from 'graphql';
import {Rooms} from '../../database';
import Room from '../types/room.js';

const rooms =  {
      type: new GraphQLList(Room),
      args: {},
      resolve(root, params, options, ast) {
        return new Promise( (resolve, reject) => {
            Rooms.forge().fetch().then( (collection) => {
              resolve(collection.models.map( ({attributes}) => {
                return {
                  name: attributes.name,
                  calendar: attributes.gid
                }
              }));
            })
        })
      }
    }
module.exports = rooms;