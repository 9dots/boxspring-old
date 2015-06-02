var po = require('@weo-edu/po');
var assert = require('assert');
var _ = require('lodash');
var is = require('@weo-edu/is');

var models = require('..');
var boxes = models.boxes;

describe('Boxes', function() {
  describe('.create', function() {
    it('should create new box', function(done) {
      boxes.create(u, b).then(function() {
        done();
      });
    });
  });

  describe('.get', function() {
    it('should get a new box', function(done) {
      po(
        function() {
          return boxes.create(u, b);
        },
        function() {
          return boxes.get(u.username, b.name);
        }
      )().then(function(b) {
        assert.ok(is.object(b));
        assert.ok(b.type === 'box');
        assert.ok(b.name === 'elephant');
        assert.ok(b.fullName === 'tio/elephant');
        done();
      })
    });
  });

  describe('.list', function() {
    it('should list boxes', function(done) {
      po(
        function() {
          return boxes.create(u, b);
        },
        function() {
          return boxes.list(u.username);
        }
      )().then(function(bs) {
        assert.ok(is.array(bs));
        assert.ok(bs[0].name === 'elephant');
        done();
      });
    });
  });

  describe('.update', function() {
    it('should update box', function(done) {
      po(
        function() {
          return boxes.create(u, b);
        },
        function() {
          return boxes.update(u.username, b.name, {
            description: 'elephant app'
          });
        },
        function() {
          return boxes.get(u.username, b.name);
        }
      )().then(function(b) {
        assert.ok(is.object(b));
        assert.ok(b.description === 'elephant app');
        done();
      })
    });
  });

  describe('.del', function() {
    it('should delete box', function(done) {
      po(
        function() {
          return boxes.create(u, b);
        },
        function() {
          return boxes.del(u.username, b.name);
        },
        function() {
          return boxes.get(u.username, b.name);
        }
      )().then(function(b) {
        assert.ok(is.null(b));
        done();
      });
    });
  });
});


var u = {
  id: 'google-oauth2|103547991597142817347',
  username: 'tio'
};

var b = {
  displayName: 'Elephant',
};