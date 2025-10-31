"use client";

import { useState } from "react";
import {
  Box,
  Type,
  MousePointer,
  Layout,
  Image as ImageIcon,
  Table,
  List,
  Calendar,
  Search,
  ShoppingCart,
  User,
  Bell,
  Menu,
  CreditCard,
  BarChart,
  Map,
  MessageSquare,
  Star,
  Heart,
  Plus,
  Layers,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Component {
  id: string;
  name: string;
  icon: any;
  category: string;
  code: string;
  preview?: string;
  popular?: boolean;
}

const components: Component[] = [
  {
    id: "button",
    name: "Button",
    icon: MousePointer,
    category: "Basic",
    code: '<button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Button</button>',
    popular: true,
  },
  {
    id: "input",
    name: "Input",
    icon: Type,
    category: "Basic",
    code: '<input type="text" className="px-4 py-2 border rounded-lg" placeholder="Enter text..." />',
    popular: true,
  },
  {
    id: "card",
    name: "Card",
    icon: Box,
    category: "Layout",
    code: `<div className="border rounded-lg p-6 shadow-sm">
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-muted-foreground">Card content goes here</p>
</div>`,
    popular: true,
  },
  {
    id: "navbar",
    name: "Navbar",
    icon: Menu,
    category: "Navigation",
    code: `<nav className="flex items-center justify-between p-4 border-b">
  <div className="font-bold text-xl">Logo</div>
  <div className="flex gap-4">
    <a href="#" className="hover:underline">Home</a>
    <a href="#" className="hover:underline">About</a>
    <a href="#" className="hover:underline">Contact</a>
  </div>
</nav>`,
    popular: true,
  },
  {
    id: "hero",
    name: "Hero Section",
    icon: Layout,
    category: "Sections",
    code: `<section className="py-20 text-center">
  <h1 className="text-5xl font-bold mb-4">Welcome to Our Product</h1>
  <p className="text-xl text-muted-foreground mb-8">Build amazing things</p>
  <button className="px-6 py-3 bg-primary text-white rounded-lg">Get Started</button>
</section>`,
    popular: true,
  },
  {
    id: "pricing-card",
    name: "Pricing Card",
    icon: CreditCard,
    category: "E-commerce",
    code: `<div className="border rounded-lg p-6 hover:shadow-lg transition">
  <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
  <div className="text-4xl font-bold mb-4">$29<span className="text-lg">/mo</span></div>
  <ul className="space-y-2 mb-6">
    <li>✓ Feature 1</li>
    <li>✓ Feature 2</li>
    <li>✓ Feature 3</li>
  </ul>
  <button className="w-full py-2 bg-primary text-white rounded">Subscribe</button>
</div>`,
  },
  {
    id: "product-card",
    name: "Product Card",
    icon: ShoppingCart,
    category: "E-commerce",
    code: `<div className="border rounded-lg overflow-hidden">
  <div className="aspect-square bg-muted"></div>
  <div className="p-4">
    <h3 className="font-semibold">Product Name</h3>
    <p className="text-2xl font-bold">$99.99</p>
    <button className="w-full mt-3 py-2 bg-primary text-white rounded">Add to Cart</button>
  </div>
</div>`,
  },
  {
    id: "profile-card",
    name: "Profile Card",
    icon: User,
    category: "User",
    code: `<div className="border rounded-lg p-6 text-center">
  <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4"></div>
  <h3 className="font-bold text-lg">John Doe</h3>
  <p className="text-muted-foreground">Software Engineer</p>
  <button className="mt-4 px-4 py-2 border rounded-lg">Follow</button>
</div>`,
  },
  {
    id: "notification",
    name: "Notification",
    icon: Bell,
    category: "User",
    code: `<div className="flex items-start gap-3 p-4 border rounded-lg">
  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
    <Bell className="w-5 h-5" />
  </div>
  <div>
    <h4 className="font-semibold">New notification</h4>
    <p className="text-sm text-muted-foreground">You have a new message</p>
  </div>
</div>`,
  },
  {
    id: "stat-card",
    name: "Stat Card",
    icon: BarChart,
    category: "Dashboard",
    code: `<div className="border rounded-lg p-6">
  <div className="flex items-center justify-between mb-2">
    <span className="text-muted-foreground">Total Sales</span>
    <BarChart className="w-4 h-4" />
  </div>
  <div className="text-3xl font-bold">$12,345</div>
  <p className="text-sm text-green-600 mt-2">+12% from last month</p>
</div>`,
  },
  {
    id: "table",
    name: "Data Table",
    icon: Table,
    category: "Dashboard",
    code: `<table className="w-full border rounded-lg">
  <thead className="bg-muted">
    <tr>
      <th className="p-3 text-left">Name</th>
      <th className="p-3 text-left">Email</th>
      <th className="p-3 text-left">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-t">
      <td className="p-3">John Doe</td>
      <td className="p-3">john@example.com</td>
      <td className="p-3"><span className="px-2 py-1 bg-green-100 rounded">Active</span></td>
    </tr>
  </tbody>
</table>`,
  },
  {
    id: "testimonial",
    name: "Testimonial",
    icon: Star,
    category: "Marketing",
    code: `<div className="border rounded-lg p-6">
  <div className="flex mb-3">
    ${Array(5).fill('<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />').join("")}
  </div>
  <p className="text-muted-foreground mb-4">"This product is amazing!"</p>
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-muted"></div>
    <div>
      <div className="font-semibold">Jane Smith</div>
      <div className="text-sm text-muted-foreground">CEO, Company</div>
    </div>
  </div>
</div>`,
  },
  {
    id: "cta",
    name: "CTA Banner",
    icon: Layout,
    category: "Marketing",
    code: `<div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-8 text-white text-center">
  <h2 className="text-3xl font-bold mb-2">Ready to get started?</h2>
  <p className="mb-6">Join thousands of satisfied customers</p>
  <button className="px-6 py-3 bg-white text-primary rounded-lg font-semibold">Get Started Free</button>
</div>`,
  },
  {
    id: "contact-form",
    name: "Contact Form",
    icon: MessageSquare,
    category: "Forms",
    code: `<form className="space-y-4 border rounded-lg p-6">
  <div>
    <label className="block mb-2 font-medium">Name</label>
    <input type="text" className="w-full px-4 py-2 border rounded" />
  </div>
  <div>
    <label className="block mb-2 font-medium">Email</label>
    <input type="email" className="w-full px-4 py-2 border rounded" />
  </div>
  <div>
    <label className="block mb-2 font-medium">Message</label>
    <textarea className="w-full px-4 py-2 border rounded" rows={4}></textarea>
  </div>
  <button type="submit" className="w-full py-2 bg-primary text-white rounded">Send Message</button>
</form>`,
  },
];

const categories = [
  "All",
  "Basic",
  "Layout",
  "Navigation",
  "Sections",
  "E-commerce",
  "User",
  "Dashboard",
  "Marketing",
  "Forms",
];

export function ComponentLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [draggedComponent, setDraggedComponent] = useState<Component | null>(null);

  const filteredComponents = components.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || comp.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const popularComponents = components.filter((c) => c.popular);

  const handleDragStart = (component: Component) => {
    setDraggedComponent(component);
    toast("Drag component to the editor", { icon: "👆" });
  };

  const handleDragEnd = () => {
    setDraggedComponent(null);
  };

  const handleClick = (component: Component) => {
    // Copy code to clipboard
    navigator.clipboard.writeText(component.code);
    toast.success(`${component.name} code copied!`);
  };

  return (
    <div className="h-full flex flex-col bg-card border-l">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-lavender" />
            <h2 className="font-semibold">Component Library</h2>
          </div>
          <Badge variant="secondary">{components.length} components</Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>

        {/* All Components */}
        <TabsContent value="all" className="flex-1 mt-0">
          {/* Categories */}
          <div className="px-4 py-3 border-b">
            <ScrollArea orientation="horizontal">
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors",
                      selectedCategory === category
                        ? "bg-lavender text-white"
                        : "bg-muted hover:bg-muted/80"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Components Grid */}
          <ScrollArea className="flex-1">
            {filteredComponents.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Box className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium">No components found</p>
                <p className="text-sm mt-1">Try a different search</p>
              </div>
            ) : (
              <div className="p-4 grid grid-cols-2 gap-3">
                {filteredComponents.map((component) => (
                  <div
                    key={component.id}
                    draggable
                    onDragStart={() => handleDragStart(component)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handleClick(component)}
                    className={cn(
                      "border rounded-lg p-4 cursor-move hover:border-lavender hover:shadow-md transition-all group",
                      draggedComponent?.id === component.id && "opacity-50"
                    )}
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-lg bg-lavender-light flex items-center justify-center group-hover:bg-lavender group-hover:text-white transition-colors">
                        <component.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{component.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {component.category}
                        </div>
                      </div>
                      {component.popular && (
                        <Badge variant="secondary" className="text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        {/* Popular Components */}
        <TabsContent value="popular" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 grid grid-cols-2 gap-3">
              {popularComponents.map((component) => (
                <div
                  key={component.id}
                  draggable
                  onDragStart={() => handleDragStart(component)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleClick(component)}
                  className="border rounded-lg p-4 cursor-move hover:border-lavender hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 rounded-lg bg-lavender-light flex items-center justify-center group-hover:bg-lavender group-hover:text-white transition-colors">
                      <component.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{component.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {component.category}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="p-3 border-t bg-muted/50 text-xs text-muted-foreground">
        <p>Click to copy • Drag to add to editor</p>
      </div>
    </div>
  );
}
