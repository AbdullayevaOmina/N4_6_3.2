import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Modal, Form } from "react-bootstrap";

const index = () => {
  const [models, setModels] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    axios
      .get("/models")
      .then((response) => {
        setModels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching models:", error);
      });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddModel = async () => {
    try {
      await axios.post("/models", formData);
      toast.success("Model added");
      handleClose();
    } catch (error) {
      console.error("Error adding model:", error);
      toast.error("Error adding model");
    }
  };

  const editModal = async (modelID) => {
    try {
      const response = await axios.get(`/models/${modelID}`);
      const modelData = response.data;
      setFormData(modelData); // Form verilerini mevcut model verileriyle doldur
      handleShow(); // Modalı göster
    } catch (error) {
      console.error("Error fetching model data:", error);
      toast.error("Error fetching model data");
    }
  };

  const deleteModal = async (modelID) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this Model?"
    );
    if (confirmation) {
      try {
        await axios.delete(`/models/${modelID}`);
        toast.success("Model deleted");
        setModels(models.filter((model) => model.id !== modelID));
      } catch (error) {
        toast.error("Error deleting model");
      }
    }
  };

  return (
    <div>
      <div className="d-flex gap-8 h-9 my-3">
        <h2>Models</h2>
        <form className="d-flex input-group">
          <input
            type="search"
            className="form-control"
            placeholder="Search Model..."
          />
          <button className="btn btn-primary rounded-r-none" type="button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <Button variant="success" onClick={handleShow} type="submit">
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Model</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Model name:</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddModel}>
            Add Model
          </Button>
        </Modal.Footer>
      </Modal>

      <table className="table table-striped ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{model.id}</td>
              <td>{model.name}</td>
              <td className="d-flex gap-2">
                <Button variant="warning" onClick={() => editModal(model.id)}>
                  <i className="fa-solid fa-pen"></i> Edit
                </Button>
                <Button variant="danger" onClick={() => deleteModal(model.id)}>
                  <i className="fa-solid fa-trash-can"></i> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default index;
