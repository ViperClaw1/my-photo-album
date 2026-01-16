import { Upload, Search, Settings, HelpCircle, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onUploadClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({ onUploadClick, searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className="header-blur sticky top-0 z-50 border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Image className="h-5 w-5 text-primary" />
          </div>
          <span className="hidden font-display text-xl font-medium text-foreground md:block">
            Photos
          </span>
        </div>

        {/* Search Bar */}
        <div className="mx-4 flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search your photos"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-12 w-full rounded-full border-0 bg-secondary pl-11 pr-4 text-base placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onUploadClick}
            className="h-10 w-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Upload className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-10 w-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground md:flex"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-10 w-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground md:flex"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <div className="ml-2 h-9 w-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};
