import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type chatModel = runtime.Types.Result.DefaultSelection<Prisma.$chatPayload>;
export type AggregateChat = {
    _count: ChatCountAggregateOutputType | null;
    _min: ChatMinAggregateOutputType | null;
    _max: ChatMaxAggregateOutputType | null;
};
export type ChatMinAggregateOutputType = {
    id: string | null;
    senderId: string | null;
    receiverId: string | null;
    messages: string | null;
    createdAt: Date | null;
};
export type ChatMaxAggregateOutputType = {
    id: string | null;
    senderId: string | null;
    receiverId: string | null;
    messages: string | null;
    createdAt: Date | null;
};
export type ChatCountAggregateOutputType = {
    id: number;
    senderId: number;
    receiverId: number;
    messages: number;
    createdAt: number;
    _all: number;
};
export type ChatMinAggregateInputType = {
    id?: true;
    senderId?: true;
    receiverId?: true;
    messages?: true;
    createdAt?: true;
};
export type ChatMaxAggregateInputType = {
    id?: true;
    senderId?: true;
    receiverId?: true;
    messages?: true;
    createdAt?: true;
};
export type ChatCountAggregateInputType = {
    id?: true;
    senderId?: true;
    receiverId?: true;
    messages?: true;
    createdAt?: true;
    _all?: true;
};
export type ChatAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chatWhereInput;
    orderBy?: Prisma.chatOrderByWithRelationInput | Prisma.chatOrderByWithRelationInput[];
    cursor?: Prisma.chatWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ChatCountAggregateInputType;
    _min?: ChatMinAggregateInputType;
    _max?: ChatMaxAggregateInputType;
};
export type GetChatAggregateType<T extends ChatAggregateArgs> = {
    [P in keyof T & keyof AggregateChat]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateChat[P]> : Prisma.GetScalarType<T[P], AggregateChat[P]>;
};
export type chatGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chatWhereInput;
    orderBy?: Prisma.chatOrderByWithAggregationInput | Prisma.chatOrderByWithAggregationInput[];
    by: Prisma.ChatScalarFieldEnum[] | Prisma.ChatScalarFieldEnum;
    having?: Prisma.chatScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChatCountAggregateInputType | true;
    _min?: ChatMinAggregateInputType;
    _max?: ChatMaxAggregateInputType;
};
export type ChatGroupByOutputType = {
    id: string;
    senderId: string;
    receiverId: string;
    messages: string;
    createdAt: Date;
    _count: ChatCountAggregateOutputType | null;
    _min: ChatMinAggregateOutputType | null;
    _max: ChatMaxAggregateOutputType | null;
};
type GetChatGroupByPayload<T extends chatGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ChatGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ChatGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ChatGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ChatGroupByOutputType[P]>;
}>>;
export type chatWhereInput = {
    AND?: Prisma.chatWhereInput | Prisma.chatWhereInput[];
    OR?: Prisma.chatWhereInput[];
    NOT?: Prisma.chatWhereInput | Prisma.chatWhereInput[];
    id?: Prisma.StringFilter<"chat"> | string;
    senderId?: Prisma.StringFilter<"chat"> | string;
    receiverId?: Prisma.StringFilter<"chat"> | string;
    messages?: Prisma.StringFilter<"chat"> | string;
    createdAt?: Prisma.DateTimeFilter<"chat"> | Date | string;
    sender?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    receiver?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
};
export type chatOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
    messages?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    sender?: Prisma.usersOrderByWithRelationInput;
    receiver?: Prisma.usersOrderByWithRelationInput;
};
export type chatWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.chatWhereInput | Prisma.chatWhereInput[];
    OR?: Prisma.chatWhereInput[];
    NOT?: Prisma.chatWhereInput | Prisma.chatWhereInput[];
    senderId?: Prisma.StringFilter<"chat"> | string;
    receiverId?: Prisma.StringFilter<"chat"> | string;
    messages?: Prisma.StringFilter<"chat"> | string;
    createdAt?: Prisma.DateTimeFilter<"chat"> | Date | string;
    sender?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
    receiver?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.usersWhereInput>;
}, "id">;
export type chatOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
    messages?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.chatCountOrderByAggregateInput;
    _max?: Prisma.chatMaxOrderByAggregateInput;
    _min?: Prisma.chatMinOrderByAggregateInput;
};
export type chatScalarWhereWithAggregatesInput = {
    AND?: Prisma.chatScalarWhereWithAggregatesInput | Prisma.chatScalarWhereWithAggregatesInput[];
    OR?: Prisma.chatScalarWhereWithAggregatesInput[];
    NOT?: Prisma.chatScalarWhereWithAggregatesInput | Prisma.chatScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"chat"> | string;
    senderId?: Prisma.StringWithAggregatesFilter<"chat"> | string;
    receiverId?: Prisma.StringWithAggregatesFilter<"chat"> | string;
    messages?: Prisma.StringWithAggregatesFilter<"chat"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"chat"> | Date | string;
};
export type chatCreateInput = {
    id?: string;
    messages: string;
    createdAt?: Date | string;
    sender: Prisma.usersCreateNestedOneWithoutSendMessageInput;
    receiver: Prisma.usersCreateNestedOneWithoutReceiveMessagesInput;
};
export type chatUncheckedCreateInput = {
    id?: string;
    senderId: string;
    receiverId: string;
    messages: string;
    createdAt?: Date | string;
};
export type chatUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    messages?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sender?: Prisma.usersUpdateOneRequiredWithoutSendMessageNestedInput;
    receiver?: Prisma.usersUpdateOneRequiredWithoutReceiveMessagesNestedInput;
};
export type chatUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiverId?: Prisma.StringFieldUpdateOperationsInput | string;
    messages?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type chatCreateManyInput = {
    id?: string;
    senderId: string;
    receiverId: string;
    messages: string;
    createdAt?: Date | string;
};
export type chatUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    messages?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type chatUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiverId?: Prisma.StringFieldUpdateOperationsInput | string;
    messages?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatListRelationFilter = {
    every?: Prisma.chatWhereInput;
    some?: Prisma.chatWhereInput;
    none?: Prisma.chatWhereInput;
};
export type chatOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type chatCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
    messages?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type chatMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
    messages?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type chatMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
    messages?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type chatCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.chatCreateWithoutSenderInput, Prisma.chatUncheckedCreateWithoutSenderInput> | Prisma.chatCreateWithoutSenderInput[] | Prisma.chatUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.chatCreateOrConnectWithoutSenderInput | Prisma.chatCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.chatCreateManySenderInputEnvelope;
    connect?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
};
export type chatCreateNestedManyWithoutReceiverInput = {
    create?: Prisma.XOR<Prisma.chatCreateWithoutReceiverInput, Prisma.chatUncheckedCreateWithoutReceiverInput> | Prisma.chatCreateWithoutReceiverInput[] | Prisma.chatUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?: Prisma.chatCreateOrConnectWithoutReceiverInput | Prisma.chatCreateOrConnectWithoutReceiverInput[];
    createMany?: Prisma.chatCreateManyReceiverInputEnvelope;
    connect?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
};
export type chatUncheckedCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.chatCreateWithoutSenderInput, Prisma.chatUncheckedCreateWithoutSenderInput> | Prisma.chatCreateWithoutSenderInput[] | Prisma.chatUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.chatCreateOrConnectWithoutSenderInput | Prisma.chatCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.chatCreateManySenderInputEnvelope;
    connect?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
};
export type chatUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: Prisma.XOR<Prisma.chatCreateWithoutReceiverInput, Prisma.chatUncheckedCreateWithoutReceiverInput> | Prisma.chatCreateWithoutReceiverInput[] | Prisma.chatUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?: Prisma.chatCreateOrConnectWithoutReceiverInput | Prisma.chatCreateOrConnectWithoutReceiverInput[];
    createMany?: Prisma.chatCreateManyReceiverInputEnvelope;
    connect?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
};
export type chatUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.chatCreateWithoutSenderInput, Prisma.chatUncheckedCreateWithoutSenderInput> | Prisma.chatCreateWithoutSenderInput[] | Prisma.chatUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.chatCreateOrConnectWithoutSenderInput | Prisma.chatCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.chatUpsertWithWhereUniqueWithoutSenderInput | Prisma.chatUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.chatCreateManySenderInputEnvelope;
    set?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    disconnect?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    delete?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    connect?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    update?: Prisma.chatUpdateWithWhereUniqueWithoutSenderInput | Prisma.chatUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.chatUpdateManyWithWhereWithoutSenderInput | Prisma.chatUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.chatScalarWhereInput | Prisma.chatScalarWhereInput[];
};
export type chatUpdateManyWithoutReceiverNestedInput = {
    create?: Prisma.XOR<Prisma.chatCreateWithoutReceiverInput, Prisma.chatUncheckedCreateWithoutReceiverInput> | Prisma.chatCreateWithoutReceiverInput[] | Prisma.chatUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?: Prisma.chatCreateOrConnectWithoutReceiverInput | Prisma.chatCreateOrConnectWithoutReceiverInput[];
    upsert?: Prisma.chatUpsertWithWhereUniqueWithoutReceiverInput | Prisma.chatUpsertWithWhereUniqueWithoutReceiverInput[];
    createMany?: Prisma.chatCreateManyReceiverInputEnvelope;
    set?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    disconnect?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    delete?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    connect?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    update?: Prisma.chatUpdateWithWhereUniqueWithoutReceiverInput | Prisma.chatUpdateWithWhereUniqueWithoutReceiverInput[];
    updateMany?: Prisma.chatUpdateManyWithWhereWithoutReceiverInput | Prisma.chatUpdateManyWithWhereWithoutReceiverInput[];
    deleteMany?: Prisma.chatScalarWhereInput | Prisma.chatScalarWhereInput[];
};
export type chatUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.chatCreateWithoutSenderInput, Prisma.chatUncheckedCreateWithoutSenderInput> | Prisma.chatCreateWithoutSenderInput[] | Prisma.chatUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.chatCreateOrConnectWithoutSenderInput | Prisma.chatCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.chatUpsertWithWhereUniqueWithoutSenderInput | Prisma.chatUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.chatCreateManySenderInputEnvelope;
    set?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    disconnect?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    delete?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    connect?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    update?: Prisma.chatUpdateWithWhereUniqueWithoutSenderInput | Prisma.chatUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.chatUpdateManyWithWhereWithoutSenderInput | Prisma.chatUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.chatScalarWhereInput | Prisma.chatScalarWhereInput[];
};
export type chatUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: Prisma.XOR<Prisma.chatCreateWithoutReceiverInput, Prisma.chatUncheckedCreateWithoutReceiverInput> | Prisma.chatCreateWithoutReceiverInput[] | Prisma.chatUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?: Prisma.chatCreateOrConnectWithoutReceiverInput | Prisma.chatCreateOrConnectWithoutReceiverInput[];
    upsert?: Prisma.chatUpsertWithWhereUniqueWithoutReceiverInput | Prisma.chatUpsertWithWhereUniqueWithoutReceiverInput[];
    createMany?: Prisma.chatCreateManyReceiverInputEnvelope;
    set?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    disconnect?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    delete?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    connect?: Prisma.chatWhereUniqueInput | Prisma.chatWhereUniqueInput[];
    update?: Prisma.chatUpdateWithWhereUniqueWithoutReceiverInput | Prisma.chatUpdateWithWhereUniqueWithoutReceiverInput[];
    updateMany?: Prisma.chatUpdateManyWithWhereWithoutReceiverInput | Prisma.chatUpdateManyWithWhereWithoutReceiverInput[];
    deleteMany?: Prisma.chatScalarWhereInput | Prisma.chatScalarWhereInput[];
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type chatCreateWithoutSenderInput = {
    id?: string;
    messages: string;
    createdAt?: Date | string;
    receiver: Prisma.usersCreateNestedOneWithoutReceiveMessagesInput;
};
export type chatUncheckedCreateWithoutSenderInput = {
    id?: string;
    receiverId: string;
    messages: string;
    createdAt?: Date | string;
};
export type chatCreateOrConnectWithoutSenderInput = {
    where: Prisma.chatWhereUniqueInput;
    create: Prisma.XOR<Prisma.chatCreateWithoutSenderInput, Prisma.chatUncheckedCreateWithoutSenderInput>;
};
export type chatCreateManySenderInputEnvelope = {
    data: Prisma.chatCreateManySenderInput | Prisma.chatCreateManySenderInput[];
    skipDuplicates?: boolean;
};
export type chatCreateWithoutReceiverInput = {
    id?: string;
    messages: string;
    createdAt?: Date | string;
    sender: Prisma.usersCreateNestedOneWithoutSendMessageInput;
};
export type chatUncheckedCreateWithoutReceiverInput = {
    id?: string;
    senderId: string;
    messages: string;
    createdAt?: Date | string;
};
export type chatCreateOrConnectWithoutReceiverInput = {
    where: Prisma.chatWhereUniqueInput;
    create: Prisma.XOR<Prisma.chatCreateWithoutReceiverInput, Prisma.chatUncheckedCreateWithoutReceiverInput>;
};
export type chatCreateManyReceiverInputEnvelope = {
    data: Prisma.chatCreateManyReceiverInput | Prisma.chatCreateManyReceiverInput[];
    skipDuplicates?: boolean;
};
export type chatUpsertWithWhereUniqueWithoutSenderInput = {
    where: Prisma.chatWhereUniqueInput;
    update: Prisma.XOR<Prisma.chatUpdateWithoutSenderInput, Prisma.chatUncheckedUpdateWithoutSenderInput>;
    create: Prisma.XOR<Prisma.chatCreateWithoutSenderInput, Prisma.chatUncheckedCreateWithoutSenderInput>;
};
export type chatUpdateWithWhereUniqueWithoutSenderInput = {
    where: Prisma.chatWhereUniqueInput;
    data: Prisma.XOR<Prisma.chatUpdateWithoutSenderInput, Prisma.chatUncheckedUpdateWithoutSenderInput>;
};
export type chatUpdateManyWithWhereWithoutSenderInput = {
    where: Prisma.chatScalarWhereInput;
    data: Prisma.XOR<Prisma.chatUpdateManyMutationInput, Prisma.chatUncheckedUpdateManyWithoutSenderInput>;
};
export type chatScalarWhereInput = {
    AND?: Prisma.chatScalarWhereInput | Prisma.chatScalarWhereInput[];
    OR?: Prisma.chatScalarWhereInput[];
    NOT?: Prisma.chatScalarWhereInput | Prisma.chatScalarWhereInput[];
    id?: Prisma.StringFilter<"chat"> | string;
    senderId?: Prisma.StringFilter<"chat"> | string;
    receiverId?: Prisma.StringFilter<"chat"> | string;
    messages?: Prisma.StringFilter<"chat"> | string;
    createdAt?: Prisma.DateTimeFilter<"chat"> | Date | string;
};
export type chatUpsertWithWhereUniqueWithoutReceiverInput = {
    where: Prisma.chatWhereUniqueInput;
    update: Prisma.XOR<Prisma.chatUpdateWithoutReceiverInput, Prisma.chatUncheckedUpdateWithoutReceiverInput>;
    create: Prisma.XOR<Prisma.chatCreateWithoutReceiverInput, Prisma.chatUncheckedCreateWithoutReceiverInput>;
};
export type chatUpdateWithWhereUniqueWithoutReceiverInput = {
    where: Prisma.chatWhereUniqueInput;
    data: Prisma.XOR<Prisma.chatUpdateWithoutReceiverInput, Prisma.chatUncheckedUpdateWithoutReceiverInput>;
};
export type chatUpdateManyWithWhereWithoutReceiverInput = {
    where: Prisma.chatScalarWhereInput;
    data: Prisma.XOR<Prisma.chatUpdateManyMutationInput, Prisma.chatUncheckedUpdateManyWithoutReceiverInput>;
};
export type chatCreateManySenderInput = {
    id?: string;
    receiverId: string;
    messages: string;
    createdAt?: Date | string;
};
export type chatCreateManyReceiverInput = {
    id?: string;
    senderId: string;
    messages: string;
    createdAt?: Date | string;
};
export type chatUpdateWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    messages?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiver?: Prisma.usersUpdateOneRequiredWithoutReceiveMessagesNestedInput;
};
export type chatUncheckedUpdateWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receiverId?: Prisma.StringFieldUpdateOperationsInput | string;
    messages?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type chatUncheckedUpdateManyWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receiverId?: Prisma.StringFieldUpdateOperationsInput | string;
    messages?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type chatUpdateWithoutReceiverInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    messages?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sender?: Prisma.usersUpdateOneRequiredWithoutSendMessageNestedInput;
};
export type chatUncheckedUpdateWithoutReceiverInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    messages?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type chatUncheckedUpdateManyWithoutReceiverInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    messages?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type chatSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    senderId?: boolean;
    receiverId?: boolean;
    messages?: boolean;
    createdAt?: boolean;
    sender?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    receiver?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chat"]>;
export type chatSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    senderId?: boolean;
    receiverId?: boolean;
    messages?: boolean;
    createdAt?: boolean;
    sender?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    receiver?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chat"]>;
export type chatSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    senderId?: boolean;
    receiverId?: boolean;
    messages?: boolean;
    createdAt?: boolean;
    sender?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    receiver?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chat"]>;
export type chatSelectScalar = {
    id?: boolean;
    senderId?: boolean;
    receiverId?: boolean;
    messages?: boolean;
    createdAt?: boolean;
};
export type chatOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "senderId" | "receiverId" | "messages" | "createdAt", ExtArgs["result"]["chat"]>;
export type chatInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sender?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    receiver?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type chatIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sender?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    receiver?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type chatIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sender?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
    receiver?: boolean | Prisma.usersDefaultArgs<ExtArgs>;
};
export type $chatPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "chat";
    objects: {
        sender: Prisma.$usersPayload<ExtArgs>;
        receiver: Prisma.$usersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        senderId: string;
        receiverId: string;
        messages: string;
        createdAt: Date;
    }, ExtArgs["result"]["chat"]>;
    composites: {};
};
export type chatGetPayload<S extends boolean | null | undefined | chatDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$chatPayload, S>;
export type chatCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<chatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ChatCountAggregateInputType | true;
};
export interface chatDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['chat'];
        meta: {
            name: 'chat';
        };
    };
    findUnique<T extends chatFindUniqueArgs>(args: Prisma.SelectSubset<T, chatFindUniqueArgs<ExtArgs>>): Prisma.Prisma__chatClient<runtime.Types.Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends chatFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, chatFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__chatClient<runtime.Types.Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends chatFindFirstArgs>(args?: Prisma.SelectSubset<T, chatFindFirstArgs<ExtArgs>>): Prisma.Prisma__chatClient<runtime.Types.Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends chatFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, chatFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__chatClient<runtime.Types.Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends chatFindManyArgs>(args?: Prisma.SelectSubset<T, chatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends chatCreateArgs>(args: Prisma.SelectSubset<T, chatCreateArgs<ExtArgs>>): Prisma.Prisma__chatClient<runtime.Types.Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends chatCreateManyArgs>(args?: Prisma.SelectSubset<T, chatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends chatCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, chatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends chatDeleteArgs>(args: Prisma.SelectSubset<T, chatDeleteArgs<ExtArgs>>): Prisma.Prisma__chatClient<runtime.Types.Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends chatUpdateArgs>(args: Prisma.SelectSubset<T, chatUpdateArgs<ExtArgs>>): Prisma.Prisma__chatClient<runtime.Types.Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends chatDeleteManyArgs>(args?: Prisma.SelectSubset<T, chatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends chatUpdateManyArgs>(args: Prisma.SelectSubset<T, chatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends chatUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, chatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends chatUpsertArgs>(args: Prisma.SelectSubset<T, chatUpsertArgs<ExtArgs>>): Prisma.Prisma__chatClient<runtime.Types.Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends chatCountArgs>(args?: Prisma.Subset<T, chatCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ChatCountAggregateOutputType> : number>;
    aggregate<T extends ChatAggregateArgs>(args: Prisma.Subset<T, ChatAggregateArgs>): Prisma.PrismaPromise<GetChatAggregateType<T>>;
    groupBy<T extends chatGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: chatGroupByArgs['orderBy'];
    } : {
        orderBy?: chatGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, chatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: chatFieldRefs;
}
export interface Prisma__chatClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    sender<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    receiver<T extends Prisma.usersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usersDefaultArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface chatFieldRefs {
    readonly id: Prisma.FieldRef<"chat", 'String'>;
    readonly senderId: Prisma.FieldRef<"chat", 'String'>;
    readonly receiverId: Prisma.FieldRef<"chat", 'String'>;
    readonly messages: Prisma.FieldRef<"chat", 'String'>;
    readonly createdAt: Prisma.FieldRef<"chat", 'DateTime'>;
}
export type chatFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatSelect<ExtArgs> | null;
    omit?: Prisma.chatOmit<ExtArgs> | null;
    include?: Prisma.chatInclude<ExtArgs> | null;
    where: Prisma.chatWhereUniqueInput;
};
export type chatFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatSelect<ExtArgs> | null;
    omit?: Prisma.chatOmit<ExtArgs> | null;
    include?: Prisma.chatInclude<ExtArgs> | null;
    where: Prisma.chatWhereUniqueInput;
};
export type chatFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatSelect<ExtArgs> | null;
    omit?: Prisma.chatOmit<ExtArgs> | null;
    include?: Prisma.chatInclude<ExtArgs> | null;
    where?: Prisma.chatWhereInput;
    orderBy?: Prisma.chatOrderByWithRelationInput | Prisma.chatOrderByWithRelationInput[];
    cursor?: Prisma.chatWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChatScalarFieldEnum | Prisma.ChatScalarFieldEnum[];
};
export type chatFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatSelect<ExtArgs> | null;
    omit?: Prisma.chatOmit<ExtArgs> | null;
    include?: Prisma.chatInclude<ExtArgs> | null;
    where?: Prisma.chatWhereInput;
    orderBy?: Prisma.chatOrderByWithRelationInput | Prisma.chatOrderByWithRelationInput[];
    cursor?: Prisma.chatWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChatScalarFieldEnum | Prisma.ChatScalarFieldEnum[];
};
export type chatFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatSelect<ExtArgs> | null;
    omit?: Prisma.chatOmit<ExtArgs> | null;
    include?: Prisma.chatInclude<ExtArgs> | null;
    where?: Prisma.chatWhereInput;
    orderBy?: Prisma.chatOrderByWithRelationInput | Prisma.chatOrderByWithRelationInput[];
    cursor?: Prisma.chatWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChatScalarFieldEnum | Prisma.ChatScalarFieldEnum[];
};
export type chatCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatSelect<ExtArgs> | null;
    omit?: Prisma.chatOmit<ExtArgs> | null;
    include?: Prisma.chatInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.chatCreateInput, Prisma.chatUncheckedCreateInput>;
};
export type chatCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.chatCreateManyInput | Prisma.chatCreateManyInput[];
    skipDuplicates?: boolean;
};
export type chatCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.chatOmit<ExtArgs> | null;
    data: Prisma.chatCreateManyInput | Prisma.chatCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.chatIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type chatUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatSelect<ExtArgs> | null;
    omit?: Prisma.chatOmit<ExtArgs> | null;
    include?: Prisma.chatInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.chatUpdateInput, Prisma.chatUncheckedUpdateInput>;
    where: Prisma.chatWhereUniqueInput;
};
export type chatUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.chatUpdateManyMutationInput, Prisma.chatUncheckedUpdateManyInput>;
    where?: Prisma.chatWhereInput;
    limit?: number;
};
export type chatUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.chatOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.chatUpdateManyMutationInput, Prisma.chatUncheckedUpdateManyInput>;
    where?: Prisma.chatWhereInput;
    limit?: number;
    include?: Prisma.chatIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type chatUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatSelect<ExtArgs> | null;
    omit?: Prisma.chatOmit<ExtArgs> | null;
    include?: Prisma.chatInclude<ExtArgs> | null;
    where: Prisma.chatWhereUniqueInput;
    create: Prisma.XOR<Prisma.chatCreateInput, Prisma.chatUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.chatUpdateInput, Prisma.chatUncheckedUpdateInput>;
};
export type chatDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatSelect<ExtArgs> | null;
    omit?: Prisma.chatOmit<ExtArgs> | null;
    include?: Prisma.chatInclude<ExtArgs> | null;
    where: Prisma.chatWhereUniqueInput;
};
export type chatDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.chatWhereInput;
    limit?: number;
};
export type chatDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.chatSelect<ExtArgs> | null;
    omit?: Prisma.chatOmit<ExtArgs> | null;
    include?: Prisma.chatInclude<ExtArgs> | null;
};
export {};
