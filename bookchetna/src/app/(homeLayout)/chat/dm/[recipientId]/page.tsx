import DmChatpage from "@/components/chat/DmChatpage";
import { GetTheSession } from "@/util/GetTheSession";
import { prisma } from "@/util/Prisma";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: Promise<{ recipientId: string }> }) {
    const { recipientId } = await params;
    const session = await GetTheSession();

    if (!session?.user.id) {
        redirect("/");
    }

    const recipientIdNum = parseInt(recipientId);

    // Fetch recipient name from database
    const recipient = await prisma.users.findUnique({
        where: { id: recipientIdNum },
        select: { name: true },
    });

    return (
        <div>
            <DmChatpage
                userId={session.user.id}
                recipientId={recipientIdNum}
                recipientName={recipient?.name || "Unknown User"}
            />
        </div>
    );
}
