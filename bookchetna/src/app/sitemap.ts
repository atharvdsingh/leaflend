import type { MetadataRoute } from "next";
import { prisma } from "@/util/Prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://book.sanchetna.in";

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/room`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
    ];

    // Dynamic public room pages
    let publicRoomPages: MetadataRoute.Sitemap = [];
    try {
        const publicRooms = await prisma.room.findMany({
            where: { visibility: "SHOW" },
            select: { id: true },
        });

        publicRoomPages = publicRooms.map((room) => ({
            url: `${baseUrl}/room/public-room/${room.id}`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 0.7,
        }));
    } catch {
        // If DB is unreachable, just return static pages
    }

    return [...staticPages, ...publicRoomPages];
}
