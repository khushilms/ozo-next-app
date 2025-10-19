export type FormFieldDataType = { title: string, description: string }

export type FormDataType = {
  name: string,
  description: string,
  image: string,
  route: string,
  howItWorks: string,
  benefits: FormFieldDataType[],
  keyFeatures: FormFieldDataType[],
  howToUse: FormFieldDataType[],
}