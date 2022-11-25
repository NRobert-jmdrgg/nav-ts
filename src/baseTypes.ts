/**
 * alap típusok a nav operációkhoz
 */

export type User = {
  login: string;
  password: string;
  taxNumber: string;
  exchangeKey: string;
  signatureKey: string;
};

export type Software = {
  softwareId: string;
  softwareName: string;
  softwareOperation: string;
  softwareMainVersion: string;
  softwareDevName: string;
  softwareDevContact: string;
  softwareDevCountryCode?: string;
  softwareDevTaxNumber?: string;
};

export type BasicHeader = {
  requestId: [string];
  timestamp: [string];
  requestVersion: [string];
  headerVersion?: [string];
};

export type CommonBasicHeader = {
  'common:requestId': string;
  'common:timestamp': string;
  'common:requestVersion': string;
  'common:headerVersion'?: string;
};

export type UserHeader = {
  'common:login': string;
  'common:passwordHash': {
    $: {
      cryptoType: string;
    };
    _: string;
  };
  'common:taxNumber': string;
  'common:requestSignature': {
    $: {
      cryptoType: string;
    };
    _: string;
  };
};

export type InvoiceRequest = {
  [x: string]: {
    $: {
      'xmlns:common': string;
      xmlns: string;
    };
    'common:header': CommonBasicHeader;
    'common:user': UserHeader;
    software: Software;
  };
};

export type BasicResult = {
  funcCode: [string];
  errorCode?: [string];
  message?: [string];
  notifications: {
    notification: {
      notificationCode: [string];
      notificationText: [string];
    }[];
  };
};
