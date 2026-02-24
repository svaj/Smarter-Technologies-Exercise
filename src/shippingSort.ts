import { createReadStream, existsSync } from 'fs'
import { Readable } from 'stream'
import split2 from 'split2'
import { HEAVY_SHIPPING_MASS_THRESHOLD, COLUMN_SEPARATOR_REGEX } from './consts'
import { isBulky } from './helpers'

export enum ShippingLabelType {
  STANDARD = 'STANDARD',
  SPECIAL = 'SPECIAL',
  REJECTED = 'REJECTED',
}

export type Parcel = {
  width: number
  height: number
  length: number
  mass: number
}

/**
 * Given a package's dimensions and mass, determine which of the following attributes applies:
 * - bulky: its volume is greater than or equal to 1,000,000 cm³ or when one of its dimensions is greater or equal to 150 cm.
 * - heavy: its mass is greater or equal to 20 kg.
 * Based on the above attributes, determine and return the appropriate shipping label for the package:
 * - **STANDARD**: standard packages (those that are not bulky or heavy) can be handled normally.
 * - **SPECIAL**: packages that are either heavy or bulky can't be handled automatically.
 * - **REJECTED**: packages that are **both** heavy and bulky are rejected.
 * @param package a Parcel object containing the package's dimensions and mass
 * @return the appropriate ShippingLabelType for the package
 */
export const sort = (parcel: Parcel): ShippingLabelType => {
  const { width, height, length, mass } = parcel
  if (width <= 0 || height <= 0 || length <= 0 || mass <= 0) {
    throw new Error(
      'All dimensions and mass must be positive numbers when calling sort()'
    )
  }

  // determine appropriate labels for the package
  const isBulkyPackage = isBulky(width, height, length)
  const isHeavyPackage = mass >= HEAVY_SHIPPING_MASS_THRESHOLD

  // return appropriate shipping label based on the package's labels
  if (isBulkyPackage && isHeavyPackage) {
    return ShippingLabelType.REJECTED
  } else if (isBulkyPackage || isHeavyPackage) {
    return ShippingLabelType.SPECIAL
  } else {
    return ShippingLabelType.STANDARD
  }
}

/**
 * Given a line of input, parse it and return the appropriate shipping label.
 * @param line a string containing the package's dimensions and mass in the format "width,height,length,mass"
 * @return the appropriate ShippingLabelType for the package
 */
export const processReadLine = (line: string): ShippingLabelType => {
  const [widthStr = '', heightStr = '', lengthStr = '', massStr = ''] =
    line.split(COLUMN_SEPARATOR_REGEX)
  const parcel = {
    width: parseFloat(widthStr) || 0,
    height: parseFloat(heightStr) || 0,
    length: parseFloat(lengthStr) || 0,
    mass: parseFloat(massStr) || 0,
  }
  return sort(parcel)
}

/**
 * Given a file path, read the file line by line and process each line to determine the
 * appropriate shipping label for each package.
 * @param filePath path to a file
 */
export const processFile = (filePath: string) => {
  // check to see file exists
  if (!existsSync(filePath)) {
    console.error(`File ${filePath} does not exist`)
    return
  }
  const readStream: Readable = createReadStream(filePath, { encoding: 'utf8' })

  readStream
    .pipe(split2())
    .on('data', (line: string) => {
      try {
        const label = processReadLine(line)
        console.log(label)
      } catch (err) {
        console.error(
          `Error processing parcel line "${line}": ${(err as Error).message}`
        )
      }
    })
    .on('error', (err: Error) => {
      console.error('Error:', err.message)
    })
}
