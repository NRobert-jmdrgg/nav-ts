import { Schema, model } from 'mongoose';

const partnerSchema: Schema = new Schema(
  {
    taxNumber: {
      taxpayerId: { type: String, required: true },
      vatCode: String,
      countryCode: String,
      groupMemberTaxNumber: String,
    },
    Name: String,
    companyCodes: [String],
    glnNumbers: [String],
    address: {
      countryCode: { type: String, required: true },
      region: String,
      postalCode: { type: String, required: true },
      city: { type: String, required: true },
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
  },
  // options
  {
    statics: {
      findByName(name) {
        return this.find({ Name: new RegExp(name, 'i') });
      },

      findByTaxpayerId(id) {
        return this.find({ 'taxNumber.taxpayerId': id });
      },
    },
    virtuals: {
      fullTaxNumber: {
        get() {
          return (
            this.taxNumber?.taxpayerId +
            '-' +
            this.taxNumber?.vatCode +
            '-' +
            this.taxNumber?.countryCode
          );
        },
      },
    },
    // createdAt és updatedAt field
    timestamps: true,
  }
);

export default model('Partner', partnerSchema);

export type PartnerType = {
  taxNumber?: {
    taxpayerId: string;
    vatCode?: string;
    countryCode?: string;
    groupMemberTaxNumber?: string;
  };
  Name?: string;
  companyCodes?: string[];
  glnNumbers?: string[];
  address: {
    countryCode: string;
    region?: string;
    postalCode: string;
    city: string;
    additionalAddressDetail?: string;
    streetName?: string;
    publicPlaceCategory?: string;
    number?: string;
    building?: string;
    staircase?: string;
    floor?: string;
    door?: string;
    lotNumber?: string;
  };
  bankAccountNumber?: string;
};
