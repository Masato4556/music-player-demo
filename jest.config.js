export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
}
