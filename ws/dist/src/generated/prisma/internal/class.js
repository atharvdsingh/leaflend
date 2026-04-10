"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.5.0",
    "engineVersion": "280c870be64f457428992c43c1f6d557fab6e29e",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider     = \"prisma-client\"\n  output       = \"../src/generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel users {\n  id              String  @id\n  name            String?\n  email           String?\n  sendMessage     chat[]  @relation(\"sendsMessages\")\n  receiveMessages chat[]  @relation(\"receivedMessages\")\n}\n\nmodel chat {\n  id         String   @id @default(nanoid())\n  senderId   String\n  receiverId String\n  sender     users    @relation(\"sendsMessages\", fields: [senderId], references: [id])\n  receiver   users    @relation(\"receivedMessages\", fields: [receiverId], references: [id])\n  messages   String\n  createdAt  DateTime @default(now())\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"users\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sendMessage\",\"kind\":\"object\",\"type\":\"chat\",\"relationName\":\"sendsMessages\"},{\"name\":\"receiveMessages\",\"kind\":\"object\",\"type\":\"chat\",\"relationName\":\"receivedMessages\"}],\"dbName\":null},\"chat\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"senderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"receiverId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sender\",\"kind\":\"object\",\"type\":\"users\",\"relationName\":\"sendsMessages\"},{\"name\":\"receiver\",\"kind\":\"object\",\"type\":\"users\",\"relationName\":\"receivedMessages\"},{\"name\":\"messages\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"sender\",\"receiver\",\"sendMessage\",\"receiveMessages\",\"_count\",\"users.findUnique\",\"users.findUniqueOrThrow\",\"users.findFirst\",\"users.findFirstOrThrow\",\"users.findMany\",\"data\",\"users.createOne\",\"users.createMany\",\"users.createManyAndReturn\",\"users.updateOne\",\"users.updateMany\",\"users.updateManyAndReturn\",\"create\",\"update\",\"users.upsertOne\",\"users.deleteOne\",\"users.deleteMany\",\"having\",\"_min\",\"_max\",\"users.groupBy\",\"users.aggregate\",\"chat.findUnique\",\"chat.findUniqueOrThrow\",\"chat.findFirst\",\"chat.findFirstOrThrow\",\"chat.findMany\",\"chat.createOne\",\"chat.createMany\",\"chat.createManyAndReturn\",\"chat.updateOne\",\"chat.updateMany\",\"chat.updateManyAndReturn\",\"chat.upsertOne\",\"chat.deleteOne\",\"chat.deleteMany\",\"chat.groupBy\",\"chat.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"senderId\",\"receiverId\",\"messages\",\"createdAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"name\",\"email\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\"]"),
    graph: "fxIgCAUAAEcAIAYAAEcAIC4AAEQAMC8AAAsAEDAAAEQAMDEBAAAAAUEBAEYAIUIBAEYAIQEAAAABACAKAwAASgAgBAAASgAgLgAASAAwLwAAAwAQMAAASAAwMQEARQAhMgEARQAhMwEARQAhNAEARQAhNUAASQAhAgMAAHMAIAQAAHMAIAoDAABKACAEAABKACAuAABIADAvAAADABAwAABIADAxAQAAAAEyAQBFACEzAQBFACE0AQBFACE1QABJACEDAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAEAAAADACABAAAAAwAgAQAAAAEAIAgFAABHACAGAABHACAuAABEADAvAAALABAwAABEADAxAQBFACFBAQBGACFCAQBGACEEBQAAcgAgBgAAcgAgQQAAVAAgQgAAVAAgAwAAAAsAIAEAAAwAMAIAAAEAIAMAAAALACABAAAMADACAAABACADAAAACwAgAQAADAAwAgAAAQAgBQUAAHAAIAYAAHEAIDEBAAAAAUEBAAAAAUIBAAAAAQENAAAQACADMQEAAAABQQEAAAABQgEAAAABAQ0AABIAMAENAAASADAFBQAAWQAgBgAAWgAgMQEATgAhQQEAWAAhQgEAWAAhAgAAAAEAIA0AABUAIAMxAQBOACFBAQBYACFCAQBYACECAAAACwAgDQAAFwAgAgAAAAsAIA0AABcAIAMAAAABACAUAAAQACAVAAAVACABAAAAAQAgAQAAAAsAIAUHAABVACAaAABXACAbAABWACBBAABUACBCAABUACAGLgAAPwAwLwAAHgAQMAAAPwAwMQEAOAAhQQEAQAAhQgEAQAAhAwAAAAsAIAEAAB0AMBkAAB4AIAMAAAALACABAAAMADACAAABACABAAAABQAgAQAAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAcDAABSACAEAABTACAxAQAAAAEyAQAAAAEzAQAAAAE0AQAAAAE1QAAAAAEBDQAAJgAgBTEBAAAAATIBAAAAATMBAAAAATQBAAAAATVAAAAAAQENAAAoADABDQAAKAAwBwMAAFAAIAQAAFEAIDEBAE4AITIBAE4AITMBAE4AITQBAE4AITVAAE8AIQIAAAAFACANAAArACAFMQEATgAhMgEATgAhMwEATgAhNAEATgAhNUAATwAhAgAAAAMAIA0AAC0AIAIAAAADACANAAAtACADAAAABQAgFAAAJgAgFQAAKwAgAQAAAAUAIAEAAAADACADBwAASwAgGgAATQAgGwAATAAgCC4AADcAMC8AADQAEDAAADcAMDEBADgAITIBADgAITMBADgAITQBADgAITVAADkAIQMAAAADACABAAAzADAZAAA0ACADAAAAAwAgAQAABAAwAgAABQAgCC4AADcAMC8AADQAEDAAADcAMDEBADgAITIBADgAITMBADgAITQBADgAITVAADkAIQ4HAAA7ACAaAAA-ACAbAAA-ACA2AQAAAAE3AQAAAAQ4AQAAAAQ5AQAAAAE6AQAAAAE7AQAAAAE8AQAAAAE9AQA9ACE-AQAAAAE_AQAAAAFAAQAAAAELBwAAOwAgGgAAPAAgGwAAPAAgNkAAAAABN0AAAAAEOEAAAAAEOUAAAAABOkAAAAABO0AAAAABPEAAAAABPUAAOgAhCwcAADsAIBoAADwAIBsAADwAIDZAAAAAATdAAAAABDhAAAAABDlAAAAAATpAAAAAATtAAAAAATxAAAAAAT1AADoAIQg2AgAAAAE3AgAAAAQ4AgAAAAQ5AgAAAAE6AgAAAAE7AgAAAAE8AgAAAAE9AgA7ACEINkAAAAABN0AAAAAEOEAAAAAEOUAAAAABOkAAAAABO0AAAAABPEAAAAABPUAAPAAhDgcAADsAIBoAAD4AIBsAAD4AIDYBAAAAATcBAAAABDgBAAAABDkBAAAAAToBAAAAATsBAAAAATwBAAAAAT0BAD0AIT4BAAAAAT8BAAAAAUABAAAAAQs2AQAAAAE3AQAAAAQ4AQAAAAQ5AQAAAAE6AQAAAAE7AQAAAAE8AQAAAAE9AQA-ACE-AQAAAAE_AQAAAAFAAQAAAAEGLgAAPwAwLwAAHgAQMAAAPwAwMQEAOAAhQQEAQAAhQgEAQAAhDgcAAEIAIBoAAEMAIBsAAEMAIDYBAAAAATcBAAAABTgBAAAABTkBAAAAAToBAAAAATsBAAAAATwBAAAAAT0BAEEAIT4BAAAAAT8BAAAAAUABAAAAAQ4HAABCACAaAABDACAbAABDACA2AQAAAAE3AQAAAAU4AQAAAAU5AQAAAAE6AQAAAAE7AQAAAAE8AQAAAAE9AQBBACE-AQAAAAE_AQAAAAFAAQAAAAEINgIAAAABNwIAAAAFOAIAAAAFOQIAAAABOgIAAAABOwIAAAABPAIAAAABPQIAQgAhCzYBAAAAATcBAAAABTgBAAAABTkBAAAAAToBAAAAATsBAAAAATwBAAAAAT0BAEMAIT4BAAAAAT8BAAAAAUABAAAAAQgFAABHACAGAABHACAuAABEADAvAAALABAwAABEADAxAQBFACFBAQBGACFCAQBGACELNgEAAAABNwEAAAAEOAEAAAAEOQEAAAABOgEAAAABOwEAAAABPAEAAAABPQEAPgAhPgEAAAABPwEAAAABQAEAAAABCzYBAAAAATcBAAAABTgBAAAABTkBAAAAAToBAAAAATsBAAAAATwBAAAAAT0BAEMAIT4BAAAAAT8BAAAAAUABAAAAAQNDAAADACBEAAADACBFAAADACAKAwAASgAgBAAASgAgLgAASAAwLwAAAwAQMAAASAAwMQEARQAhMgEARQAhMwEARQAhNAEARQAhNUAASQAhCDZAAAAAATdAAAAABDhAAAAABDlAAAAAATpAAAAAATtAAAAAATxAAAAAAT1AADwAIQoFAABHACAGAABHACAuAABEADAvAAALABAwAABEADAxAQBFACFBAQBGACFCAQBGACFGAAALACBHAAALACAAAAABSwEAAAABAUtAAAAAAQUUAAB4ACAVAAB-ACBIAAB5ACBJAAB9ACBOAAABACAFFAAAdgAgFQAAewAgSAAAdwAgSQAAegAgTgAAAQAgAxQAAHgAIEgAAHkAIE4AAAEAIAMUAAB2ACBIAAB3ACBOAAABACAAAAAAAUsBAAAAAQsUAABnADAVAABrADBIAABoADBJAABpADBKAABqACBLAABfADBMAABfADBNAABfADBOAABfADBPAABsADBQAABiADALFAAAWwAwFQAAYAAwSAAAXAAwSQAAXQAwSgAAXgAgSwAAXwAwTAAAXwAwTQAAXwAwTgAAXwAwTwAAYQAwUAAAYgAwBQMAAFIAIDEBAAAAATIBAAAAATQBAAAAATVAAAAAAQIAAAAFACAUAABmACADAAAABQAgFAAAZgAgFQAAZQAgAQ0AAHUAMAoDAABKACAEAABKACAuAABIADAvAAADABAwAABIADAxAQAAAAEyAQBFACEzAQBFACE0AQBFACE1QABJACECAAAABQAgDQAAZQAgAgAAAGMAIA0AAGQAIAguAABiADAvAABjABAwAABiADAxAQBFACEyAQBFACEzAQBFACE0AQBFACE1QABJACEILgAAYgAwLwAAYwAQMAAAYgAwMQEARQAhMgEARQAhMwEARQAhNAEARQAhNUAASQAhBDEBAE4AITIBAE4AITQBAE4AITVAAE8AIQUDAABQACAxAQBOACEyAQBOACE0AQBOACE1QABPACEFAwAAUgAgMQEAAAABMgEAAAABNAEAAAABNUAAAAABBQQAAFMAIDEBAAAAATMBAAAAATQBAAAAATVAAAAAAQIAAAAFACAUAABvACADAAAABQAgFAAAbwAgFQAAbgAgAQ0AAHQAMAIAAAAFACANAABuACACAAAAYwAgDQAAbQAgBDEBAE4AITMBAE4AITQBAE4AITVAAE8AIQUEAABRACAxAQBOACEzAQBOACE0AQBOACE1QABPACEFBAAAUwAgMQEAAAABMwEAAAABNAEAAAABNUAAAAABBBQAAGcAMEgAAGgAMEoAAGoAIE4AAF8AMAQUAABbADBIAABcADBKAABeACBOAABfADAABAUAAHIAIAYAAHIAIEEAAFQAIEIAAFQAIAQxAQAAAAEzAQAAAAE0AQAAAAE1QAAAAAEEMQEAAAABMgEAAAABNAEAAAABNUAAAAABBAUAAHAAIDEBAAAAAUEBAAAAAUIBAAAAAQIAAAABACAUAAB2ACAEBgAAcQAgMQEAAAABQQEAAAABQgEAAAABAgAAAAEAIBQAAHgAIAMAAAALACAUAAB2ACAVAAB8ACAGAAAACwAgBQAAWQAgDQAAfAAgMQEATgAhQQEAWAAhQgEAWAAhBAUAAFkAIDEBAE4AIUEBAFgAIUIBAFgAIQMAAAALACAUAAB4ACAVAAB_ACAGAAAACwAgBgAAWgAgDQAAfwAgMQEATgAhQQEAWAAhQgEAWAAhBAYAAFoAIDEBAE4AIUEBAFgAIUIBAFgAIQMFBgIGBwIHAAMCAwABBAABAgUIAAYJAAAAAAMHAAgaAAkbAAoAAAADBwAIGgAJGwAKAgMAAQQAAQIDAAEEAAEDBwAPGgAQGwARAAAAAwcADxoAEBsAEQgCAQkKAQoNAQsOAQwPAQ4RAQ8TBBAUBREWARIYBBMZBhYaARcbARgcBBwfBx0gCx4hAh8iAiAjAiEkAiIlAiMnAiQpBCUqDCYsAicuBCgvDSkwAioxAisyBCw1Di02Eg"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map