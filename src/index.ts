#! /usr/bin/env node

import { program } from 'commander'
import { version, name } from '../package.json'
import { processFile } from './shippingSort'

program
  .name(name)
  .description(
    'A CLI tool to determine the appropriate shipping label for a package based on its dimensions and mass'
  )
  .version(version)
  .argument('[file]', 'file of parcels to process')
  .action((file) => {
    processFile(file)
  })

program.parse()
