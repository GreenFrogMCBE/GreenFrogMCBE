module.exports = {
	/**
	 * Capitalizes the first letter of a string
	 *
	 * @param {string} str
	 * @returns {string}
	 */
	capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	},
};
