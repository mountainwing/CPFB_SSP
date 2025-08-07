import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info, X } from "lucide-react";
import { useState } from "react";

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Alert className="bg-enterprise-blue-light border-enterprise-blue mb-6 relative">
      <Info className="h-4 w-4 text-enterprise-blue" />
      <AlertDescription className="text-enterprise-blue pr-8">
        <strong>Platform Update:</strong> New enhanced analytics features are now available. 
        Check out our improved data visualization tools and contact support for assistance.
      </AlertDescription>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-6 w-6 text-enterprise-blue hover:bg-enterprise-blue hover:text-white"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  );
};

export default AnnouncementBanner;