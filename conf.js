exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  multiCapabilities: [{
      browserName: 'chrome',
    }, 
    {
      browserName: 'firefox',
    }
  ],
  maxSessions: 1,
  specs: ['./e2e/profile.spec.js', './e2e/settings.negative.spec.js', './e2e/loginForm.spec.js'],
  framework: 'jasmine',
  jasmineNodeOpts: {
    isVerbose: false,
    showColors: true,
    includeStackTrace: false,
    defaultTimeoutInterval: 40000
  }
};