import PageBanner from "../../components/pageBanner";
import ModernVideoPlayer from "../../components/ModernVideoPlayer";
import { getDictionary, locales, defaultLocale, type Locale } from "@/lib/i18n";

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
      <PageBanner pageName={t.videos.banner.title} />

      {/* VIDEOS AREA START */}
      <section className="video-area pt-120 pb-90">
        <div className="container">
          {/* <div className="row">
            <div className="col-12">
              <div className="section-title text-center mb-50">
                <h2 className="title">{t.videos.section.title}</h2>
                <p className="description">{t.videos.section.description}</p>
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="col-12">
              <ModernVideoPlayer videos={videoData} />
            </div>
          </div>
        </div>
      </section>
      {/* VIDEOS AREA END */}
    </>
  );
}
