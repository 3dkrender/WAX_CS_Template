import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import IconTwitterLogo from "./Icons/IconTwitterLogo";
import IconInstagram from "./Icons/IconInstagram";
import IconLinkedin from "./Icons/IconLinkedin";
import packageJson from "../../../package.json";
import IconNoCopyright from "./Icons/IconNoCopyright";

/**
 * Footer component
 */
function Footer() {
  const [t] = useTranslation();
  const version = packageJson.version;
  return (
    <footer className="footer bg-gray-800 text-white">
      <div className="max-w-7xl m-auto grid grid-cols-1 md:grid-cols-3 gap-4 p-6">

        <div>
          <h3 className="font-bold mb-2">{t('footer.aboutUs')}</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia odio vitae vestibulum. Donec malesuada sapien ante, at vehicula orci tempor molestie.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-2">{t('footer.quickLinks')}</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-400">{t('route.home')}</a></li>
            <li>
              <Link to="/about" className="hover:text-gray-400">{t('route.about')}</Link>
            </li>
            <li><a href="/contact" className="hover:text-gray-400">{t('route.contact')}</a></li>
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-bold mb-2">{t('footer.followUs')}</h3>
          <ul className="flex flex-col items-center space-y-4">
            <li><a href="#" className="hover:text-gray-400 flex items-center gap-1"><IconTwitterLogo /> X (Twitter)</a></li>
            <li><a href="#" className="hover:text-gray-400 flex items-center gap-1"><IconInstagram /> Instagram</a></li>
            <li><a href="#" className="hover:text-gray-400 flex items-center gap-1"><IconLinkedin /> Linkedin</a></li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center text-center mt-4 bg-slate-900 p-4">
        <div className="mr-2"> 
          <IconNoCopyright />
        </div>
        <p>{`${(new Date()).getFullYear()} ${t("footer.mitLicense")} (Version: ${version})`}</p>
      </div>
    </footer>
  );
}

export default Footer;
