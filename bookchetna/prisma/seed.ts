const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ─── Generators ─────────────────────────────────────────────────────────────

const FIRST_NAMES = ["Alex", "Jordan", "Taylor", "Casey", "Morgan", "Sam", "Jamie", "Riley", "Devon", "Avery", "Cameron", "Blake", "Drew", "Hunter", "Jesse", "Mia", "Oliver", "Sophia", "Liam", "Emma"];
const LAST_NAMES = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson"];
const BOOK_ADJECTIVES = ["The Forgotten", "A Hidden", "Silent", "Lost", "Golden", "Midnight", "Broken", "Falling", "Rising", "Crystal", "Dark", "Invisible", "Electric", "Magic", "Secret", "Crimson", "Shadowy", "Whispering", "Eternal", "Frozen"];
const BOOK_NOUNS = ["City", "Dream", "Shadow", "Crown", "Star", "Heart", "Sword", "Moon", "Sun", "Warrior", "River", "Forest", "Mountain", "Ocean", "Fire", "Garden", "Empire", "Library", "Soul", "Gate"];
const BOOK_COVERS = [
    "https://covers.openlibrary.org/b/isbn/0735211299-L.jpg",
    "https://covers.openlibrary.org/b/isbn/0062316095-L.jpg",
    "https://covers.openlibrary.org/b/isbn/0062315005-L.jpg",
    "https://covers.openlibrary.org/b/isbn/0143130722-L.jpg",
    "https://covers.openlibrary.org/b/isbn/1455586692-L.jpg",
    "https://covers.openlibrary.org/b/isbn/0857197681-L.jpg",
    "https://covers.openlibrary.org/b/isbn/0451524934-L.jpg",
    "https://covers.openlibrary.org/b/isbn/0060935464-L.jpg",
    "https://covers.openlibrary.org/b/isbn/0441172717-L.jpg",
    "https://covers.openlibrary.org/b/isbn/054792822X-L.jpg",
];

function randomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(daysBack: number) {
    const now = new Date();
    const past = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
    return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
}

function generateUsers(count: number) {
    const users = [];
    for (let i = 0; i < count; i++) {
        const name = `${randomElement(FIRST_NAMES)} ${randomElement(LAST_NAMES)}`;
        users.push({
            name,
            email: `${name.replace(/\s+/g, '.').toLowerCase()}${Math.floor(Math.random() * 10000)}@bookchetna.com`,
            password: "password123", // Set a simple default password
        });
    }
    return users;
}

const ROOMS = [
    { roomName: "Fiction Lovers", discription: "A cozy room for fiction enthusiasts to share and discover stories." },
    { roomName: "Science & Non-Fiction", discription: "Explore the world of facts, science, and self-improvement." },
    { roomName: "Classics Club", discription: "Timeless literature that shaped generations." },
    { roomName: "Mystery Solvers", discription: "A group dedicated to thrilling mysteries and crime fiction." },
    { roomName: "Fantasy Realms", discription: "Epic journeys, magic, and alternate worlds await." }
];

// ─── Seed Function ──────────────────────────────────────────────────────────

async function main() {
    console.log("🌱 Seeding BookChetna database...\n");

    // Clean up in correct order (respect FK constraints)
    await prisma.roomAndBook.deleteMany();
    await prisma.roomMembership.deleteMany();
    await prisma.borrows.deleteMany();
    await prisma.rentalRequest.deleteMany();
    await prisma.booksHave.deleteMany();
    await prisma.room.deleteMany();
    // NOTE: Not deleting existing users - keep active development accounts intact.
    console.log("🗑️  Cleared books, rooms, and related data (kept users intact).\n");

    // 1. Ensure at least 12 Users exists
    const dbUsers = await prisma.users.findMany();
    let userIds = dbUsers.map((u: any) => u.id);

    if (userIds.length < 12) {
        const needed = 12 - userIds.length;
        console.log(`👤 Creating ${needed} additional users...`);
        const mockUsers = generateUsers(needed);
        await prisma.users.createMany({
            data: mockUsers,
        });
        const updatedDbUsers = await prisma.users.findMany();
        userIds = updatedDbUsers.map((u: any) => u.id);
    } else {
        console.log(`👤 Found ${userIds.length} existing users. No new users needed.`);
    }

    // 2. Create Rooms
    console.log(`🏠 Creating ${ROOMS.length} rooms...`);
    const createdRooms = [];
    for (const room of ROOMS) {
        const created = await prisma.room.create({
            data: {
                roomName: room.roomName,
                discription: room.discription,
                visibility: "SHOW",
            },
        });
        createdRooms.push(created);
    }

    // 3. Create >40 Books per Room (45 * 5 rooms = 225 books total)
    const booksPerRoom = 45;
    const totalBooks = booksPerRoom * ROOMS.length;
    console.log(`📚 Creating ${totalBooks} books distributed among users...`);

    const bookTypes = ["AllGenres", "Fiction", "Classic", "Contemporary", "Mystery", "Sci_Fi", "Fantasy", "Non_Fiction"];
    const createdBooks = [];

    for (let i = 0; i < totalBooks; i++) {
        const created = await prisma.booksHave.create({
            data: {
                bookname: `${randomElement(BOOK_ADJECTIVES)} ${randomElement(BOOK_NOUNS)}`,
                author: `${randomElement(FIRST_NAMES)} ${randomElement(LAST_NAMES)}`,
                cover: randomElement(BOOK_COVERS),
                bookType: randomElement(bookTypes),
                price: Math.floor(Math.random() * 500) + 100,
                ownerId: randomElement(userIds),
                status: "AVAILABLE",
                visibilityStatus: "SHOW",
                publishDate: randomDate(365 * 3), // random date within last 3 years
            },
        });
        createdBooks.push(created);
    }

    // 4. Assign Books and Users to Rooms
    console.log(`🔗 Linking books and members to rooms...`);

    let bookIndex = 0;
    for (const room of createdRooms) {
        // Assign 45 unique books to this group
        const roomBooks = createdBooks.slice(bookIndex, bookIndex + booksPerRoom);
        bookIndex += booksPerRoom;

        for (const book of roomBooks) {
            await prisma.roomAndBook.create({
                data: {
                    bookId: book.id,
                    roomId: room.id,
                },
            });
        }

        // Add random 3 to 8 members to the room
        const roomMemberCount = Math.floor(Math.random() * 6) + 3;
        const shuffledUserIds = [...userIds].sort(() => Math.random() - 0.5);
        const selectedMembers = shuffledUserIds.slice(0, roomMemberCount);

        for (let j = 0; j < selectedMembers.length; j++) {
            await prisma.roomMembership.create({
                data: {
                    roomId: room.id,
                    memberId: selectedMembers[j],
                    roomRole: j === 0 ? "ADMIN" : "MEMBER", // First user is admin
                    status: "ACTIVE"
                }
            });
        }

        console.log(`  📖 Room "${room.roomName}": assigned ${roomBooks.length} books and ${selectedMembers.length} members.`);
    }

    console.log("\n✅ Seeding complete!");
    console.log(`   👤 ${dbUsers.length} users`);
    console.log(`   📚 ${createdBooks.length} books`);
    console.log(`   🏠 ${createdRooms.length} rooms`);
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
