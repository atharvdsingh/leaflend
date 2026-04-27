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
    Row,
    Column,
} from "@react-email/components";
import * as React from "react";

interface PaymentInvoiceProps {
    bookName: string;
    amount: number;
    paymentId: string;
    rentalDays: number;
    date: string;
}

export default function PaymentInvoice({
    bookName,
    amount,
    paymentId,
    rentalDays,
    date,
}: PaymentInvoiceProps) {
    return (
        <Html>
            <Head />
            <Preview>{`Payment receipt for "${bookName}" — ₹${amount}`}</Preview>
            <Body style={body}>
                <Container style={container}>
                    <Heading style={heading}>Payment Receipt ✅</Heading>
                    <Hr style={hr} />
                    <Text style={text}>
                        Your payment has been verified successfully. Here are your rental details:
                    </Text>

                    <Section style={invoiceBox}>
                        <Row>
                            <Column style={labelCol}>Book</Column>
                            <Column style={valueCol}>{bookName}</Column>
                        </Row>
                        <Row>
                            <Column style={labelCol}>Amount</Column>
                            <Column style={valueCol}>₹{amount}</Column>
                        </Row>
                        <Row>
                            <Column style={labelCol}>Rental Period</Column>
                            <Column style={valueCol}>{rentalDays} days</Column>
                        </Row>
                        <Row>
                            <Column style={labelCol}>Payment ID</Column>
                            <Column style={valueCol}>{paymentId}</Column>
                        </Row>
                        <Row>
                            <Column style={labelCol}>Date</Column>
                            <Column style={valueCol}>{date}</Column>
                        </Row>
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

const invoiceBox: React.CSSProperties = {
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    padding: "16px",
    border: "1px solid #e5e7eb",
};

const labelCol: React.CSSProperties = {
    fontSize: "13px",
    color: "#6b7280",
    padding: "6px 0",
    width: "120px",
    fontWeight: "600",
};

const valueCol: React.CSSProperties = {
    fontSize: "13px",
    color: "#111827",
    padding: "6px 0",
    fontWeight: "500",
};

const footer: React.CSSProperties = {
    fontSize: "13px",
    color: "#9ca3af",
    textAlign: "center" as const,
};
