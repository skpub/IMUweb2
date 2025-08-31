// package: idtoken
// file: IDTokenProvider.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class UserCode extends jspb.Message { 
    getCode(): string;
    setCode(value: string): UserCode;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserCode.AsObject;
    static toObject(includeInstance: boolean, msg: UserCode): UserCode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserCode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserCode;
    static deserializeBinaryFromReader(message: UserCode, reader: jspb.BinaryReader): UserCode;
}

export namespace UserCode {
    export type AsObject = {
        code: string,
    }
}

export class MaybeId extends jspb.Message { 

    hasId(): boolean;
    clearId(): void;
    getId(): Uint8Array | string;
    getId_asU8(): Uint8Array;
    getId_asB64(): string;
    setId(value: Uint8Array | string): MaybeId;

    hasErr(): boolean;
    clearErr(): void;
    getErr(): string;
    setErr(value: string): MaybeId;

    getMessageCase(): MaybeId.MessageCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MaybeId.AsObject;
    static toObject(includeInstance: boolean, msg: MaybeId): MaybeId.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MaybeId, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MaybeId;
    static deserializeBinaryFromReader(message: MaybeId, reader: jspb.BinaryReader): MaybeId;
}

export namespace MaybeId {
    export type AsObject = {
        id: Uint8Array | string,
        err: string,
    }

    export enum MessageCase {
        MESSAGE_NOT_SET = 0,
        ID = 1,
        ERR = 2,
    }

}
