// package: idtoken
// file: IDTokenProvider.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as IDTokenProvider_pb from "./IDTokenProvider_pb";

interface IIdTokenProviderService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getToken: IIdTokenProviderService_IGetToken;
}

interface IIdTokenProviderService_IGetToken extends grpc.MethodDefinition<IDTokenProvider_pb.UserCode, IDTokenProvider_pb.MaybeId> {
    path: "/idtoken.IdTokenProvider/GetToken";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<IDTokenProvider_pb.UserCode>;
    requestDeserialize: grpc.deserialize<IDTokenProvider_pb.UserCode>;
    responseSerialize: grpc.serialize<IDTokenProvider_pb.MaybeId>;
    responseDeserialize: grpc.deserialize<IDTokenProvider_pb.MaybeId>;
}

export const IdTokenProviderService: IIdTokenProviderService;

export interface IIdTokenProviderServer extends grpc.UntypedServiceImplementation {
    getToken: grpc.handleUnaryCall<IDTokenProvider_pb.UserCode, IDTokenProvider_pb.MaybeId>;
}

export interface IIdTokenProviderClient {
    getToken(request: IDTokenProvider_pb.UserCode, callback: (error: grpc.ServiceError | null, response: IDTokenProvider_pb.MaybeId) => void): grpc.ClientUnaryCall;
    getToken(request: IDTokenProvider_pb.UserCode, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: IDTokenProvider_pb.MaybeId) => void): grpc.ClientUnaryCall;
    getToken(request: IDTokenProvider_pb.UserCode, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: IDTokenProvider_pb.MaybeId) => void): grpc.ClientUnaryCall;
}

export class IdTokenProviderClient extends grpc.Client implements IIdTokenProviderClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getToken(request: IDTokenProvider_pb.UserCode, callback: (error: grpc.ServiceError | null, response: IDTokenProvider_pb.MaybeId) => void): grpc.ClientUnaryCall;
    public getToken(request: IDTokenProvider_pb.UserCode, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: IDTokenProvider_pb.MaybeId) => void): grpc.ClientUnaryCall;
    public getToken(request: IDTokenProvider_pb.UserCode, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: IDTokenProvider_pb.MaybeId) => void): grpc.ClientUnaryCall;
}
