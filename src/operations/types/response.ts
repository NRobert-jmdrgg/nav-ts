import { BasicHeader, BasicResult } from '../../baseTypes';
import Software from '../../software';

export interface TokenExchangeResponse {
  TokenExchangeResponse: {
    header: BasicHeader;
    result: BasicResult;
    software: Software;
    encodedExchangeToken: [string];
    tokenValidityFrom: Date;
    tokenValidityTo: Date;
  };
}

// export interface GeneralErrorResponse extends BasicOnlineInvoiceResponse {
//   technicalValidationMessages?: [
//     {
//       validationResultCode: string;
//       validationErrorCode?: string;
//       message?: string;
//     }
//   ];
// }
