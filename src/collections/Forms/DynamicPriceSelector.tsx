'use client'

import React, { useEffect, useState } from 'react';
import { Text, useWatchForm } from 'payload/components/forms';
import { Props as TextFieldType } from 'payload/dist/admin/components/forms/field-types/Text/types';
import { Data } from 'payload/dist/admin/components/forms/Form/types';
import { useLocale } from "payload/components/utilities";

type FieldWithID = {
  id: string
  name: string
};

export const DynamicPriceSelector: React.FC<TextFieldType> = (props) => {
  const {
    path,
    label
  } = props;

  const {
    fields,
    getDataByPath,
    getData
  } = useWatchForm();

  const locale = useLocale();

  const [isNumberField, setIsNumberField] = useState<boolean>();
  const [valueType, setValueType] = useState<'static' | 'valueOfField'>();

  // only number fields can use 'valueOfField`
  useEffect(() => {
    if (path) {
      const parentPath = path.split('.').slice(0, -1).join('.')
      const paymentFieldData: any = getDataByPath(parentPath);

      if (paymentFieldData) {
        const {
          fieldToUse,
          valueType
        } = paymentFieldData;

        setValueType(valueType);

        const { fields: allFields }: Data = getData();
        const field = allFields.find((field: FieldWithID) => field.name === fieldToUse);

        if (field) {
          const { blockType } = field;
          setIsNumberField(blockType === 'number');
        }
      }
    }
  }, [
    fields,
    path,
    getDataByPath,
    getData
  ]);

  // TODO: make this a number field, block by Payload
  if (valueType === 'static') {
    return (
      <Text {...props} />
    )
  }

  const localLabels = typeof label === 'object' ? label : { [locale]: label };
  const labelValue = localLabels[locale] || localLabels['en'] || '';

  if (valueType === 'valueOfField' && !isNumberField) {
    return (
      <div>
        <div>
          {labelValue}
        </div>
        <div
          style={{
            color: '#9A9A9A',
          }}
        >
          The selected field must be a number field.
        </div>
      </div>
    )
  }

  return null
};
