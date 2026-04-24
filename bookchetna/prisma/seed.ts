const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ─── Fake Book Data (real books with cover URLs from Open Library) ───────────

const BOOKS = [
    { bookname: "Atomic Habits", author: "James Clear", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/0735211299-L.jpg", price: 350 },
    { bookname: "Sapiens", author: "Yuval Noah Harari", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/0062316095-L.jpg", price: 499 },
    { bookname: "The Alchemist", author: "Paulo Coelho", bookType: "Fiction", cover: "https://covers.openlibrary.org/b/isbn/0062315005-L.jpg", price: 250 },
    { bookname: "Ikigai", author: "Héctor García", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/0143130722-L.jpg", price: 299 },
    { bookname: "Deep Work", author: "Cal Newport", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/1455586692-L.jpg", price: 399 },
    { bookname: "The Psychology of Money", author: "Morgan Housel", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/0857197681-L.jpg", price: 320 },
    { bookname: "1984", author: "George Orwell", bookType: "Classic", cover: "https://covers.openlibrary.org/b/isbn/0451524934-L.jpg", price: 199 },
    { bookname: "To Kill a Mockingbird", author: "Harper Lee", bookType: "Classic", cover: "https://covers.openlibrary.org/b/isbn/0060935464-L.jpg", price: 280 },
    { bookname: "Dune", author: "Frank Herbert", bookType: "Sci_Fi", cover: "https://covers.openlibrary.org/b/isbn/0441172717-L.jpg", price: 450 },
    { bookname: "The Hobbit", author: "J.R.R. Tolkien", bookType: "Fantasy", cover: "https://covers.openlibrary.org/b/isbn/054792822X-L.jpg", price: 380 },
    { bookname: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", bookType: "Fantasy", cover: "https://covers.openlibrary.org/b/isbn/0590353403-L.jpg", price: 350 },
    { bookname: "The Great Gatsby", author: "F. Scott Fitzgerald", bookType: "Classic", cover: "https://covers.openlibrary.org/b/isbn/0743273567-L.jpg", price: 220 },
    { bookname: "Thinking, Fast and Slow", author: "Daniel Kahneman", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/0374533555-L.jpg", price: 550 },
    { bookname: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/0062457713-L.jpg", price: 299 },
    { bookname: "Rich Dad Poor Dad", author: "Robert Kiyosaki", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/1612680194-L.jpg", price: 350 },
    { bookname: "Pride and Prejudice", author: "Jane Austen", bookType: "Classic", cover: "https://covers.openlibrary.org/b/isbn/0141439513-L.jpg", price: 180 },
    { bookname: "The Catcher in the Rye", author: "J.D. Salinger", bookType: "Classic", cover: "https://covers.openlibrary.org/b/isbn/0316769487-L.jpg", price: 250 },
    { bookname: "Brave New World", author: "Aldous Huxley", bookType: "Sci_Fi", cover: "https://covers.openlibrary.org/b/isbn/0060850523-L.jpg", price: 280 },
    { bookname: "The Lord of the Rings", author: "J.R.R. Tolkien", bookType: "Fantasy", cover: "https://covers.openlibrary.org/b/isbn/0618640150-L.jpg", price: 650 },
    { bookname: "A Brief History of Time", author: "Stephen Hawking", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/0553380168-L.jpg", price: 420 },
    { bookname: "The Power of Habit", author: "Charles Duhigg", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/081298160X-L.jpg", price: 370 },
    { bookname: "Zero to One", author: "Peter Thiel", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/0804139296-L.jpg", price: 399 },
    { bookname: "The Art of War", author: "Sun Tzu", bookType: "Classic", cover: "https://covers.openlibrary.org/b/isbn/1590302257-L.jpg", price: 150 },
    { bookname: "Crime and Punishment", author: "Fyodor Dostoevsky", bookType: "Classic", cover: "https://covers.openlibrary.org/b/isbn/0486415872-L.jpg", price: 290 },
    { bookname: "Fahrenheit 451", author: "Ray Bradbury", bookType: "Sci_Fi", cover: "https://covers.openlibrary.org/b/isbn/1451673310-L.jpg", price: 260 },
    { bookname: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", bookType: "Sci_Fi", cover: "https://covers.openlibrary.org/b/isbn/0345391802-L.jpg", price: 310 },
    { bookname: "Educated", author: "Tara Westover", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/0399590501-L.jpg", price: 420 },
    { bookname: "Becoming", author: "Michelle Obama", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/1524763136-L.jpg", price: 499 },
    { bookname: "The Kite Runner", author: "Khaled Hosseini", bookType: "Contemporary", cover: "https://covers.openlibrary.org/b/isbn/159463193X-L.jpg", price: 350 },
    { bookname: "The Da Vinci Code", author: "Dan Brown", bookType: "Mystery", cover: "https://covers.openlibrary.org/b/isbn/0307474275-L.jpg", price: 320 },
    { bookname: "Gone Girl", author: "Gillian Flynn", bookType: "Mystery", cover: "https://covers.openlibrary.org/b/isbn/0307588378-L.jpg", price: 340 },
    { bookname: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", bookType: "Mystery", cover: "https://covers.openlibrary.org/b/isbn/0307454541-L.jpg", price: 380 },
    { bookname: "Sherlock Holmes", author: "Arthur Conan Doyle", bookType: "Mystery", cover: "https://covers.openlibrary.org/b/isbn/0553212419-L.jpg", price: 250 },
    { bookname: "And Then There Were None", author: "Agatha Christie", bookType: "Mystery", cover: "https://covers.openlibrary.org/b/isbn/0062073486-L.jpg", price: 220 },
    { bookname: "A Game of Thrones", author: "George R.R. Martin", bookType: "Fantasy", cover: "https://covers.openlibrary.org/b/isbn/0553593714-L.jpg", price: 499 },
    { bookname: "The Name of the Wind", author: "Patrick Rothfuss", bookType: "Fantasy", cover: "https://covers.openlibrary.org/b/isbn/0756404746-L.jpg", price: 420 },
    { bookname: "Ender's Game", author: "Orson Scott Card", bookType: "Sci_Fi", cover: "https://covers.openlibrary.org/b/isbn/0812550706-L.jpg", price: 330 },
    { bookname: "Foundation", author: "Isaac Asimov", bookType: "Sci_Fi", cover: "https://covers.openlibrary.org/b/isbn/0553293354-L.jpg", price: 290 },
    { bookname: "The Handmaid's Tale", author: "Margaret Atwood", bookType: "Fiction", cover: "https://covers.openlibrary.org/b/isbn/038549081X-L.jpg", price: 360 },
    { bookname: "Little Women", author: "Louisa May Alcott", bookType: "Classic", cover: "https://covers.openlibrary.org/b/isbn/0147514010-L.jpg", price: 210 },
    { bookname: "The Midnight Library", author: "Matt Haig", bookType: "Contemporary", cover: "https://covers.openlibrary.org/b/isbn/0525559477-L.jpg", price: 380 },
    { bookname: "Project Hail Mary", author: "Andy Weir", bookType: "Sci_Fi", cover: "https://covers.openlibrary.org/b/isbn/0593135202-L.jpg", price: 450 },
    { bookname: "Where the Crawdads Sing", author: "Delia Owens", bookType: "Contemporary", cover: "https://covers.openlibrary.org/b/isbn/0735219095-L.jpg", price: 370 },
    { bookname: "Normal People", author: "Sally Rooney", bookType: "Contemporary", cover: "https://covers.openlibrary.org/b/isbn/1984822179-L.jpg", price: 310 },
    { bookname: "The Silent Patient", author: "Alex Michaelides", bookType: "Mystery", cover: "https://covers.openlibrary.org/b/isbn/1250301696-L.jpg", price: 340 },
    { bookname: "Verity", author: "Colleen Hoover", bookType: "Mystery", cover: "https://covers.openlibrary.org/b/isbn/1538724731-L.jpg", price: 320 },
    { bookname: "Anxious People", author: "Fredrik Backman", bookType: "Contemporary", cover: "https://covers.openlibrary.org/b/isbn/1501160834-L.jpg", price: 360 },
    { bookname: "Tuesdays with Morrie", author: "Mitch Albom", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/076790592X-L.jpg", price: 250 },
    { bookname: "Man's Search for Meaning", author: "Viktor Frankl", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/080701429X-L.jpg", price: 280 },
    { bookname: "The 48 Laws of Power", author: "Robert Greene", bookType: "Non_Fiction", cover: "https://covers.openlibrary.org/b/isbn/0140280197-L.jpg", price: 550 },
    { bookname: "Meditations", author: "Marcus Aurelius", bookType: "Classic", cover: "https://covers.openlibrary.org/b/isbn/0140449337-L.jpg", price: 190 },
    { bookname: "The Book Thief", author: "Markus Zusak", bookType: "Fiction", cover: "https://covers.openlibrary.org/b/isbn/0375842209-L.jpg", price: 330 },
    { bookname: "Life of Pi", author: "Yann Martel", bookType: "Fiction", cover: "https://covers.openlibrary.org/b/isbn/0156027321-L.jpg", price: 300 },
    { bookname: "The Fault in Our Stars", author: "John Green", bookType: "Contemporary", cover: "https://covers.openlibrary.org/b/isbn/0525478817-L.jpg", price: 290 },
    { bookname: "Siddhartha", author: "Hermann Hesse", bookType: "Classic", cover: "https://covers.openlibrary.org/b/isbn/0553208845-L.jpg", price: 170 },
    { bookname: "The Picture of Dorian Gray", author: "Oscar Wilde", bookType: "Classic", cover: "https://covers.openlibrary.org/b/isbn/0141439572-L.jpg", price: 200 },
    { bookname: "Kafka on the Shore", author: "Haruki Murakami", bookType: "Fiction", cover: "https://covers.openlibrary.org/b/isbn/1400079276-L.jpg", price: 410 },
    { bookname: "Norwegian Wood", author: "Haruki Murakami", bookType: "Fiction", cover: "https://covers.openlibrary.org/b/isbn/0375704027-L.jpg", price: 380 },
    { bookname: "The Immortals of Meluha", author: "Amish Tripathi", bookType: "Fantasy", cover: "https://covers.openlibrary.org/b/isbn/9380658745-L.jpg", price: 299 },
    { bookname: "Train to Pakistan", author: "Khushwant Singh", bookType: "Fiction", cover: "https://covers.openlibrary.org/b/isbn/8171678726-L.jpg", price: 180 },
];

// ─── Rooms ──────────────────────────────────────────────────────────────────

const ROOMS = [
    { roomName: "Fiction Lovers", discription: "A cozy room for fiction enthusiasts to share and discover stories." },
    { roomName: "Science & Non-Fiction", discription: "Explore the world of facts, science, and self-improvement." },
    { roomName: "Classics Club", discription: "Timeless literature that shaped generations." },
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
    // NOTE: Not deleting users — keep existing user accounts intact
    console.log("🗑️  Cleared books, rooms, and related data.\n");

    // We need at least one user to own books. Check if any exist.
    let owner = await prisma.users.findFirst();
    if (!owner) {
        owner = await prisma.users.create({
            data: { name: "Seed User", email: "seed@bookchetna.com", password: "seedpassword123" },
        });
        console.log("👤 Created fallback seed user (no existing users found).");
    } else {
        console.log(`👤 Using existing user "${owner.name}" (id: ${owner.id}) as book owner.`);
    }

    // Create books
    const createdBooks = [];
    for (const book of BOOKS) {
        const created = await prisma.booksHave.create({
            data: {
                bookname: book.bookname,
                author: book.author,
                cover: book.cover,
                bookType: book.bookType,
                price: book.price,
                ownerId: owner.id,
                status: "AVAILABLE",
                visibilityStatus: "SHOW",
                publishDate: randomDate(365 * 3), // random date within last 3 years
            },
        });
        createdBooks.push(created);
    }
    console.log(`📚 Created ${createdBooks.length} books.`);

    // Create rooms
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
    console.log(`🏠 Created ${createdRooms.length} rooms.`);

    // Assign 20 books to each room via roomAndBook
    // Shuffle books and distribute
    const shuffled = [...createdBooks].sort(() => Math.random() - 0.5);

    for (let i = 0; i < createdRooms.length; i++) {
        const room = createdRooms[i];
        const roomBooks = shuffled.slice(i * 20, (i + 1) * 20);

        for (const book of roomBooks) {
            await prisma.roomAndBook.create({
                data: {
                    bookId: book.id,
                    roomId: room.id,
                },
            });
        }
        console.log(`  📖 Room "${room.roomName}" → ${roomBooks.length} books assigned.`);
    }

    console.log("\n✅ Seeding complete!");
    console.log(`   📚 ${createdBooks.length} books`);
    console.log(`   🏠 ${createdRooms.length} rooms`);
    console.log(`   🔗 ${Math.min(createdBooks.length, createdRooms.length * 20)} book-room links`);
}

function randomDate(daysBack:number) {
    const now = new Date();
    const past = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
    return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
