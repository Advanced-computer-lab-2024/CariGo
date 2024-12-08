import React, { useState } from 'react';
import { ChevronDown, CreditCard, User, Star, Layout, HelpCircle } from 'lucide-react';

const HelpSection = ({ title, icon, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-[#1a659e]/20">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-[#f7e1c6] transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-lg font-medium text-[#004e89]">{title}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-[#1a659e] transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isExpanded && (
        <div className="p-4 bg-[#f7e1c6]">
          <div className="prose prose-[#004e89] max-w-none">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default function HelpPage() {
  const sections = [
    {
      title: "Getting Started",
      icon: <Star className="w-5 h-5 text-[#ff6b36]" />,
      content: (
        <div className="space-y-4">
          <p>Learn how to use our platform with these simple steps:</p>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="/placeholder.svg?height=200&width=400" 
              alt="Getting Started Demo"
              className="w-full"
            />
          </div>
          <ul className="list-disc pl-4 space-y-2">
            <li>Create your account</li>
            <li>Set up your profile</li>
            <li>Start exploring features</li>
          </ul>
        </div>
      )
    },
    {
      title: "Account Management",
      icon: <User className="w-5 h-5 text-[#ff6b36]" />,
      content: (
        <div className="space-y-4">
          <p>Manage your account settings and preferences:</p>
          <div className="rounded-lg overflow-hidden">
            <video 
              className="w-full"
              controls
              poster="/placeholder.svg?height=200&width=400"
            >
              <source src="#" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <ul className="list-disc pl-4 space-y-2">
            <li>Update personal information</li>
            <li>Change password</li>
            <li>Manage notifications</li>
          </ul>
        </div>
      )
    },
    {
      title: "Billing & Subscriptions",
      icon: <CreditCard className="w-5 h-5 text-[#ff6b36]" />,
      content: (
        <div className="space-y-4">
          <p>Learn about our billing process and subscription management:</p>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="/placeholder.svg?height=200&width=400" 
              alt="Billing Demo"
              className="w-full"
            />
          </div>
          <ul className="list-disc pl-4 space-y-2">
            <li>View payment history</li>
            <li>Update payment method</li>
            <li>Change subscription plan</li>
          </ul>
        </div>
      )
    },
    {
      title: "Features & Tools",
      icon: <Layout className="w-5 h-5 text-[#ff6b36]" />,
      content: (
        <div className="space-y-4">
          <p>Discover all the features available to you:</p>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="/placeholder.svg?height=200&width=400" 
              alt="Features Demo"
              className="w-full"
            />
          </div>
          <ul className="list-disc pl-4 space-y-2">
            <li>Dashboard overview</li>
            <li>Analytics tools</li>
            <li>Collaboration features</li>
          </ul>
        </div>
      )
    },
    {
      title: "Troubleshooting",
      icon: <HelpCircle className="w-5 h-5 text-[#ff6b36]" />,
      content: (
        <div className="space-y-4">
          <p>Common issues and their solutions:</p>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="/placeholder.svg?height=200&width=400" 
              alt="Troubleshooting Guide"
              className="w-full"
            />
          </div>
          <ul className="list-disc pl-4 space-y-2">
            <li>Connection problems</li>
            <li>Error messages</li>
            <li>Performance issues</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#004e89]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#004e89]">How can we help you?</h1>
          <div className="relative max-w-xl mx-auto">
            <input
              type="search"
              placeholder="Search for help..."
              className="w-full px-4 py-3 rounded-lg bg-white border border-[#1a659e]/20 focus:outline-none focus:border-[#ff6b36] text-[#004e89] placeholder-[#1a659e]"
            />
          </div>
        </div>
        
        <div className="space-y-px rounded-lg overflow-hidden border border-[#1a659e]/20 bg-white">
          {sections.map((section, index) => (
            <HelpSection
              key={index}
              title={section.title}
              icon={section.icon}
              content={section.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

