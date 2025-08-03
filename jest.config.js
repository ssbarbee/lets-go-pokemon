module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
    transformIgnorePatterns: ['/node_modules/'],
};