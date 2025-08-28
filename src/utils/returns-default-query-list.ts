type DefaultQueryList<
  TData = any,
  TypeOfAdditionalProperties = any,
> = TypeOfAdditionalProperties & {
  data: TData
  success?: boolean
}

export function returnsDefaultQueryList<TData, AdditionalProperties>({
  data,
  success = false,
  ...others
}: DefaultQueryList<TData, AdditionalProperties>) {
  return {
    data,
    success,
    others,
  }
}
