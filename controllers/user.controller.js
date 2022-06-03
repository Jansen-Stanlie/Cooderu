const { User } = require("../models");

const create = async (req, res) => {
	const body = req.body;
	const firstName = body.firstName;
	const lastName = body.lastName;
	const email = body.email;

	return User.create({
		firstName: firstName,
		lastName: lastName,
		email: email,
	})
		.then((user) => {
			res.status(200).send({
				status: "SUCCESS",
				message: "User berhasil dibuat",
				data: user,
			});
		})
		.catch((e) => {
			console.log(e);
			res.status(503).send({
				status: "FAIL",
				message: "Gagal membuat user",
			});
		});
};

const findAll = async (req, res) => {};

const deleteUser = async (req, res) => {};

const updateUser = async (req, res) => {};

module.exports = {
	create,
	findAll,
	deleteUser,
	updateUser,
};
