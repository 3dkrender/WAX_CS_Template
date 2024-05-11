// icon:no-copyright | Tabler Icons https://tablericons.com/ | Csaba Kissi
import * as React from "react";

function IconNoCopyright(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M21 12 A9 9 0 0 1 12 21 A9 9 0 0 1 3 12 A9 9 0 0 1 21 12 z" />
      <path d="M14 9.75a3.016 3.016 0 00-4.163.173 2.993 2.993 0 000 4.154A3.016 3.016 0 0014 14.25M6 6l1.5 1.5M16.5 16.5L18 18" />
    </svg>
  );
}

export default IconNoCopyright;
