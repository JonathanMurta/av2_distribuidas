module.exports = (app) => {
	const usuario = require("../controllers/usuario.controller.js");

	var router = require("express").Router();

	//----
	router.route("/")
		  .get(usuario.show)
		  .post(usuario.store)
		  .put(usuario.update)
		  .delete(usuario.destroy)
	//----
	app.use('/api/usuario', router);
}