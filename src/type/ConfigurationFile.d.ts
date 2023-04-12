import * as yaml from 'js-yaml';

interface IConfig {
  config: Record<string, any>;
  lang: Record<string, any>;
}

const config: IConfig = {
  config: yaml.load(fs.readFileSync('config.yml', 'utf8')),
  lang: require(`../lang/${this.getConfig().config.lang}.json`),
};
