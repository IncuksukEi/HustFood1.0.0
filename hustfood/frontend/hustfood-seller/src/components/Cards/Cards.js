import React, { useEffect, useState } from "react";
import {
  getTotalRevenue,
  getCancelledOrders,
  getComboRevenue,
} from "../../services/dashboardService";

export default function Cards() {
  const [cardValues, setCardValues] = useState({
    revenue: 0,
    cancelled: 0,
    combo: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revenueRes, cancelledRes, comboRes] = await Promise.all([
          getTotalRevenue(),
          getCancelledOrders(),
          getComboRevenue(),
        ]);

        setCardValues({
          revenue: revenueRes.data.totalRevenue || 0,
          cancelled: cancelledRes.data.cancelledOrders || 0,
          combo: comboRes.data.comboRevenue || 0,
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
      value: (cardValues.revenue/1000).toLocaleString("vi-VN") + " kđ",
      // value: cardValues.revenue,
      trend: "",
      className: "danger",
    },
    {
      title: "Hủy đơn",
      subtitle: "Giá trị của đơn hàng bị hủy",
      value: (cardValues.cancelled/1000).toLocaleString("vi-VN") + " kđ", 
      // value: cardValues.cancelled,
      trend: "",
      className: "success",
    },
    {
      title: "Combo",
      subtitle: "Doanh thu combo nhóm",
      // value: cardValues.combo.toLocaleString("vi-VN") + "k",
      value: (cardValues.combo/1000).toLocaleString("vi-VN") + " kđ",
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
