/* database methods spec */
var should = require('should');

describe('./src/common/db.js', function () {
    var dbFactory = require('../../src/common/db.js');
    var userData, savedDocNum, savedUser, users;

    describe('while initialization', function () {
        it('should exist', function () {
            dbFactory.should.be.ok;
        });
    });

    before(function () {
        dbFactory.initDB('./.testuser.db', true);
    });

    before(function (done) {
        console.log('cleaning test db');
        dbFactory.db.remove({}, { multi: true }, function (err) {
            if (err) {
                return done(err);
            }

            dbFactory.db.loadDatabase(function (err) {
                if (err) {
                    return done(err);
                }
                console.log('test db is clean now');
                done();
            });
        });
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
                should.not.exist(err);
                savedDocNum = num;
                done();
            });
        });

        it('should save user in db file', function () {
            savedDocNum.should.equal(1);
        });

        describe('when finding saved user', function () {
            beforeEach(function (done) {
                dbFactory.getActiveUser(function (err, user) {
                    should.not.exist(err);
                    savedUser = user;
                    done();
                });
            });

            it('should find already saved user in db file', function () {
                savedUser.should.be.ok;
            });

            it('should have valid accessToken', function () {
                savedUser.should.have.property('accessToken', userData.acaccessToken);
            });

            it('should have valid accessTokenSecret', function () {
                savedUser.should.have.property('accessTokenSecret', userData.acaccessTokenSecret);
            });

            describe('when trying to save more then one user', function () {
                beforeEach(function (done) {
                    userData.username = 'new_test_user';
                    dbFactory.saveActiveUser(userData, function (err, num) {
                        should.not.exist(err);
                        savedDocNum = num;
                        done();
                    });
                });

                beforeEach(function (done) {
                    dbFactory.db.find({}, function (err, docs) {
                        should.not.exist(err);
                        users = docs;
                        done();
                    });
                });

                it('should replace existing user in db', function () {
                    savedDocNum.should.equal(1);
                });

                it('should have only one user stored', function () {
                    users.should.have.length(1);
                });

                it('should have new saved username', function () {
                    users[0].username.should.equal(userData.username);
                });
            });

            describe('when removing saved user', function () {
                beforeEach(function (done) {
                    dbFactory.removeActiveUser(function (err) {
                        should.not.exist(err);
                        done();
                    });
                });

                beforeEach(function (done) {
                    dbFactory.getActiveUser(function (err, user) {
                        should.not.exist(err);
                        savedUser = user;
                        done();
                    });
                });

                it('should remove saved user', function () {
                    should.not.exist(savedUser);
                });
            });
        });
    });
});
