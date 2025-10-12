// TypeScript module declarations for JS libraries without types
declare module "wowjs";
declare module "nice-select2";
declare module "odometer";
declare module "jarallax";
declare module "bootstrap";
declare module "magnific-popup";

// CSS module declarations
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
