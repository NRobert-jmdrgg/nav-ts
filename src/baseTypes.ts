import Software from './software';

export interface BasicHeader {
  requestId: string;
  timestamp: string;
  requestVersion: string;
  headerVersion?: string;
}

export interface CommonBasicHeader {
  'common:requestId': string;
  'common:timestamp': string;
  'common:requestVersion': string;
  'common:headerVersion'?: string;
}

export interface UserHeader {
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
}

export interface InvoiceRequest {
  [x: string]: {
    $: {
      'xmlns:common': string;
      xmlns: string;
    };
    'common:header': CommonBasicHeader;
    'common:user': UserHeader;
    software: Software;
  };
}

export interface BasicResult {
  funcCode: string;
  errorCode?: string;
  message?: string;
  notifications: {
    notification: [
      {
        notificationCode: string;
        notificationText: string;
      }
    ];
  };
}

// export interface BasicOnlineInvoiceResponse {
//   header: BasicHeader;
//   result: BasicResult;
//   software: Software;
// }
