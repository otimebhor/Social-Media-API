module.exports = {
    testEnvironment: 'node',
    testMatch: [
      '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
    ],
    "testTimeout": 5000 ,
    verbose: false,
    
  };

  // setupFilesAfterEnv: ['./jest.setup.js'],