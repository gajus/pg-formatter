import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

type FunctionCase = 'capitalize' | 'lowercase' | 'unchanged' | 'uppercase';
type KeywordCase = 'capitalize' | 'lowercase' | 'unchanged' | 'uppercase';

type UserConfigurationType = {
  readonly anonymize?: boolean;
  readonly commaBreak?: boolean;
  readonly functionCase?: FunctionCase;
  readonly keywordCase?: KeywordCase;
  readonly noRcFile?: boolean;
  readonly placeholder?: string;
  readonly spaces?: number;
  readonly stripComments?: boolean;
  readonly tabs?: boolean;
};

type ConfigurationType = {
  readonly anonymize: boolean;
  readonly commaBreak?: boolean;
  readonly functionCase: FunctionCase;
  readonly keywordCase: KeywordCase;
  readonly noRcFile: boolean;
  readonly placeholder?: string;
  readonly spaces: number;
  readonly stripComments: boolean;
  readonly tabs: boolean;
};

const executablePath = resolve(__dirname, 'pg-formatter/pg_format');

const defaultConfiguration = {
  anonymize: false,
  functionCase: 'unchanged' as FunctionCase,
  keywordCase: 'unchanged' as KeywordCase,
  noRcFile: false,
  spaces: 4,
  stripComments: false,
  tabs: false,
};

const createConfiguration = (
  userConfiguration: UserConfigurationType = defaultConfiguration,
): ConfigurationType => {
  return {
    ...defaultConfiguration,
    ...userConfiguration,
  };
};

const functionCaseOptionValueMap = {
  capitalize: 3,
  lowercase: 1,
  unchanged: 0,
  uppercase: 2,
};

const keywordCaseOptionValueMap = functionCaseOptionValueMap;

const createCommandLineArgs = (configuration: ConfigurationType) => {
  const args: Array<string[] | string> = [];

  if (configuration.anonymize) {
    args.push('--anonymize');
  }

  if (configuration.functionCase) {
    args.push([
      '--function-case',
      String(functionCaseOptionValueMap[configuration.functionCase]),
    ]);
  }

  if (configuration.keywordCase) {
    args.push([
      '--keyword-case',
      String(keywordCaseOptionValueMap[configuration.keywordCase]),
    ]);
  }

  if (configuration.noRcFile) {
    args.push('--no-rcfile');
  }

  if (configuration.placeholder) {
    args.push(['--placeholder', configuration.placeholder]);
  }

  if (configuration.spaces) {
    args.push(['--spaces', String(configuration.spaces)]);
  }

  if (configuration.stripComments) {
    args.push('--nocomment');
  }

  if (configuration.tabs) {
    args.push('--tabs');
  }

  if (configuration.commaBreak) {
    args.push('--comma-break');
  }

  return args;
};

export const format = (
  sql: string,
  userConfiguration?: UserConfigurationType,
): string => {
  const configuration = createConfiguration(userConfiguration);
  const args = createCommandLineArgs(configuration);

  const { error, output } = spawnSync(
    'perl',
    [executablePath, ...args.flat()],
    {
      encoding: 'utf8',
      input: sql,
    },
  );

  if (error) {
    throw error;
  }

  return output.join('');
};
