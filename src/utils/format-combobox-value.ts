/**
 * Format the value of a combobox to the id of the option
 * @param value - The value of the combobox
 * @returns The id of the option
 *
 * @example
 * formatComboboxValue('123 - John Doe') // 123
 * formatComboboxValue('123 - John Doe') // 123
 */
export function formatComboboxValue(value: string) {
  return value.split(' - ')[0]
}
