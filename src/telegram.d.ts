interface TelegramWebApp {
  WebApp: {
    ready: () => void;
    expand: () => void;
    initData: string;
    initDataUnsafe: {
      user?: {
        id: number;
        first_name: string;
        last_name?: string;
        username?: string;
        language_code?: string;
      };
      themeParams?: {
        bg_color: string;
        text_color: string;
      };
    };
    themeParams: {
      bg_color: string;
      text_color: string;
    };
    // Add other properties as needed
  };
}

interface Window {
  Telegram: TelegramWebApp;
}
