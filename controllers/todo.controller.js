const { error } = require("console");
const fs = require("fs");
const db = require("../config/db");

const DATA_FILE = __dirname + "/../models/data.json";
const getToDo = async (req, res) => {
	await db
		.query("select * from suppliers")
		.then((result) => {
			console.log(result.rows);
			res.status(200).json({
				data: result.rows,
			});
		})
		.catch((e) => {
			console.log(e);
			res.status(500).json({
				message: "INTERNAL SERVER ERROR",
			});
		});
};

const postToDo = async (req, res) => {
	const body = req.body;
	console.log(req.body);
	let data = [];
	await db
		.query(`INSERT INTO suppliers (Name) VALUES ('${body.name}')`)
		.then(() => {
			db.query("select * from suppliers")
				.then((results) => {
					data = results.rows;
					console.log(data);
				})
				.then(() => {
					res.status(200).json({
						new_suppliers_data: data,
						message: "Data Successfully inserted",
					});
				});
		})
		.catch((e) => {
			console.log(e);
			res.status(500).json({
				message: "INTERNAL SERVER ERROR",
			});
		});
};
const putToDo = async (req, res) => {
	const body = req.body;
	let id = req.params.id;
	console.log(id);
	let data = [];
	let updatedData = [];
	await db
		.query(`select * from suppliers where id='${id}'`)
		.then((results) => {
			data = results.rows;
		})
		.then(() => {
			console.log(data);
			if (data.length != 0) {
				db.query(
					`UPDATE suppliers
                SET Name = '${body.name}'
                WHERE id = ${id};`
				)
					.then(() => {
						db.query("select * from suppliers").then((updated) => {
							updatedData = updated;
							console.log(updatedData);
						});
					})
					.then(() => {
						res.status(200).json({
							message: "Data Successfully Updated",
						});
					});
			} else {
				res.status(500).json({
					message: "No data in database",
				});
			}
		})
		.catch((e) => {
			console.log(e);
			res.status(500).json({
				message: "INTERNAL SERVER ERROR",
			});
		});
};
const deleteToDo = async (req, res) => {
	const body = req.body;
	let id = req.params.id;
	console.log(id);
	let data = [];
	let updatedData = [];
	await db
		.query(`select * from suppliers where id='${id}'`)
		.then((results) => {
			data = results.rows;
		})
		.then(() => {
			console.log(data);
			if (data.length != 0) {
				db.query(
					`DELETE FROM suppliers
                WHERE id = ${id};`
				)
					.then(() => {
						db.query("select * from suppliers").then((updated) => {
							updatedData = updated;
							console.log(updatedData);
						});
					})
					.then(() => {
						res.status(200).json({
							message: "Data Successfully deleted",
						});
					});
			} else {
				res.status(500).json({
					message: "No data in database",
				});
			}
		})
		.catch((e) => {
			console.log(e);
			res.status(500).json({
				message: "INTERNAL SERVER ERROR",
			});
		});
};
module.exports = {
	getToDo,
	postToDo,
	putToDo,
	deleteToDo,
};
