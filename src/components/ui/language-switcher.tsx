import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getCurrentLanguageName = () => {
    switch (i18n.language) {
      case 'my':
        return 'မြန်မာ';
      case 'en':
      default:
        return 'English';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{getCurrentLanguageName()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('en')}>
          <span className="mr-2">🇺🇸</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('my')}>
          <span className="mr-2">🇲🇲</span>
          မြန်မာ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
