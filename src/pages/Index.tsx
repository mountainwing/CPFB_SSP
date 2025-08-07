import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import ChatBot from "@/components/ChatBot";
import { 
  Database, 
  BarChart3, 
  Search, 
  FileText, 
  Bot, 
  Network, 
  Flower2,
  PieChart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleServiceClick = (serviceName: string) => {
    toast({
      title: `Launching ${serviceName}`,
      description: "Service is starting up...",
    });
  };

  const services = [
    {
      title: "Databricks Workspace",
      description: "Unified analytics platform for big data and machine learning workloads",
      icon: Database,
      onClick: () => handleServiceClick("Databricks"),
    },
    {
      title: "Power BI",
      description: "Business analytics solution for data visualization and insights",
      icon: BarChart3,
      onClick: () => handleServiceClick("Power BI"),
    },
    {
      title: "Purview Data Catalog",
      description: "Data governance and cataloging service for your organization",
      icon: Search,
      onClick: () => handleServiceClick("Purview"),
    },
    {
      title: "Data Readiness",
      description: "Check data quality and preparation status for analytics",
      icon: FileText,
      onClick: () => handleServiceClick("Data Readiness"),
    },
    {
      title: "Ask DAVE",
      description: "AI-powered data assistant for intelligent query processing",
      icon: Bot,
      onClick: () => handleServiceClick("DAVE"),
    },
    {
      title: "Data Enhancements",
      description: "Tools for data cleansing, transformation, and enrichment",
      icon: PieChart,
      onClick: () => handleServiceClick("Data Enhancements"),
    },
    {
      title: "Neo4j Browser",
      description: "Graph database development and visualization interface",
      icon: Network,
      onClick: () => handleServiceClick("Neo4j Browser"),
    },
    {
      title: "Neo4j Bloom",
      description: "Graph data visualization and exploration tool",
      icon: Flower2,
      onClick: () => handleServiceClick("Neo4j Bloom"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <AnnouncementBanner />
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Data Services Dashboard
          </h2>
          <p className="text-enterprise-gray text-lg">
            Access your enterprise analytics and data management tools
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              onClick={service.onClick}
            />
          ))}
        </div>
      </main>
      
      <ChatBot />
    </div>
  );
};

export default Index;
