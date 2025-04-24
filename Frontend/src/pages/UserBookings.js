import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Col, Row } from "antd";
import Spinner from "../components/Spinner";
import moment from "moment";
import { jsPDF } from "jspdf";

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  const generateInvoice = (booking) => {
    const doc = new jsPDF();

    doc.setFillColor(0, 128, 255);
    doc.rect(0, 0, 250, 25, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold"); // Set font to bold
    doc.setFontSize(24);
    doc.text("WanderWheels", 105, 20, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("", 10, 30);
    doc.text(`Car: ${booking.car.name}`, 10, 50);
    doc.text(`Total hours: ${booking.totalHours}`, 10, 60);
    doc.text(`Rent per hour: ${booking.car.rentPerHour}`, 10, 70);
    doc.text(`Total amount: ${booking.totalAmount}`, 10, 80);
    doc.text(`Transaction Id: ${booking.transactionId}`, 10, 90);
    doc.text(`From: ${booking.bookedTimeSlots.from}`, 10, 100);
    doc.text(`To: ${booking.bookedTimeSlots.to}`, 10, 110);
    doc.text(
      `Date of booking: ${moment(booking.createdAt).format("MMM DD yyyy")}`,
      10,
      120
    );
    doc.save(`invoice_${booking.transactionId}.pdf`);
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <h3 className="booktitle text-center mt-2">My Bookings</h3>

      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
          {bookings
            .filter((o) => o.user == user._id)
            .map((booking) => {
              return (
                <Row
                  gutter={16}
                  className="bs1 mt-3 text-left"
                  key={booking._id}
                >
                  <Col className="bcardata" lg={6} sm={24}>
                    <p className="bcarname">
                      <b>{booking.car.name}</b>
                    </p>
                    <p>
                      Total hours : <b>{booking.totalHours}</b>
                    </p>
                    <p>
                      Rent per hour : <b>{booking.car.rentPerHour}</b>
                    </p>
                    <p>
                      Total amount : <b>{booking.totalAmount}</b>
                    </p>
                  </Col>

                  <Col className="bcardata" lg={12} sm={24}>
                    <p>
                      Transaction Id : <b>{booking.transactionId}</b>
                    </p>
                    <p>
                      From: <b>{booking.bookedTimeSlots.from}</b>
                    </p>
                    <p>
                      To: <b>{booking.bookedTimeSlots.to}</b>
                    </p>
                    <p>
                      Date of booking:{" "}
                      <b>{moment(booking.createdAt).format("MMM DD yyyy")}</b>
                    </p>
                  </Col>

                  <Col lg={6} sm={24} className="text-right">
                    <img
                      style={{ borderRadius: 60, marginright: 40 }}
                      src={booking.car.image}
                      height="140"
                      className="p-2"
                    />
                  </Col>
                  <button
                    onClick={() => generateInvoice(booking)}
                    className="btn-invoice"
                  >
                    Download Invoice
                  </button>
                </Row>
              );
            })}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;
