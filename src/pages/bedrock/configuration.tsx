/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
// only import what you want to use
import {
  Breadcrumb,
  Button,
  Label,
  Modal,
  Spinner,
  Table,
  TextInput,
  Textarea,
} from "flowbite-react";

import { useEffect, useState, type FC } from "react";
import {
  HiHome
} from "react-icons/hi";

import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { FaEdit, FaPlus, FaRemoveFormat } from "react-icons/fa";
import axios from "axios";

export interface Item {
  item_name: string;
  item_key: string;
  item_value: string;
}

const BedrockConfigurationPage: FC = function () {
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/bedrock">
                Amazon Bedrock
              </Breadcrumb.Item>
              <Breadcrumb.Item>Settings</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All Configrations
            </h1>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow">
                  {/* <div className="flex w-full items-center sm:justify-end">
                    <AddItemModal />
                  </div> */}
                  <ItemsTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

const ItemsTable: FC = function () {
  const [data, setData] = useState<Item[]>([]);
  const [modalData, setModalData] = useState<Item | undefined>(undefined);
  const [isOpen, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);


  const emptyItem: Item = {
    item_name: '',
    item_key: '',
    item_value: ''
  };

  const refreshData = async () => {
    const response = await axios.get('/api/config');
    // debugger;
    setData(response.data)
  }

  const handleItemSubmit = async () => {
    try {
      setLoading(true)
      if (isEdit) {
        await axios.post("/api/config", {
          "key": modalData?.item_key,
          "name": modalData?.item_name,
          "value": modalData?.item_value
        });
      } else {
        await axios.post("/api/config", {
          "key": modalData?.item_key,
          "name": modalData?.item_name,
          "value": modalData?.item_value
        });
      }
      await refreshData()
      setOpen(false)
    } catch (error) {
      console.error("Add Config failed:", error);
      throw error;
    } finally {
      setLoading(false)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (modalData) {
      setModalData({
        ...modalData,
        [e.target.name]: e.target.value,
      } as Item);
    }
  };

  const handleDeleteItem = async (item: Item) => {
    const response = await axios.delete("/api/config/" + item.item_key);
    console.log(response)
    await refreshData()
    return true
  }

  useEffect(() => {
    // 在此处添加获取数据的逻辑
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/config');
        // debugger;
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // 空数组确保 useEffect 仅在组件挂载时执行一次

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Button
          color="primary"
          onClick={() => {
            setModalData(emptyItem);
            setEdit(false);
            setOpen(!isOpen);
          }}
          className="mr-2"
        >
          <FaPlus className="mr-3 text-sm" />
          Add Setting
        </Button>
      </div>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>{isEdit ? "Edit" : "Add"}</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="itemKey">Item key</Label>
                <TextInput
                  id="item_key"
                  name="item_key"
                  type="text"
                  placeholder="请输入一个配置的key - 英文、下划线(不要有空格和特殊字符)"
                  required={true}
                  value={modalData?.item_key ?? ''}
                  onChange={handleChange}
                  disabled={isEdit}
                />
              </div>
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <TextInput
                  id="item_name"
                  type="text"
                  name="item_name"
                  onChange={handleChange}
                  value={modalData?.item_name ?? ''}
                  placeholder="请输入key的名称, 方便阅读"
                  required={true}
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="item_value">Item Value</Label>
                <Textarea
                  id="item_value"
                  name="item_value"
                  placeholder="Give value here"
                  onChange={handleChange}
                  value={modalData?.item_value ?? ''}
                  rows={6}
                  className="mt-1"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleItemSubmit}>
            {loading ? <Spinner aria-label="Loading..." /> : (isEdit ? "Save" : "Add")}
          </Button>
        </Modal.Footer>
      </Modal>

      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell>Item Name</Table.HeadCell>
          <Table.HeadCell>Item Key</Table.HeadCell>
          <Table.HeadCell>Item Value</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {data.map((item: Item) => (
            <Table.Row key={item.item_key} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {item.item_name}
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {item.item_key}
              </Table.Cell>
              <Table.Cell className="max-w-xs break-words p-4 text-base font-medium text-gray-900 dark:text-white">
                {item.item_value}
              </Table.Cell>
              <Table.Cell className="space-x-2 whitespace-nowrap p-4">
                <div className="flex items-center gap-x-3">
                  <Button color="primary" onClick={() => {
                    setModalData(item)
                    setEdit(true)
                    setOpen(true)
                  }} className="mb-2">
                    <FaEdit className="mr-3 text-sm" />
                    Edit
                  </Button>
                  <Button color="failure" onClick={() => handleDeleteItem(item)} className="mb-2">
                    <FaRemoveFormat className="mr-3 text-sm" />
                    Delete
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default BedrockConfigurationPage;
