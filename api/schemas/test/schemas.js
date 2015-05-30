var assert = require('assert');
var _ = require('lodash');

var schemas = require('..');


var box = schemas.box;
var file = schemas.file;

var user = require('../user');

describe('User', function() {
  it('should be valid when formed properly', function() {
    var msg = user.validate(u);
    assert.ok(msg.valid);
  });

  it('should ensure all fields are required', function() {
    var msg = user.validate({});
    assert.ok(_.find(msg.errors, {field: 'username'}));
    assert.ok(_.find(msg.errors, {field: 'id'}));
  });

  it('should invalidate malformed username', function() {
    var ui = _.clone(u);
    ui.username = '-a';
    var msg = user.validate(ui);
    assert(!msg.valid);
  });
});


describe('Box', function() {
  it('should be valid when formed properly', function() {

    var msg =  box.validate(b);
    assert.ok(msg.valid);
  });

  it('should ensure all fields except description are required', function() {
    var msg = box.validate({});
    assert.ok(_.find(msg.errors, {field: 'type'}));
    assert.ok(_.find(msg.errors, {field: 'id'}));
    assert.ok(_.find(msg.errors, {field: 'owner'}));
    assert.ok(_.find(msg.errors, {field: 'name'}));
    assert.ok(_.find(msg.errors, {field: 'fullName'}));
    assert.ok(_.find(msg.errors, {field: 'displayName'}));
    assert.ok(_.find(msg.errors, {field: 'createdAt'}));
    assert.ok(_.find(msg.errors, {field: 'updatedAt'}));
  });

  it('should invalidate other types', function() {
    var bi = _.clone(b);
    bi.type = 'file';
    var msg = box.validate(bi);
    assert(!msg.valid);
  });

});

describe('File', function() {
  it('should be valid when formed properly', function() {
    var msg = file.validate(f);
    assert.ok(msg.valid);
  });

  it('should ensure all fields are required', function() {
    var msg = file.validate({});
    assert.ok(_.find(msg.errors, {field: 'type'}));
    assert.ok(_.find(msg.errors, {field: 'id'}));
    assert.ok(_.find(msg.errors, {field: 'box'}));
    assert.ok(_.find(msg.errors, {field: 'path'}));
    assert.ok(_.find(msg.errors, {field: 'fullPath'}));
    assert.ok(_.find(msg.errors, {field: 'contentUrl'}));
    assert.ok(_.find(msg.errors, {field: 'createdAt'}));
    assert.ok(_.find(msg.errors, {field: 'updatedAt'}));
  });

  it('should invalidate other types', function() {
    var fi = _.clone(f);
    fi.type = 'box';
    var msg = file.validate(fi);
    assert(!msg.valid);
  });
});



var u = {
  id: 'google-oauth2|103547991597142817347',
  username: 'tio'
};

var b = {
  type: 'box',
  id: '123-45-67-89',
  owner: {
    id: 'google-oauth2|103547991597142817347',
    username: 'tio'
  },
  name: 'elephant',
  fullName: 'tio/elephant',
  displayName: 'Elephant',
  description: 'elephant app',
  createdAt: (new Date()).toISOString(),
  updatedAt: (new Date()).toISOString()
};

var f = {
  type: 'file',
  id: '123-45-67-89',
  box: {
    id: '123-45-67-89', 
    fullName: 'tio/elephant', 
    displayName: 'Elephant'
  },
  path: 'index.js',
  fullPath: 'tio/elephant/index.js',
  contentUrl: 'http://s3.boxpring.com/tio/elephant/index.js',
  createdAt: (new Date()).toISOString(),
  updatedAt: (new Date()).toISOString()
};



