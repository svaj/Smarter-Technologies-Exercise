import {
  BULKY_SHIPPING_DIMENSION_THRESHOLD,
  BULKY_VOLUME_THRESHOLD,
} from './consts'

/**
 * Given a package's dimensions and mass, determine if it is bulky
 * A package is considered bulky when its volume is greater than or equal to 1,000,000 cm³
 * or when one of its dimensions is greater or equal to 150 cm.
 *
 * @param width package width in cm
 * @param height package height in cm
 * @param length package length in cm
 * @return true if the package is bulky, false otherwise
 */
export const isBulky = (
  width: number,
  height: number,
  length: number
): boolean => {
  const volume = width * height * length
  const hasLargeDimension =
    width >= BULKY_SHIPPING_DIMENSION_THRESHOLD ||
    height >= BULKY_SHIPPING_DIMENSION_THRESHOLD ||
    length >= BULKY_SHIPPING_DIMENSION_THRESHOLD
  return volume >= BULKY_VOLUME_THRESHOLD || hasLargeDimension
}
