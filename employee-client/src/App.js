import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ fullName: "", age: "", salary: "" });
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5039/api/employees";

  const fetchEmployees = () => {
    axios.get(API_URL)
      .then(res => setEmployees(res.data))
      .catch(err => console.error("GET xətası:", err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId === null) {
      axios.post(API_URL, form)
        .then(() => {
          fetchEmployees();
          setForm({ fullName: "", age: "", salary: "" });
        })
        .catch(err => console.error("POST xətası:", err));
    } else {
      axios.put(`${API_URL}?id=${editId}`, form)
        .then(() => {
          fetchEmployees();
          setForm({ fullName: "", age: "", salary: "" });
          setEditId(null);
        })
        .catch(err => console.error("PUT xətası:", err));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}?id=${id}`)
      .then(() => fetchEmployees())
      .catch(err => console.error("DELETE xətası:", err));
  };

  const handleEdit = (emp) => {
    setForm({ fullName: emp.fullName, age: emp.age, salary: emp.salary });
    setEditId(emp.id);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "'Segoe UI', sans-serif", background: "#f4f6f8", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Employees Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} 
            style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap", marginBottom: "40px" }}>
        <input
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={e => setForm({ ...form, fullName: e.target.value })}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", minWidth: "180px" }}
        />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={e => setForm({ ...form, age: e.target.value })}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "80px" }}
        />
        <input
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={e => setForm({ ...form, salary: e.target.value })}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "120px" }}
        />
        <button type="submit" 
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  background: editId === null ? "#4CAF50" : "#2196F3",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}>
          {editId === null ? "Add Employee" : "Update Employee"}
        </button>
      </form>

      {/* Employee Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
        {employees.map(emp => (
          <div key={emp.id} 
               style={{
                 background: "white",
                 borderRadius: "12px",
                 padding: "20px",
                 boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                 transition: "transform 0.2s",
               }}
               onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
               onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <h3 style={{ marginBottom: "10px", color: "#333" }}>{emp.fullName}</h3>
            <p><strong>Age:</strong> {emp.age}</p>
            <p><strong>Salary:</strong> ${emp.salary}</p>
            <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
              <button onClick={() => handleEdit(emp)}
                      style={{
                        flex: 1,
                        padding: "8px",
                        border: "none",
                        borderRadius: "5px",
                        background: "#2196F3",
                        color: "white",
                        cursor: "pointer"
                      }}>Edit</button>
              <button onClick={() => handleDelete(emp.id)}
                      style={{
                        flex: 1,
                        padding: "8px",
                        border: "none",
                        borderRadius: "5px",
                        background: "#f44336",
                        color: "white",
                        cursor: "pointer"
                      }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;