import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "BookChetna — Peer-to-Peer Book Rental Marketplace",
        short_name: "BookChetna",
        description:
            "Rent books from your neighbors, lend yours to earn money. The smartest way to read.",
        start_url: "/",
        display: "standalone",
        background_color: "#0a0a0a",
        theme_color: "#16a34a",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}
