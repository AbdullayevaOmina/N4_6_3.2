import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button, Card, Modal, Form } from "react-bootstrap";
import { Get, Post, Delete } from "@httpModel";

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const Index = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    imageUrl: "",
    modelId: 0,
    brandId: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await Get("/products");
        setProducts(productResponse);

        const brandResponse = await Get("/brands");
        setBrands(brandResponse);

        const modeldResponse = await Get("/models");
        setModels(modeldResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleAddProduct = async () => {
    try {
      await Post("/products", formData);
      toast.success("Product added");
      handleClose();
    } catch (error) {
      toast.error("Error adding product");
    }
  };

  async function editProduct(productID: number) {}

  async function deleteProduct(productID: number) {
    const confirmation = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmation) {
      try {
        await Delete(`/products/`, productID);
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
          <button className="btn btn-primary rounded-r-none" type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <Button variant="success" onClick={handleShow}>
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name:</Form.Label>
              <Form.Control name="name" onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                name="price"
                onChange={handleInputChange}
                required
                type="number"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Img URL:</Form.Label>
              <Form.Control
                name="imageUrl"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Model:</Form.Label>
              <Form.Select name="modelId" onChange={handleInputChange} required>
                <option value="">Select...</option>
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand:</Form.Label>
              <Form.Select name="brandId" onChange={handleInputChange} required>
                <option value="">Select...</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
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
        {products.map((product: ProductType) => (
          <Card key={product.id} className="w-1/3">
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
