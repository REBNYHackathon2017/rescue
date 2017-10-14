exports.delay = ms => {
	if (!ms) ms = 3000;
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms);
	});
};

exports.getDistanceBetween = (x1, y1, x2, y2) => {
	var a = x1 - x2;
	var b = y1 - y2;

	return Math.sqrt( a*a + b*b );
};

