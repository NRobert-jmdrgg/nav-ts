import makeid from './utils/makeid';
import crypto from 'crypto';
import { pick } from 'lodash';
import { User, Software } from './baseTypes';

/**
 * Alap request object
 * @param {User} user user adatokat tartalmazó object
 * @param {Software} software software adatokat tartalmazó object
 * @returns BasicOnlineInvoiceRequest object
 */
export default function createRequest(
  requestName: string,
  user: User,
  software: Software,
  options?: object
) {
  return {
    [requestName]: {
      $: {
        'xmlns:common': 'http://schemas.nav.gov.hu/NTCA/1.0/common',
        xmlns: 'http://schemas.nav.gov.hu/OSA/3.0/api',
      },
      'common:header': {
        'common:requestId': makeid(16),
        'common:timestamp': new Date().toISOString(),
        'common:requestVersion': '3.0',
        'common:headerVersion': '1.0',
      },
      'common:user': {
        'common:login': user.login,
        'common:passwordHash': {
          $: {
            cryptoType: 'SHA-512',
          },
          _: crypto
            .createHash('sha512')
            .update(user.password)
            .digest('hex')
            .toUpperCase(),
        },
        'common:taxNumber': user.taxNumber,
        'common:requestSignature': {
          $: {
            cryptoType: 'SHA3-512',
          },
          _: '',
        },
      },
      // az object sorrendnek megfelelőnek kell lennie, különben nem fog menni.
      software: pick(software, [
        'softwareId',
        'softwareName',
        'softwareOperation',
        'softwareMainVersion',
        'softwareDevName',
        'softwareDevContact',
        'softwareDevCountryCode',
        'softwareDevTaxNumber',
      ]),
      ...options,
    },
  };
}
