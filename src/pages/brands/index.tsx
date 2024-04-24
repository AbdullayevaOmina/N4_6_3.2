import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Modal, Form } from "react-bootstrap";
import http from "../../plugins/axios";


const index = () => {
  const [brands, setBrands] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    http
      .get("/brands")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
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
      await http.post("/brands", formData);
      toast.success("Brand added");
      handleClose();
    } catch (error) {
      console.error("Error adding brand:", error);
      toast.error("Error adding brand");
    }
  };

  const editModal = async (brandID) => {
    try {
      const response = await http.get(`/brands/${brandID}`);
      const modelData = response.data;
      setFormData(modelData); 
      handleShow();
    } catch (error) {
      console.error("Error fetching brand data:", error);
      toast.error("Error fetching brand data");
    }
  };

  const deleteModal = async (brandID) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this Brand?"
    );
    if (confirmation) {
      try {
        await http.delete(`/brands/${brandID}`);
        toast.success("Brand deleted");
        setBrands(brands.filter((brand) => brand.id !== brandID));
      } catch (error) {
        toast.error("Error deleting brand");
      }
    }
  };

  return (
    <div>
      <div className="d-flex gap-8 h-9 my-3">
        <h2>Brands</h2>
        <form className="d-flex input-group">
          <input
            type="search"
            className="form-control"
            placeholder="Search Brand..."
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
          <Modal.Title>Add New Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Brand name:</Form.Label>
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
            Add brand
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
          {brands.map((brand, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{brand.id}</td>
              <td>{brand.name}</td>
              <td className="d-flex gap-2">
                <Button variant="warning" onClick={() => editModal(brand.id)}>
                  <i className="fa-solid fa-pen"></i> Edit
                </Button>
                <Button variant="danger" onClick={() => deleteModal(brand.id)}>
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
