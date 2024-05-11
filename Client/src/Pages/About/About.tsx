import { useTranslation } from "react-i18next";

export const About = () => {
  const [t] = useTranslation();
  return (
    <div>
      <div className="m-4 font-bold">{t("pages.about.title")}</div>
      <p>{t("pages.about.message")}</p>
    </div>
  )
};