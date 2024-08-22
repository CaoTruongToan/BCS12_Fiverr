// import React, { useContext, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getValueUserApi } from "../../redux/nguoiDungSlice";
// import { Space, Table, Tag } from "antd";
// import { nguoiDungService } from "../../service/nguoiDung.service";
// import { NotificationContext } from "../../App";

// const ManagerUser = () => {
//     const { showNotification } = useContext(NotificationContext);
//     const dispatch = useDispatch();
//     const { listNguoiDung } = useSelector((state) => state.nguoiDungSlice);

//     useEffect(() => {
//         dispatch(getValueUserApi());
//     }, [dispatch]);

//     const columns = [
//         {
//             title: "ID",
//             dataIndex: "id",
//             key: "id",
//         },
//         {
//             title: "Avatar",
//             dataIndex: "avatar",
//             key: "avatar",
//             render(item) {
//                 const imageRegex = /\.(jpeg|jpg|gif|png|svg|webp)$/i;
//                 const defaultImage = "https://w7.pngwing.com/pngs/29/173/png-transparent-null-pointer-symbol-computer-icons-pi-miscellaneous-angle-trademark.png";
//                 const imageUrl = imageRegex.test(item) ? item : defaultImage;

//                 return (
//                     <img  
//                         className="rounded"
//                         width={50}
//                         src={imageUrl}
//                         alt="avatar"
//                     />
//                 );
//             },
//         },
//         {
//             title: "Name",
//             dataIndex: "name",
//             key: "name",
//         },
//         {
//             title: "Email",
//             dataIndex: "email",
//             key: "email",
//         },
//         {
//             title: "Role",
//             dataIndex: "role",
//             key: "role",
//             render: (text) => (
//                 <Tag color={text === "USER" ? "cyan" : "red"}>{text}</Tag>
//             ),
//         },
//         {
//             title: "Action",
//             key: "action",
//             render: (_, record) => (
//                 <Space size="middle" className="space-x-3">
//                     <button
//                         onClick={() => {
//                             nguoiDungService
//                                 .deleteUser(record.id)
//                                 .then((res) => {
//                                     console.log(res);
//                                     // Dispatch to refresh the user list
//                                     dispatch(getValueUserApi());
//                                     showNotification(
//                                         "Xoá thành công",
//                                         "success"
//                                     );
//                                 })
//                                 .catch((err) => {
//                                     console.log(err);
//                                     showNotification(
//                                         err.response.data.message ||
//                                             err.response.data.content,
//                                         "error"
//                                     );
//                                 });
//                         }}
//                         className="bg-red-500/85 text-white py-2 px-5"
//                     >
//                         Xoá
//                     </button>
//                     <button className="bg-yellow-500/85 text-white py-2 px-5">
//                         Sửa
//                     </button>
//                 </Space>
//             ),
//         },
//     ];

//     return (
//         <div>
//             <Table
//                 columns={columns}
//                 dataSource={listNguoiDung}
//                 rowKey="id" // Ensure each row has a unique key
//             />
//         </div>
//     );
// };

// export default ManagerUser;


import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getValueUserApi } from "../../redux/nguoiDungSlice";
import { Space, Table, Tag, Modal, Button, Form, Input } from "antd";
import { nguoiDungService } from "../../service/nguoiDung.service";
import { NotificationContext } from "../../App";

const ManagerUser = () => {
    const { showNotification } = useContext(NotificationContext);
    const dispatch = useDispatch();
    const { listNguoiDung } = useSelector((state) => state.nguoiDungSlice);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getValueUserApi());
    }, [dispatch]);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (item) => {
                const imageRegex = /\.(jpeg|jpg|gif|png|svg|webp)$/i;
                const defaultImage = "https://w7.pngwing.com/pngs/29/173/png-transparent-null-pointer-symbol-computer-icons-pi-miscellaneous-angle-trademark.png";
                const imageUrl = imageRegex.test(item) ? item : defaultImage;

                return (
                    <img
                        className="rounded"
                        width={50}
                        src={imageUrl}
                        alt="avatar"
                    />
                );
            },
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (text) => (
                <Tag color={text === "USER" ? "cyan" : "red"}>{text}</Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle" className="space-x-3">
                    <Button
                        onClick={() => {
                            nguoiDungService
                                .deleteUser(record.id)
                                .then((res) => {
                                    console.log(res);
                                    // Dispatch to refresh the user list
                                    dispatch(getValueUserApi());
                                    showNotification("Xoá thành công", "success");
                                })
                                .catch((err) => {
                                    console.log(err);
                                    showNotification(
                                        err.response?.data?.message || "Lỗi",
                                        "error"
                                    );
                                });
                        }}
                        className="bg-red-500/85 text-white py-2 px-5"
                    >
                        Xoá
                    </Button>
                    <Button className="bg-yellow-500/85 text-white py-2 px-5">
                        Sửa
                    </Button>
                </Space>
            ),
        },
    ];

    const handleAddUser = (values) => {
        nguoiDungService
            .addUser(values)
            .then((res) => {
                dispatch(getValueUserApi());
                showNotification("Thêm tài khoản thành công", "success");
                setIsModalVisible(false);
                form.resetFields();
            })
            .catch((err) => {
                console.log(err);
                showNotification(err.response?.data?.message || "Lỗi", "error");
            });
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    return (
        <div>
            <Button type="primary" onClick={showModal} className="mb-4">
                Thêm Tài Khoản
            </Button>

            <Table
                columns={columns}
                dataSource={listNguoiDung}
                rowKey="id"
            />

            <Modal
                title="Thêm Tài Khoản"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddUser}>
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: "Vui lòng nhập role!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Avatar"
                        name="avatar"
                        // rules={[{ required: true, message: "Vui lòng nhập avatar URL!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManagerUser;
