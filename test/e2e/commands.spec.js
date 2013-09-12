describe('tweet commands', function() {
	describe('when using tweet login', function () {
		it('should prompt browser window');
		it('should write user data in nedb');
	});

	describe('when using tweet create', function () {
		it('should prompt for message');
		it('should post message to twitter api');
	});

	describe('when using tweet whoami', function () {
		it('should print user name');
	});

	describe('when using tweet logout', function () {
		it('should remove current user from nedb');
	});
});