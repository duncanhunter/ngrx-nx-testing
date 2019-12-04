module.exports = {
  name: 'demo-ngrx',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/demo-ngrx',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
