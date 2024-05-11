// icon:instagram | CSS Icons https://css.gg/ | Astrit
import * as React from "react";

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 7a5 5 0 100 10 5 5 0 000-10zm-3 5a3 3 0 106 0 3 3 0 00-6 0z"
        clipRule="evenodd"
      />
      <path fill="currentColor" d="M18 5a1 1 0 100 2 1 1 0 000-2z" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5 1a4 4 0 00-4 4v14a4 4 0 004 4h14a4 4 0 004-4V5a4 4 0 00-4-4H5zm14 2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default IconInstagram;
