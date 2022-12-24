import { resSoftware, BasicHeader, BasicResult } from '../../baseTypes';

import { TechnicalValidationMessagesType } from './response';

export type GeneralExceptionResponse = {
  funcCode: [string]; // feldolgozási eredmény
  errorCode?: [string]; // a feldolgozási hibakód
  message?: [string]; // Feldolgozási üzenet
  notification?: [string]; // egyéb értesítés
};

export type GeneralErrorResponse = {
  header: [BasicHeader];
  result: [BasicResult];
  software: [resSoftware];
  technicalValidationMessages: TechnicalValidationMessagesType[];
};
