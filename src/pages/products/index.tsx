import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button, Card, Modal, Form } from "react-bootstrap";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: Number,
    imageUrl: "",
    modelId: Number,
    brandId: Number,
  });

  const formInputInfo = [
    { label: "Product Name:", name: "name" },
    { label: "Price:", name: "price", type: "number" },
    { label: "Img URL:", name: "imageUrl" },
    { label: "Model ID:", name: "modelId", type: "number" },
    { label: "Brand ID:", name: "brandId", type: "number" },
  ];

  useEffect(() => {
    axios
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
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

  const handleAddProduct = async () => {
    try {
      await axios.post("/products", formData);
      toast.success("Product added");
      handleClose();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product");
    }
  };

  async function editProduct(productID) {}

  async function deleteProduct(productID) {
    const confirmation = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmation) {
      try {
        await axios.delete(`/products/${productID}`);
        toast.success("Product deleted");
        setProducts(products.filter((product) => product.id !== productID));
      } catch (error) {
        toast.error("Error deleting product");
      }
    }
  }

  return (
    <div>
      <div className="d-flex gap-8 h-9 my-3">
        <h2>Products</h2>
        <form className="d-flex input-group">
          <input
            type="search"
            className="form-control"
            placeholder="Search product..."
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
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {formInputInfo.map((item, i) => {
              return (
                <Form.Group className="mb-3">
                  <Form.Label>{item.label}</Form.Label>
                  <Form.Control
                    type={item.type}
                    name={item.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              );
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        {products.map((product, index) => (
          <Card key={index} className="w-1/3">
            <Card.Header className="text-center">
              <Link
                to={`/main/products/${product.id}`}
                className="text-decoration-none"
              >
                {product.name}
              </Link>
            </Card.Header>
            <Card.Body>
              <img
                className="bg-slate-400 w-full h-60"
                src={product.imageUrl}
                alt={product.name}
              />
              <p className="mt-3 text-center">{product.price} 💲</p>
              <small>{product.description}</small>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-center gap-3">
              <Button variant="warning" onClick={() => editProduct(product.id)}>
                <i className="fa-solid fa-pen"></i>
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteProduct(product.id)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </Button>
              <Link to={`/main/products/${product.id}`}>
                <Button variant="primary">
                  <i className="fa-solid fa-eye"></i>
                </Button>
              </Link>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
