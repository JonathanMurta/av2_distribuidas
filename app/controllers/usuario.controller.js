const db = require("../models");
const Usuario = db.usuario;

exports.store = (req, res) => {
	const usuario = {
		nome_completo: req.body.nome_completo,
		email: req.body.email,
		ativo: req.body.ativo ? req.body.ativo : false
	}

	Usuario.create(usuario).then((data) => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
		message: err.message || "Erro ao Criar Usuário"
		})
	})
}

exports.show = async (req, res) =>
{
	const users = await Usuario.findAll()

	res.status(200).json(users)
}

exports.update = async (req, res) =>
{
	if(req.body.id)
	{
		const users = await Usuario.update(req.body,
		{
			where:
			{
				id: req.body.id
			}
		})

		let result

		if(users.length)
		{
			const updateUsers = await Usuario.findAll({
				where:
				{
					id: req.body.id
				}
			})

			result = {update: users.length}
			Object.assign(result, updateUsers)
		}
		else
			result = {update: users.length}

		res.status(200).json(result)
	}
	else
		res.status(500).json({})
}

exports.destroy = async (req, res) =>
{
	if(req.body.id)
	{
		const users = await Usuario.destroy({
			where:
			{
				id: req.body.id
			}
		})

		res.status(200).json({delete: users, id: req.body.id})
	}
	else
		res.status(500).json({})
}