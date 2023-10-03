import jest from "next/jest.js"
import { pathsToModuleNameMapper } from "ts-jest"
import { compilerOptions } from "./tsconfig.json"

const createJestConfig = jest({ dir: "./" })

const jestConfig = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  transform: {
    "^.+\\.mjs$": "ts-jest",
  },
  testEnvironment: "node",
  testPathIgnorePatterns: ["./node_modules/"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  modulePaths: ["<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/src/server/external/__mocks__/prisma.ts"],
}

export default createJestConfig(jestConfig)
