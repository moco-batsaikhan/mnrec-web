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
    mission: string;
    visionTitle: string;
    visionText: string;
    introduction: string;
    heading: string;
    shortDescription: string;
    licenses: string[];
    counter1Title: string;
    counter2Title: string;
    counter3Title: string;
    counter4Title: string;
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
    openingHour: string;
    workingHours: string;
    mainOffices: string;
    location: string;
    viewLocation: string;
    writeMessage: string;
    fullAddress: string;
  };
  medee: {
    pageTitle: string;
    newsTitle: string;
    newsDescription: string;
  };
  medee2: {
    pageTitle: string;

    newsTitle: string;
    newsDescription: string;
  };
  medee3: {
    pageTitle: string;

    newsTitle: string;
    newsDescription: string;
    newsDescription1: string;
  };
  medee4: {
    pageTitle: string;

    newsTitle: string;
    newsTitle1: string;
    newsTitle2: string;
    newsDescription: string;
    newsDescription1: string;
    newsDescription2: string;
  };
  medee5: {
    pageTitle: string;

    newsTitle: string;
    newsDescription: string;
  };
  medee6: {
    pageTitle: string;
    newsTitle1: string;
    newsDescription11: string;
    newsDescription12: string;
    newsTitle2: string;
    newsDescription21: string;
    newsDescription22: string;
    newsTitle3: string;
    newsDescription31: string;
    newsDescription32: string;
    newsTitle4: string;
    newsDescription41: string;
    newsDescription42: string;
    newsTitle5: string;
    newsDescription51: string;
    newsDescription52: string;
    newsDescription53: string;
    newsDescription54: string;
    newsDescription55: string;
  };
  history: {
    pageTitle: string;
    title1: string;
    description1: string;
    title2: string;
    description2: string;
    title3: string;
    description3: string;
    title4: string;
    description4: string;
    title5: string;
    description5: string;
    title6: string;
    description6: string;
    title7: string;
    description7: string;
    title8: string;
    description8: string;
    title9: string;
    description9: string;
    title10: string;
    description10: string;
  };
  // sustainable: {
  //   pageTitle: string;
  //   newsTitle1: string;
  //   newsDescription11: string;
  //   newsDescription12: string;
  //   newsTitle2: string;
  //   newsDescription21: string;
  //   newsDescription22: string;
  //   newsTitle3: string;
  //   newsDescription31: string;
  //   newsDescription32: string;
  //   newsTitle4: string;
  //   newsDescription41: string;
  //   newsDescription42: string;
  //   newsTitle5: string;
  //   newsDescription51: string;
  //   newsDescription52: string;
  //   newsDescription53: string;
  //   newsDescription54: string;
  //   newsDescription55: string;
  // };
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
          mission: "ЭРХЭМ ЗОРИЛГО",
          visionTitle: "АЛСЫН ХАРАА",
          visionText:
            "Дэлхийн хүнд Газрын ховор элементийн найдвартай ханган нийлүүлэгч болж сэргээгдэх эрчим хүч, ногоон технологийн хөгжилд бодит хувь нэмэр оруулах.",
          introduction: `Монголиан Нэшнл Рийр Ийрт Корп ХХК (МНРИК) нь дотоодын 100% хөрөнгө оруулалттай үндэсний уул уурхайн компани юм. Ховд аймгийн Мянгад сумын нутагт орших газрын ховор элементийн “Халзан бүрэгтэй” төсөл дээр төвлөрөн ажиллаж байна.`,
          heading: "КОМПАНИЙН ТАНИЛЦУУЛГА",
          shortDescription:
            "МНРИК нь Мянгад сумын нутагт байрлах ашиглалтын тусгай зөвшөөрлүүдийг эзэмшдэг:",
          licenses: ["Ар хүрэн - MV-012335", "Халзан бүрэгтэй - MV-006911"],
          counter1Title: "Ашиглалтын тусгай зөвшөөрөл",
          counter2Title: "Хайгуулын тусгай зөвшөөрөл",
          counter3Title: "Нийт ажилчид",
          counter4Title: "Нэгдлийн компаниуд",
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
          openingHour: "Ажлын цаг",
          workingHours: "Даваа - Баасан 08.00 - 18.00",
          mainOffices: "Төв оффис",
          location: "Улаанбаатар хот, Сүхбаатар дүүрэг",
          viewLocation: "Газрын зургаар харах",
          writeMessage: "Та зурвасаа бичнэ үү",
          fullAddress:
            "Улаанбаатар хот, Сүхбаатар дүүрэг, 1 дүгээр хороо, Энхтайвны өргөн чөлөө-19, Худалдаа хөгжлийн банкны төв байр, 1301 тоот",
        },
        medee: {
          pageTitle: "ГХЭ гэж юу вэ?",
          newsTitle: "Газрын ховор элемент гэж юу вэ?",
          newsDescription:
            "Газрын ховор элемент буюу Rare earths elements (REEs) нь химийн үелэх систем дэх 57-71 (лантанидууд) атомын дугаартай элементүүд мөн сканди, иттриумийг багтаасан 17 элементийн бүлэг нэр юм. Эдгээр нь хэмжээний хувьд харилцан адилгүйгээр дэлхийн хурдас, чулуулагт тархсан байдаг. ГХЭ нь компьютерын хатуу диск, өнгөт зурагт, гар утасны дэлгэцээс эхлээд цахилгаан автомашин, сэргээгдэх эрчим хүчний эх үүсвэрийн мотор, сансрын төхөөрөмжийн эд анги, батлан хамгаалахын тоног төхөөрөмжүүдэд ордог хэрэглээний хувьд харилцан адилгүй өндөр технологийн түүхий эд юм. Өсөн нэмэгдэж буй сэргээгдэх эрчим хүчний хэрэглээ, дижитал шилжилт, сансрын салбарын хөгжлөөс улбаалан эдгээр элементийн хэрэглээний цар хүрээ жилээс жилд нэмэгдсээр байгаа бөгөөд XXI зууны хөгжлийн түүхий эд, витамин ч гэж нэрлэгдэж байна.",
        },
        medee2: {
          pageTitle: "ГХЭ хэрэглээ",
          newsTitle: "Газрын ховор элементийн хэрэглээ",
          newsDescription:
            "ГХЭ-ийг ногоон технологиуд, аж үйлдвэр, шилний үйлдвэрлэл, автомашины хийн ялгаруулалтын хяналтын систем, эрчим хүчний хадгалалт, эрчим хүчний хэмнэлттэй цахилгаан мотор, анагаах ухааны зэрэг олон салбарт хэрэглэж байна. \n ЧУХАЛ НЬ: Ялангуяа өдгөө өндөр технологид суурилсан аж үйлдвэрийн хөгжил дэлхий дахинаа эрчийг авч байгаа нь тус түүхий эдийн үнэ цэн, эрэлтийг улам нэмэгдүүлсээр байна.",
        },
        medee3: {
          pageTitle: "ГХЭ зах зээл",
          newsTitle: "ЗАХ ЗЭЭЛИЙН ЧИГ ХАНДЛАГА",
          newsDescription:
            "Дэлхийн дулаарлын эсрэг Парисын хэлэлцээрт нэгдсэн улс орнууд 2030 он хүртэл агаар дахь хүлэмжийн хийг бууруулахад чиглэсэн алхмуудыг эрчимтэй хийж байна. Энд уламжлалт түлш болох нүүрс, газрын тосноос хамаарсан эрчим хүчний эх үүсвэрээс татгалзан сэргээгдэх эрчим хүч рүү шилжих зайлшгүй шаардлага тулгараад буй. Дэлхий даяар өрнөж буй энэхүү хөдөлгөөнийг “Эрчим хүчний шилжилт” гэж түгээмлээр тодорхойлдог. Уг шилжилтийг хийхэд салхин сэнс, усан цахилгаан станц, нарны зайн хураагуур зэрэг сэргээгдэх эх үүсвэрийг хэрэглээнд яаралтай шилжүүлэх шаардлагатай байгаа. Сэргээгдэх эрчим хүчний цахилгаан эрчим хүч үйлдвэрлэлд эзлэх хувь 2050 он гэхэд 88% болж өсөх таамагтай ба үүнийг дагаад салхин сэнсний моторын түүхий эдүүдийн эрэлт ч нэмэгдэхээр байгааг Олон улсын эрчим хүчний агентлагийн сүүлд гаргасан судалгаа баримтууд баталж байна. ",
          newsDescription1:
            "Нөгөө талаас газрын тосны бүтээгдэхүүн байгалийн хийгээр, нүүрсхүчлийн хий ихээр ялгаруулдаг дотоод шаталтат хөдөлгүүртэй автомашин цэнэг хураагуурт суурилсан цахилгаан автомашин (EV) руу шилжих нь зайлшгүй болоод байна.  Ирэх жилүүдэд цахилгаан автомашины зах зээл тасралтгүй нэмэгдэж, борлуулалт нь 2030 он гэхэд 2021 оныхоос 9 дахин нэмэгдэж 4.7 саяд хүрэх MarketsandMarkets-н судалгаа байна. Улмаар EV-н борлуулалтын нийт автомашины борлуулалтад эзлэх хувь 2021 онд 4% хүрэхээргүй байсан бол 2030 он гэхэд бараг 30%-д хүрэх аж. Тэгвэл нийт ГХЭ-ийн эрэлт хэрэгцээ 2040 он гэхэд одоогийнхоос 4  дахин  өсөх  ба  зөвхөн  EV-с  л  хамаарч  ГХЭ-ийн  эрэлт  жил  бүр  3.7%-12.5%   нэмэгдэхээр байна. Эрэлт өндөртэй ГХЭ-ийн үнэ өсөж, зах  зээлийн  хэмжээ  нь  2028  он  гэхэд  2022  оныхоос 41% өсөж $4 тэрбумд хүрэх тооцоолол ч бий.",
        },
        medee4: {
          pageTitle: "Монголын ГХЭ",
          newsTitle: "Монголын ГХЭ ордууд",
          newsTitle1: "МОНГОЛЫН НӨӨЦ",
          newsTitle2: "МОНГОЛД ГАЗРЫН ХОВОР ЭЛЕМЕНТ ЯМАР БОЛОМЖ АВЧ ИРЭХ ВЭ?",
          newsDescription:
            "Монгол Улс нийт 3.1 сая тн ГХЭ нөөцтэй бөгөөд байршлын хувьд өмнөд болон баруун хэсэгт харьцангуй их хэмжээгээр хуримтлагдсан байдаг. Ордуудын судалгааны түвшин, ашиглалтад бэлтгэгдсэн байдал харилцан адилгүй ба олон улсын стандартаар нөөцийн тооцоо хийгдэж судлагдсан нь Хотгор болон Халзан бүрэгтэйн орд юм. Монгол Улс нийт 3.1 сая тн ГХЭ нөөцтэй бөгөөд байршлын хувьд өмнөд болон баруун хэсэгт харьцангуй их хэмжээгээр хуримтлагдсан байдаг. Ордуудын судалгааны түвшин, ашиглалтад бэлтгэгдсэн байдал харилцан адилгүй ба олон улсын стандартаар нөөцийн тооцоо хийгдэж судлагдсан нь Хотгор болон Халзан бүрэгтэйн орд юм. ",
          newsDescription1:
            "Улсын хэмжээнд нийт ГХЭ-ийн ислийн 3.1 сая тонны нөөц бүхий нийт 6 орд илрүүлээд байна. Энэхүү эрдсийн баялгаараа дэлхийд эхний 15-д ордог. Хэрэв бид олборлолтын үйл ажиллагааг эрчимжүүлбээс газрын ховрын экспортоос их хэмжээний орлого олж эдийн засгаа өсгөх боломжтой. Учир нь ГХЭ-ийн дэлхийн эрэлт хэрэгцээ их байгаа учир үүнийг даган ГШХО нэмэгдэх, татварын орлого өсөх, ажлын байр бий болох зэрэг олон боломж нээгдэнэ. Мөн эрдэс баялгийн экспортын нүүрс, зэсээс хэт хамааралтай байдлыг бууруулах боломжтой юм.   ",
          newsDescription2:
            "БОЛОМЖ: Дэлхийн ГХЭ олборлолт, боловсруулалт цөөн тооны улсад төвлөрсөн байгаа нь эрдэс баялгийн зах зээлд тэнцвэргүй байдлыг бий болгож, эрчим хүчний шилжилтэд эрсдэл үүсгээд буй. ГХЭ олборлолт, бүтээгдэхүүн гаргалтын төвлөрсөн байдлыг бууруулах марафонд АНУ, Австрали, ОХУ, Канад зэрэг хөгжингүй ба түүхий эдийн арвин нөөцтэй орнууд, уул уурхайн үндэстэн дамнасан том корпорацууд оролцож байгаа. Манай улсын хувьд эрдэс баялгийн нөөцдөө тулгуурлан энэхүү зах зээл дээр нэмүү өртөг шингээсэн бүтээгдэхүүн нийлүүлэгч болж, өөрийн гэсэн байр суурийг эзлэх, томоохон хэрэглэгчидтэй түншлэл үүсгэх, улмаар геополитикийн хувьд ч давуу байдал үүсгэх боломжтой байна.",
        },
        medee5: {
          pageTitle: "Геологи, ордын онцлог",
          newsTitle: "Халзан Бүрэгтэй орд",
          newsDescription:
            "Газрын ховор элементүүд (REE) нь өндөр технологийн үйлдвэрлэл болон дэлхийн ногоон эрчим хүчний шилжилтэд маш чухал үүрэгтэй. Монгол Улсад нийтдээ 6 орд, 80 илрэл, ойролцоогоор 300 эрдэсжилттэй цэг бүртгэгдсэн бөгөөд нийт 3.1 сая тонн газрын ховор элементийн ислийн (TREO) нөөцтэй гэж тооцогддог. Тэдгээрийн дундаас хамгийн том нь Халзан Бүрэгтэй орд бөгөөд Монгол Улсын нийт нөөцийн тал орчим хувийг агуулдаг төдийгүй дэлхийд диспрозиум (Dy), тербиум (Tb) зэрэг элементүүд бүхий хүнд газрын ховор элементийн (HREE) цөөн идэвхтэй эх үүсвэрүүдийн нэг болох боломжтой. Халзан Бүрэгтэй ордын газрын ховор элементийн эрдэсжилтийг анх 1984 онд Орос–Монголын хамтарсан судалгааны баг илрүүлсэн. Халзан Бүрэгтэй нь шүлтлэг гранитын төрлийн газрын ховор элементийн ордын төрөлд хамаардаг. Ордын баруун хэсгийг эрдэсжсэн нордмаркит, зүүн хэсгийг голчлон шүлтлэг гранит бүрдүүлдэг бөгөөд эдгээр хоёр геологийн нэгжийн зааг дээр байрлах, ойролцоогоор 500 м диаметртэй дугуй хэлбэрийн шүлтлэг гранитийн биетэд хамгийн хүчтэй хүдрийн эрдэсжилт илэрдэг. Нарийвчилсан хайгуулын үеэр хийсэн өрөмдлөгийн үр дүнгээр энэхүү шүлтлэг гранит нь газрын гадаргаас доош ойролцоогоор 200 м гүнд үргэлжилдэг болох нь тогтоогдсон. Хүдэржилт нь маш нарийн мөхлөгтэй, сарнисан газрын ховор элемент агуулсан эрдсүүдээс бүрдэх бөгөөд үндсэндээ бастнезит, синхизит түүнээс гадна циркон болон бусад циркон агуулсан силикат эрдсүүдэд агуулагдана. Хүдрийн эрдэсжилт нүдэнд ил тод харагдахгүй бөгөөд үндсэн хүдэр нь хөнгөн болон хүнд ховор газрын элементүүдийн (HREE, LREE) аль алиныг нь агуулдаг. Газрын ховор элементийн агуулга шүлтлэг гранит болон нордмаркит дотор өндөр байдаг ба агуулга болон HREE/LREE-ийн харьцаа нь шүлтлэг гранитын төвөөс гадагш болон доошлох тусам буурдаг. Судалгааны үр дүн болон лабораторийн дүн шинжилгээнд үндэслэн өндөр, дунд, бага агуулгатай бүсүүдийг ордын хэмжээнд ялгасан. Шүлтлэг гранит нь газрын ховор элементийн харьцангуй шинэ эх үүсвэр бөгөөд ихэвчлэн бага агуулгатай боловч их хэмжээний хүдрийн биет агуулдгаараа онцлог.",
        },
        medee6: {
          pageTitle: "Төслийн онцлох үзүүлэлтүүд",
          newsTitle1: "Дэлхийн түвшний нөөц",
          newsDescription11:
            "Халзан бүрэгтэй төсөл нь дэлхийд өрсөлдөхүйц хэмжээний хүнд газрын ховор элементийн нөөцтэй, өндөр Dysprosium (Dy) агуулгаараа онцлог. JORC болон NI 43-101 стандартын дагуу баталгаажсан нөөц нь урт хугацааны тогтвортой олборлолтыг хангах боломжтой бөгөөд Монгол Улсыг дэлхийн стратегийн нийлүүлэлтийн сүлжээнд хүчтэй байр суурь эзлэх үндэс суурийг бүрдүүлж байна.",
          newsDescription12: "",
          newsTitle2: "Өндөр чанар, баталгаатай эрэлт",
          newsDescription21:
            "Халзан Бүрэгтэй төслийн үндсэн зорилго нь өндөр цэвэршилттэй NdPr, DyTb зэрэг газрын ховор элементийн бүтээгдэхүүн үйлдвэрлэж, цахилгаан хөдөлгүүр, тогтмол соронз болон цэвэр технологийн өндөр эрэлттэй салбаруудад тогтвортой нийлүүлэх явдал юм.",
          newsDescription22: "",
          newsTitle3: "Эрсдэл багатай, үр ашигтай боловсруулалт",
          newsDescription31:
            "Соронзон ангилалт ба хөвүүлэн баяжуулалт зэрэг шалгарсан, энгийн бөгөөд найдвартай технологийг ашигласнаар тогтвортой, эрсдэл багатай, зардлын хувьд оновчтой үйлдвэрлэл хийх нөхцөлийг бүрдүүлж байна. 2025 онд хийгдсэн хагас үйлдвэрлэлийн түвшний туршилтаар уг технологийн схемийг амжилттай баталгаажуулж, HPGR бутлалт, шаталсан WHIMS соронзон ангилалт болон хөвүүлэн баяжуулалтын дамжлагаар 50 тонн чөмгөн дээжээс өндөр чанарын газрын ховор элементийн баяжмал гарган авч, цаашдын гүн боловсруулалтын туршилтад бэлтгэн нийлүүлсэн.",
          newsDescription32: "",
          newsTitle4: "Гүн боловсруулах үйлдвэр ба экспортын төрөлжилт",
          newsDescription41:
            "Зөвхөн газрын ховрын исэл агуулсан баяжмал үйлдвэрлэхээс гадна, нийлмэл газрын ховор исэл үйлдвэрлэх гүн боловсруулах үйлдвэр байгуулах боломжийг тодорхойлох судалгааны ажлыг хийж байна. Энэ нь нэмүү өртөг шингэсэн бүтээгдэхүүн бий болгож, Монгол Улсын экспортын бүтцийг төрөлжүүлэхийн зэрэгцээ олон улсын зах зээл дэх өрсөлдөх чадварыг нэмэгдүүлэх чухал ач холбогдолтой.",
          newsDescription42: "",
          newsTitle5: "Стратегийн ач холбогдол ба дэд бүтцийн дэмжлэг",
          newsDescription51:
            "Монгол Улсын Баруун бүсэд орших Халзан Бүрэгтэй төсөл нь бүс нутгийн хөгжил, улсын стратегийн зорилтуудад бодит хувь нэмэр оруулах томоохон хэмжээний төсөл юм.",
          newsDescription52:
            "Байршлын гол давуу талууд: AH4 олон улсын хурдны зам дагуу байрлаж, бүс нутгийн болон улсын хэмжээнд найдвартай тээвэр, логистикийн холболтыг хангана.",
          newsDescription53:
            "Ховд нисэх буудалд ойрхон байрлалтай тул дотоод болон олон улсын логистикийг хөнгөвчилж, төслийн хэрэгжилтэд нэмэлт дэмжлэг болно.",
          newsDescription54:
            "Уул уурхайгаас гадна төслийн хэрэгжилтийн явцад бүс нутгийн эдийн засгийн өсөлтийг дэмжих дагалдах үйлдвэр, тухайлбал урвалж бодисын хангамж болон холбогдох үйлчилгээний байгууламжууд бий болно.",
          newsDescription55:
            "Ингэснээр Халзан Бүрэгтэй төсөл нь зөвхөн уул уурхайн төсөл бус, харин Баруун бүсийн эдийн засаг, дэд бүтцийн хөгжлийг хурдасгах стратегийн ач холбогдолтой томоохон төсөл болж байна.",
        },
        history: {
          pageTitle: "Түүхэн замнал",
          title1: "1984",
          description1: "Орос-Монголын хамтарсан геологийн судалгааны экспедиц ордыг анх илрүүлэв",
          title2: "1987",
          description2: "Агаарын гамма- спектрометрийн судалгаа",
          title3: "1989",
          description3: "Гадаргын геохимийн дээжлэлтийн ажил",
          title4: "1990",
          description4: "Анхны эрэл- хайгуулын ажил",
          title5: "2012",
          description5: "Анхны өрөмдлөгийн ажил",
          title6: "2013",
          description6: "Ашигт малтмалын нөөц тогтоогдов",
          title7: "2018",
          description7:
            "Техник эдийн засгийн үнэлгээг эрдэс баялгийн мэргэжлийн зөвлөлөөр  батлуулав",
          title8: "2021",
          description8: "NI43-101 урьдчилсан эдийн засгийн үнэлгээ",
          title9: "2022",
          description9: "Баттай нөөцийг тогтоох нарийвчилсан хайгуулын ажил эхлэв",
          title10: "2024",
          description10: "Олон улсын стандартад нийцсэн Урьдчилсан техник эдийн засгийн үнэлгээ",
        },
        footer: {
          copyRight: " МНГХЭК",
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
          mission: "MISSION",
          visionTitle: "VISION",
          visionText:
            "To become a strategic global supplier of the heavy REE, Dy-Tb plus Nd, Pr to contribute global energy transition.",
          team: `MANAGEMENT TEAM`,
          introduction: `Mongolian National Rare Earth Corp LLC (“MNREC”) is a national mining company with 100% Mongolian national investment. Since our establishment in 2010, we have been engaged in the fields of geological exploration and mining investment. Currently, our primary focus lies on the Khalzan Bburegtei REE project located in the Myangad soum, Khovd aimag, Mongolia.`,
          heading: "Who We Are",
          shortDescription: "MNREC’s holds the following adjacent mining tenures:",
          licenses: ["MV-012335- Ar khuren", "MV-006911- Khalzan Buregtei"],
          counter1Title: "Mining licences",
          counter2Title: "Exploration licences",
          counter3Title: "Total staff",
          counter4Title: "Subsidiaries",
          manager1: "Chimeddorj Munkhjargal",
          jobPosition1: "Project deputy director",
          manager2: "Chuluunbatar Odgerel",
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
          openingHour: "Opening Hour",
          workingHours: "Mon - Fri 08.00 - 18.00",
          mainOffices: "Main Offices",
          location: "Sukhbaatar District, Ulaanbaatar, Mongolia",
          viewLocation: "View Location",
          writeMessage: "Write Your Message",
          fullAddress:
            "Trade and Development Bank Headquarters, Peace Avenue-19, 1st Khoroo, Sukhbaatar District, Ulaanbaatar, Mongolia",
        },
        medee: {
          pageTitle: "What is REE?",
          newsTitle: "What are rare earth elements?",
          newsDescription:
            "Rare Earth Elements (REEs) constitute a group of 17 elements within the periodic table encompassing elements with atomic numbers 57 to 71 (lanthanides), along with scandium and yttrium. These elements are present in various amounts within the earth’s crust and soil. Recently, demand for REEs started to grow as they serve as crucial high-tech raw materials with diverse applications. They are integral components in computer hard drives, color televisions, mobile phone screens, offshore wind turbine, electric vehicle battery, aerospace equipment, and defense systems. As the space industry expands, digital transformation accelerates, and renewable energy adoption grows, REEs play a vital role, often likened to indispensable elements and raw materials for 21st-century development. Rare earth elements (REEs) with high magnetic properties and limited global resource include elements such as Dysprosium (Dy), Terbium (Tb), Neodymium (Nd), and Praseodymium (Pr).",
        },
        medee2: {
          pageTitle: "REE Uses",
          newsTitle: "Applications of rare earth elements",
          newsDescription:
            "Rare Earth Elements (REEs) is used in green technologies, industry, glass production, automotive emission control systems, energy storage, energy-efficient electric motors, and a variety of medical technologies. \n IMPORTANT: Especially now, the development of high-tech industries is gaining momentum worldwide, which is further increasing the value and demand for this raw material.",
        },
        medee3: {
          pageTitle: "REE Market",
          newsTitle: "Market Trends",
          newsDescription:
            "Paris Agreement signed countries are committed to work towards global warming and are actively implementing measures to reduce greenhouse gas emissions by 2030. The imperative to shift away from conventional energy sources like oil and coal is inclining the need of renewable energy, “The Energy Transition”. The actions are urgent, hence shaking the commodity market of raw materials sources in the renewable energy technologies and EVs.",
          newsDescription1:
            "To facilitate this transition, a rapid adoption of massive sources of renewable energy is needed which are offshore and onshore wind turbines, hydropower facilities, and solar panels among others. Recent assessments of International Energy Agency indicate that renewable energy’s share in power production is expected to reach 88% by 2050. This surge in renewable energy adoption will drive demand for raw materials used in wind turbine exponentially. Simultaneously, the transition to electric vehicles (EVs) is undeniable. EVs as alternatives to the internal combustion engines are gaining prominence. According to a MarketsandMarkets report, the EV industry is poised for substantial growth with sales projected to increase ninefold by 2030 reaching 4.7 million units compared to 2021. By 2030, EVs are expected to constitute almost 30% of total car sales, a significant leap from the 4% observed in 2021. Overall, the demand for electric vehicles is projected to quadruple by 2040 with an annual growth rate ranging from 3.7% to 12.5%.",
        },
        medee4: {
          pageTitle: "Mongolia REE",
          newsTitle: "Rare earth element deposits in Mongolia",
          newsTitle1: "What opportunities will Rare Earth Elements bring to Mongolia?",
          newsTitle2: "Mongolian reserve ",
          newsDescription:
            "Mongolia possesses a substantial resource of Rare Earth Elements (REE), totaling 3.1 million tons with elevated concentrations primarily found in the southern and western regions of the country. The level of exploration stage vary within these deposits, however, both Khotgor and Kalzan Buregtei deposits stand out as the most extensively studied in adherence to international standards.",
          newsDescription1:
            "Opportunity: The global landscape of  ore element extraction is characterized by concentration in a select number of countries which creating an imbalance in the mineral commodity, therefore, presenting challenges to the energy transition. Prominent countries such as the United States, Australia, Russia, and Canada along with major international mining countries are actively pursuing to the element extraction technologies now with fully adopted mining and processing technologies. Leveraging our mineral endowment Mongolia has the potential to emerge as a supplier of value-added products within this market and establish a distinctive position while fostering relationships with key consumers. This could even potentially obtain a geopolitical advantage to an extent. ",
          newsDescription2:
            "Mongolia boasts abundant Rare Earth Elements (REEs), with six deposits totaling 3.1 million tons of REE oxide resource, positioning the country among the top 15 nations globally in terms of Rare Earth Element geological resource. Existing potential to improve the economy through rare earth mining is possible now with successfully attracted private sector investment. Given the escalating global demand for REEs, the increased mining endeavors hold a promise of bolstering Mongolian economy through heightened foreign and national direct investment, augmented tax revenue, and the creation of employment opportunities and skills improved. Moreover, this presents an avenue to mitigate our excessive dependence on coal and copper mining with third color in the mix. Mongolia is gaining a recognition for the above rare element resources through actions of both Government and private sector investors. The ore type of Mongolia is challenging compared to some deposits, primarily associated with enormous bodies of alkaline intrusives and carbonatites .",
        },
        medee5: {
          pageTitle: "Geology and deposit characteristics",
          newsTitle: "Khalzan Buregtei deposit",
          newsDescription:
            "Rare earth element plays a crucial role in high-tech manufacturing and the global green energy transition. In Mongolia, six deposits, 80 occurrences, and approximately 300 mineralized localities have been identified, with an estimated total resource of 3.1 Mt of total rare earth oxide (TREO). The Khalzan Buregtei is the largest deposit, containing nearly half of the country’s total resource, and has the potential to become one of the world’s few active sources of heavy rare earth elements, including dysprosium (Dy) and terbium (Tb). The REE mineralization potential of the Khalzan Buregtei area was first recognized by a Russian–Mongolian joint expedition during early reconnaissance in 1984. Khalzan Buregtei is classified as a peralkaline REE deposit. The western half of the deposit is underlain by mineralized nordmarkite, whereas the eastern half is underlain by peralkaline granite. A ~500 m diameter circular body of peralkaline granite, hosting the strongest mineralization, is situated at the contact between these two units. Drilling conducted during advanced exploration has shown that the peralkaline granite generally extends to a depth of about 200 m below the surface. The mineralization consists of very fine-grained, disseminated REE-bearing minerals, primarily bastnaesite and synchysite, with additional REE associated with zircon and other Zr-bearing silicate minerals. The mineralization is not visually obvious and contains both light rare earth elements (LREEs) and heavy rare earth elements (HREEs). REE concentrations are strongly elevated within the peralkaline granite and nordmarkite, with both absolute values and the HREE/LREE ratio decreasing downward and outward from the center of the peralkaline granite into the surrounding nordmarkite. Nominal high-, medium-, and low-grade zones have been defined based on overall analytical result patterns. The peralkaline granite is a relatively new source of REEs, typically characterized by low-grade mineralization but very large ore volumes. ",
        },
        medee6: {
          pageTitle: "Project Highlights",
          newsTitle1: "World-Class Resource Base",
          newsDescription11:
            "The Khalzan Buregtei Project hosts a world-class heavy rare earth element resource, uniquely distinguished by its high Dysprosium (Dy) content. With JORC and NI 43-101 compliant reserves, the project ensures long-term sustainable development and positions Mongolia as a strong player in the global strategic supply chain.",
          newsDescription12: "",
          newsTitle2: "High purity products with strong market demand",
          newsDescription21:
            "The Khalzan Buregtei Project aims to produce high-purity rare earth products, particularly NdPr and DyTb, to supply rapidly growing sectors such as electric motors, permanent magnets, and clean technologies.",
          newsDescription22: "",
          newsTitle3: "Low-risk, Cost-efficient Processing",
          newsDescription31:
            "The project applies simple and reliable processing technologies—primarily magnetic separation and flotation—ensuring low-cost and low-risk operations. Pilot-scale trials conducted in 2025 successfully validated the proposed flowsheet, comprising HPGR crushing, staged WHIMS magnetic separation, and flotation. From a 50-tonne bulk sample, a high-quality rare earth concentrate was produced for further downstream processing.",
          newsDescription32: "",
          newsTitle4: "Downstream Processing & Diversified Exports",
          newsDescription41:
            "In addition to concentrate production, studies are being conducted to assess the potential for establishing a downstream facility to produce mixed rare earth oxides. This will enable the creation of higher value-added products, diversify Mongolia’s export portfolio, and strengthen the country’s position in the global market.",
          newsDescription42: "",
          newsTitle5: "Strategic Impact & Infrastructure Support",
          newsDescription51:
            "Located in Western Mongolia, the Khalzan Buregtei Project is a large-scale development with the potential to make a significant contribution to regional growth and national strategic priorities.",
          newsDescription52:
            "Key locational advantages include: Direct access to the AH4 international highway, ensuring reliable regional and national transport and logistics connectivity. ",
          newsDescription53:
            "Proximity to Khovd Airport, facilitating both domestic and international logistics to support project development.",
          newsDescription54:
            "Beyond mining, the project will stimulate local economic growth through the establishment of associated industrial facilities, including reagent supply plants and related services.",
          newsDescription55:
            "Together, these factors position the Khalzan Buregtei Project not only as a mining development, but also as a catalyst for economic and infrastructure advancement across Western Mongolia.",
        },
        history: {
          pageTitle: "Historical Milestones",
          title1: "1984",
          description1:
            "The occurrence of the ore was determined through a geological research expedition conducted by a joint venture between Russia and Mongolia.",
          title2: "1987",
          description2: "Study of Air-borne Gamma Ray Spectrometry",
          title3: "1989",
          description3: "First soil sampling campaign",
          title4: "1990",
          description4: "First reconnaissance campaign",
          title5: "2012",
          description5: "First drill campaign",
          title6: "2013",
          description6: "Positive resource estimate published",
          title7: "2018",
          description7: "The feasibility study was approved by the Minerals Professional Counci",
          title8: "2021",
          description8: "NI43101 Prelimibnary Economic Assessment (PEA) completed",
          title9: "2022",
          description9: "Commencement of detailed exploration work to determine proven reserves ",
          title10: "2024",
          description10: "International Feasibility Study to be concluded",
        },
        footer: {
          copyRight: " MNREC",
        },
      };
  }
}
