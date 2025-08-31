// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var IDTokenProvider_pb = require('./IDTokenProvider_pb.js');

function serialize_idtoken_MaybeId(arg) {
  if (!(arg instanceof IDTokenProvider_pb.MaybeId)) {
    throw new Error('Expected argument of type idtoken.MaybeId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_idtoken_MaybeId(buffer_arg) {
  return IDTokenProvider_pb.MaybeId.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_idtoken_UserCode(arg) {
  if (!(arg instanceof IDTokenProvider_pb.UserCode)) {
    throw new Error('Expected argument of type idtoken.UserCode');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_idtoken_UserCode(buffer_arg) {
  return IDTokenProvider_pb.UserCode.deserializeBinary(new Uint8Array(buffer_arg));
}


var IdTokenProviderService = exports.IdTokenProviderService = {
  // OTP -> ID token or err
getToken: {
    path: '/idtoken.IdTokenProvider/GetToken',
    requestStream: false,
    responseStream: false,
    requestType: IDTokenProvider_pb.UserCode,
    responseType: IDTokenProvider_pb.MaybeId,
    requestSerialize: serialize_idtoken_UserCode,
    requestDeserialize: deserialize_idtoken_UserCode,
    responseSerialize: serialize_idtoken_MaybeId,
    responseDeserialize: deserialize_idtoken_MaybeId,
  },
};

exports.IdTokenProviderClient = grpc.makeGenericClientConstructor(IdTokenProviderService, 'IdTokenProvider');
