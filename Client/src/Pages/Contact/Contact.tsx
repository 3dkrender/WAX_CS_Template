import { useTranslation } from "react-i18next";

export const Contact = () => {
  const [t] = useTranslation();

  return (
    <div>
      <div className="m-4 font-bold">{t("pages.contact.title")}</div>
      <p>{t("pages.contact.message")}</p>
      </div>
  )
};