import { Decimal } from '@prisma/client/runtime/library'

export class DecimalParser {
  static toNumber(value: Decimal) {
    return value.toNumber()
  }
}
