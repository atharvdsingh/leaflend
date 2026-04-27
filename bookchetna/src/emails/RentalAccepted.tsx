import {
    Html,
    Head,
    Body,
    Container,
    Text,
    Heading,
    Hr,
    Preview,
} from "@react-email/components";
import * as React from "react";

interface RentalAcceptedProps {
    requesterName: string;
    bookName: string;
    ownerName: string;
    price: number | null;
}

export default function RentalAccepted({
    requesterName,
    bookName,
    ownerName,
    price,
}: RentalAcceptedProps) {
    return (
        <Html>
            <Head />
            <Preview>Your rental request for "{bookName}" has been accepted!</Preview>
            <Body style={body}>
                <Container style={container}>
                    <Heading style={heading}>Rental Request Accepted 🎉</Heading>
                    <Hr style={hr} />
                    <Text style={text}>
                        Hi <strong>{requesterName}</strong>,
                    </Text>
                    <Text style={text}>
                        Great news! <strong>{ownerName}</strong> has accepted your rental request
                        for <strong>"{bookName}"</strong>.
                    </Text>
                    {price && (
                        <Text style={text}>
                            The rental price is <strong>₹{price}</strong>. Please proceed to
                            payment to confirm your rental.
                        </Text>
                    )}
                    <Text style={text}>
                        Head over to BookChetna to complete your rental.
                    </Text>
                    <Hr style={hr} />
                    <Text style={footer}>
                        — The BookChetna Team
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

const body: React.CSSProperties = {
    backgroundColor: "#f9fafb",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const container: React.CSSProperties = {
    maxWidth: "480px",
    margin: "40px auto",
    padding: "32px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
};

const heading: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
    textAlign: "center" as const,
    margin: "0 0 16px",
};

const hr: React.CSSProperties = {
    borderColor: "#e5e7eb",
    margin: "20px 0",
};

const text: React.CSSProperties = {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#374151",
    margin: "0 0 12px",
};

const footer: React.CSSProperties = {
    fontSize: "13px",
    color: "#9ca3af",
    textAlign: "center" as const,
};
