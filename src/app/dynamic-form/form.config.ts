import { IForm } from "./form.interface";

export const ageGroups = [
    {
        label: 'Infant',
        value: 'infant'
    },
    {
        label: 'Child',
        value: 'child'
    },
    {
        label: 'Teenager',
        value: 'teenager'
    },
    {
        label: 'Young Adult',
        value: 'youngAdult'
    },
    {
        label: 'Adult',
        value: 'adult'
    },
    {
        label: 'Senior',
        value: 'senior'
    }
];

export const ageRanges = [
    {
        label: '0-2 years',
        value: 'zeroToTwoYears',
        mapping: 'infant'
    },
    {
        label: '3-12 years',
        value: 'threeToTwelveYears',
        mapping: 'child'
    },
    {
        label: '13-19 years',
        value: 'thirteenToNineteenYears',
        mapping: 'teenager'
    },
    {
        label: '20-39 years',
        value: 'twentyToThirtyNineYears',
        mapping: 'youngAdult'
    },
    {
        label: '40-59 years',
        value: 'fourtyToFiftyNineYears',
        mapping: 'adult'
    },
    {
        label: '60+ years',
        value: 'sixtyPlusYears',
        mapping: 'senior'
    }
];

export const dynamicForm: IForm[] = [
    {
        type: 'select',
        label: 'Age Group',
        name: 'ageGroup',
        value: '',
        options: ageGroups,
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: 'Age group is required',
          }
        ],
    },
    {
        type: 'select',
        label: 'Age Range',
        name: 'ageRange',
        value: '',
        options: ageRanges,
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: 'Age range is required',
          }
        ],
    },
    {
        type: 'date',
        label: 'Start Date',
        name: 'startDate',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: 'Start date is required',
          }
        ],
    },
    {
        type: 'date',
        label: 'End Date',
        name: 'endDate',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: 'End date is required',
          }
        ],
    },
    {
        type: 'number',
        label: 'Duration',
        name: 'duration',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: 'Duration is required',
          }
        ],
    }
];
