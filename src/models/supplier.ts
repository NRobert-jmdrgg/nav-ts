import { Schema, model } from 'mongoose';

const supplierSchema: Schema = new Schema({
  supplierTaxNumber: {
    taxpayerId: String,
    vatCode: String,
    countryCode: String,
    supplierGroupMemberTaxNumber: String,
  },
  supplierName: String,
  supplierCompanyCodes: [String],
  glnNumbersSupplier: [String],
  supplierAddress: {
    countryCode: String,
    region: String,
    postalCode: String,
    city: String,
    additionalAddressDetail: String,
    streetName: String,
    publicPlaceCategory: String,
    number: String,
    building: String,
    staircase: String,
    floor: String,
    door: String,
    lotNumber: String,
  },
  supplierBankAccountNumber: String,
});

export default model('Supplier', supplierSchema);
