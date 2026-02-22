import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center text-xs md:text-sm text-muted-foreground mb-2 overflow-x-auto whitespace-nowrap pb-1">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index === 0 ? (
            <Link 
              to={item.href} 
              className="flex items-center hover:text-foreground transition-colors"
            >
              <Home className="h-3 w-3 mr-1" />
              {item.label}
            </Link>
          ) : (
            <Link 
              to={item.href} 
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
          {index < items.length - 1 && (
            <ChevronRight className="h-3 w-3 mx-2 flex-shrink-0" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
