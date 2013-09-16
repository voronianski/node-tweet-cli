var should = require('should');

describe('./src/common/db.js', function () {
	var dbFactory = require('../../src/common/db.js');
	var userData, user, error;

	describe('while initialization', function () {
		it('should exist', function () {
			dbFactory.should.be.ok;
		});
	});

	before(function () {
		dbFactory.initDB('./.testuser.db', true);
	});

	beforeEach(function () {
		userData = {
			accessToken: 'abcde12345',
			accessTokenSecret: 'abcde12345',
			username: 'test_user',
			user_id: '123',
			active: true
		};
	});

	describe('when saving new user', function () {
		beforeEach(function (done) {
			dbFactory.saveActiveUser(userData, function (err, num) {
				console.dir(num);
				console.dir(err);
				done();
			});
		})

		it('should save user in db file', function () {

		});

		describe('when finding saved user', function () {
			it('should find already saved user in db file');

			describe('when removing saved user', function () {
				it('should remove saved user');
			});
		});
	});

});
