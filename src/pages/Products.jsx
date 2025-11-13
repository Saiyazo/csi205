import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Products = ({ products, carts, setCarts }) => {
  return (
    <div className="container mt-3">
      <div className="row g-4"> {/* g-4 เพิ่มช่องว่างระหว่าง card */}
        {products.map((product) => (
          <div key={product.id} className="col-md-4 col-sm-6"> {/* 3 รูปต่อแถว */}
            <Card style={{ width: "100%" }}>
              <Card.Img variant="top" src={product.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  <b>${product.price.toFixed(2)}</b>
                </Card.Text>
                {carts.find((cart) => cart.id === product.id) ? (
                  <span className="badge bg-danger">Added</span>
                ) : (
                  <Button
                    variant="outline-primary"
                    onClick={() => setCarts([...carts, product])}
                  >
                    Add to cart
                  </Button>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
