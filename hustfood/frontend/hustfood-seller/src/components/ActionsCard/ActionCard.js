import { useEffect, useState } from "react";
import { getCancelledOrderRate } from "../../services/dashboardService";

export default function ActionsCard() {
  const [cancelledRate, setCancelledRate] = useState(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await getCancelledOrderRate();
        setCancelledRate(res.data.cancelledRate);
      } catch (err) {
        console.error("Lỗi khi tải tỉ lệ đơn bị hủy:", err);
      }
    };

    fetchRate();
  }, []);

  return (
    <div className="analytics-card">
      <div className="analytics-head">
        <h3>Tỉ lệ đơn hàng bị hủy</h3>
      </div>
      <div className="analytics-chart">
        <div className="chart-circle">
          <h1>{cancelledRate !== null ? `${cancelledRate * 100}%` : "..."}</h1>
        </div>
        <div className="analytics-note">
          <small>Phân tích dựa trên toàn bộ đơn hàng.</small>
        </div>
      </div>
    </div>
  );
}
