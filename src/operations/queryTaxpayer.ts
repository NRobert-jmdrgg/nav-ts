import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryTaxpayerOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendRequest from '../sendRequest';
import { QueryTaxpayerResponse } from './types/response';
import writeToXML from '../utils/writeToXML';

/**
 * belföldi adószám validáló operáció, mely a számlakiállítás folyamatába építve képes
a megadott adószám valódiságáról és érvényességéről a NAV adatbázisa alapján adatot szolgáltatni.
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @returns adószám adatai és result érték
 */
export default async function queryTaxpayer(
  user: User,
  software: Software,
  options: QueryTaxpayerOptions,
  returnWithXml?: boolean
) {
  // request létrehozása
  const request = createRequest(
    'QueryTaxpayerRequest',
    user,
    software,
    options
  );

  // request signature létrehozása
  request['QueryTaxpayerRequest']['common:user']['common:requestSignature']._ =
    createRequestSignature(
      request['QueryTaxpayerRequest']['common:header']['common:requestId'],
      request['QueryTaxpayerRequest']['common:header']['common:timestamp'],
      user.signatureKey
    );

  const requestXml = writeToXML(request);
  const response = await sendRequest<QueryTaxpayerResponse>(
    requestXml,
    'queryTaxpayer',
    returnWithXml
  );

  if (response.parsedResponse) {
    if (returnWithXml) {
      return {
        infoDate: response.parsedResponse.infoDate?.[0],
        taxpayerData: response.parsedResponse.taxpayerData?.[0],
        taxpayerValidity: response.parsedResponse.taxpayerValidity?.[0],
        responseXml: response.responseXml,
        requestXml: requestXml,
      };
    }

    return {
      infoDate: response.parsedResponse.infoDate?.[0],
      taxpayerData: response.parsedResponse.taxpayerData?.[0],
      taxpayerValidity: response.parsedResponse.taxpayerValidity?.[0],
    };
  }

  return null;
}
