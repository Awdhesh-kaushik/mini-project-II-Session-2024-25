import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import { Col, Row, Divider, DatePicker, Select } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import FilterForm from "../components/FilterForm";

const { RangePicker } = DatePicker;
const cities = [
  "Noida",
  "Ghaziabad",
  "Mathura",
  "Delhi",
];

const { Option } = Select; // Import Select component from antd

function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const [filterDate, setFilterDate] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedCity, setSelectedCity] = useState(""); // New state for selected city
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  useEffect(() => {
    applyFilter();
  }, [selectedFuelType, filterDate, selectedPriceRange, selectedCity]); // Include selectedCity in dependency array

  function applyFilter() {
    let filteredCars = cars.filter((car) => {
      if (selectedFuelType && car.fuelType !== selectedFuelType) {
        return false;
      }

      if (filterDate.length === 2) {
        const selectedFrom = moment(filterDate[0]);
        const selectedTo = moment(filterDate[1]);

        for (const booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
            return false;
          }
        }
      }

      if (selectedPriceRange) {
        if (
          (selectedPriceRange.min &&
            car.rentPerHour < selectedPriceRange.min) ||
          (selectedPriceRange.max && car.rentPerHour > selectedPriceRange.max)
        ) {
          return false;
        }
      }

      if (selectedCity && car.city !== selectedCity) {
        // Filter by selected city
        return false;
      }

      return true;
    });

    setTotalCars(filteredCars);
  }

  const handleChange = (value) => {
    setSelectedCity(value); // Update selected city
  };

  return (
    <DefaultLayout>
      <div className="Bgimg"></div>
      <div className="text">
        <i>Be the medium to others destination.</i>
      </div>
      <Row className="mt-3 hpage" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <Select
            className="city"
            placeholder="Select a city"
            onChange={handleChange}
          >
            {cities.map((city, index) => (
              <Option key={index} value={city}>
                {city}
              </Option>
            ))}
          </Select>
          <RangePicker
            className="datepic"
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={(dates) => setFilterDate(dates)}
          />
        </Col>

        <FilterForm
          onSubmit={(fuelType, priceRange) => {
            setSelectedFuelType(fuelType);
            setSelectedPriceRange(priceRange);
          }}
        />
      </Row>

      {loading === true && <Spinner />}

      <Row justify="center" gutter={20}>
        {totalCars.map((car) => (
          <Col lg={5} sm={24} xs={24} key={car._id}>
            <div className="car p-2 bs1">
              <img src={car.image} className="carimg" />
              <div className="car-content d-flex align-items-center justify-content-between">
                <div className="pl-2">
                  <p className="carname size text-left">{car.name}</p>
                  <p className="text-left">
                    Rent Per Hour {car.rentPerHour} /-
                  </p>
                </div>
                <div>
                  <button className="btn btn-lg btn1 mr-2">
                    <Link to={`/booking/${car._id}`}>Book Now</Link>
                  </button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
}

export default Home;
