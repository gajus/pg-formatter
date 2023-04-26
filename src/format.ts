import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import { quote } from 'shell-quote';

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

const createCommandLineArgs = (configuration: ConfigurationType): string => {
  const args: string[] = [];

  if (configuration.anonymize) {
    args.push('--anonymize');
  }

  if (configuration.functionCase) {
    args.push(
      '--function-case ' +
        functionCaseOptionValueMap[configuration.functionCase],
    );
  }

  if (configuration.keywordCase) {
    args.push(
      '--keyword-case ' + keywordCaseOptionValueMap[configuration.keywordCase],
    );
  }

  if (configuration.noRcFile) {
    args.push('--no-rcfile');
  }

  if (configuration.placeholder) {
    args.push('--placeholder ' + quote([configuration.placeholder]));
  }

  if (configuration.spaces) {
    args.push('--spaces ' + configuration.spaces);
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

  return args.join(' ');
};

export const format = (
  sql: string,
  userConfiguration?: UserConfigurationType,
) => {
  const configuration = createConfiguration(userConfiguration);
  const args = createCommandLineArgs(configuration);

  const result = execSync('perl ' + executablePath + ' ' + args, {
    encoding: 'utf8',
    input: sql,
  });

  return result;
};
