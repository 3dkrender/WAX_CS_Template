/**
 * @file TRoutes.ts
 * @desc: Type for the routes
 */
export type TRoutes = {
  path: string;         // Path to the page
  title: string;        // Title of the page
  component: any;       // Component to render
  isPrivate: boolean;   // Is the page private (authentication needed)?
  exact?: boolean;      // Is the path exact?
  showInMenu?: boolean; // Show the page in the menu?
}[];