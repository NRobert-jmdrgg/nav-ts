import axios from 'axios';
import * as dotenv from 'dotenv';

import readFromXml from './utils/readFromXml';

dotenv.config();

type Response<R> = {
  data?: R;
  responseXml?: string;
  requestXml?: string;
};

/**
 *  Kérés küldése a nav felé.
 * @param request
 * @param operation api endpoint neve
 * @param returnWithXml ha igaz visszatér xml-el
 * @template R visszatérési érték típus
 * @returns Promise<Response<R>> válasz object
 *
 */
export default async function sendNavRequest<R>(
  requestXml: string,
  operation: string,
  returnWithXml?: boolean
): Promise<Response<R>> {
  // kérés object xml-be írása

  // request küldés
  let data;
  let responseXml;
  try {
    const response = await axios.post(
      `${process.env.API_TEST_URL}${process.env.VERSION}${operation}`,
      requestXml,
      { headers: { 'Content-Type': 'application/xml' } }
    );
    responseXml = response.data;
    const xmlobj = await readFromXml<R>(responseXml);
    data = xmlobj;
  } catch (e: any) {
    console.log(JSON.stringify(await readFromXml(e.response.data), null, 2));
  }

  return {
    data: data,
    responseXml: returnWithXml ? responseXml : undefined,
    requestXml: returnWithXml ? requestXml : undefined,
  };
}
