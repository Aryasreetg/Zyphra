// Homepage FAQ. Also published as structured data so Google can show it in search results.
export const FAQS: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: "I have no coding background. Can I still join?",
    a: "Yes. The foundation programmes (Python & AI/ML, Java & Spring Boot) and the live workshop are designed for complete beginners. We start from the basics and build up step by step.",
  },
  {
    q: "Are the classes live or recorded?",
    a: "Classes are live and instructor-led, so you can ask questions and get your doubts cleared in real time. Hands-on practice and project work happen alongside every session.",
  },
  {
    q: "What will I have at the end of a course?",
    a: "Working, deployed projects you can show recruiters, a GitHub portfolio, a Zyphraa certificate, and mock interview practice so you're ready to talk about your work confidently.",
  },
  {
    q: "Is mock interview practice really included?",
    a: "Yes — every programme now includes live mock interview practice covering technical questions and HR rounds, with honest feedback afterwards.",
  },
  {
    q: "Can I learn one-on-one at my own pace?",
    a: "Absolutely. Personalised one-on-one classes have a fully customised curriculum and flexible scheduling — mornings, evenings or weekends. Send a query and we'll plan it with you.",
  },
  {
    q: "Do you run workshops for colleges?",
    a: "Yes. We run on-campus and online workshops for colleges on web development, full stack, Git, and career readiness. See the Campus page for formats and pricing.",
    link: { href: "/campus", label: "View campus workshops" },
  },
  {
    q: "How do I enrol or ask about fees and batches?",
    a: "Use the contact form below — pick the course you're interested in and we'll reply within 24 hours with batch dates, fees and next steps.",
  },
];
