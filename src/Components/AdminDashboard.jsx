import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Bar,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaBoxOpen, FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animatedValues, setAnimatedValues] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
  });
  const [chartMode, setChartMode] = useState("daily");
  const navigate = useNavigate();

  const apiBase = "http://localhost:3000/api/Admin/DashboardStats";

  const fetchStats = async () => {
    try {
      const res = await axios.get(apiBase);
      if (res.data.success) setStats(res.data.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (!stats) return;
    const duration = 1000,
      steps = 40;
    let step = 0;
    const start = { ...animatedValues };
    const target = {
      products: stats.totalProducts || 0,
      orders: stats.totalPayments || 0,
      revenue: stats.totalRevenue || 0,
    };
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setAnimatedValues({
        products: Math.floor(
          start.products + (target.products - start.products) * progress
        ),
        orders: Math.floor(
          start.orders + (target.orders - start.orders) * progress
        ),
        revenue: Math.floor(
          start.revenue + (target.revenue - start.revenue) * progress
        ),
      });
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [stats]);

  const dailyData = stats?.dailySales || [];
  const monthlyData = stats?.monthlySales || [];
  const chartData = chartMode === "daily" ? dailyData : monthlyData;

  const COLORS = [
    "#6366F1",
    "#10B981",
    "#F59E0B",
    "#EC4899",
    "#06B6D4",
    "#8B5CF6",
  ];

  const donutData =
    stats?.categories?.map((cat) => ({
      name: cat.name || "Unknown",
      value: cat.value,
    })) || [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0]?.payload;
      const productList =
        chartMode === "daily"
          ? item.products?.join(", ") || "No Products"
          : "—";
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-200 text-gray-700 text-sm">
          <p className="font-bold">{label}</p>
          <p>🛍 Orders: {item.orders}</p>
          <p>💰 Revenue: ₹{item.revenue.toLocaleString()}</p>
          {chartMode === "daily" && (
            <p className="mt-1 text-xs text-gray-500">
              🧾 Products: {productList}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading || !stats)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <ImSpinner2 className="animate-spin text-indigo-600 text-5xl mb-4" />
        <p className="text-indigo-700 font-medium text-lg animate-pulse">
          Loading Admin Dashboard...
        </p>
      </div>
    );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* ===== SIDEBAR ===== */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-gray-200 flex flex-col justify-between rounded-r-2xl shadow-2xl border-r-2 border-black z-40">
        <div>
          <div className="px-10 py-7 w-full bg-gradient-to-r from-blue-300 to-blue-500 flex items-center justify-center shadow-md rounded-tr-xl">
            <h1 className="text-xl font-bold text-blue-900 tracking-wide">
              Tech Gadgets
            </h1>
          </div>

          <nav className="flex flex-col gap-3 px-2 mt-8">
            {[
              { to: "/AdminDashboard", icon: "fa-gauge", label: "Dashboard" },
              { to: "/AdminProducts", icon: "fa-box", label: "Products" },
              { to: "/AdminOrders", icon: "fa-cart-shopping", label: "Orders" },
              { to: "/AdminContacts", icon: "fa-users", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative px-4 py-2 rounded-r-full flex items-center gap-2 text-black font-medium overflow-hidden group text-sm md:text-base cursor-pointer"
              >
                <span className="absolute left-0 top-0 h-full w-0 bg-blue-600 transition-all duration-500 group-hover:w-full -z-10"></span>
                <i
                  className={`fa-solid ${item.icon} z-10 group-hover:scale-110 transition-transform duration-300`}
                ></i>
                <span className="z-10 group-hover:text-white transition-colors duration-300">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="px-5 py-5 border-t border-black">
          <button
            onClick={() => {
              navigate("/AdminLogin");
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-4xl flex items-center justify-center gap-2 transition-all duration-150 text-sm md:text-base cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02]"
          >
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 ml-64 transition-all duration-300">
        <div className="flex flex-col min-h-screen py-10 px-6">
          {/* ===== Header ===== */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 text-lg">
              {chartMode === "daily"
                ? "Daily Orders, Revenue, and Products Overview"
                : "Monthly Orders & Revenue Summary"}
            </p>
          </div>

          {/* ===== Stats ===== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto mb-14">
            <div className="flex items-center gap-5 bg-indigo-50 text-indigo-800 p-6 rounded-3xl shadow-md hover:shadow-xl transition-all">
              <div className="p-4 bg-indigo-100 rounded-2xl">
                <FaBoxOpen className="text-4xl text-indigo-600" />
              </div>
              <div>
                <p className="text-sm uppercase font-semibold">Total Products</p>
                <p className="text-3xl font-bold">{animatedValues.products}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-yellow-50 text-yellow-800 p-6 rounded-3xl shadow-md hover:shadow-xl transition-all">
              <div className="p-4 bg-yellow-100 rounded-2xl">
                <FaShoppingCart className="text-4xl text-yellow-500" />
              </div>
              <div>
                <p className="text-sm uppercase font-semibold">Total Orders</p>
                <p className="text-3xl font-bold">{animatedValues.orders}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-green-50 text-green-800 p-6 rounded-3xl shadow-md hover:shadow-xl transition-all">
              <div className="p-4 bg-green-100 rounded-2xl">
                <FaRupeeSign className="text-4xl text-green-600" />
              </div>
              <div>
                <p className="text-sm uppercase font-semibold">Total Revenue</p>
                <p className="text-3xl font-bold">
                  ₹{animatedValues.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* ===== Charts ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-7xl mx-auto">
            {/* Bar + Line Chart */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-gray-700">
                  {chartMode === "daily"
                    ? "📅 Daywise Performance"
                    : "📊 Monthly Performance"}
                </h2>
                <select
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={chartMode}
                  onChange={(e) => setChartMode(e.target.value)}
                >
                  <option value="daily">Daywise</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <ResponsiveContainer width="100%" height={360}>
                <ComposedChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey={chartMode === "daily" ? "day" : "month"}
                    tick={{ fill: "#6B7280" }}
                  />
                  <YAxis tick={{ fill: "#6B7280" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="orders"
                    fill="#6366F1"
                    name="Orders"
                    barSize={chartMode === "monthly" ? 40 : 25}
                    radius={[10, 10, 0, 0]}
                  />
                  {chartMode === "daily" && (
                    <Bar
                      dataKey={(d) => d.products?.length || 0}
                      fill="#F59E0B"
                      name="Products"
                      barSize={20}
                      radius={[10, 10, 0, 0]}
                    />
                  )}
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Revenue"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-700 mb-5">
                🥧 Product Category Distribution
              </h2>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={130}
                    paddingAngle={4}
                    dataKey="value"
                    nameKey="name"
                  >
                    {donutData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
