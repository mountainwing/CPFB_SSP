import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
}

const ServiceCard = ({ title, description, icon: Icon, onClick, disabled = false }: ServiceCardProps) => {
  return (
    <Card className="bg-gradient-card border border-enterprise-gray-light shadow-card hover:shadow-card-hover transition-all duration-300 hover:bg-service-card-hover group cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="p-3 bg-enterprise-blue-light rounded-lg group-hover:bg-enterprise-blue group-hover:text-white transition-colors duration-300">
            <Icon className="h-6 w-6 text-enterprise-blue group-hover:text-white" />
          </div>
          {disabled && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
              Unavailable
            </span>
          )}
        </div>
        <CardTitle className="text-lg text-card-foreground group-hover:text-enterprise-blue transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-enterprise-gray mb-4 line-clamp-2">
          {description}
        </CardDescription>
        <Button 
          onClick={onClick}
          disabled={disabled}
          className="w-full bg-enterprise-blue hover:bg-enterprise-blue/90 text-white"
          size="sm"
        >
          {disabled ? "Coming Soon" : "Launch"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;