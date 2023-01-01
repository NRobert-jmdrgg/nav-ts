import { Schema, model } from 'mongoose';

const customerSchema: Schema = new Schema({
  customerTaxNumber: {
    taxpayerId: String,
    vatCode: String,
    countryCode: String,
    customerGroupMemberTaxNumber: String,
  },
  customerName: String,
  customerCompanyCodes: [String],
  glnNumbersCustomer: [String],
  customerVatStatus: String,
  customerAddress: {
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
  customerBankAccountNumber: String,
});

export default model('Customer', customerSchema);
