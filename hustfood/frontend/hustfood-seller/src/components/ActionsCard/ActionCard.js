import { useEffect, useState } from "react";
import axios from "axios";

export default function ActionsCard() {
  const [cancelledRate, setCancelledRate] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard/cancelled_rate")
      .then((res) => setCancelledRate(res.data.cancelledRate))
      .catch((err) => console.error("Lỗi khi tải tỉ lệ đơn bị hủy:", err));
  }, []);

  return (
    <div className="analytics-card">
      <div className="analytics-head">
        <h3>Tỉ lệ đơn hàng bị hủy</h3>
        {/* <span className="las la-ellipsis-h"></span> */}
      </div>
      <div className="analytics-chart">
        <div className="chart-circle">
          <h1>{cancelledRate !== null ? `${cancelledRate}%` : "..."}</h1>
        </div>
        <div className="analytics-note">
          <small>Phân tích dựa trên toàn bộ đơn hàng.</small>
        </div>
      </div>
    </div>
  );
}
