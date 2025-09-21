import PageBanner from "../../components/pageBanner";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";
import ClientVideos from "./client-component";
import "./style.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Videos(props: any) {
  const params = props?.params instanceof Promise ? await props.params : props?.params;
  const langParam = params?.locale ?? defaultLocale;
  const lang = (locales as string[]).includes(langParam) ? (langParam as Locale) : defaultLocale;
  const t = await getDictionary(lang);

  const videoData = [
    {
      id: "video-1",
      title: t.videos.video1.title,
      url: "https://www.youtube.com/watch?v=cqg2JsmfG88",
    },
    {
      id: "video-2",
      title: t.videos.video2.title,
      url: "https://www.youtube.com/watch?v=BhjeHJd942Q",
    },
    {
      id: "video-3",
      title: t.videos.video3.title,
      url: "https://www.youtube.com/watch?v=KrgsuXxSSQA",
    },
    {
      id: "video-4",
      title: t.videos.video4.title,
      url: "https://www.youtube.com/watch?v=Y1Dh8mGFelM",
    },
    {
      id: "video-5",
      title: t.videos.video5.title,
      url: "https://www.youtube.com/watch?v=Y97n1deO-nM",
    },
  ];

  return (
    <>
      <PageBanner bannerImage={"/assets/images/bg/media.jpg"} pageName={t.videos.banner.title} />

      <ClientVideos videoData={videoData} translations={t} />
    </>
  );
}
