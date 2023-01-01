import { Schema, model } from 'mongoose';

const partnerSchema: Schema = new Schema({
  taxNumber: {
    taxpayerId: String,
    vatCode: String,
    countryCode: String,
    groupMemberTaxNumber: String,
  },
  Name: String,
  companyCodes: [String],
  glnNumbers: [String],
  address: {
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
  bankAccountNumber: String,
});

export default model('Partner', partnerSchema);
