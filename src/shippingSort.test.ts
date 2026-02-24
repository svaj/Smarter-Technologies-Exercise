import { expect, jest, it, describe } from '@jest/globals'
import { sort, ShippingLabelType } from './shippingSort'
import { isBulky } from './helpers'
import {
  BULKY_SHIPPING_DIMENSION_THRESHOLD,
  HEAVY_SHIPPING_MASS_THRESHOLD,
} from './consts'

jest.mock('./helpers')

const mockedIsBulky = jest.mocked(isBulky)

const notHeavyMass = HEAVY_SHIPPING_MASS_THRESHOLD - 1
const heavyMass = HEAVY_SHIPPING_MASS_THRESHOLD
const notBulkyDimension = 1
const bulkyDimension = BULKY_SHIPPING_DIMENSION_THRESHOLD

describe('sort()', () => {
  it('should return the correct shipping label for a standard package', () => {
    mockedIsBulky.mockReturnValue(false)
    expect(
      sort({
        width: notBulkyDimension,
        height: notBulkyDimension,
        length: notBulkyDimension,
        mass: notHeavyMass,
      })
    ).toBe(ShippingLabelType.STANDARD)
  })

  it('should return the correct shipping label for a bulky package', () => {
    mockedIsBulky.mockReturnValue(true)
    expect(
      sort({
        width: bulkyDimension,
        height: notBulkyDimension,
        length: notBulkyDimension,
        mass: notHeavyMass,
      })
    ).toBe(ShippingLabelType.SPECIAL)
  })

  it('should return the correct shipping label for a heavy package', () => {
    mockedIsBulky.mockReturnValue(false)
    expect(
      sort({
        width: notBulkyDimension,
        height: notBulkyDimension,
        length: notBulkyDimension,
        mass: heavyMass,
      })
    ).toBe(ShippingLabelType.SPECIAL)
  })

  it('should return the correct shipping label for a package that is both bulky and heavy', () => {
    mockedIsBulky.mockReturnValue(true)
    expect(
      sort({
        width: bulkyDimension,
        height: notBulkyDimension,
        length: notBulkyDimension,
        mass: heavyMass,
      })
    ).toBe(ShippingLabelType.REJECTED)
  })

  it('should throw an error if any of the dimensions or mass are non-positive', () => {
    mockedIsBulky.mockReturnValue(false)
    expect(() =>
      sort({
        width: 0,
        height: notBulkyDimension,
        length: notBulkyDimension,
        mass: notHeavyMass,
      })
    ).toThrow(
      'All dimensions and mass must be positive numbers when calling sort()'
    )
    expect(() =>
      sort({
        width: notBulkyDimension,
        height: 0,
        length: notBulkyDimension,
        mass: notHeavyMass,
      })
    ).toThrow(
      'All dimensions and mass must be positive numbers when calling sort()'
    )
    expect(() =>
      sort({
        width: notBulkyDimension,
        height: notBulkyDimension,
        length: 0,
        mass: notHeavyMass,
      })
    ).toThrow(
      'All dimensions and mass must be positive numbers when calling sort()'
    )
    expect(() =>
      sort({
        width: notBulkyDimension,
        height: notBulkyDimension,
        length: notBulkyDimension,
        mass: 0,
      })
    ).toThrow(
      'All dimensions and mass must be positive numbers when calling sort()'
    )
    // also test with negative values
    expect(() =>
      sort({
        width: -10,
        height: notBulkyDimension,
        length: notBulkyDimension,
        mass: notHeavyMass,
      })
    ).toThrow(
      'All dimensions and mass must be positive numbers when calling sort()'
    )
    expect(() =>
      sort({
        width: notBulkyDimension,
        height: -10,
        length: notBulkyDimension,
        mass: notHeavyMass,
      })
    ).toThrow(
      'All dimensions and mass must be positive numbers when calling sort()'
    )
    expect(() =>
      sort({
        width: notBulkyDimension,
        height: notBulkyDimension,
        length: -10,
        mass: notHeavyMass,
      })
    ).toThrow(
      'All dimensions and mass must be positive numbers when calling sort()'
    )
    expect(() =>
      sort({
        width: notBulkyDimension,
        height: notBulkyDimension,
        length: notBulkyDimension,
        mass: -10,
      })
    ).toThrow(
      'All dimensions and mass must be positive numbers when calling sort()'
    )
  })
})
