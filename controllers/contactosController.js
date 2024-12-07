import contactoModel from "../models/contactosModel.js";

// Controlador
class contactosController {
  //Controllador para crear
  async createComment(req, res) {
    try {
      const { name, comment, email} = req.body;
      // Crear Comentario
      console.log({ name, comment, email } )
      const newComment = await contactoModel.create({
        name,
        comment,
        email,
        ip: req.ip,
        date: new Date(),
      });

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(newComment));
    } catch (error) {
      return res.end(JSON.stringify({ message: "Internal server error" }));
    }
  }

  // Controllador para obtener todos los datos
  async getComments(req, res) {
    try {
      const projects = await contactoModel.getAll();
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(projects));
    } catch (error) {
      console.error(error);
      return res.end(JSON.stringify({ message: "Internal server error" }));
    }
  }
}
// Exportamos una sola instancia del controllador
export default new contactosController();
