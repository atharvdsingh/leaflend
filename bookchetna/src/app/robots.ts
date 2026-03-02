import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/home", "/my-books", "/cart", "/rentedbooks", "/api/"],
            },
        ],
        sitemap: "https://book.sanchetna.in/sitemap.xml",
    };
}
