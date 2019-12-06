module.exports = {
  name: 'ngrx-demo-auth-feature-login',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ngrx-demo/auth/feature-login',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
