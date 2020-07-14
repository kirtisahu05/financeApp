export function addressObject() {
  return {
    line1: '',
    line2: '',
    nearestLandMark: '',
    city: '',
    state: '',
    pinCode: '',
  }
}

export function memberForm() {
    return {
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        sex: '',
        maritalStatus: '',
        adharCardNumber: '',
        panCardNumber: '',
        memberRelationNumber: 'MAHD0',
        shareAlloted: '10',
        fileList: [],
        familyDetails: {
          fatherName: {
            firstName: '',
            middleName: '',
            lastName: '',
          },
          motherName: {
            firstName: '',
            middleName: '',
            lastName: '',
          },
          spouseName: {
            firstName: '',
            middleName: '',
            lastName: '',
          },
        },
        contactDetails: {
          personalCellNumber:'',
          alternateCellNumber:'',
          landlineNumber:'',
          email:'',
          hasSingleAddress: false,
          presentAddress: addressObject,
          permanentAddress: addressObject
        },
        employmentDetails: {
          employmentNature: '',
          employerName: '',
          employmentType: '',
          annualIncome: '',
          employmentContactNumber: '',
          employmentAddress: addressObject
        }
      }
}

export function rules() {
 return {
  emailRules: [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ],
 }
}