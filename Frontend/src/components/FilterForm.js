import React, { useState } from "react";
import { Form, Radio, Button, Drawer, Row, InputNumber } from "antd";
import "./FilterForm.css";
import filterimg from "./filter.png";

const FilterForm = ({ onSubmit }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const selectedFuelType = values.fuelType;
    const selectedPriceRange = {
      min: values.minPrice,
      max: values.maxPrice,
    };
    if (onSubmit && typeof onSubmit === "function") {
      onSubmit(selectedFuelType, selectedPriceRange);
    }
    setDrawerVisible(false);
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <Row>
        <img
          src={filterimg}
          onClick={showDrawer}
          className="filimgsize"
          alt="filter icon"
        />
      </Row>

      <Drawer
        title="Find Your Need"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={drawerVisible}
        width={500}
        className="custom-drawer"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="fuel-form"
          width={500}
        >
          <Form.Item
            name="fuelType"
            label="Fuel Type"
            rules={[
              {
                required: false,
                message: "Please select a fuel type",
              },
            ]}
          >
            <Radio.Group className="fuel-radio-group" name="fuelType">
              <Radio value="Petrol">Petrol</Radio>
              <Radio value="CNG">CNG</Radio>
              <Radio value="Diesel">Diesel</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Price Range"
            className="pricerange"
            style={{ marginBottom: 0 }}
          >
            <Form.Item
              name="minPrice"
              style={{ display: "inline-block", width: "calc(20% - 8px)" }}
            >
              <InputNumber placeholder="Min" />
            </Form.Item>
            <span
              style={{
                display: "inline-block",
                width: "16px",
                textAlign: "center",
              }}
            ></span>
            <Form.Item
              name="maxPrice"
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <InputNumber placeholder="Max" />
            </Form.Item>
          </Form.Item>

          <Form.Item className="sbutton">
            <Button
              type="primary"
              htmlType="submit"
              className="btn btn-lg btn2 mr-2 submit-button"
            >
              Apply Filter
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default FilterForm;
