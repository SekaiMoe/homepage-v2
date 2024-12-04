declare module "js-yaml" {
  const yaml: any;
  export default yaml;
}

interface Config {
  background: string;
  avatar: string;
  name: string;
  bio: string;
  buttonColor: string;
  workLinks: Array<{ icon: string; name: string; url: string }>;
  funLinks: Array<{ icon: string; name: string; url: string }>;
}

