import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface FAQItem {
  question: string;
  answer: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class FAQ {
  faqs: FAQItem[] = [
    {
      question: 'What is this platform about?',
      answer:
        'We’re an all-in-one solution for modern crypto users who want to manage their money smarter. From tracking spending and setting financial goals to analyzing your crypto portfolio — we make wealth management simple and transparent.',
      isOpen: false,
    },
    {
      question: 'Do I need to own cryptocurrency to use the platform?',
      answer:
        'Not at all. While we specialize in crypto wealth tools, our platform also supports traditional budgeting and financial goal-setting features. It’s perfect for both crypto-savvy users and beginners.',
      isOpen: false,
    },
    {
      question: 'Is my financial data secure?',
      answer:
        'Absolutely. We use bank-grade encryption and follow industry best practices to protect your financial data and privacy. Your data is never sold or shared with third parties.',
      isOpen: false,
    },
    {
      question: 'Can I track multiple wallets or exchanges?',
      answer:
        'Yes. Our platform allows you to connect and track multiple wallets and exchanges, giving you a unified view of your assets across various platforms.',
      isOpen: false,
    },
    {
      question: 'How does goal setting work?',
      answer:
        'You can create financial goals (e.g., saving for a new investment or building an emergency fund) and we’ll help you plan and track your progress with intelligent recommendations based on your spending and income.',
      isOpen: false,
    },
    {
      question: 'Is there a cost to use the platform?',
      answer:
        'We offer both a free tier and premium plans. The free version includes basic money management tools, while the premium tiers unlock advanced analytics, integrations, and crypto insights.',
      isOpen: false,
    },
    {
      question: 'Can I use this on mobile?',
      answer:
        'Yes! Our platform is fully responsive and mobile-optimized. A native mobile app is also in development, so stay tuned!',
      isOpen: false,
    },
    {
      question: 'How do I get started?',
      answer:
        'Simply click on “Get Started” on the homepage, create an account, and follow the onboarding steps. You’ll be up and running in minutes.',
      isOpen: false,
    },
  ];
  toggleFAQ(index: number): void {
    this.faqs = this.faqs.map((faq, i) => ({
      ...faq,
      isOpen: i === index ? !faq.isOpen : false,
    }));
  }
}
