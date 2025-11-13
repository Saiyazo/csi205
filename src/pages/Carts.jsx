import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Carts = ({ carts, setCarts }) => {
  return (
    <div className="container mt-3">
      <div className="row g-4">
        {carts.map((cart) => (
          <div key={cart.id} className="col-md-4 col-sm-6">
            <Card style={{ width: "100%" }}>
              <Card.Img variant="top" src={cart.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{cart.title}</Card.Title>
                <Card.Text>
                  <b>${cart.price.toFixed(2)}</b>
                </Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={() =>
                    setCarts(carts.filter((c) => c.id !== cart.id))
                  }
                >
                  Remove From Cart
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <h4>
          Items:{" "}
          <button type="button" className="btn btn-danger">
            {carts.length} items
          </button>{" "}
          - Total Price:{" "}
          <button type="button" className="btn btn-success">
            $
            {carts
              .reduce((prev, cart) => prev + cart.price, 0)
              .toFixed(2)}
          </button>
        </h4>

        <Button type="button" variant="warning" className="mt-3">
          Checkout&nbsp;<i className="bi bi-credit-card"></i>
        </Button>
      </div>
    </div>
  );
};

export default Carts;
