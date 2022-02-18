import { Block, CollectionConfig, Field } from 'payload/types';

export type BlockConfig = {
  block: Block
  validate?: (value: unknown) => boolean | string
}

export function isValidBlockConfig(blockConfig: BlockConfig | string): blockConfig is BlockConfig {
  return typeof blockConfig !== 'string'
    && typeof blockConfig?.block?.slug === 'string'
    && Array.isArray(blockConfig?.block?.fields);
}

export type FieldConfig = {
  [key: string]: Partial<Field>
  paymentProcessor: Partial<SelectField>
}

export type FieldsConfig = {
  select?: boolean | FieldConfig
  text?: boolean | FieldConfig
  email?: boolean | FieldConfig
  state?: boolean | FieldConfig
  country?: boolean | FieldConfig
  checkbox?: boolean | FieldConfig
  number?: boolean | FieldConfig
  message?: boolean | FieldConfig
  payment?: boolean | FieldConfig
}

export type BeforeEmail = (emails: FormattedEmail[]) => FormattedEmail[] | Promise<FormattedEmail[]>;
export type HandlePayment = (data: any) => void;

export type FormConfig = {
  fields?: FieldsConfig
  formSubmissionOverrides?: Partial<CollectionConfig>
  formOverrides?: Partial<CollectionConfig>
  beforeEmail?: BeforeEmail
  handlePayment?: HandlePayment
  redirectRelationships?: string[]
}

export type TextField = {
  blockType: 'text'
  blockName?: string
  width?: string
  name: string
  label?: string
  defaultValue?: string
  required?: boolean
}

export type SelectFieldOption = {
  label: string
  value: string
}

export type SelectField = {
  blockType: 'select'
  blockName?: string
  width?: string
  name: string
  label?: string
  defaultValue?: string
  required?: boolean
  options: SelectFieldOption[]
}

export type PriceCondition = {
  fieldToUse: string
  condition: 'equals' | 'notEquals' | 'hasValue'
  valueForCondition: string
  operator: 'add' | 'subtract' | 'multiply' | 'divide'
  valueType: 'static' | 'dynamic'
  valueForOperator: string | number // TODO: make this a number, see ./collections/Forms/DynamicPriceSelector.tsx
}

export type PaymentField = {
  blockType: 'payment'
  blockName?: string
  width?: string
  name: string
  label?: string
  defaultValue?: string
  required?: boolean
  paymentProcessor: string,
  basePrice: number
  priceConditions: PriceCondition[]
}

export type EmailField = {
  blockType: 'email'
  blockName?: string
  width?: string
  name: string
  label?: string
  defaultValue?: string
  required?: boolean
}

export type StateField = {
  blockType: 'state'
  blockName?: string
  width?: string
  name: string
  label?: string
  defaultValue?: string
  required?: boolean
}

export type CountryField = {
  blockType: 'country'
  blockName?: string
  width?: string
  name: string
  label?: string
  defaultValue?: string
  required?: boolean
}

export type CheckboxField = {
  blockType: 'checkbox'
  blockName?: string
  width?: string
  name: string
  label?: string
  defaultValue?: boolean
  required?: boolean
}

export type MessageField = {
  blockType: 'message'
  blockName?: string
  message: unknown
}

export type FormFieldBlock = TextField | SelectField | EmailField | StateField | CountryField | CheckboxField | MessageField

export type Email = {
  emailTo: string
  emailFrom: string
  bcc?: string
  replyTo?: string
  subject: string
  message?: any // TODO: configure rich text type
}

export type FormattedEmail = {
  to: string
  from: string
  subject: string
  html: string
}

export type Redirect = {
  type: 'reference' | 'custom'
  reference?: {
    relationTo: 'people' | 'posts' | 'pages' | 'housing'
    value: string | unknown
  }
  url: string
}

export type Form = {
  id: string
  title: string
  fields: FormFieldBlock[]
  submitButtonLabel?: string
  confirmationType: 'message' | 'redirect'
  confirmationMessage?: any // TODO: configure rich text type
  redirect?: Redirect
  emails: Email[]
}

export type SubmissionValue = {
  field: string
  value: unknown
}

export type FormSubmission = {
  form: string | Form
  submissionData: SubmissionValue[]
}
