export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/controllers/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text']
}