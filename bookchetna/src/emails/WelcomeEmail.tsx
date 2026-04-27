import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Heading,
    Hr,
    Preview,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
    name: string;
}

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Welcome to BookChetna — your book sharing community!</Preview>
            <Body style={body}>
                <Container style={container}>
                    <Heading style={heading}>Welcome to BookChetna! 📚</Heading>
                    <Hr style={hr} />
                    <Text style={text}>
                        Hi <strong>{name}</strong>,
                    </Text>
                    <Text style={text}>
                        Your account has been created successfully. You can now:
                    </Text>
                    <Section style={listSection}>
                        <Text style={listItem}>• Add your books to share with others</Text>
                        <Text style={listItem}>• Browse and rent books from the community</Text>
                        <Text style={listItem}>• Create or join rooms for group sharing</Text>
                    </Section>
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

const listSection: React.CSSProperties = {
    paddingLeft: "8px",
};

const listItem: React.CSSProperties = {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#6b7280",
    margin: "0 0 4px",
};

const footer: React.CSSProperties = {
    fontSize: "13px",
    color: "#9ca3af",
    textAlign: "center" as const,
};
