import { useState, useEffect } from 'react'
import { Oval } from 'react-loader-spinner'
import UserCard from './components/UserCard/UserCard';
import './App.css';
import 'antd/dist/reset.css';
import { Row, Col, Card, Modal, Form, Input, Button } from "antd";
import { EditOutlined, DeleteOutlined, LikeOutlined } from "@ant-design/icons";

const { Meta } = Card;


const uiDisplayStatus = {
  loading: 'LOADING',
  success: "SUCCESS",
  failure: "FAILURE"
}

const avatarData = [
  { color: "#F06292", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=crimsonFalcon91" },
  { color: "#8E44AD", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=shadowWolf82" },
  { color: "#5DADE2", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=cosmicTiger73" },
  { color: "#00BCD4", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=neonDragon64" },
  { color: "#8BC34A", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=ironPhoenix55" },
  { color: "#CDDC39", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=emberLion46" },
  { color: "#FFEB3B", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=arcticFox37" },
  { color: "#FF9800", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=blazeEagle28" },
  { color: "#9C27B0", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=quantumBear19" },
  { color: "#03A9F4", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=stellarPanda10" }
];



function App() {
  const [userData, setUserData] = useState([])
  const [currentStatus, setCurrentStatus] = useState(uiDisplayStatus.loading)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (response.ok) {
        const data = await response.json()
        const newData = data.map((each, i) => ({
          ...each,
          avatar: avatarData[i % avatarData.length].avatar,
          avatarBg: avatarData[i % avatarData.length].color
        }));

        setCurrentStatus(uiDisplayStatus.success)
        setUserData(newData)
      } else {
        setCurrentStatus(uiDisplayStatus.failure)
      }

    }
    fetchData()
  }, [])

  const loading = () => (
    <div className='loader-container'>
      <div>
        <Oval
          color="blue" secondaryColor='blue' />
        <p className='load-para'>Please wait...</p>
      </div>
    </div>
  )

  const failure = () => (
    <div className='loader-container'>
      <h1>Opps Something wrong!</h1>
    </div>
  )

  const success = () => (
    <div className='success-main-container'>
      <div className='success-container'>
        {
          userData.map(each => <UserCard each={each} key={each.id} />)
        }
      </div>
      {antFunction()}
    </div>
  )

  const antFunction = () => (
    <div className='ant-container'>
      <Row gutter={[16, 16]}>
        {users.map((user) => (
          <Col xs={24} sm={12} md={8} key={user.id}>
            <Card
              hoverable
              title={user.name}
              actions={[
                <LikeOutlined key="like" />,
                <EditOutlined key="edit" onClick={() => handleEdit(user)} />,
                <DeleteOutlined key="delete" onClick={() => handleDelete(user.id)} />,
              ]}
            >
              <Meta description={`${user.email} | ${user.city}`} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 🔹 Modal Form */}
      <Modal
        title="Edit User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter email" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="City" name="city">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  )

  const renderFunction = () => {
    switch (currentStatus) {
      case (uiDisplayStatus.loading):
        return loading()
      case (uiDisplayStatus.failure):
        return failure()
      case (uiDisplayStatus.success):
        return success()
      default:
        return null
    }
  }

  const [users, setUsers] = useState([
    { id: 1, name: "Virat Kohli", email: "virat@rcb.com", city: "Delhi" },
    { id: 2, name: "Rohit Sharma", email: "rohit@mi.com", city: "Mumbai" },
    { id: 3, name: "MS Dhoni", email: "dhoni@csk.com", city: "Ranchi" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // modal open/close
  const [selectedUser, setSelectedUser] = useState(null); // current editing user
  const [form] = Form.useForm(); // AntD form instance

  // 🔹 Edit button click
  const handleEdit = (user) => {
    setSelectedUser(user);
    form.setFieldsValue(user); // fill form with selected user data
    setIsModalOpen(true);
  };

  // 🔹 Save form
  const handleSave = (values) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? { ...u, ...values } : u))
    );
    setIsModalOpen(false);
  };

  // 🔹 Delete user
  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="main-container">
      {renderFunction()}

    </div>
  );
}

export default App;
