import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Cards() {
  const [cardValues, setCardValues] = useState({
    revenue: 0,
    cancelled: 0,
    combo: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2, res3] = await Promise.all([
          axios.get('http://localhost:5000/api/dashboard/revenue'),
          axios.get('http://localhost:5000/api/dashboard/cancelled_orders'),
          axios.get('http://localhost:5000/api/dashboard/combo_orders'),
        ]);
        setCardValues({
          revenue: res1.data.revenue,
          cancelled: res2.data.cancelledRevenue,
          combo: res3.data.comboRevenue,
        });
      } catch (err) {
        console.error("Lỗi khi fetch dashboard data:", err);
      }
    };
    fetchData();
  }, []);

  const cards = [
    {
      title: "Doanh thu",
      subtitle: "Doanh thu bán hàng",
      value: cardValues.revenue?.toLocaleString("vi-VN") + "k",
      trend: "",
      className: "danger",
    },
    {
      title: "Hủy đơn",
      subtitle: "Giá trị của đơn hàng bị hủy",
      value: cardValues.cancelled?.toLocaleString("vi-VN") + "k",
      trend: "",
      className: "success",
    },
    {
      title: "Combo",
      subtitle: "Doanh thu các combo",
      value: cardValues.combo?.toLocaleString("vi-VN") + "k",
      trend: "",
      className: "yellow",
    },
  ];

  return (
    <div className="cards">
      {cards.map((card, idx) => (
        <div key={idx} className="card-single">
          <div className="card-flex">
            <div className="card-info">
              <div className="card-head">
                <span>{card.title}</span>
                <small>{card.subtitle}</small>
              </div>
              <h2>{card.value}</h2>
              <small>{card.trend}</small>
            </div>
            <div className={`card-chart ${card.className}`}>
              <span className="las la-chart-line"></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
