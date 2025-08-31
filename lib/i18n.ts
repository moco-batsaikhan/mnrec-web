export type Locale = "en" | "mn";

export const locales: Locale[] = ["en", "mn"];
export const defaultLocale: Locale = "en";

export type Dictionary = {
  home: {
    edit: string;
    save: string;
  };
  cta: {
    deploy: string;
    docs: string;
  };
  links: {
    learn: string;
    examples: string;
    next: string;
  };
  menu: {
    about: string;
    about_intro: string;
    about_vision: string;
    about_team: string;
    kb_project: string;
    kb_overview: string;
    kb_history: string;
    kb_highlight: string;
    kb_geology: string;
    kb_achievements: string;
    rare_earth: string;
    ree_what: string;
    ree_uses: string;
    ree_market: string;
    ree_mongolia: string;
    sustainability: string;
    community: string;
    environment: string;
    social: string;
    development_fund: string;
    news_media: string;
    latest_news: string;
    video: string;
    gallery: string;
    report: string;
    contact: string;
    address: string;
    email_phone: string;
    feedback: string;
  };
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "mn":
      return {
        home: {
          edit: "Засварлах файл:",
          save: "Хадгалаад өөрчлөлтийг шууд харна.",
        },
        cta: {
          deploy: "Шууд байршуул",
          docs: "Баримт унших",
        },
        links: {
          learn: "Сурах",
          examples: "Жишээнүүд",
          next: "nextjs.org руу очих →",
        },
        menu: {
          about: "Бидний тухай",
          about_intro: "Танилцуулга",
          about_vision: "Алсын хараа, эрхэм зорилго",
          about_team: "Удирдлагын баг",
          kb_project: "ХБ төсөл",
          kb_overview: "Халзан бүрэгтэй төсөл",
          kb_history: "Төслийн түүх",
          kb_highlight: "Төслийн онцлох үзүүлэлтүүд",
          kb_geology: "Геологи, ордын онцлог",
          kb_achievements: "Хийгдсэн ажлууд",
          rare_earth: "Газрын ховор элемент",
          ree_what: "ГХЭ гэж юу вэ",
          ree_uses: "ГХЭ хэрэглээ",
          ree_market: "Зах зээл",
          ree_mongolia: "Монголын ГХЭ",
          sustainability: "Тогтвортой хөгжил",
          community: "Орон нутаг",
          environment: "Байгаль орчин",
          social: "Нийгмийн хариуцлага",
          development_fund: "Халзан бүрэгтэй хөгжлийн сан",
          news_media: "Мэдээ & Mедиа",
          latest_news: "Сүүлийн үеийн мэдээ",
          video: "Видео",
          gallery: "Зургийн сан",
          report: "Тайлан",
          contact: "Холбоо барих",
          address: "Хаяг, байршил",
          email_phone: "И-мэйл, утас",
          feedback: "Онлайн санал хүсэлт",
        },
      };
    case "en":
    default:
      return {
        home: {
          edit: "Get started by editing",
          save: "Save and see your changes instantly.",
        },
        cta: {
          deploy: "Deploy now",
          docs: "Read our docs",
        },
        links: {
          learn: "Learn",
          examples: "Examples",
          next: "Go to nextjs.org →",
        },
        menu: {
          about: "About",
          about_intro: "Introduction",
          about_vision: "Vision & Mission",
          about_team: "Leadership Team",
          kb_project: "KB Project",
          kb_overview: "Khalzan Buregtei Project",
          kb_history: "Project History",
          kb_highlight: "Project Highlights",
          kb_geology: "Geology & Deposit",
          kb_achievements: "Completed Works",
          rare_earth: "Rare Earth Elements",
          ree_what: "What is REE",
          ree_uses: "REE Uses",
          ree_market: "Market",
          ree_mongolia: "REE in Mongolia",
          sustainability: "Sustainability",
          community: "Community",
          environment: "Environment",
          social: "Social Responsibility",
          development_fund: "Khalzan Buregtei Development Fund",
          news_media: "News & Media",
          latest_news: "Latest News",
          video: "Video",
          gallery: "Gallery",
          report: "Reports",
          contact: "Contact",
          address: "Address",
          email_phone: "Email & Phone",
          feedback: "Online Feedback",
        },
      };
  }
}
