import { useEffect, useState } from 'react';
import { fetchTodos } from '../data/todos';
import { Badge, Button, Form, Table, Modal } from 'react-bootstrap';

const Todos = () => {
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [numPages, setNumPages] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const [show, setShow] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setTodosRaw(fetchTodos());
  }, []);

  useEffect(() => {
    setCurPage(1);
  }, [numPages]);

  useEffect(() => {
    if (onlyWaiting) {
      setFilteredTodos(todosRaw.filter((todo) => !todo.completed));
    } else {
      setFilteredTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting]);

  useEffect(() => {
    setNumPages(Math.ceil(filteredTodos.length / itemsPerPage));
  }, [itemsPerPage, filteredTodos]);

  useEffect(() => {
    const startIndex = (curPage - 1) * itemsPerPage;
    const endIndex = startIndex + parseInt(itemsPerPage);

    setTodos(filteredTodos.slice(startIndex, endIndex));
  }, [curPage, itemsPerPage, filteredTodos]);

  return (
    <div
      className='w-100 h-auto d-flex flex-column justify-content-center align-items-center bg-white rounded-4 p-3'
      style={{ boxShadow: '0 5px 5px #cccccc' }}
    >
      {/* filter */}
      <Form className='w-100 mb-3'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <Form.Check
              type='switch'
              id='custom-switch'
              label='Show only'
              onChange={(e) => setOnlyWaiting(e.target.checked)}
            />
            &nbsp;
            <Button
              variant='warning'
              disabled
              style={{ opacity: 1, pointerEvents: 'none' }}
            >
              Waiting <i className='bi bi-clock ms-2'></i>
            </Button>
          </div>

          <Form.Select
            aria-label='Default select example'
            style={{ width: '10%' }}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          >
            <option value={5}>5 items per page</option>
            <option value={10}>10 items per page</option>
            <option value={50}>50 items per page</option>
            <option value={100}>100 items per page</option>
          </Form.Select>
        </div>
      </Form>

      {/* table */}
      <div className='w-100'>
        <Table striped bordered hover>
          <thead className='table-dark'>
            <tr>
              <th
                className='text-center align-content-center'
                style={{ width: '5rem' }}
              >
                ID
              </th>
              <th className='text-center align-content-center'>Title</th>
              <th
                className='text-end align-content-center'
                style={{ width: '12rem' }}
              >
                Completed &nbsp;
                <Button onClick={handleShow}>+</Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td className='text-center align-content-center fs-5'>
                    <Badge bg='secondary'>{todo.id}</Badge>
                  </td>
                  <td className='align-content-center'>{todo.title}</td>
                  <td className='d-flex align-items-center justify-content-end align-content-center'>
                    {todo.completed ? (
                      <Badge bg='success' className='fs-6 fw-normal py-2 px-3'>
                        Done <i className='bi bi-check2 ms-2'></i>
                      </Badge>
                    ) : (
                      <Button
                        variant='warning'
                        onClick={() => {
                          const newTodosRaw = todosRaw.map((t) =>
                            t.id === todo.id ? { ...t, completed: true } : t
                          );
                          setTodosRaw(newTodosRaw);
                        }}
                      >
                        Waiting <i className='bi bi-clock ms-2'></i>
                      </Button>
                    )}
                    <Button
                      className='ms-2'
                      variant='danger'
                      onClick={() => {
                        setTodosRaw(todosRaw.filter((t) => t.id !== todo.id));
                      }}
                    >
                      <i className='bi bi-trash'></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* page control */}
      <div className='text-center'>
        <Button
          variant='outline-primary'
          onClick={() => setCurPage(1)}
          disabled={curPage === 1}
        >
          First
        </Button>
        &nbsp;
        <Button
          variant='outline-primary'
          onClick={() => curPage > 1 && setCurPage((p) => p - 1)}
          disabled={curPage === 1}
        >
          Previous
        </Button>
        &nbsp;
        <span>
          {curPage}&nbsp;/&nbsp;{numPages}
        </span>
        &nbsp;
        <Button
          variant='outline-primary'
          onClick={() => curPage < numPages && setCurPage((p) => p + 1)}
          disabled={curPage === numPages}
        >
          Next
        </Button>
        &nbsp;
        <Button
          variant='outline-primary'
          onClick={() => setCurPage(numPages)}
          disabled={curPage === numPages}
        >
          Last
        </Button>
      </div>

      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>ID:</Form.Label>&nbsp;
              <Badge bg='secondary' className='fs-6'>{Math.max(0, ...todosRaw.map((t) => t.id)) + 1}</Badge>
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type='text'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder='typing your todo title here...'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              const newTodo = {
                id: Math.max(0, ...todosRaw.map((t) => t.id)) + 1,
                title: newTitle,
                completed: false,
              };
              setTodosRaw([...todosRaw, newTodo]);
              setNewTitle('');
              handleClose();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Todos;