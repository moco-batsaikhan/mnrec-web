export type Locale = "en" | "mn";

export const locales: Locale[] = ["en", "mn"];
export const defaultLocale: Locale = "mn";

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
  about: {
    aboutUs: string;
    visionTitle: string;
    visionText: string;
    team: string;
    manager1: string;
    manager2: string;
    jobPosition1: string;
    jobPosition2: string;
    managerDesc1: string;
    managerDesc2: string;
  };
  contact: {
    contactUs: string;
    address: string;
    email: string;
    phone: string;
    feedback: string;
    name: string;
    yourEmail: string;
    subject: string;
    message: string;
    submit: string;
  };
  history: {
    title: string;
    description: string;
  };
  footer: {
    copyRight: string;
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
        about: {
          aboutUs: "Бидний тухай",
          visionTitle: "АЛСЫН ХАРАА",
          visionText:
            "Дэлхийн хүнд Газрын ховор элементийн найдвартай ханган нийлүүлэгч болж сэргээгдэх эрчим хүч, ногоон технологийн хөгжилд бодит хувь нэмэр оруулах.",
          team: `МЕНЕЖМЕНТИЙН БАГ`,
          manager1: "Ч.МӨНХЖАРГАЛ",
          jobPosition1: "ТӨСӨЛ ХАРИУЦСАН ДЭД ЗАХИРАЛ",
          manager2: "Ч.ОДГЭРЭЛ",
          jobPosition2: "БИЗНЕС ХӨГЖЛИЙН МЕНЕЖЕР",
          managerDesc1: `Ч.Мөнхжаргал нь уул уурхай, ашигт малтмал боловсруулалтын салбарын олон төсөл дээр 20 орчим жил ажиллаж буй туршлагатай, өндөр ур чадвартай мэргэжилтэн юм.
              Истанбулын Техникийн их сургуульд Ашигт малтмалын баяжуулалтын чиглэлээр бакалавр, магистрын зэрэг хамгаалж, СЭЗИС-ийн MBA зэрэг хамгаалсан тэрбээр ажлын гараагаа Ухаа худгийн нүүрсний уурхайн (UHG) төслөөс эхлүүлж байв.
              Монголын анхны 15 сая тонн коксжих нүүрсний үйлдвэрийг ашиглалтад оруулах багийн үйл ажиллагааг жигдрүүлэхэд голлох үүрэг гүйцэтгэсэн түүний хувьд мөн Монгол-Германы хамтарсан ашигт малтмал, технологийн их сургуульд (GMIT) 4 жил багшилж, залуу инженерүүдийг бэлтгэхэд үнэтэй хувь нэмэр оруулсан туршлагатай. Боловсролын салбарт богино хугацаанд ажилласныхаа дараа тэрбээр төмрийн хүдрийн төслүүд, тэр дундаа гангийн үйлдвэрлэлийн техникийн олон талт байдлыг судлах, төмрийн хүдэр боловсруулах, үрлэн бүтээгдэхүүний үйлдвэрлэлд төвлөрч, уул уурхайн салбартаа эргэн ажиллаж эхэлсэн.
              Өдгөө тэрбээр газрын ховор элементийн Халзан бүрэгтэй ордын техникийн судалгаанаас эхлээд төслийг ашиглалтад бэлтгэх бүхий л үе шатанд хяналт тавин ажиллаж байна.
              `,
          managerDesc2: `Одгэрэл нь стратеги болон санхүүгийн удирдлагын чиглэлээр 15 гаруй жилийн туршлага хуримтлуулсан, олон улсын түвшинд мэргэшсэн мэргэжилтэн юм. Тэрээр Австралийн Torrens их сургууль-д суралцан Бизнесийн удирдлагын магистр (MBA) болон Дэлхийн төслийн удирдлагын магистр зэрэг хамгаалсан бөгөөд CPA Australia болон CPA Mongolia-ийн гишүүн юм.
              Одоогоор тэрээр МНРИК-ийн Бизнес хөгжлийн менежер албыг хашиж, компанийн өсөлтийн зорилготой уялдсан стратегийн санаачилгуудыг амжилттай хэрэгжүүлэхийн тулд өөрийн мэдлэг, туршлагаа ашиглан манлайлан ажиллаж байна.
              МНРИК-д ажиллахаасаа өмнө Одгэрэл Австралийн Мельбурн хотод үйл ажиллагаа явуулдаг нэр хүндтэй бизнесийн зөвлөх компанид ес гаруй жил ажиллаж, олон төрлийн төсөл, багцыг амжилттай удирдсан билээ.
              `,
        },
        contact: {
          contactUs: "Холбоо барих",
          address: "Хаяг",
          email: "И-мэйл",
          phone: "Утас",
          feedback: "Санал хүсэлт",
          name: "Таны нэр",
          yourEmail: "Таны и-мэйл",
          subject: "Сэдэв",
          message: "Зурвас",
          submit: "Илгээх",
        },
        history: {
          title: "ТӨРИЙН ӨМЧИТ КОМПАНИ",
          description:
            "Монголын Үндэсний Газрын Ховор Элемент Корпораци ХХК (МНГХЭК) нь 100% Монголын төрийн өмчит компани бөгөөд 2010 онд байгуулагдсан. Бид геологи, хайгуул, уул уурхайн чиглэлээр үйл ажиллагаа явуулдаг бөгөөд одоогоор Ховд аймгийн Мянгад суманд орших газрын ховор элементийн “Халзан бүрэгтэй” төсөл дээр төвлөрөн ажиллаж байна. Манай компани нь тус ордын ашиглалтын тусгай зөвшөөрлийг эзэмшдэг бөгөөд 2012 оноос хойш олон улсын техникийн болон байгаль орчны стандарт, үндэсний зохицуулалтын дагуу ордын урьдчилсан хайгуулын ажлыг гүйцэтгэж байна. Бид NI43-101 болон түүнтэй холбоотой зааварчилгааг баримталдаг бөгөөд бүх лабораторийн шинжилгээг ISO, ASTM стандартад нийцүүлэн хийдэг. Мөн бид ажлын байран дахь эрүүл мэнд, аюулгүй байдлын олон улсын шилдэг туршлагыг чанд мөрдөж, хариуцлагатай, тогтвортой төслийн хөгжлийг хангадаг.",
        },
        footer: {
          copyRight: "© 2025 MNREC. All rights reserved.",
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
        about: {
          aboutUs: "About Us",
          visionTitle: "VISION",
          visionText:
            "To become a strategic global supplier of the heavy REE, Dy-Tb plus Nd, Pr to contribute global energy transition.",
          team: `MANAGEMENT TEAM`,
          manager1: "Chimeddorj Munkhjargal",
          jobPosition1: "Project deputy director",
          manager2: "Chimeddorj Munkhjargal",
          jobPosition2: "Business development manager",
          managerDesc1: `Mrs. Munkhjargal is a mineral processing engineer with over 15 years of experience working in minerals industry. Prior to joining the project, she was responsible for various raw material projects from initiation to operation phases. She holds a master’s degree in Coal and Mineral Processing Engineering from Istanbul Technical University (ITU)`,
          managerDesc2: `Mrs. Odgerel has a rich background in strategy and financial management with over 15 years of experience in diverse industries. She holds an MBA and a Master of Global Project Management degree from Torrens University Australia, and a member of CPA Australia as well as CPA Mongolia. Currently serving as the Business Development Manager at MNREC, she leveraged her expertise to drive strategic initiatives that align with the company's growth objectives. Prior to joining MNREC, Mrs. Odgerel spent over nine years at a prominent business consulting firm in Melbourne, Australia where she managed various portfolios.`,
        },
        contact: {
          contactUs: "Contact Us",
          address: "Address",
          email: "Email",
          phone: "Phone",
          feedback: "Feedback",
          name: "Your Name",
          yourEmail: "Your Email",
          subject: "Subject",
          message: "Message",
          submit: "Submit",
        },
        history: {
          title: "STATE-OWNED ENTERPRISE",
          description:
            "Mongolian National Rare Earth Corporation LLC (MNREC) is a 100% state-owned enterprise established in 2010. We are engaged in the fields of geological exploration and mining investment, currently focusing on the Khalzan Buregtei rare earth element project located in Myangad soum, Khovd aimag. Our company holds the mining license for the deposit and has been conducting preliminary exploration work on the deposit since 2012 in accordance with international technical and environmental standards and national regulations. We adhere to NI43-101 and its associated guidelines, and all laboratory analyses are conducted in compliance with ISO and ASTM standards. Additionally, we strictly follow international best practices for occupational health and safety to ensure responsible and sustainable project development.",
        },
        footer: {
          copyRight: "© 2025 MNREC. All rights reserved.",
        },
      };
  }
}
