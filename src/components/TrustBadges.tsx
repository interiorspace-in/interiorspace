import { Users, Clock, Award, Shield } from "lucide-react";

interface TrustBadge {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const badges: TrustBadge[] = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "100+",
    subtitle: "Happy Clients"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "On-Time",
    subtitle: "Delivery"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Premium",
    subtitle: "Materials"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "10 Year",
    subtitle: "Warranty"
  }
];

interface TrustBadgesProps {
  variant?: "dark" | "light";
}

const TrustBadges = ({ variant = "dark" }: TrustBadgesProps) => {
  const bgClass = variant === "dark" 
    ? "bg-foreground/80 backdrop-blur-sm" 
    : "bg-background";
  const textClass = variant === "dark" 
    ? "text-background" 
    : "text-foreground";
  const subtitleClass = variant === "dark" 
    ? "text-background/70" 
    : "text-muted-foreground";
  const iconClass = variant === "dark" 
    ? "text-primary" 
    : "text-primary";
  const borderClass = variant === "dark"
    ? "border-background/10"
    : "border-border";

  return (
    <div className={`${bgClass} py-6 px-4 rounded-2xl mx-4 md:mx-auto md:max-w-4xl`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {badges.map((badge, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center text-center p-3 rounded-xl ${
              index < badges.length - 1 ? `border-r ${borderClass} md:border-r` : ""
            } ${index === 1 ? "border-r-0 md:border-r" : ""}`}
          >
            <div className={`${iconClass} mb-2`}>
              {badge.icon}
            </div>
            <span className={`font-bold text-lg ${textClass}`}>
              {badge.title}
            </span>
            <span className={`text-xs ${subtitleClass}`}>
              {badge.subtitle}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;
