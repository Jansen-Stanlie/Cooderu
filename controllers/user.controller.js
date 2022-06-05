const { User } = require("../models");

const create = async (req, res) => {
	const body = req.body;
	const firstName = body.firstName;
	const lastName = body.lastName;
	const email = body.email;

	return User.findAll({})
		.then((user) => {
			let value = true;
			for (let i = 0; i < user.length; i++) {
				if (user[i].email == email) {
					value = false;
				}
			}
			if (value) {
				return User.create({
					firstName: firstName,
					lastName: lastName,
					email: email,
				}).then((users) => {
					res.status(200).send({
						status: "SUCCESS",
						message: "User berhasil dibuat",
						data: users,
					});
				});
			} else {
				res.status(500).send({
					status: "FAIL",
					message: "Failed to create user with same email",
				});
			}
		})
		.catch((e) => {
			console.log(e);
			res.status(503).send({
				status: "FAIL",
				message: "Failed to create user",
			});
		});
};

const findAll = async (req, res) => {
	return User.findAll({
		order: [["firstName", "ASC"]],
	})
		.then((user) => {
			res.status(200).send({
				status: "SUCCESS",
				message: "Data Fetched",
				data: user,
				length: user.length,
			});
		})
		.catch((e) => {
			console.log(e);
			res.status(503).send({
				status: "FAIL",
				message: "Fetched Data Failed",
			});
		});
};

const deleteUser = async (req, res) => {
	let idUser = req.params.id;
	console.log(idUser);
	let data = [];

	return User.findOne({
		where: { id: idUser },
	})
		.then((user) => {
			console.log("User", user);
			if (user !== null) {
				return User.destroy({
					where: {
						id: idUser,
					},
				}).then(() => {
					res.status(200).send({
						status: "SUCCESS",
						message: `User with ${idUser} has been deleted`,
						data: user,
					});
				});
			} else {
				res.status(503).send({
					status: "FAIL",
					message: "No Data in Database",
				});
			}
		})
		.catch((e) => {
			console.log(e);
			res.status(503).send({
				status: "FAIL",
				message: "Delete Data Failed",
			});
		});
};

const updateUser = async (req, res) => {
	const body = req.body;
	const firstName = body.firstName;
	const lastName = body.lastName;
	const email = body.email;
	let idUser = req.params.id;
	console.log(idUser);
	return User.findOne({
		where: { id: idUser },
	})
		.then((user) => {
			console.log("User", user);
			if (user !== null) {
				return User.update(
					{ firstName: firstName, lastName: lastName, email: email },
					{
						where: {
							id: idUser,
						},
					}
				)
					.then(() => {
						return User.findOne({
							where: { id: idUser },
						});
					})
					.then((users) => {
						res.status(200).send({
							status: "SUCCESS",
							message: `User with ${idUser} has been updated`,
							data: users,
						});
					});
			} else {
				res.status(503).send({
					status: "FAIL",
					message: "No Data in Database",
				});
			}
		})
		.catch((e) => {
			console.log(e);
			res.status(503).send({
				status: "FAIL",
				message: "Delete Data Failed",
			});
		});
};

module.exports = {
	create,
	findAll,
	deleteUser,
	updateUser,
};
