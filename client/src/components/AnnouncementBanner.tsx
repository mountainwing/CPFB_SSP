import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useState } from "react";

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Alert className="bg-enterprise-blue-light border-enterprise-blue mb-8 relative py-6 px-6">
      <Info className="h-6 w-6 text-enterprise-blue mt-1" />
      <AlertDescription className="text-enterprise-blue pr-12 ml-2">
        <div className="space-y-3">
          <div>
            <strong className="text-lg font-semibold block mb-2">Platform Enhancement Update</strong>
            <p className="text-base leading-relaxed">
              We have enhanced the <strong>analytics platform</strong> with new data visualization tools, 
              improved dashboard performance, and advanced query capabilities. Our latest features include 
              real-time data streaming, enhanced security protocols, and expanded integration options.
            </p>
          </div>
          <div className="text-sm">
            <p>
              📊 New visualization widgets • 🔒 Enhanced security • 🚀 Improved performance
            </p>
            <p className="mt-1">
              Please visit our <a href="#" className="underline font-medium hover:text-enterprise-blue/80">help center</a> for 
              more information or contact support at <strong>support@platform.gov</strong> for assistance.
            </p>
          </div>
        </div>
      </AlertDescription>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 h-8 w-8 text-enterprise-blue hover:bg-enterprise-blue hover:text-white rounded-full"
        onClick={() => setIsVisible(false)}
      >
      </Button>
    </Alert>
  );
};

export default AnnouncementBanner;