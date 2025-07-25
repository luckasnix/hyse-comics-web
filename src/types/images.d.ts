declare module "*.webp" {
  const src: string;
  const width: number;
  const height: number;
  export default { src, width, height };
}
