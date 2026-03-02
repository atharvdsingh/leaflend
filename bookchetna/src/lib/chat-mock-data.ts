// =============================================
// Chat Mock Data & Types
// Replace with real API calls later
// =============================================

// ---------- Types ----------

export interface ChatUser {
    id: number;
    name: string;
    email: string;
    avatarUrl?: string;
    isOnline: boolean;
}

export interface Conversation {
    id: number;
    name: string | null; // null for 1-to-1
    isGroup: boolean;
    members: ChatUser[];
    lastMessage: Message | null;
    createdAt: string;
    updatedAt: string;
    unreadCount: number;
}

export interface Message {
    id: number;
    conversationId: number;
    senderId: number;
    content: string;
    createdAt: string;
}

// ---------- Current User ----------

export const CURRENT_USER: ChatUser = {
    id: 1,
    name: "Atharv",
    email: "atharv@example.com",
    isOnline: true,
};

// ---------- Mock Users ----------

export const MOCK_USERS: ChatUser[] = [
    CURRENT_USER,
    {
        id: 2,
        name: "Priya Sharma",
        email: "priya@example.com",
        isOnline: true,
    },
    {
        id: 3,
        name: "Rahul Verma",
        email: "rahul@example.com",
        isOnline: false,
    },
    {
        id: 4,
        name: "Sneha Patel",
        email: "sneha@example.com",
        isOnline: true,
    },
    {
        id: 5,
        name: "Arjun Mehta",
        email: "arjun@example.com",
        isOnline: false,
    },
    {
        id: 6,
        name: "Kavya Nair",
        email: "kavya@example.com",
        isOnline: true,
    },
    {
        id: 7,
        name: "Rohan Gupta",
        email: "rohan@example.com",
        isOnline: false,
    },
    {
        id: 8,
        name: "Ananya Singh",
        email: "ananya@example.com",
        isOnline: true,
    },
];

// ---------- Helper ----------

function timeAgo(minutes: number): string {
    const d = new Date(Date.now() - minutes * 60 * 1000);
    return d.toISOString();
}

// ---------- Mock Messages ----------

const MESSAGE_POOL: Record<number, Message[]> = {
    1: [
        { id: 1, conversationId: 1, senderId: 2, content: "Hey! Do you still have that copy of Sapiens?", createdAt: timeAgo(120) },
        { id: 2, conversationId: 1, senderId: 1, content: "Yeah I do! Want to borrow it?", createdAt: timeAgo(115) },
        { id: 3, conversationId: 1, senderId: 2, content: "That would be amazing, I've been looking for it everywhere", createdAt: timeAgo(110) },
        { id: 4, conversationId: 1, senderId: 1, content: "Sure, I'll list it on the platform. You can send a rental request 📚", createdAt: timeAgo(105) },
        { id: 5, conversationId: 1, senderId: 2, content: "Perfect, just sent the request!", createdAt: timeAgo(60) },
        { id: 6, conversationId: 1, senderId: 1, content: "Got it! I'll accept it now. We can meet at the library tomorrow?", createdAt: timeAgo(55) },
        { id: 7, conversationId: 1, senderId: 2, content: "Works for me! Thanks so much 🙌", createdAt: timeAgo(50) },
        { id: 8, conversationId: 1, senderId: 1, content: "No problem, happy reading!", createdAt: timeAgo(5) },
    ],
    2: [
        { id: 9, conversationId: 2, senderId: 3, content: "Has anyone read Atomic Habits?", createdAt: timeAgo(300) },
        { id: 10, conversationId: 2, senderId: 1, content: "I have! It's a great read", createdAt: timeAgo(295) },
        { id: 11, conversationId: 2, senderId: 3, content: "Would you recommend it?", createdAt: timeAgo(290) },
        { id: 12, conversationId: 2, senderId: 1, content: "Absolutely. Changed how I approach habits", createdAt: timeAgo(285) },
        { id: 13, conversationId: 2, senderId: 3, content: "Nice, I'll check it out on BookChetna", createdAt: timeAgo(10) },
    ],
    3: [
        { id: 14, conversationId: 3, senderId: 4, content: "Welcome to the Book Club! 📖", createdAt: timeAgo(1440) },
        { id: 15, conversationId: 3, senderId: 5, content: "Thanks for adding me!", createdAt: timeAgo(1430) },
        { id: 16, conversationId: 3, senderId: 1, content: "Great to have everyone here. Let's pick our first book!", createdAt: timeAgo(1420) },
        { id: 17, conversationId: 3, senderId: 6, content: "I suggest we start with '1984' by George Orwell", createdAt: timeAgo(1400) },
        { id: 18, conversationId: 3, senderId: 4, content: "Love that choice!", createdAt: timeAgo(1380) },
        { id: 19, conversationId: 3, senderId: 5, content: "I have a spare copy if anyone needs", createdAt: timeAgo(1300) },
        { id: 20, conversationId: 3, senderId: 1, content: "Let's go with 1984 then. Everyone grab a copy by next week!", createdAt: timeAgo(60) },
        { id: 21, conversationId: 3, senderId: 6, content: "Sounds like a plan! 🎉", createdAt: timeAgo(30) },
        { id: 22, conversationId: 3, senderId: 4, content: "Can't wait to discuss it!", createdAt: timeAgo(2) },
    ],
    4: [
        { id: 23, conversationId: 4, senderId: 7, content: "Do you have any fantasy novels available?", createdAt: timeAgo(480) },
        { id: 24, conversationId: 4, senderId: 1, content: "I have The Name of the Wind. Interested?", createdAt: timeAgo(475) },
        { id: 25, conversationId: 4, senderId: 7, content: "Yes please! How much for rental?", createdAt: timeAgo(200) },
    ],
    5: [
        { id: 26, conversationId: 5, senderId: 8, content: "Hey! Just joined BookChetna 👋", createdAt: timeAgo(60) },
        { id: 27, conversationId: 5, senderId: 1, content: "Welcome! Let me know if you need help finding books", createdAt: timeAgo(55) },
        { id: 28, conversationId: 5, senderId: 8, content: "Thanks! Looking for some good sci-fi recommendations", createdAt: timeAgo(50) },
        { id: 29, conversationId: 5, senderId: 1, content: "Check out Dune and The Martian — both are available in our rooms!", createdAt: timeAgo(45) },
        { id: 30, conversationId: 5, senderId: 8, content: "Oh nice! I'll check them out now", createdAt: timeAgo(1) },
    ],
    6: [
        { id: 31, conversationId: 6, senderId: 2, content: "We should coordinate the book exchange meetup", createdAt: timeAgo(200) },
        { id: 32, conversationId: 6, senderId: 4, content: "How about Saturday at the Central Library?", createdAt: timeAgo(190) },
        { id: 33, conversationId: 6, senderId: 8, content: "Saturday works for me!", createdAt: timeAgo(180) },
        { id: 34, conversationId: 6, senderId: 1, content: "I can bring 5 books for exchange", createdAt: timeAgo(170) },
        { id: 35, conversationId: 6, senderId: 2, content: "Perfect! I'll bring 3", createdAt: timeAgo(160) },
        { id: 36, conversationId: 6, senderId: 4, content: "Let's meet at 11 AM. I'll share the exact spot tomorrow", createdAt: timeAgo(15) },
    ],
};

// ---------- Mock Conversations ----------

export const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: 1,
        name: null,
        isGroup: false,
        members: [MOCK_USERS[0], MOCK_USERS[1]],
        lastMessage: MESSAGE_POOL[1][MESSAGE_POOL[1].length - 1],
        createdAt: timeAgo(1440),
        updatedAt: timeAgo(5),
        unreadCount: 2,
    },
    {
        id: 2,
        name: null,
        isGroup: false,
        members: [MOCK_USERS[0], MOCK_USERS[2]],
        lastMessage: MESSAGE_POOL[2][MESSAGE_POOL[2].length - 1],
        createdAt: timeAgo(2880),
        updatedAt: timeAgo(10),
        unreadCount: 0,
    },
    {
        id: 3,
        name: "Book Club — Fiction Lovers",
        isGroup: true,
        members: [MOCK_USERS[0], MOCK_USERS[3], MOCK_USERS[4], MOCK_USERS[5]],
        lastMessage: MESSAGE_POOL[3][MESSAGE_POOL[3].length - 1],
        createdAt: timeAgo(10080),
        updatedAt: timeAgo(2),
        unreadCount: 5,
    },
    {
        id: 4,
        name: null,
        isGroup: false,
        members: [MOCK_USERS[0], MOCK_USERS[6]],
        lastMessage: MESSAGE_POOL[4][MESSAGE_POOL[4].length - 1],
        createdAt: timeAgo(720),
        updatedAt: timeAgo(200),
        unreadCount: 1,
    },
    {
        id: 5,
        name: null,
        isGroup: false,
        members: [MOCK_USERS[0], MOCK_USERS[7]],
        lastMessage: MESSAGE_POOL[5][MESSAGE_POOL[5].length - 1],
        createdAt: timeAgo(120),
        updatedAt: timeAgo(1),
        unreadCount: 3,
    },
    {
        id: 6,
        name: "Book Exchange Meetup",
        isGroup: true,
        members: [MOCK_USERS[0], MOCK_USERS[1], MOCK_USERS[3], MOCK_USERS[7]],
        lastMessage: MESSAGE_POOL[6][MESSAGE_POOL[6].length - 1],
        createdAt: timeAgo(4320),
        updatedAt: timeAgo(15),
        unreadCount: 0,
    },
];

// ---------- Data Access Helpers ----------

export function getConversationById(id: number): Conversation | undefined {
    return MOCK_CONVERSATIONS.find((c) => c.id === id);
}

export function getMessagesForConversation(conversationId: number): Message[] {
    return MESSAGE_POOL[conversationId] || [];
}

export function getOtherMembers(conversation: Conversation): ChatUser[] {
    return conversation.members.filter((m) => m.id !== CURRENT_USER.id);
}

export function getConversationDisplayName(conversation: Conversation): string {
    if (conversation.isGroup && conversation.name) {
        return conversation.name;
    }
    const others = getOtherMembers(conversation);
    return others.map((m) => m.name).join(", ") || "Unknown";
}

export function formatMessageTime(isoString: string): string {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

export function getUserInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function getAllUsers(): ChatUser[] {
    return MOCK_USERS.filter((u) => u.id !== CURRENT_USER.id);
}
