import { expect, it, describe } from '@jest/globals'
import {
  BULKY_SHIPPING_DIMENSION_THRESHOLD,
  BULKY_VOLUME_THRESHOLD,
} from './consts'
import { isBulky } from './helpers'

const bulkyEqualDimension = Math.cbrt(BULKY_VOLUME_THRESHOLD)
const notBulkyDimension = 1
const bulkyDimension = BULKY_SHIPPING_DIMENSION_THRESHOLD + 1

describe('isBulky()', () => {
  it('should return true for a package that is bulky due to its dimensions', () => {
    // test for a package that is bulky due to one of its dimensions but not due to its volume
    expect(isBulky(bulkyDimension, notBulkyDimension, notBulkyDimension)).toBe(
      true
    )
    expect(isBulky(notBulkyDimension, bulkyDimension, notBulkyDimension)).toBe(
      true
    )
    expect(isBulky(notBulkyDimension, notBulkyDimension, bulkyDimension)).toBe(
      true
    )
    // test for a package that is bulky due to its volume but not due to its dimensions
    expect(
      isBulky(bulkyEqualDimension, bulkyEqualDimension, bulkyEqualDimension)
    ).toBe(true)
  })

  it('should return false for a package that is not bulky', () => {
    expect(
      isBulky(notBulkyDimension, notBulkyDimension, notBulkyDimension)
    ).toBe(false)
  })
})
