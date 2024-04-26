import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Modal, Form } from "react-bootstrap";
import http from "@http";
import Table from "@table";

const Index = () => {
  const [brands, setBrands] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ id: "", name: "" });

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
      const brandData = response.data;
      setFormData(brandData);
      handleShow();
    } catch (error) {
      console.error("Error fetching brand data:", error);
      toast.error("Error fetching brand data");
    }
  };

  const handleEdit = async () => {
    try {
      await http.patch(`/brands/${formData.id}`, formData);
      toast.success("Brand updated");
      handleClose();
    } catch (error) {
      console.error("Error editing brand:", error);
      toast.error("Error editing brand");
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

  const headers = [
    { title: "ID", value: "id" },
    { title: "Name", value: "name" },
    { title: "Actions", value: "action" },
  ];

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
          <Modal.Title>Add/Edit Brand</Modal.Title>
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
          <Button
            variant="primary"
            onClick={formData.id ? handleEdit : handleAddModel}
          >
            {formData.id ? "Edit Brand" : "Add Brand"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Table headers={headers} body={brands} />
    </div>
  );
};

export default Index;
