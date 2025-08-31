import type { Dictionary, Locale } from "./types";

export const locales: Locale[] = ["en", "mn"];

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
      };
  }
}
