import { Software } from '../baseTypes';

export default function getSoftwareData(): Software {
  return {
    softwareId: process.env.SOFTWARE_ID ?? '',
    softwareName: process.env.SOFTWARE_NAME ?? '',
    softwareOperation: process.env.SOFTWARE_OPERATION ?? 'LOCAL_SOFTWARE',
    softwareMainVersion: process.env.SOFTWARE_MAIN_VERSION ?? '',
    softwareDevName: process.env.SOFTWARE_DEV_NAME ?? '',
    softwareDevContact: process.env.SOFTWARE_DEV_CONTACT ?? '',
    softwareDevCountryCode: process.env.SOFTWARE_DEV_COUNTRY_CODE,
    softwareDevTaxNumber: process.env.SOFTWARE_DEV_TAX_NUMBER,
  };
}
