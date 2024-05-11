import { useRouteError } from "react-router-dom";
import { Menu } from "../components/Menu/Menu";
import { useTranslation } from "react-i18next";

export default function ErrorPage() {
  const [t] = useTranslation();

  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Menu />
      <h1>{t('pages.error.title')}</h1>
      <p>{t('pages.error.message')}</p>
    </div>
  );
}