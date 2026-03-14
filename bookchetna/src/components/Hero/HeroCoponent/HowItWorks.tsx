import { Upload, Handshake, Repeat } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="w-10 h-10 text-green-600" />,
      title: "1. List Your Books",
      description: "Upload book details, set your rental price, and make your library available to the community.",
    },
    {
      icon: <Handshake className="w-10 h-10 text-green-600" />,
      title: "2. Connect & Rent",
      description: "Accept rental requests, chat with borrowers, and arrange a safe exchange.",
    },
    {
      icon: <Repeat className="w-10 h-10 text-green-600" />,
      title: "3. Earn & Repeat",
      description: "Get paid securely, receive your book back, and build your reputation as a top lender.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto text-center space-y-12">

        <div className="space-y-4">
          <Badge variant="outline" className="border-green-600 text-green-600">Simple Process</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">How BookChetna Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start sharing your love for reading in three easy steps. It's safe, simple, and rewarding.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-green-200 to-transparent -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="bg-background border border-border/50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-4 relative group">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
