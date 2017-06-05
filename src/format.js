// @flow

import {
  execSync
} from 'child_process';
import {
  resolve
} from 'path';

const executablePath = resolve(__dirname, 'pg-formatter/pg_format');

type UserConfigurationType = {
  +anonymize?: boolean,
  +functionCase?: 'unchanged' | 'lowercase' | 'uppercase' | 'capitalize',
  +keywordCase?: 'unchanged' | 'lowercase' | 'uppercase' | 'capitalize',
  +spaces?: number,
  +stripComments?: boolean
};

type ConfigurationType = {
  +anonymize: boolean,
  +functionCase: 'unchanged' | 'lowercase' | 'uppercase' | 'capitalize',
  +keywordCase: 'unchanged' | 'lowercase' | 'uppercase' | 'capitalize',
  +spaces: number,
  +stripComments: boolean
};

const createConfiguration = (userConfiguration: UserConfigurationType = {}): ConfigurationType => {
  return {
    anonymize: false,
    functionCase: 'unchanged',
    keywordCase: 'unchanged',
    spaces: 4,
    stripComments: false,
    ...userConfiguration
  };
};

const functionCaseOptionValueMap = {
  capitalize: 3,
  lowercase: 1,
  unchanged: 0,
  uppercase: 2
};

const keywordCaseOptionValueMap = functionCaseOptionValueMap;

const createCommandLineArgs = (configuration: ConfigurationType): string => {
  const args = [];

  if (configuration.anonymize) {
    args.push('--anonymize');
  }

  if (configuration.functionCase) {
    args.push('--function-case ' + functionCaseOptionValueMap[configuration.functionCase]);
  }

  if (configuration.keywordCase) {
    args.push('--keyword-case ' + keywordCaseOptionValueMap[configuration.keywordCase]);
  }

  if (configuration.spaces) {
    args.push('--spaces ' + configuration.spaces);
  }

  if (configuration.stripComments) {
    args.push('--nocomment');
  }

  return args.join(' ');
};

export default (sql: string, userConfiguration?: UserConfigurationType) => {
  const configuration = createConfiguration(userConfiguration);
  const args = createCommandLineArgs(configuration);

  const result = execSync('perl ' + executablePath + ' ' + args, {
    encoding: 'utf8',
    input: sql
  });

  return result;
};
