import React, { FC, ReactElement, ReactNode, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";

type TodoType = {
  id: number;
  title: string;
  is_done: boolean;
};

export default function TodoPage(): ReactElement {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoType[]>([
    { id: 1, title: "tes", is_done: false },
    { id: 2, title: "test 2", is_done: true },
    { id: 3, title: "test 3", is_done: false },
  ]);

  const [editTodo, setEditTodo] = useState<TodoType | null>(null);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO Buraya yorum at
    //const arr1 = [1, 2, 3, 4];
    //const arr2 = new Array<number>();
    //arr2.push()
    //arr2[0]

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    console.log("Form Value", formJson);
    // Form Value {title: 'test', is_done: 'on'}
    // Form Value {title: 'test'}

    if (editTodo) {
      // `find()` metodu eğer itemi bulursa dönderir, bulamazsa
      // undefined dönderir. Gelen itemin kopyası değil referansı
      // bize ulaşır, bu yüzden bu item üzerinde yapılan değişiklikler
      // aslında dizinin üzerinde doğrudan yapılmış olur.
      const foundItem: TodoType | undefined = todos.find(
        (item, index) => item.id === editTodo.id
      );

      if (foundItem) {
        // foundItem değişkeni ilgili itemin referansını tutmaktadır.
        // bundan dolayı doğrudan item üzerinde değişiklik yapmak mümkündür.
        foundItem.title = formJson.title as string;
        foundItem.is_done = formJson.is_done ? true : false;

        // Eğer typescript bize referansı değil de bulunan itemin kopyasını
        // vermiş olsaydı o durumda ilgili itemin güncellenebilmesi için
        // yeni bir obje oluşturup o objeyi `splice()` fonksiyonunu kullanarak
        // ilgili indexe set etmemiz gerekirdi. `splice()` fonksiyonu hem dizi
        // içerisinde item silmek için hem de eklemek için kullanılır.
      } else {
        alert("Item bulunamadı...");
      }
    } else {
      todos.push({
        id: todos.length + 1,
        title: formJson.title as string,

        // input check için şöyle bir istisna var. eğer check seçiliyse formJson'a gelir,
        // seçili değilse gelmez. yani true-false olma durumunu mevcut olup olmadığına
        // göre belirleriz.
        is_done: formJson.is_done ? true : false,
      });
    }

    // Aynı referansa sahip olan state değişkenini kullanırsak component tekrar
    // render olmaz, bu yüzden spread operatör ile birlikte yeni bir dizi
    // oluşturup onu set etmemiz gerekiyor.
    //setTodos(todos); // bu satır çalışmaz
    setTodos([...todos]); // bu satır çalışır

    setModalShow(false);
  };

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <form onSubmit={onFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Todo Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Todo Title"
                defaultValue={editTodo ? editTodo.title : ""}
              />
              <Form.Text className="text-muted">
                Write todo title here.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="is_done"
                label="Is Done?"
                defaultChecked={editTodo ? editTodo.is_done : false}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setModalShow(false)}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">Todo Page</h1>
      </div>

      <Row>
        <Col sm={12}>
          <Button
            onClick={() => {
              setEditTodo(null);
              setModalShow(true);
            }}
            variant="primary"
            className="mb-3"
          >
            Add New Todo
          </Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Is Done?</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {todos.map<ReactElement>((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>
                      <input
                        onChange={() => {
                          todos[index].is_done = !todos[index].is_done;
                          setTodos([...todos]);
                        }}
                        type="checkbox"
                        checked={item.is_done}
                      />
                      &nbsp;
                      {item.is_done ? "Yapıldı" : "Bekliyor"}
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          console.log("Silmeden önce:", todos);
                          todos.splice(index, 1);
                          console.log("Sildikten sonra:", todos);

                          setTodos([...todos]);
                        }}
                        variant="danger"
                        className="me-2 btn-sm"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => {
                          setEditTodo(item);
                          setModalShow(true);
                        }}
                        variant="success"
                        className="me-2 btn-sm"
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}