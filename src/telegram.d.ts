interface TelegramWebApp {
  WebApp: {
    ready: () => void;
    expand: () => void;
    close: () => void;
    sendData: (data: string) => void;
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
    MainButton: {
      text: string;
      color: string;
      textColor: string;
      isVisible: boolean;
      isActive: boolean;
      setText: (text: string) => void;
      onClick: (callback: () => void) => void;
      show: () => void;
      hide: () => void;
      enable: () => void;
      disable: () => void;
    };
    // Add other properties as needed
  };
}

interface Window {
  Telegram: TelegramWebApp;
}
